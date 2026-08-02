/*
 * DESIGN: "The Lab Notebook" — clean scientific minimalism
 * Light theme with subtle grid-dot background, teal accents,
 * section numbering, periodic-table skill tiles, phone mockup project cards
 */
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, ArrowUp, Mail, Copy, Check, Github, Linkedin } from "lucide-react";
import { useState } from "react";

// Image URLs from generate_image
const HERO_PHONE = "/manus-storage/hero-phone-mockup_4b09f1de.png";
const PROJECT_BANKING = "/manus-storage/project-card-banking_83edbbc6.png";
const PROJECT_PLACEMENT = "/manus-storage/project-card-placement_2038b0ed.png";
const PROJECT_PORTFOLIO = "/manus-storage/project-card-portfolio_3799409a.png";
const PROJECT_GAME = "/manus-storage/project-card-game_00915f99.png";
const LOGO = "/manus-storage/logo-icon_d11e329f.png";

// Skill data
const skillCategories = [
  { name: "Languages", color: "teal", skills: [
    { code: "Ja", full: "Java", desc: "Primary language" },
    { code: "Py", full: "Python", desc: "Scripting & automation" },
    { code: "Js", full: "JavaScript", desc: "Web development" },
    { code: "C", full: "C", desc: "Systems programming" },
    { code: "Sq", full: "SQL", desc: "Database queries" },
  ]},
  { name: "Backend & Frameworks", color: "emerald", skills: [
    { code: "Sb", full: "Spring Boot", desc: "Java backend framework" },
    { code: "Ra", full: "REST APIs", desc: "API design" },
    { code: "Fl", full: "Flask", desc: "Python web framework" },
    { code: "Kf", full: "Kafka", desc: "Event streaming" },
    { code: "Hb", full: "Hibernate", desc: "ORM framework" },
  ]},
  { name: "Frontend", color: "sky", skills: [
    { code: "H5", full: "HTML5", desc: "Web structure" },
    { code: "C3", full: "CSS3", desc: "Styling & layout" },
    { code: "Js", full: "JavaScript", desc: "Dynamic behavior" },
    { code: "Tw", full: "Tailwind", desc: "Utility-first CSS" },
  ]},
  { name: "Core CS", color: "violet", skills: [
    { code: "Ds", full: "DSA", desc: "Data structures" },
    { code: "Oo", full: "OOP", desc: "Object-oriented design" },
    { code: "Db", full: "DBMS", desc: "Database systems" },
    { code: "Sd", full: "SysDesign", desc: "System design basics" },
  ]},
  { name: "Tools & Platforms", color: "amber", skills: [
    { code: "Gt", full: "Git", desc: "Version control" },
    { code: "Gh", full: "GitHub", desc: "Code hosting" },
    { code: "Vs", full: "VS Code", desc: "IDE" },
    { code: "Ps", full: "Postman", desc: "API testing" },
    { code: "Ma", full: "Maven", desc: "Build automation" },
  ]},
  { name: "Android", color: "rose", skills: [
    { code: "An", full: "Android", desc: "Mobile platform" },
    { code: "Kt", full: "Kotlin", desc: "Android development" },
    { code: "Ja", full: "Java", desc: "Android (legacy)" },
    { code: "Ac", full: "ACM", desc: "Problem solving" },
  ]},
];

const otherTools = [
  "Java/Kotlin", "PythonAnywhere", "H2/SQL", "Prompt Engineering",
  "VS Code", "Android Studio", "Postman", "PythonAnywhere", "GitHub Copilot"
];

