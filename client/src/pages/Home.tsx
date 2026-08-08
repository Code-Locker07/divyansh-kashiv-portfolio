/*
 * DESIGN: Dark Glassmorphic Portfolio
 * Near-black background (#07080d), electric teal accent (#00d4aa),
 * glass cards with blur, animated counters, scroll-reveal animations
 */
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, ArrowUp, Mail, Copy, Check, Github, Linkedin, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import SmokyText from "@/components/SmokyText";
import GalleryTunnel from "@/components/GalleryTunnel";
import SpecularButton from "@/components/SpecularButton";

// Image URLs from generate_image
const HERO_PHONE = "/manus-storage/dark-hero-phone_5a583c9b.png";
const PROJECT_BANKING = "/manus-storage/dark-project-banking_54091b9a.png";
const PROJECT_PLACEMENT = "/manus-storage/dark-project-placement_44fa0d6e.png";
const PROJECT_PORTFOLIO = "/manus-storage/dark-project-portfolio_b5d8b487.png";
const PROJECT_GAME = "/manus-storage/dark-project-game_e3054929.png";
const LOGO = "/manus-storage/dark-logo-icon_76fafa45.png";

/* ─── Animated Counter Hook ─── */
function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const startTime = Date.now();
          const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, started]);

  return { count, ref };
}

/* ─── Scroll Reveal Hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ─── Scroll Reveal Component ─── */
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

/* ─── Skill Data ─── */
const skillCategories = [
  { name: "Languages", color: "teal", skills: [
    { code: "Ja", full: "Java", desc: "Primary language" },
    { code: "Py", full: "Python", desc: "Scripting & automation" },
    { code: "Js", full: "JavaScript", desc: "Web development" },
    { code: "C", full: "C / C++", desc: "Systems & game dev" },
    { code: "Sq", full: "SQL", desc: "Database queries" },
  ]},
  { name: "Backend & Frameworks", color: "emerald", skills: [
    { code: "Sb", full: "Spring Boot", desc: "Java backend framework" },
    { code: "Ra", full: "REST APIs", desc: "API design & integration" },
    { code: "Fl", full: "Flask", desc: "Python web framework" },
    { code: "Kf", full: "Kafka", desc: "Event streaming basics" },
    { code: "Hb", full: "Hibernate", desc: "ORM framework" },
  ]},
  { name: "Frontend", color: "sky", skills: [
    { code: "H5", full: "HTML5", desc: "Web structure" },
    { code: "C3", full: "CSS3", desc: "Styling & layout" },
    { code: "Js", full: "JavaScript", desc: "Dynamic behavior" },
    { code: "Tw", full: "Tailwind", desc: "Utility-first CSS" },
  ]},
  { name: "Core CS", color: "violet", skills: [
    { code: "Ds", full: "DSA", desc: "Data structures & algos" },
    { code: "Oo", full: "OOP", desc: "Object-oriented design" },
    { code: "Db", full: "DBMS", desc: "Database management" },
    { code: "Sd", full: "SysDesign", desc: "System design basics" },
  ]},
  { name: "Tools & Platforms", color: "amber", skills: [
    { code: "Gt", full: "Git", desc: "Version control" },
    { code: "Gh", full: "GitHub", desc: "Code hosting" },
    { code: "Vs", full: "VS Code", desc: "IDE" },
    { code: "Ps", full: "Postman", desc: "API testing" },
    { code: "Ma", full: "Maven", desc: "Build automation" },
  ]},
  { name: "Android & Mobile", color: "rose", skills: [
    { code: "An", full: "Android", desc: "Mobile platform" },
    { code: "Kt", full: "Kotlin", desc: "Android development" },
    { code: "Rl", full: "Raylib", desc: "C++ game framework" },
    { code: "Ac", full: "ACM", desc: "Competitive programming" },
  ]},
];

const otherTools = [
  "Java/Kotlin", "PythonAnywhere", "H2/SQL", "Prompt Engineering",
  "VS Code", "Android Studio", "Postman", "GitHub Copilot", "Three.js"
];

