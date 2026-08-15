<div align="center">

# 🚀 Divyansh Kashiv — Mobile Developer Portfolio

### A High-Performance, AI-Powered Interactive Portfolio Website

**[Live Demo](https://divyportfoli-fq9hwpw7.manus.space)** · **Built with React 19 + Three.js + tRPC + Tailwind CSS**

![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19.1-blue?logo=react&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.185-black?logo=three.js&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css&logoColor=white)
![tRPC](https://img.shields.io/badge/tRPC-11.6-tomato?logo=trpc&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1-purple?logo=vite&logoColor=white)
![MIT](https://img.shields.io/badge/License-MIT-green)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [AI Chat Assistant](#ai-chat-assistant)
- [Contact Form Integration](#contact-form-integration)
- [Performance Optimizations](#performance-optimizations)
- [Deployment](#deployment)
- [License](#license)

---

## 🌟 Overview

This is a **modern, interactive developer portfolio** built for Divyansh Kashiv — a 2nd-year B.Tech IT student at NIET, specializing in Android/Java development. The portfolio showcases his skills, projects, experience, and academic achievements through an immersive 3D experience.

The site features a **dark glassmorphic design** with a 3D Gallery Tunnel background, an interactive iPhone mockup with real-time stats, smooth scroll-reveal animations, and an **AI-powered chat assistant** that can answer questions about Divyansh's skills and projects.

### Why This Project Stands Out

| Aspect | Detail |
|--------|--------|
| **3D Graphics** | Three.js-powered gallery tunnel with parallax depth effect |
| **AI Integration** | Full-stack AI chat assistant using Manus LLM API |
| **Real-time Data** | Live clock, animated counters, and dynamic stat displays |
| **Responsive** | Mobile-first design with touch-friendly interactions |
| **Performance** | Lazy-loaded 3D scenes, WebGL fallback for low-end devices |
| **Accessibility** | Respects `prefers-reduced-motion`, keyboard navigation |

---

## ✨ Key Features

### 1. 🎮 Interactive 3D Gallery Tunnel Background
- Full-page Three.js scene with a **recursive gallery tunnel** effect
- Purple/violet color palette with soft ambient lighting
- Responsive to scroll position for parallax depth
- WebGL fallback for devices without GPU support

### 2. 📱 Interactive iPhone Mockup
- **Real-time clock** synced to visitor's local time
- Animated name reveal with glitch/typing effect
- Live algorithm performance bar chart
- Stat pills showing key metrics (50K+ MAU, 8.6 CGPA, 60 FPS, 80+ DSA)
- Floating tech badges (Java, Spring Boot, Python, React)

### 3. 🤖 AI Chat Assistant
- Powered by **Manus LLM API** via tRPC backend
- Context-aware responses about Divyansh's skills and projects
- Smooth open/close animations
- Mobile-responsive chat panel

### 4. 📧 Working Contact Form
- Integrated with **Web3Forms** for direct email delivery
- Real-time validation and success/error states
- Sends visitor name, email, and message directly to inbox

### 5. 🎨 Dark Glassmorphic Design
- Frosted glass cards with `backdrop-blur`
- Consistent purple/teal accent color scheme
- Smooth scroll-reveal animations (Framer Motion)
- Animated stat counters on scroll

### 6. 📊 Professional Sections
- **Hero** — Name, tagline, stats, CTA buttons
- **About** — Professional summary and achievements
- **Skills** — Categorized tech stack with proficiency levels
- **Projects** — Featured apps with live/demo links
- **Experience** — Work history and job simulations
- **Credentials** — Education, certifications, hackathons
- **Contact** — Form + social links

---

## 🛠 Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Frontend Framework** | React | 19.1 |
| **Language** | TypeScript | 5.9.3 |
| **Build Tool** | Vite | 7.1 |
| **Styling** | Tailwind CSS | 4.1 |
| **3D Graphics** | Three.js + R3F + Drei | 0.185 / 9.7 / 10.7 |
| **Animations** | Framer Motion | 12.23 |
| **Routing** | Wouter | 3.3 |
| **State Management** | TanStack React Query | 5.90 |
| **API Layer** | tRPC | 11.6 |
| **Backend** | Express.js | 4.x |
| **Database** | MySQL + Drizzle ORM | — |
| **File Storage** | AWS S3 | — |
| **Forms** | Web3Forms | — |
| **Testing** | Vitest | — |
| **UI Components** | shadcn/ui | — |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (React 19 + Vite)                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Pages: Home (Hero, About, Skills, Projects, etc.)     │  │
│  │  Components: AIChatWidget, GalleryTunnel3D, iPhone     │  │
│  │  tRPC Client → @tanstack/react-query                   │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                     tRPC over HTTP (/api/trpc)
                              │
┌─────────────────────────────────────────────────────────────┐
│                   SERVER (Express + tRPC)                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Routers: AI Chat (LLM), Auth (OAuth), System          │  │
│  │  Database: Drizzle ORM → MySQL                          │  │
│  │  Storage: S3 helpers for file uploads                   │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📸 Screenshots

### Desktop — Full Page

![Full Page Desktop View](https://divyportfoli-fq9hwpw7.manus.space/manus-storage/portfolio-full-page_af7b7813.png)

### Mobile — Hero Section

![Mobile Hero View](https://divyportfoli-fq9hwpw7.manus.space/manus-storage/portfolio-mobile_ee38e814.png)

### Key Sections

| Section | Description |
|---------|-------------|
| **Hero** | 3D tunnel background, iPhone mockup, animated stats |
| **Skills** | Categorized tech tiles with proficiency indicators |
| **Projects** | 4 featured apps with tech stack and links |
| **Experience** | Timeline with Forvia job simulations |
| **Credentials** | Education, hackathons, certifications |
| **Contact** | Web3Forms integration, social links |

---

## 📁 Project Structure

```
divyansh-mobile-portfolio/
├── client/
│   ├── public/          # Static assets (favicon, robots.txt)
│   └── src/
│       ├── components/  # Reusable UI (shadcn + custom)
│       │   ├── AIChatWidget.tsx      ← AI chat assistant
│       │   └── ui/                   ← shadcn components
│       ├── pages/
│       │   └── Home.tsx              ← Main portfolio page
│       ├── hooks/       # Custom React hooks
│       ├── contexts/    # Theme, Auth contexts
│       └── lib/         # tRPC client, utils
├── server/
│   ├── routers.ts       ← tRPC procedures (AI, auth)
│   ├── db.ts            ← Database queries
│   └── _core/           ← Framework internals
├── drizzle/             ← Database schema & migrations
├── shared/              ← Shared types & constants
├── package.json         ← Dependencies & scripts
├── tsconfig.json        ← TypeScript config
├── vite.config.ts       ← Vite build config
└── vitest.config.ts     ← Test config
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Code-Locker07/divyansh-kashiv-portfolio.git
cd divyansh-kashiv-portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production |
| `pnpm test` | Run vitest test suite |
| `pnpm check` | Type check with TypeScript |
| `pnpm format` | Format code with Prettier |

---

## 🤖 AI Chat Assistant

The portfolio includes a fully functional **AI chat assistant** built with the Manus LLM API. The assistant:

- Answers questions about Divyansh's technical skills
- Provides project summaries and details
- Responds to career-related inquiries
- Maintains conversation context

### How It Works

```
User Message → React Chat Widget → tRPC Client → 
  → tRPC Server Procedure → Manus LLM API → 
  → Response → Displayed in Chat Panel
```

The AI is configured with a **system prompt** containing Divyansh's profile information, making it a personalized assistant for visitors.

---

## 📧 Contact Form Integration

The contact form uses **Web3Forms** to deliver messages directly to Divyansh's email.

### Configuration

| Setting | Value |
|---------|-------|
| **Service** | Web3Forms |
| **Endpoint** | `https://api.web3forms.com/submit` |
| **Delivery** | Direct to registered Gmail inbox |
| **Fields** | Name, Email, Message |

### How to Configure Your Own Key

1. Sign up at [web3forms.com](https://web3forms.com)
2. Get your access key from the dashboard
3. Replace the `access_key` in `client/src/pages/Home.tsx`

---

## ⚡ Performance Optimizations

### 3D Scene Optimization

| Technique | Benefit |
|-----------|---------|
| **Lazy Loading** | Three.js scene only loads when hero is visible |
| **WebGL Detection** | Falls back to CSS animation on unsupported devices |
| **Geometry Reuse** | Shared materials and instanced rendering |
| **Frustum Culling** | Only renders visible objects |

### Bundle Optimization

- Code splitting via Vite's dynamic imports
- Tree-shaking removes unused code
- Compressed textures for project screenshots
- Font subsetting for faster loading

### Animation Performance

- Only animates `transform` and `opacity` (GPU-accelerated)
- Uses `requestAnimationFrame` for smooth 60fps
- Respects `prefers-reduced-motion` for accessibility
- Debounced scroll listeners

---

## 🌐 Deployment

### Production URL

**https://divyportfoli-fq9hwpw7.manus.space**

### Hosting Platform

Deployed on **Manus Hosting** (Autoscale/Serverless) with:
- Automatic SSL certificate
- Global CDN
- Serverless scaling (spins down when inactive)
- Custom domain support

---

## 👨‍💻 About the Developer

**Divyansh Kashiv** is a 2nd-year B.Tech Information Technology student at **NIET (Noida Institute of Engineering and Technology)**. He specializes in:

- **Android Development** — Java, Kotlin, Jetpack Compose
- **Backend Development** — Spring Boot, MySQL, REST APIs
- **Frontend Development** — React, TypeScript, Three.js
- **Data Structures & Algorithms** — 80+ problems solved on LeetCode
- **Industry Simulations** — JPMorgan, Walmart, EA, Deloitte, Mastercard

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**⭐ If you found this project helpful, consider giving it a star!**

Built with ❤️ by Divyansh Kashiv

</div>
