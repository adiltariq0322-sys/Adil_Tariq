// Contact-form backend on Vercel (replaces the Supabase send-contact-email function,
// which cannot send: the old Resend account may only email its own address,
// 0325, while the form sends to 0327).
// Sends the lead to Adil via Resend. The key comes from the RESEND_API_KEY
// env var (server-side only, never in the repo).
// Key rotated 2026-11-19 (new "portfolio-contact-form" key, 0322 account);
// this redeploy picks up the updated Vercel env var.

type ContactBody = { name?: unknown; email?: unknown; subject?: unknown; message?: unknown };

const TO_EMAIL = "adiltariq0322@gmail.com";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: "Email service not configured" });
  }

  const body = (req.body ?? {}) as ContactBody;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  const bad: string[] = [];
  if (!name || name.length > 100) bad.push("name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) bad.push("email");
  if (!subject || subject.length > 200) bad.push("subject");
  if (!message || message.length > 5000) bad.push("message");
  if (bad.length) return res.status(400).json({ error: "Invalid input", details: bad });

  const html = `
      <div style="background:#f4f4f7;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <div style="background:linear-gradient(135deg,#047857,#065f46);padding:28px 32px;">
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">New Portfolio Inquiry</h1>
            <p style="margin:6px 0 0;color:#d1fae5;font-size:13px;">Sent from the portfolio contact form</p>
          </div>
          <div style="padding:28px 32px;color:#1f2937;">
            <p style="margin:0 0 20px;font-size:15px;line-height:1.6;">You've received a new message from a potential client.</p>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:10px 0;color:#6b7280;width:90px;border-bottom:1px solid #f3f4f6;">Name</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-weight:600;">${escapeHtml(name)}</td></tr>
              <tr><td style="padding:10px 0;color:#6b7280;border-bottom:1px solid #f3f4f6;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;"><a href="mailto:${escapeHtml(email)}" style="color:#047857;text-decoration:none;font-weight:600;">${escapeHtml(email)}</a></td></tr>
              <tr><td style="padding:10px 0;color:#6b7280;border-bottom:1px solid #f3f4f6;">Subject</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-weight:600;">${escapeHtml(subject)}</td></tr>
            </table>
            <div style="margin-top:24px;">
              <p style="margin:0 0 10px;color:#6b7280;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
              <div style="background:#f9fafb;border-left:3px solid #047857;padding:16px 18px;border-radius:6px;white-space:pre-wrap;line-height:1.6;color:#111827;">${escapeHtml(message)}</div>
            </div>
            <div style="margin-top:28px;padding-top:20px;border-top:1px solid #f3f4f6;">
              <a href="mailto:${escapeHtml(email)}?subject=Re:%20${encodeURIComponent(subject)}" style="display:inline-block;background:#047857;color:#ffffff;padding:11px 22px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Reply to ${escapeHtml(name)}</a>
            </div>
          </div>
          <div style="background:#f9fafb;padding:18px 32px;text-align:center;color:#9ca3af;font-size:12px;">
            Hafiz Adil · AI Engineer &amp; Automation Expert
          </div>
        </div>
      </div>`;

  let resp: Response;
  try {
    resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: "Adil Tariq <onboarding@resend.dev>",
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New Portfolio Inquiry: ${subject}`,
        html,
      }),
    });
  } catch (err) {
    console.error("Resend request failed:", err);
    return res.status(502).json({ error: "Failed to send email" });
  }

  const data: any = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    console.error("Resend error:", resp.status, data);
    return res.status(502).json({ error: "Failed to send email", details: data });
  }
  return res.status(200).json({ success: true, id: data.id });
}