// Project data
const projects = [
  {
    number: "01",
    category: "Academic Capstone",
    company: "NIET",
    title: "SecureBank",
    tagline: "Banking for students — including the ones who just started coding.",
    description: "A cooperative banking management system built from scratch using Java and OOP principles. Implements the Object-Oriented Techniques using Java course (Problem Statement #269, SDG 8), backed by a 31-page examination guide and full GitHub documentation.",
    metrics: [
      { value: "31", label: "Page documentation" },
      { value: "Full", label: "OOP Implementation" },
    ],
    tags: ["Java", "OOP", "Academic", "Banking"],
    github: "https://github.com/Divyansh-Kashiv07",
    type: "Academic",
  },
  {
    number: "02",
    category: "Full-Stack",
    company: "Academic Project",
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
  },
  {
    number: "03",
    category: "Frontend | Creative",
    company: "Personal Project",
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
  },
  {
    number: "04",
    category: "C++ | Raylib Game",
    company: "Personal Project",
    title: "VenomX — Snake Game",
    tagline: "A terminal reborn as a C++ raylib 5.0 application.",
    description: "Reimplemented a terminal-based C Snake game as a full raylib 5.0 C++ application across 12 modular components (Game, Snake, Food, PowerUp, Obstacle, ScoreManager, AudioManager, ThemeManager, Presentation for academic viva.",
    metrics: [
      { value: "12", label: "Modules" },
      { value: "C++", label: "Raylib 5.0" },
    ],
    tags: ["C++", "Raylib", "Game Dev", "Modular"],
    github: "https://github.com/Divyansh-Kashiv07",
    type: "Open Source",
  },
];

// Certifications
const certifications = [
  { org: "JPMorgan Chase & Co.", title: "Software Engineering Job Simulation", year: "2026", verified: true },
  { org: "Walmart Global Tech", title: "Advanced Software Engineering Job Simulation", year: "2026", verified: true },
  { org: "Electronic Arts", title: "Software Engineering Job Simulation", year: "2026", verified: true },
  { org: "Anthropic", title: "Claude Code in Action", year: "2026", verified: true },
  { org: "Anthropic", title: "Claude with the Anthropic API", year: "2026", verified: true },
  { org: "Microsoft (Simplilearn)", title: "Prompt Engineering with GitHub Copilot", year: "2025", verified: true },
];

