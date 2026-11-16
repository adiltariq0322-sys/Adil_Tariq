import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Settings as SettingsIcon,
  Activity,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { checkHealth, getApiBase, setApiBase } from "@/lib/skinApi";
import { toast } from "sonner";

export function SkinShell({ children }: { children: ReactNode }) {
  const [health, setHealth] = useState<"idle" | "ok" | "down">("idle");

  useEffect(() => {
    let alive = true;
    checkHealth().then((ok) => alive && setHealth(ok ? "ok" : "down"));
    const t = setInterval(async () => {
      const ok = await checkHealth();
      if (alive) setHealth(ok ? "ok" : "down");
    }, 60_000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(210_40%_6%)] via-background to-[hsl(200_30%_8%)] text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to portfolio</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  health === "ok"
                    ? "bg-emerald-400 animate-pulse"
                    : health === "down"
                      ? "bg-red-400"
                      : "bg-yellow-400"
                }`}
              />
              <span className="text-muted-foreground">
                API: {health === "ok" ? "online" : health === "down" ? "offline" : "checking…"}
              </span>
            </div>
            <SettingsSheet onSaved={() => checkHealth().then((ok) => setHealth(ok ? "ok" : "down"))} />
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">{children}</main>
      <footer className="border-t border-white/5 py-8 text-center text-xs text-muted-foreground">
        <div className="max-w-3xl mx-auto px-4">
          <p className="mb-2">
            <strong className="text-foreground/80">Medical disclaimer:</strong> This tool provides
            AI-generated information for educational purposes only and is not a substitute for
            professional medical advice, diagnosis, or treatment. Always consult a qualified
            healthcare provider.
          </p>
          <p>© {new Date().getFullYear()} Hafiz Adil · AI Skin Specialist</p>
        </div>
      </footer>
    </div>
  );
}

function SettingsSheet({ onSaved }: { onSaved: () => void }) {
  const [url, setUrl] = useState("");
  const [dark, setDark] = useState(true);
  useEffect(() => {
    setUrl(getApiBase());
  }, []);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <SettingsIcon className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-background/95 backdrop-blur-xl border-white/10">
        <SheetHeader>
          <SheetTitle className="font-heading">Settings</SheetTitle>
          <SheetDescription>Configure the AI Skin Specialist backend and preferences.</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="api-base">Backend API URL</Label>
            <Input
              id="api-base"
              placeholder="https://your-skin-api.onrender.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Points to the deployed Python backend from the linked GitHub repo. No trailing slash needed.
            </p>
            <Button
              className="w-full mt-2"
              onClick={() => {
                setApiBase(url.trim());
                toast.success("Backend URL saved");
                onSaved();
              }}
            >
              Save
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Theme</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const next = !dark;
                  setDark(next);
                  document.documentElement.classList.toggle("light", !next);
                }}
              >
                {dark ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
                {dark ? "Dark" : "Light"}
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 p-3 text-xs text-muted-foreground flex items-start gap-2">
            <Activity className="w-4 h-4 text-emerald-400 mt-0.5" />
            <span>
              The API status indicator in the header polls <code>/health</code> every 60 seconds.
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