/* ─── Project Data ─── */
const projects = [
  {
    number: "01",
    category: "Academic Capstone",
    company: "NIET · 2026",
    title: "SecureBank",
    tagline: "Banking for students — including the ones who just started coding.",
    description: "A cooperative banking management system built from scratch using Java and OOP principles. Implements Object-Oriented Techniques (Problem Statement #269, SDG 8), backed by a 31-page examination guide and full GitHub documentation.",
    metrics: [
      { value: "31", label: "Page documentation" },
      { value: "Full", label: "OOP Implementation" },
    ],
    tags: ["Java", "OOP", "Academic", "Banking"],
    github: "https://github.com/Divyansh-Kashiv07",
    type: "Academic",
    image: PROJECT_BANKING,
  },
  {
    number: "02",
    category: "Full-Stack Developer",
    company: "NIET · Jan 2026",
    title: "Campus Placement System",
    tagline: "Where students meet recruiters — with zero middlemen.",
    description: "A full-stack placement management platform for NIET covering registration, drive scheduling, interview tracking, offer generation, and a live analytics dashboard, deployed on PythonAnywhere.",
    metrics: [
      { value: "Full", label: "Stack Developer" },
      { value: "Live", label: "Deployed" },
    ],
    tags: ["Python", "Flask", "REST API", "JSON", "OOP"],
    github: "https://github.com/Divyansh-Kashiv07",
    type: "Proprietary — NIET",
    image: PROJECT_PLACEMENT,
  },
  {
    number: "03",
    category: "Frontend · Creative Developer",
    company: "Personal · 2026",
    title: "Interactive 3D Portfolio",
    tagline: "A portfolio that moves — literally, in three dimensions.",
    description: "Designed a cursor-reactive 3D portfolio with glassmorphism UI and optimized WebGL rendering using IntersectionObserver, achieving zero idle GPU overhead.",
    metrics: [
      { value: "Zero", label: "GPU overhead" },
      { value: "3D", label: "Interactive" },
    ],
    tags: ["TypeScript", "Three.js", "WebGL", "CSS3"],
    github: "https://github.com/Divyansh-Kashiv07",
    type: "Open Source",
    image: PROJECT_PORTFOLIO,
  },
  {
    number: "04",
    category: "C++ · Raylib Game",
    company: "Personal · 2025–2026",
    title: "VenomX — Snake Game",
    tagline: "A terminal reborn as a full C++ raylib 5.0 application.",
    description: "Reimplemented a terminal-based C Snake game as a full raylib 5.0 C++ application across 12 modular components (Game, Snake, Food, PowerUp, Obstacle, ScoreManager, AudioManager, ThemeManager) for academic viva.",
    metrics: [
      { value: "12", label: "Modules" },
      { value: "C++", label: "Raylib 5.0" },
    ],
    tags: ["C++", "Raylib", "Game Dev", "Modular"],
    github: "https://github.com/Divyansh-Kashiv07",
    type: "Open Source",
    image: PROJECT_GAME,
  },
];

/* ─── Certifications ─── */
const certifications = [
  { org: "JPMorgan Chase & Co.", title: "Software Engineering Job Simulation", year: "2026" },
  { org: "Walmart Global Tech", title: "Advanced Software Engineering Job Simulation", year: "2026" },
  { org: "Electronic Arts", title: "Software Engineering Job Simulation", year: "2026" },
  { org: "Anthropic", title: "Claude Code in Action", year: "2026" },
  { org: "Anthropic", title: "Claude with the Anthropic API", year: "2026" },
  { org: "Microsoft (Simplilearn)", title: "Prompt Engineering with GitHub Copilot", year: "2025" },
];

const achievements = [
  { title: "Top 1,000 of 3,000+ teams", desc: "Vibe Hacks 2.0 Hackathon, HackWithIndia (2026)" },
  { title: "50+ DSA problems", desc: "Solved on LeetCode in Java" },
  { title: "5 Job Simulations", desc: "JPMorgan, Walmart, EA, Deloitte, Mastercard" },
  { title: "3+ Projects", desc: "Built and deployed independently" },
];