const achievements = [
  { title: "Top 1,000 of 3,000+ teams", desc: "Vibe Hacks 2.0 Hackathon, HackWithIndia (2026)" },
  { title: "50+ DSA problems", desc: "Solved on LeetCode in Java" },
  { title: "5 Job Simulations", desc: "JPMorgan, Walmart, EA, Deloitte, Mastercard" },
  { title: "3+ Projects", desc: "Built and deployed independently" },
];

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="#hero" className="flex items-center gap-2 font-display font-bold text-lg text-foreground">
          <img src={LOGO} alt="DK" className="w-8 h-8" />
          <span>Divyansh Kashiv</span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</a>
          <a href="#skills" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Skills</a>
          <a href="#projects" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Projects</a>
          <a href="#experience" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Experience</a>
          <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="hero" className="pt-24 pb-16 bg-grid-pattern">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-12 min-h-[80vh]">
          {/* Left content */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Java Developer · Android Explorer
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight text-foreground">
              DIVYANSH<br />KASHIV
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-body">
              <span className="text-primary font-semibold">Android Developer</span> — writing code that actually compiles and ships.
            </p>
            <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
              I build Java and Android apps that solve real problems: banking systems, placement platforms, interactive portfolios, and games. B.Tech IT at NIET, exploring the full stack.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                View the experiments
                <span>→</span>
              </a>
              <a href="/manus-storage/Divyansh_Kashiv_Resume_v2.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-secondary transition-colors">
                <span>📄</span> Resume
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-secondary transition-colors">
                <span>✉</span> Summon me
              </a>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-4 gap-6 pt-6">
              <div>
                <div className="font-display text-3xl font-bold text-foreground">1st</div>
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Year B.Tech</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-foreground">3+</div>
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Projects Built</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-foreground">50+</div>
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">DSA Problems</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-foreground">8.9</div>
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">CGPA</div>
              </div>
            </div>
          </div>
          {/* Right: Phone mockup */}
          <div className="flex-1 flex justify-center lg:justify-end relative">
            <div className="relative">
              <img src={HERO_PHONE} alt="Portfolio Dashboard" className="w-72 md:w-80 drop-shadow-2xl" />
              {/* Floating tech badges */}
              <div className="absolute -top-4 -right-4 bg-card border border-border rounded-lg px-3 py-2 shadow-lg text-sm font-mono">
                <span className="text-primary">Ja</span> Java · Primary
              </div>
              <div className="absolute top-1/4 -left-8 bg-card border border-border rounded-lg px-3 py-2 shadow-lg text-sm font-mono">
                <span className="text-emerald">Sb</span> Spring Boot
              </div>
              <div className="absolute bottom-1/4 -left-6 bg-card border border-border rounded-lg px-3 py-2 shadow-lg text-sm font-mono">
                <span className="text-rose">An</span> Android · Java
              </div>
              <div className="absolute -bottom-2 -right-2 bg-card border border-border rounded-lg px-3 py-2 shadow-lg text-sm font-mono">
                <span className="text-sky">Tw</span> Tailwind CSS
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="container">
        <div className="space-y-2 mb-12">
          <p className="font-mono text-sm text-primary uppercase tracking-widest">— 01 — The Builder</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Code in. Working apps out.</h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6 text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">B.Tech IT student with a focus on Java backend development and Android.</strong> I've built and shipped projects across banking, placement systems, interactive portfolios, and games — the kind that solve real problems, not just pass assignments.
            </p>
            <p>
              My toolkit is practical by nature: <strong className="text-foreground">Spring Boot, REST APIs, Flask</strong> for backend work, <strong className="text-foreground">HTML/CSS/JavaScript/Tailwind</strong> for frontend, and a growing interest in Android development with Java and Kotlin. DSA and OOP aren't just coursework — they're how I think about every problem.
            </p>
            <p>
              Beyond the code, I've <strong className="text-foreground">completed 5+ industry job simulations</strong> (JPMorgan, Walmart, EA, Deloitte, Mastercard), ranked in the top 1,000 at Vibe Hacks 2.0, and solved 50+ DSA problems on LeetCode. I learn by building — and I build by shipping.
            </p>
          </div>
          {/* Info cards */}
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground font-mono text-sm">BASED IN</span>
              <span className="font-medium text-foreground">Greater Noida, UP</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground font-mono text-sm">EXPERIENCE</span>
              <span className="font-medium text-foreground">1+ year building</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground font-mono text-sm">SPECIALTY</span>
              <span className="font-medium text-foreground">Java · Android</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground font-mono text-sm">ARCHITECTURE</span>
              <span className="font-medium text-foreground">OOP · REST · MVC</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground font-mono text-sm">EDUCATION</span>
              <span className="font-medium text-foreground">B.Tech IT · NIET</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground font-mono text-sm">STATUS</span>
              <span className="font-medium text-primary">Open to opportunities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const colorMap: Record<string, string> = {
    teal: "text-teal border-teal/20 bg-teal/5",
    emerald: "text-emerald border-emerald/20 bg-emerald/5",
    sky: "text-sky border-sky/20 bg-sky/5",
    violet: "text-violet border-violet/20 bg-violet/5",
    amber: "text-amber border-amber/20 bg-amber/5",
    rose: "text-rose border-rose/20 bg-rose/5",
  };
  const badgeColorMap: Record<string, string> = {
    teal: "bg-teal/10 text-teal",
    emerald: "bg-emerald/10 text-emerald",
    sky: "bg-sky/10 text-sky",
    violet: "bg-violet/10 text-violet",
    amber: "bg-amber/10 text-amber",
    rose: "bg-rose/10 text-rose",
  };

  return (
    <section id="skills" className="py-24 bg-secondary/30">
      <div className="container">
        <div className="space-y-2 mb-6">
          <p className="font-mono text-sm text-primary uppercase tracking-widest">— 02 — The Tech Stack</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Elements I work with daily</h2>
        </div>
        <p className="text-muted-foreground mb-10 max-w-2xl">Every craft has its elements. Hover any tile — these are the building blocks I reach for, colour-coded by category.</p>

        {/* Skill grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          {skillCategories.map((cat) => (
            <div key={cat.name} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${badgeColorMap[cat.color]?.split(" ")[0]}`} />
                <span className="text-sm font-mono text-muted-foreground">{cat.name}</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.code}
                    className={`group relative p-3 rounded-lg border transition-all hover:scale-105 hover:shadow-md cursor-default ${colorMap[cat.color]?.split(" ").slice(1).join(" ")}`}
                    title={skill.desc}
                  >
                    <div className={`font-display font-bold text-lg ${colorMap[cat.color]?.split(" ")[0]}`}>
                      {skill.code}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono truncate">{skill.full}</div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      {skill.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Also fluent in */}
        <div className="space-y-3">
          <p className="font-mono text-sm text-muted-foreground">// also fluent in</p>
          <div className="flex flex-wrap gap-2">
            {otherTools.map((tool) => (
              <span key={tool} className="px-3 py-1.5 rounded-full border border-border text-sm font-mono text-muted-foreground bg-card hover:border-primary/30 transition-colors">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="py-24">
      <div className="container">
        <div className="space-y-2 mb-6">
          <p className="font-mono text-sm text-primary uppercase tracking-widest">— 03 — Field Experiments</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Apps that left the lab</h2>
        </div>
        <p className="text-muted-foreground mb-10 max-w-2xl">Four shipped builds — banking, placement, portfolio, gaming — each with the documentation to prove it worked.</p>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.number} className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Phone mockup header */}
              <div className="bg-secondary/30 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose/60" />
                  <div className="w-3 h-3 rounded-full bg-amber/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald/60" />
                </div>
                <div className="text-xs font-mono text-muted-foreground">1:32</div>
              </div>
              {/* Project image */}
              <div className="px-4 pt-4">
                <img
                  src={project.number === "01" ? PROJECT_BANKING : project.number === "02" ? PROJECT_PLACEMENT : project.number === "03" ? PROJECT_PORTFOLIO : PROJECT_GAME}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-xl"
                />
              </div>
              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    PROJECT {project.number} · {project.company}
                  </p>
                  <h3 className="font-display text-2xl font-bold text-foreground">{project.title}</h3>
                  <p className="text-sm text-primary italic">{project.tagline}</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  {project.metrics.map((m, i) => (
                    <div key={i} className="text-center p-3 rounded-lg bg-secondary/30 border border-border">
                      <div className="font-display text-2xl font-bold text-primary">{m.value}</div>
                      <div className="text-xs text-muted-foreground font-mono uppercase">{m.label}</div>
                    </div>
                  ))}
                </div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-secondary text-xs font-mono text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Links */}
                <div className="flex items-center gap-3 pt-2">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                    <Github size={14} /> GitHub
                  </a>
                  <span className="text-xs font-mono text-muted-foreground">
                    🔒 {project.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    <section id="experience" className="py-24 bg-secondary/30">
      <div className="container">
        <div className="space-y-2 mb-12">
          <p className="font-mono text-sm text-primary uppercase tracking-widest">— 04 — The Lineage</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">From class to production code</h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-10">
            {timeline.map((item, i) => (
              <div key={i} className="relative pl-12 md:pl-20">
                {/* Timeline dot */}
                <div className="absolute left-3 md:left-7 top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                <div className="space-y-2">
                  <p className="text-sm font-mono text-primary">{item.date}</p>
                  <h3 className="font-display text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.company} · {item.location}</p>
                  <ul className="space-y-1.5 pt-2">
                    {item.points.map((point, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-primary mt-1">→</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CredentialsSection() {
  return (
    <section id="credentials" className="py-24">
      <div className="container">
        <div className="space-y-2 mb-12">
          <p className="font-mono text-sm text-primary uppercase tracking-widest">— 05 — The Credentials</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Papers, proof & pats on the back</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-lg font-bold text-foreground mb-4">Education</h3>
              <div className="bg-card border border-border rounded-xl p-6 space-y-3">
                <p className="text-sm font-mono text-primary">2025 — 2029</p>
                <h4 className="font-display font-bold text-foreground">B.Tech, Information Technology</h4>
                <p className="text-sm text-muted-foreground">Noida Institute of Engineering & Technology (NIET)</p>
                <p className="text-sm text-muted-foreground">AKTU Lucknow · CGPA: 8.9 (1st Year)</p>
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold text-foreground mb-4">Honors & Achievements</h3>
              <div className="space-y-3">
                {achievements.map((a, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-4 flex gap-3">
                    <span className="text-primary font-mono text-lg font-bold">{i + 1}.</span>
                    <div>
                      <p className="font-medium text-foreground text-sm">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3 className="font-display text-lg font-bold text-foreground mb-4">Languages</h3>
              <div className="flex gap-3">
                {["Hindi", "English", "French"].map((lang) => (
                  <span key={lang} className="px-4 py-2 rounded-full bg-secondary border border-border text-sm font-medium text-foreground">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="font-display text-lg font-bold text-foreground mb-4">Certifications</h3>
            <p className="text-sm font-mono text-muted-foreground mb-4">Verified credentials & ongoing study</p>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4 flex items-start gap-3 hover:border-primary/30 transition-colors">
                  <span className="text-primary font-mono font-bold text-lg">●</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground text-sm">{cert.title}</p>
                      <span className="text-xs font-mono text-muted-foreground">{cert.year}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{cert.org}</p>
                  </div>
                  {cert.verified && (
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald/10 text-emerald font-mono">✓ Verified</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "padhaikaroli2007@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-grid-pattern">
      <div className="container">
        <div className="space-y-2 mb-12">
          <p className="font-mono text-sm text-primary uppercase tracking-widest">— 06 — Open the Portal</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Let's build something people use every day.</h2>
        </div>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          Got a project idea, an internship opportunity, or just want to talk about Android development? The IDE is open.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <a href="tel:+919532897558" className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors group">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="text-xs font-mono text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">+91 9532897558</p>
                </div>
              </a>
              <button onClick={copyEmail} className="w-full flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors group text-left">
                <span className="text-2xl">✉️</span>
                <div className="flex-1">
                  <p className="text-xs font-mono text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">{email}</p>
                </div>
                {copied ? <Check size={18} className="text-emerald" /> : <Copy size={18} className="text-muted-foreground" />}
              </button>
              <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-xs font-mono text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground">Greater Noida, Uttar Pradesh</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <a href="https://github.com/Divyansh-Kashiv07" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-opacity">
                <Github size={18} /> GitHub
              </a>
              <a href="https://linkedin.com/in/divyansh-kashiv" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-[#0077B5] text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                <Linkedin size={18} /> LinkedIn
              </a>
              <a href="https://leetcode.com/u/DivyanshKashiv07/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-[#FFA116] text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                <span className="font-bold text-sm">LC</span> LeetCode
              </a>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
            <h3 className="font-display text-xl font-bold text-foreground">Send a message</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
              <input
                type="email"
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
              <textarea
                placeholder="Your message..."
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
              />
              <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                Send Message →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="DK" className="w-8 h-8" />
            <div>
              <p className="font-display font-bold text-foreground">Divyansh Kashiv</p>
              <p className="text-xs text-muted-foreground">B.Tech IT student at NIET, building real-world solutions.</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#skills" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Skills</a>
            <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Projects</a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://github.com/Divyansh-Kashiv07" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <Github size={18} className="text-muted-foreground" />
            </a>
            <a href="https://linkedin.com/in/divyansh-kashiv" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <Linkedin size={18} className="text-muted-foreground" />
            </a>
            <a href="mailto:padhaikaroli2007@gmail.com" className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <Mail size={18} className="text-muted-foreground" />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 Divyansh Kashiv · Java Developer · Greater Noida, India</p>
          <p className="text-xs text-muted-foreground">Built with React, Tailwind CSS, and zero frameworks — because sometimes simplicity ships faster.</p>
        </div>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-all ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}

function MobileNav() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-t border-border px-2 py-2 flex items-center justify-around pb-safe">
      <a href="#about" className="flex flex-col items-center gap-0.5 p-1.5">
        <span className="text-[10px] font-medium">About</span>
      </a>
      <a href="#skills" className="flex flex-col items-center gap-0.5 p-1.5">
        <span className="text-[10px] font-medium">Skills</span>
      </a>
      <a href="#projects" className="flex flex-col items-center gap-0.5 p-1.5">
        <span className="text-[10px] font-medium">Projects</span>
      </a>
      <a href="#experience" className="flex flex-col items-center gap-0.5 p-1.5">
        <span className="text-[10px] font-medium">Experience</span>
      </a>
      <a href="#contact" className="flex flex-col items-center gap-0.5 p-1.5">
        <span className="text-[10px] font-medium">Contact</span>
      </a>
      <button onClick={toggleTheme} className="p-1.5">
        {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
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
      <ScrollToTop />
      <MobileNav />
    </div>
  );
}
