import { memo, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ExternalLink,
  Github,
  Search,
  Archive,
  X,
} from "lucide-react";
import {
  PROJECT_CATEGORIES,
  filterProjects,
  projects,
  type Project,
} from "@/data/projects";

const accentBadge = {
  emerald: "border-neon-emerald/40 text-neon-emerald",
  gold: "border-neon-gold/40 text-neon-gold",
  teal: "border-neon-teal/40 text-neon-teal",
} as const;

const sortByPriority = (a: Project, b: Project) =>
  (b.priority ?? 0) - (a.priority ?? 0);

const AllProjects = memo(() => {
  const [active, setActive] =
    useState<(typeof PROJECT_CATEGORIES)[number]>("All Projects");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);

  const featured = useMemo(
    () => projects.filter((p) => p.featured).sort(sortByPriority),
    [],
  );

  const visible = useMemo(
    () => filterProjects(projects, active, query).sort(sortByPriority),
    [active, query],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { "All Projects": projects.length };
    for (const cat of PROJECT_CATEGORIES) {
      if (cat === "All Projects") continue;
      map[cat] = projects.filter(
        (p) => p.category === cat || p.secondaryCategories?.includes(cat),
      ).length;
    }
    return map;
  }, []);

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-left mb-10 sm:mb-14 max-w-3xl"
        >
          <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-secondary mb-3 font-body">
            Adil Tariq · Selected Work
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-foreground">
            Projects, built with purpose.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            A growing showcase of AI, ML, Generative AI, and Python projects —
            engineered end-to-end with measurable outcomes.
          </p>
        </motion.div>

        {/* Featured strip */}
        {featured.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mb-10 sm:mb-14"
          >
            <div className="flex items-center gap-2 mb-4">
              <Archive className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-heading tracking-[0.18em] uppercase text-primary">
                Featured
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-primary/30 via-glass-border to-transparent ml-2" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {featured.slice(0, 2).map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelected(p)}
                    className="group glass-card-hover text-left overflow-hidden relative grid grid-rows-[auto_1fr] sm:grid-cols-[0.9fr_1.1fr] sm:grid-rows-1"
                  >
                    <div className="relative h-40 sm:h-full sm:min-h-52 overflow-hidden border-b sm:border-b-0 sm:border-r border-glass-border">
                      {p.image ? (
                        <>
                          <img
                            src={p.image}
                            alt={p.imageAlt ?? p.title}
                            loading="lazy"
                            width={1280}
                            height={800}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
                        </>
                      ) : (
                        <div
                          className={`w-full h-full bg-gradient-to-br ${p.gradient} flex items-center justify-center`}
                        >
                          <Icon className="w-16 h-16 text-foreground/30" aria-hidden="true" />
                        </div>
                      )}
                      <span className="absolute top-3 left-3 text-[10px] tracking-wide uppercase px-2 py-1 rounded-sm bg-card/90 border border-primary/35 text-primary font-body">
                        Featured
                      </span>
                      <span
                        className={`absolute top-3 right-3 text-[10px] px-2 py-1 rounded-sm bg-card/90 backdrop-blur-md border font-body ${accentBadge[p.accent]}`}
                      >
                        {p.badge}
                      </span>
                    </div>
                    <div className="p-4 sm:p-5 self-center">
                      <span className="text-[11px] uppercase tracking-wide text-secondary font-body">
                        {p.category}
                      </span>
                      <h4 className="font-serif font-medium text-lg sm:text-xl text-foreground mt-1 group-hover:text-primary transition-colors">
                        {p.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-2">
                        {p.shortDescription}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Search + Filter bar */}
        <div className="mb-8 sm:mb-10 space-y-4">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, technology, category, or keyword…"
              className="w-full pl-11 pr-10 py-3 rounded-md bg-card border border-glass-border text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary/60 transition-colors"
              aria-label="Search projects"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div
            role="tablist"
            aria-label="Project category filter"
            className="flex flex-wrap justify-center gap-2"
          >
            {PROJECT_CATEGORIES.map((f) => {
              const isActive = active === f;
              const count = counts[f] ?? 0;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(f)}
                  className={`group text-[11px] sm:text-xs px-3.5 py-2 rounded-md font-body tracking-wide transition-all duration-300 border flex items-center gap-2 ${
                    isActive
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-glass-border text-muted-foreground hover:text-foreground hover:border-neon-emerald/40"
                  }`}
                >
                  <span>{f}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? "bg-neon-emerald/15 text-neon-emerald"
                        : "bg-muted text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        {visible.length === 0 ? (
          <div className="text-center py-16 glass-card">
            <p className="text-muted-foreground text-sm">
              No projects match your search. Try a different keyword or
              category.
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 items-stretch"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.article
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.25) }}
                    className="glass-card-hover group overflow-hidden flex flex-col"
                  >
                    {/* Visual header */}
                    <div className="relative overflow-hidden aspect-[16/10] border-b border-glass-border">
                      {p.image ? (
                        <>
                          <img
                            src={p.image}
                            alt={p.imageAlt ?? p.title}
                            loading="lazy"
                            width={1280}
                            height={800}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
                        </>
                      ) : (
                        <div
                          className={`w-full h-full bg-gradient-to-br ${p.gradient} flex items-center justify-center`}
                        >
                          <Icon
                            className="w-16 h-16 sm:w-20 sm:h-20 text-foreground/25 group-hover:text-foreground/50 group-hover:scale-110 transition-all duration-500"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                      <span
                        className={`absolute top-3 right-3 text-[10px] sm:text-xs px-2 py-1 rounded-sm bg-card/90 backdrop-blur-md border font-body ${accentBadge[p.accent]}`}
                      >
                        {p.badge}
                      </span>
                      {p.image && (
                          <div className="absolute bottom-3 left-3 w-10 h-10 sm:w-11 sm:h-11 rounded-sm bg-card/90 backdrop-blur-md border border-glass-border flex items-center justify-center">
                          <Icon
                            className="w-5 h-5 text-neon-emerald"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] sm:text-xs font-body text-neon-gold tracking-wide uppercase">
                          {p.tagline}
                        </span>
                        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                          {p.category}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-base sm:text-lg text-foreground mt-1.5 group-hover:text-neon-emerald transition-colors leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed line-clamp-3">
                        {p.shortDescription}
                      </p>

                      {/* Features */}
                      <ul className="mt-4 space-y-1.5">
                        {p.features.slice(0, 4).map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2 text-xs sm:text-[13px] text-muted-foreground"
                          >
                            <Check className="w-3.5 h-3.5 text-neon-emerald shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      {p.result && (
                        <p className="text-xs sm:text-sm text-neon-emerald font-semibold mt-4">
                          ✓ {p.result}
                        </p>
                      )}

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {p.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* CTAs */}
                      <div className="mt-auto pt-5 flex flex-col gap-2">
                        <button
                          onClick={() => setSelected(p)}
                            className="w-full flex items-center justify-center gap-2 text-sm px-4 py-2.5 rounded-md bg-primary border border-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
                        >
                          View Details
                        </button>
                        <div className="flex gap-2">
                          {p.github && (
                            <a
                              href={p.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${p.title} on GitHub`}
                              className="flex-1 flex items-center justify-center gap-2 text-xs sm:text-sm px-3 py-2 rounded-md border border-glass-border text-muted-foreground hover:text-foreground hover:border-secondary/40 transition-all"
                            >
                              <Github size={14} /> GitHub
                            </a>
                          )}
                          {p.liveDemo && (
                            <a
                              href={p.liveDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open ${p.title} live demo`}
                              className="flex-1 flex items-center justify-center gap-2 text-xs sm:text-sm px-3 py-2 rounded-md border border-secondary/40 text-secondary hover:bg-secondary/10 transition-all"
                            >
                              <ExternalLink size={14} /> Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectDetails
            project={selected}
            onClose={() => setSelected(null)}
            key={selected.id}
          />
        )}
      </AnimatePresence>
    </section>
  );
});