/* ─── Navbar ─── */
function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "glass-strong border-b border-white/5"
        : "bg-transparent"
    }`}>
      <div className="container flex items-center justify-between h-16">
        <a href="#hero" className="flex items-center gap-2.5">
          <img src={LOGO} alt="DK" className="w-8 h-8" />
          <span className="font-display font-bold text-lg text-foreground">Divyansh Kashiv</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-white/5 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  const stats = [
    { target: 2, suffix: "nd", label: "YEAR B.TECH", isText: true },
    { target: 3, suffix: "+", label: "PROJECTS BUILT" },
    { target: 80, suffix: "+", label: "DSA PROBLEMS" },
    { target: 6, suffix: "", label: "CGPA (8.6)", isDecimal: true },
  ];

  return (
    <section id="hero" className="min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass text-primary text-sm font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Java Developer · Android Explorer
            </div>
            {/* Smoky Text Title */}
            <div style={{ minHeight: "1.3em", height: "auto" }}>
              <SmokyText
                text={`DIVYANSH
KASHIV`}
                font={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
                  textAlign: "left",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
                color="whitesmoke"
                intensity={12}
                position="bottomLeft"
                animationMode="singleLine"
                appearTrigger="default"
                appearTransition={{ type: "tween", ease: "easeOut", duration: 2.2, delay: 0.3 }}
                loop={true}
              />
            </div>
            <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-xl">
              <span className="text-primary font-semibold">Android Developer</span> — writing code that actually compiles and ships.
            </p>
            <p className="text-base text-muted-foreground/80 max-w-lg leading-relaxed">
              I build Java and Android apps that solve real problems: banking systems, placement platforms, interactive portfolios, and games. B.Tech IT at NIET, exploring the full stack.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <SpecularButton
                lineColor="#00d4aa"
                baseColor="#00d4aa"
                textColor="#000000"
                tint="#00d4aa"
                tintOpacity={0.15}
                autoAnimate={true}
                intensity={1.2}
                shineSize={12}
                shineFade={50}
                onClick={() => {
                  const el = document.getElementById('projects');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View the experiments →
              </SpecularButton>
              <SpecularButton
                lineColor="#ffffff"
                baseColor="#333333"
                textColor="#f5f5f5"
                autoAnimate={true}
                intensity={0.8}
                size="lg"
                href="/manus-storage/Divyansh_Kashiv_Resume_v2(1)_34c0b987.pdf"
                target="_blank"
              >
                📄 Resume
              </SpecularButton>
              <SpecularButton
                lineColor="#00d4aa"
                baseColor="#222222"
                textColor="#00d4aa"
                autoAnimate={true}
                intensity={0.9}
                size="lg"
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                ✉ Summon me
              </SpecularButton>
            </div>
          </div>

          {/* Right: Phone mockup + floating badges */}
          <div className="flex-1 flex justify-center lg:justify-end relative">
            <div className="relative">
              <img src={HERO_PHONE} alt="Portfolio Dashboard" className="w-64 md:w-72 drop-shadow-[0_20px_60px_rgba(0,212,170,0.15)]" />
              {/* Floating tech badges */}
              <div className="absolute -top-2 -right-6 glass rounded-lg px-3 py-2 text-sm font-mono glow-teal">
                <span className="text-primary font-bold">Ja</span> <span className="text-foreground/70">Java · Primary</span>
              </div>
              <div className="absolute top-[25%] -left-10 glass rounded-lg px-3 py-2 text-sm font-mono">
                <span className="text-emerald font-bold">Sb</span> <span className="text-foreground/70">Spring Boot</span>
              </div>
              <div className="absolute bottom-[30%] -left-8 glass rounded-lg px-3 py-2 text-sm font-mono">
                <span className="text-rose font-bold">An</span> <span className="text-foreground/70">Android · Java</span>
              </div>
              <div className="absolute -bottom-4 -right-4 glass rounded-lg px-3 py-2 text-sm font-mono">
                <span className="text-sky font-bold">Tw</span> <span className="text-foreground/70">Tailwind CSS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row with animated counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-12 md:pt-16">
          {stats.map((stat, i) => (
            <StatCounter key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCounter({ target, suffix, label, isText, isDecimal }: { target: number; suffix: string; label: string; isText?: boolean; isDecimal?: boolean }) {
  const { count, ref } = useCountUp(target);
  const display = isText ? suffix : isDecimal ? `${(count / 10).toFixed(1)}` : `${count}`;

  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="font-display text-3xl md:text-4xl font-bold text-foreground">
        {display}<span className="text-primary text-lg md:text-xl">{suffix}</span>
      </div>
      <div className="text-[10px] md:text-xs text-muted-foreground font-mono uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

/* ─── About Section ─── */
function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container">
        <Reveal>
          <div className="space-y-2 mb-12">
            <p className="font-mono text-sm text-primary uppercase tracking-widest">— 01 — The Builder</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Code in. Working apps out.</h2>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <Reveal>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">B.Tech IT student with a focus on Java backend development and Android.</strong> I've built and shipped projects across banking, placement systems, interactive portfolios, and games — the kind that solve real problems, not just pass assignments.
              </p>
            </Reveal>
            <Reveal>
              <p className="text-muted-foreground leading-relaxed">
                My toolkit is practical by nature: <strong className="text-foreground">Spring Boot, REST APIs, Flask</strong> for backend work, <strong className="text-foreground">HTML/CSS/JavaScript/Tailwind</strong> for frontend, and a growing interest in Android development with Java and Kotlin. DSA and OOP aren't just coursework — they're how I think about every problem.
              </p>
            </Reveal>
            <Reveal>
              <p className="text-muted-foreground leading-relaxed">
                Beyond the code, I've <strong className="text-foreground">completed 5+ industry job simulations</strong> (JPMorgan, Walmart, EA, Deloitte, Mastercard), ranked in the top 1,000 at Vibe Hacks 2.0, and solved 50+ DSA problems on LeetCode. I learn by building — and I build by shipping.
              </p>
            </Reveal>
          </div>

          {/* Info cards */}
          <Reveal>
            <div className="space-y-0">
              {[
                { label: "BASED IN", value: "Greater Noida, UP" },
                { label: "EXPERIENCE", value: "1+ year building" },
                { label: "SPECIALTY", value: "Java · Android" },
                { label: "ARCHITECTURE", value: "OOP · REST · MVC" },
                { label: "EDUCATION", value: "B.Tech IT · NIET" },
                { label: "STATUS", value: "Open to opportunities", highlight: true },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-4 border-b border-white/5">
                  <span className="text-muted-foreground font-mono text-xs tracking-wider">{item.label}</span>
                  <span className={`font-medium text-sm ${item.highlight ? "text-primary" : "text-foreground"}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Skills Section ─── */
function SkillsSection() {
  const badgeColorMap: Record<string, string> = {
    teal: "bg-primary/10 text-primary border-primary/20",
    emerald: "bg-emerald/10 text-emerald border-emerald/20",
    sky: "bg-sky/10 text-sky border-sky/20",
    violet: "bg-violet/10 text-violet border-violet/20",
    amber: "bg-amber/10 text-amber border-amber/20",
    rose: "bg-rose/10 text-rose border-rose/20",
  };
  const dotColorMap: Record<string, string> = {
    teal: "bg-primary",
    emerald: "bg-emerald",
    sky: "bg-sky",
    violet: "bg-violet",
    amber: "bg-amber",
    rose: "bg-rose",
  };

  return (
    <section id="skills" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,170,0.03)_0%,transparent_70%)]" />
      <div className="container relative z-10">
        <Reveal>
          <div className="space-y-2 mb-6">
            <p className="font-mono text-sm text-primary uppercase tracking-widest">— 02 — The Tech Stack</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Elements I work with daily</h2>
          </div>
          <p className="text-muted-foreground mb-10 max-w-2xl">Every craft has its elements. Hover any tile — these are the building blocks I reach for, colour-coded by category.</p>
        </Reveal>

        {/* Skill grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {skillCategories.map((cat) => (
            <Reveal key={cat.name}>
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${dotColorMap[cat.color]}`} />
                  <span className="text-sm font-mono text-muted-foreground">{cat.name}</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.code + cat.name}
                      className={`group relative p-3 rounded-lg glass glass-hover cursor-default ${badgeColorMap[cat.color]?.split(" ").slice(2).join(" ")}`}
                      title={skill.desc}
                    >
                      <div className={`font-display font-bold text-lg ${badgeColorMap[cat.color]?.split(" ")[2]}`}>
                        {skill.code}
                      </div>
                      <div className="text-[10px] text-muted-foreground font-mono truncate">{skill.full}</div>
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-1 rounded font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        {skill.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Also fluent in */}
        <Reveal>
          <div className="space-y-3">
            <p className="font-mono text-sm text-muted-foreground">// also fluent in</p>
            <div className="flex flex-wrap gap-2">
              {otherTools.map((tool) => (
                <span key={tool} className="px-3 py-1.5 rounded-lg glass text-sm font-mono text-muted-foreground hover:border-primary/20 hover:text-primary transition-all">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Projects Section ─── */
function ProjectsSection() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container">
        <Reveal>
          <div className="space-y-2 mb-6">
            <p className="font-mono text-sm text-primary uppercase tracking-widest">— 03 — Field Experiments</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Apps that left the lab</h2>
          </div>
          <p className="text-muted-foreground mb-10 max-w-2xl">Four shipped builds — banking, placement, portfolio, gaming — each with the documentation to prove it worked.</p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Reveal key={project.number}>
              <div className="glass glass-hover rounded-2xl overflow-hidden">
                {/* Window chrome header */}
                <div className="px-4 py-3 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald/60" />
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">1:32</div>
                </div>
                {/* Project image */}
                <div className="px-4 pt-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>
                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-primary uppercase tracking-wider">
                      PROJECT {project.number} · {project.company}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-foreground">{project.title}</h3>
                    <p className="text-sm text-primary/80 italic">{project.tagline}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="text-center p-3 rounded-lg glass">
                        <div className="font-display text-2xl font-bold text-primary">{m.value}</div>
                        <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">{m.label}</div>
                      </div>
                    ))}
                  </div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-md glass text-[11px] font-mono text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* Links */}
                  <div className="flex items-center gap-3 pt-2">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm font-medium text-foreground hover:border-primary/30 transition-all">
                      <Github size={14} /> GitHub
                    </a>
                    <span className="text-xs font-mono text-muted-foreground">
                      🔒 {project.type}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Experience Section ─── */