AllProjects.displayName = "AllProjects";
export default AllProjects;

/* ------------------------- Details Modal ------------------------- */

const ProjectDetails = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  const Icon = project.icon;
  const [videoError, setVideoError] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 24 }}
        transition={{ type: "spring", damping: 26, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="relative glass-card w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto neon-border rounded-t-2xl sm:rounded-2xl"
      >
        {/* Hero */}
        <div className="relative aspect-[16/8] overflow-hidden border-b border-glass-border">
          {project.image ? (
            <>
              <img
                src={project.image}
                alt={project.imageAlt ?? project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            </>
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
            >
              <Icon className="w-20 h-20 text-foreground/30" aria-hidden="true" />
            </div>
          )}
          <button
            onClick={onClose}
            aria-label="Close details"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/70 backdrop-blur-md border border-glass-border flex items-center justify-center text-foreground hover:bg-background/90"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-[10px] uppercase tracking-wide text-neon-gold font-body">
              {project.tagline} · {project.category}
            </span>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-foreground mt-1 leading-tight">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* Demo Video */}
          {project.demoVideo && (
            <Section title="Demo Video">
              <div className="relative rounded-xl overflow-hidden border border-neon-emerald/30 bg-background/40 shadow-[0_0_30px_hsl(var(--neon-emerald)/0.15)]">
                {videoError ? (
                  <div className="relative aspect-video">
                    {project.image && (
                      <>
                        <img
                          src={project.image}
                          alt={project.imageAlt ?? `${project.title} preview`}
                          className="absolute inset-0 w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/70 to-background/90" />
                      </>
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center p-6">
                      <p className="text-sm text-foreground">
                        Oops — the demo video is taking a break.
                      </p>
                      <p className="text-xs text-muted-foreground max-w-xs">
                        It may be a network hiccup or browser restriction, so here is a preview image instead.
                      </p>
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full border border-neon-emerald/40 text-neon-emerald hover:bg-neon-emerald/10 transition-colors"
                        >
                          <ExternalLink size={13} /> Watch Demo on Drive
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <video
                    src={project.demoVideo}
                    poster={project.image}
                    controls
                    playsInline
                    preload="metadata"
                    onError={() => setVideoError(true)}
                    onStalled={() => setVideoError(true)}
                    className="w-full h-auto block aspect-video bg-black"
                  >
                    Your browser does not support embedded video.
                  </video>
                )}
              </div>
            </Section>
          )}

          {/* Overview */}
          <Section title="Project Overview">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.overview}
            </p>
          </Section>

          {project.problemStatement && (
            <Section title="Problem Statement">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.problemStatement}
              </p>
            </Section>
          )}

          {project.dataset && (
            <Section title="Dataset">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.dataset}
              </p>
            </Section>
          )}

          <Section title="Technologies Used">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full neon-border text-neon-emerald"
                >
                  {t}
                </span>
              ))}
            </div>
          </Section>

          {project.modelArchitecture && (
            <Section title="Model Architecture">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.modelArchitecture}
              </p>
            </Section>
          )}

          {project.metrics && project.metrics.length > 0 && (
            <Section title="Results & Metrics">
              <div className="grid grid-cols-3 gap-3">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-glass-border bg-background/40 p-3 text-center"
                  >
                    <div className="text-lg sm:text-xl font-heading font-bold text-neon-emerald">
                      {m.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground mt-1">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {project.features.length > 0 && (
            <Section title="Key Features">
              <ul className="grid sm:grid-cols-2 gap-2">
                {project.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="w-4 h-4 text-neon-emerald shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {project.screenshots && project.screenshots.length > 0 && (
            <Section title="Screenshots">
              <div className="grid sm:grid-cols-2 gap-3">
                {project.screenshots.map((s) => (
                  <img
                    key={s.src}
                    src={s.src}
                    alt={s.alt}
                    loading="lazy"
                    className="w-full h-auto rounded-xl border border-glass-border"
                  />
                ))}
              </div>
            </Section>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 text-sm px-4 py-2.5 rounded-xl border border-neon-emerald/40 text-neon-emerald hover:bg-neon-emerald/10 hover:shadow-[0_0_20px_hsl(var(--neon-emerald)/0.25)] transition-all"
              >
                <Github size={16} /> View on GitHub
                <ExternalLink size={12} className="opacity-70" />
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 text-sm px-4 py-2.5 rounded-xl bg-neon-gold/10 border border-neon-gold/40 text-neon-gold hover:bg-neon-gold/20 transition-all"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h4 className="text-[11px] uppercase tracking-[0.25em] text-neon-emerald font-body mb-2">
      {title}
    </h4>
    {children}
  </div>
);