function ExperienceSection() {
  const timeline = [
    {
      date: "2025 — Present",
      title: "B.Tech in Information Technology",
      company: "Noida Institute of Engineering & Technology (NIET)",
      location: "Greater Noida, UP",
      points: [
        "CGPA: 8.9 (1st Year) — Academic Focus on Software Development",
        "Relevant Coursework: OOP, DSA, DBMS, OS, AI, Computer Architecture",
        "Built 3+ projects independently and deployed on PythonAnywhere",
      ],
    },
    {
      date: "2026",
      title: "Top 1,000 of 3,000+ Teams",
      company: "Vibe Hacks 2.0 — HackWithIndia",
      location: "National Hackathon",
      points: [
        "Competed in a national-level hackathon with a tech solution",
        "Demonstrated teamwork, rapid prototyping, and presentation skills",
      ],
    },
    {
      date: "2026",
      title: "5 Industry Job Simulations Completed",
      company: "JPMorgan · Walmart · EA · Deloitte · Mastercard",
      location: "Online Platforms",
      points: [
        "Software Engineering, Data Analytics & Cybersecurity tracks",
        "Practical experience in enterprise-grade development workflows",
      ],
    },
    {
      date: "2025",
      title: "Senior Secondary (ISC)",
      company: "Christ The King College",
      location: "Jhansi, UP",
      points: [
        "Scored 83% — strong foundation in Mathematics and Computer Science",
        "Started exploring programming with C and Java",
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,170,0.03)_0%,transparent_70%)]" />
      <div className="container relative z-10">
        <Reveal>
          <div className="space-y-2 mb-12">
            <p className="font-mono text-sm text-primary uppercase tracking-widest">— 04 — The Lineage</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">From class to production code</h2>
          </div>
        </Reveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-white/10 to-transparent" />

          <div className="space-y-10">
            {timeline.map((item, i) => (
              <Reveal key={i}>
                <div className="relative pl-14 md:pl-22">
                  {/* Timeline dot */}
                  <div className="absolute left-3 md:left-7 top-1 w-3 h-3 rounded-full bg-primary border-2 border-background shadow-[0_0_10px_rgba(0,212,170,0.4)]" />
                  <div className="space-y-2">
                    <p className="text-sm font-mono text-primary">{item.date}</p>
                    <h3 className="font-display text-xl font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.company} · {item.location}</p>
                    <ul className="space-y-1.5 pt-2">
                      {item.points.map((point, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary mt-0.5">→</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Credentials Section ─── */
function CredentialsSection() {
  return (
    <section id="credentials" className="py-24 md:py-32">
      <div className="container">
        <Reveal>
          <div className="space-y-2 mb-12">
            <p className="font-mono text-sm text-primary uppercase tracking-widest">— 05 — The Credentials</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Papers, proof & pats on the back</h2>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education & Achievements */}
          <div className="space-y-8">
            <Reveal>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Education</h3>
                <div className="glass rounded-xl p-6 space-y-3">
                  <p className="text-sm font-mono text-primary">2025 — 2029</p>
                  <h4 className="font-display font-bold text-foreground">B.Tech, Information Technology</h4>
                  <p className="text-sm text-muted-foreground">Noida Institute of Engineering & Technology (NIET)</p>
                  <p className="text-sm text-muted-foreground">AKTU Lucknow · CGPA: 8.9 (1st Year)</p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Honors & Achievements</h3>
                <div className="space-y-3">
                  {achievements.map((a, i) => (
                    <div key={i} className="glass glass-hover rounded-xl p-4 flex gap-4 items-start">
                      <span className="font-mono text-primary font-bold text-lg w-6">{i + 1}.</span>
                      <div>
                        <p className="font-medium text-foreground text-sm">{a.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Languages */}
            <Reveal>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Languages</h3>
                <div className="flex gap-3">
                  {["Hindi", "English", "French"].map((lang) => (
                    <span key={lang} className="px-4 py-2 rounded-lg glass text-sm font-medium text-foreground">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Certifications */}
          <Reveal>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground mb-4">Certifications</h3>
              <p className="text-sm font-mono text-muted-foreground mb-4">Verified credentials & ongoing study</p>
              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <div key={i} className="glass glass-hover rounded-xl p-4 flex items-start gap-3">
                    <span className="text-primary font-bold text-lg">●</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground text-sm">{cert.title}</p>
                        <span className="text-xs font-mono text-muted-foreground">{cert.year}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{cert.org}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-md glass text-primary font-mono">✓ Verified</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Section ─── */
function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "padhaikaroli2007@gmail.com";
  const [formResult, setFormResult] = useState<"idle" | "sending" | "success" | "error">("idle");

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormResult("sending");
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "1e4479f9-cccd-40fe-8336-d50adf374fa9");
    formData.append("subject", "New message from portfolio — {{name}}");
    formData.append("from_name", (formData.get("name") as string) || "Portfolio Visitor");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setFormResult("success");
        e.currentTarget.reset();
      } else {
        setFormResult("error");
      }
    } catch {
      setFormResult("error");
    }
    setTimeout(() => setFormResult("idle"), 4000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,212,170,0.06)_0%,transparent_60%)]" />
      <div className="container relative z-10">
        <Reveal>
          <div className="space-y-2 mb-6">
            <p className="font-mono text-sm text-primary uppercase tracking-widest">— 06 — Open the Portal</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Let's build something people use every day.</h2>
          </div>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            Got a project idea, an internship opportunity, or just want to talk about Android development? The IDE is open.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact info */}
          <Reveal>
            <div className="space-y-4">
              <a href="tel:+919532897558" className="flex items-center gap-4 p-4 glass glass-hover rounded-xl">
                <span className="text-xl">📱</span>
                <div>
                  <p className="text-xs font-mono text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground hover:text-primary transition-colors">+91 9532897558</p>
                </div>
              </a>
              <button onClick={copyEmail} className="w-full flex items-center gap-4 p-4 glass glass-hover rounded-xl text-left">
                <span className="text-xl">✉️</span>
                <div className="flex-1">
                  <p className="text-xs font-mono text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{email}</p>
                </div>
                {copied ? <Check size={18} className="text-primary" /> : <Copy size={18} className="text-muted-foreground" />}
              </button>
              <div className="flex items-center gap-4 p-4 glass rounded-xl">
                <span className="text-xl">📍</span>
                <div>
                  <p className="text-xs font-mono text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground">Greater Noida, Uttar Pradesh</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <a href="https://github.com/Divyansh-Kashiv07" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 glass rounded-lg font-medium text-foreground hover:border-primary/30 transition-all">
                <Github size={18} /> GitHub
              </a>
              <a href="https://linkedin.com/in/divyansh-kashiv" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 bg-[#0077B5] text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                <Linkedin size={18} /> LinkedIn
              </a>
              <a href="https://leetcode.com/u/DivyanshKashiv07/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 bg-[#FFA116] text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                <span className="font-bold text-sm">LC</span> LeetCode
              </a>
            </div>
          </Reveal>

          {/* Right: Contact form */}
          <Reveal>
            <div className="glass rounded-2xl p-8 space-y-6">
              <h3 className="font-display text-xl font-bold text-foreground">Send a message</h3>
              <form onSubmit={onSubmitForm} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg glass text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-lg glass text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                />
                <textarea
                  name="message"
                  required
                  placeholder="Your message..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg glass text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all resize-none"
                />
                <button
                  type="submit"
                  disabled={formResult === "sending"}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formResult === "sending" ? "Sending..." : "Send Message →"}
                </button>
                {formResult === "success" && (
                  <p className="text-sm text-emerald font-medium flex items-center gap-2">
                    <Check size={16} /> Message sent! I'll get back to you soon.
                  </p>
                )}
                {formResult === "error" && (
                  <p className="text-sm text-rose font-medium">Something went wrong. Please try again or email me directly.</p>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="DK" className="w-7 h-7" />
            <div>
              <p className="font-display font-bold text-foreground text-sm">Divyansh Kashiv</p>
              <p className="text-xs text-muted-foreground">B.Tech IT student at NIET, building real-world solutions.</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a href="#about" className="text-xs text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="#skills" className="text-xs text-muted-foreground hover:text-primary transition-colors">Skills</a>
            <a href="#projects" className="text-xs text-muted-foreground hover:text-primary transition-colors">Projects</a>
            <a href="#contact" className="text-xs text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-2">
            <a href="https://github.com/Divyansh-Kashiv07" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg glass hover:border-primary/30 transition-all">
              <Github size={16} className="text-muted-foreground" />
            </a>
            <a href="https://linkedin.com/in/divyansh-kashiv" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg glass hover:border-primary/30 transition-all">
              <Linkedin size={16} className="text-muted-foreground" />
            </a>
            <a href="mailto:padhaikaroli2007@gmail.com" className="p-2 rounded-lg glass hover:border-primary/30 transition-all">
              <Mail size={16} className="text-muted-foreground" />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 Divyansh Kashiv · Java Developer · Greater Noida, India</p>
          <p className="text-xs text-muted-foreground">Built with React, Tailwind CSS, and zero frameworks — because sometimes simplicity ships faster.</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Scroll To Top ─── */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-24 md:bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-[0_0_20px_rgba(0,212,170,0.3)] hover:opacity-90 transition-all ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}

/* ─── Main Export ─── */
export default function Home() {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      {/* Full-page Gallery Tunnel 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <GalleryTunnel
          background="#030308"
          lineColor="#6b21a8"
          lineOpacity={85}
          colors={["#a855f7", "#c084fc", "#7c3aed", "#e879f9", "#6b21a8"]}
          grid={4}
          speed={80}
          boost={120}
          fade={100}
          label={false}
        />
        {/* Subtle overlay so content remains readable */}
        <div className="absolute inset-0 bg-background/30" />
      </div>
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <CredentialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  );
}
