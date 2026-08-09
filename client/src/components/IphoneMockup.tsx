/**
 * iPhone Mockup Component — Animated Dashboard Screen
 * - Clean iPhone-style mockup (rounded corners, notch, thin bezel)
 * - Screen shows "Divyansh Kashiv" with typing animation
 * - Animated bar chart / algorithm visualization
 * - Stats pills (projects, DSA, CGPA, apps)
 * - Floating tech badges around the phone
 * - Mouse-reactive subtle parallax tilt
 * - Dark theme matching the site's glassmorphic aesthetic
 */

import { useState, useEffect, useRef, useCallback } from 'react';

/* ─── Stats data ─── */
const STATS = [
  { label: '50K MAU', icon: '👥', color: '#00d4aa' },
  { label: '8.6 CGPA', icon: '📊', color: '#8b5cf6' },
  { label: '60 FPS', icon: '⚡', color: '#00d4aa' },
  { label: '80+ DSA', icon: '🧠', color: '#8b5cf6' },
];

const BAR_HEIGHTS = [35, 55, 45, 70, 60, 80, 50, 65, 75, 40, 58, 72];

/* ─── Typing animation for the name ─── */
function useTypingAnimation(text: string, speed: number = 80) {
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isPaused) return;

    if (!isDeleting && displayed === text) {
      // Pause at full text then start deleting
      timeout = setTimeout(() => setIsPaused(true), 2000);
      return;
    }

    if (isPaused && displayed === text) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 500);
      return;
    }

    if (isDeleting && displayed === '') {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setIsPaused(false);
      }, 800);
      return;
    }

    timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayed(text.substring(0, displayed.length - 1));
      } else {
        setDisplayed(text.substring(0, displayed.length + 1));
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, isPaused, text, speed]);

  return displayed;
}

/* ─── Animated Bar Chart ─── */
function BarChart() {
  const [heights, setHeights] = useState(BAR_HEIGHTS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setHeights(prev => prev.map(h => {
        const variation = Math.random() * 20 - 10;
        return Math.max(20, Math.min(90, h + variation));
      }));
    }, 1500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="flex items-end gap-[3px] h-16 px-2">
      {heights.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm transition-all duration-1000 ease-in-out"
          style={{
            height: `${h}%`,
            background: i % 2 === 0
              ? 'linear-gradient(to top, #8b5cf6, #a78bfa)'
              : 'linear-gradient(to top, #00d4aa, #34d399)',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Floating Tech Badge ─── */
function TechBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`absolute glass rounded-full px-3 py-1.5 text-xs font-mono border border-purple-500/20 backdrop-blur-md ${className}`}>
      {children}
    </div>
  );
}

/* ─── Main iPhone Mockup Component ─── */
export default function IphoneMockup() {
  const nameText = useTypingAnimation('Divyansh Kashiv', 90);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = ((e.clientX - centerX) / rect.width) * 8; // max 8 degrees
    const y = -((e.clientY - centerY) / rect.height) * 8;
    setMousePos({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center py-8">
      {/* Phone mockup */}
      <div
        className="relative w-[240px] md:w-[280px] transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
        }}
      >
        {/* iPhone frame */}
        <div className="relative rounded-[2rem] p-[6px] bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 shadow-2xl shadow-purple-500/20">
          {/* Inner bezel */}
          <div className="rounded-[1.7rem] bg-black p-[3px]">
            {/* Screen */}
            <div className="relative rounded-[1.5rem] bg-gradient-to-b from-[#0a0a1a] via-[#0d1117] to-[#0a0a1a] overflow-hidden w-[228px] md:w-[266px] h-[460px] md:h-[520px]">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-10" />

              {/* Status bar */}
              <div className="flex justify-between items-center px-6 pt-2 text-[10px] text-white/60 font-mono">
                <span>9:41</span>
                <div className="flex gap-1 items-center">
                  <span>●●●</span>
                  <span>WiFi</span>
                  <span>🔋</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col items-center px-4 pt-6 gap-4">
                {/* Typing name */}
                <div className="text-center">
                  <p className="text-white/50 text-[9px] font-mono tracking-widest uppercase mb-1">
                    portfolio.live
                  </p>
                  <h3 className="text-white font-bold text-lg md:text-xl tracking-tight min-h-[1.5em]">
                    {nameText}
                    <span className="animate-pulse text-purple-400">|</span>
                  </h3>
                </div>

                {/* Bar chart */}
                <div className="w-full glass rounded-xl p-3 border border-purple-500/10">
                  <p className="text-[9px] text-white/40 font-mono mb-2 uppercase tracking-wide">Algorithm Performance</p>
                  <BarChart />
                  <div className="flex justify-between mt-1 text-[8px] text-white/30 font-mono">
                    <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span>
                  </div>
                </div>

                {/* Stats pills */}
                <div className="w-full grid grid-cols-2 gap-2">
                  {STATS.map((stat, i) => (
                    <div
                      key={i}
                      className="glass rounded-lg px-3 py-2 flex items-center gap-2 border border-white/5"
                      style={{ animationDelay: `${i * 150}ms` }}
                    >
                      <span className="text-sm">{stat.icon}</span>
                      <span className="text-white/90 text-[11px] font-mono font-semibold">{stat.label}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom label */}
                <p className="text-white/30 text-[9px] font-mono mt-1">
                  java · android · spring boot
                </p>
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating tech badges */}
      <TechBadge className="top-4 right-0 md:-right-8">
        <span className="text-purple-400 font-bold mr-1">☕</span>
        <span className="text-white/70">Java · Primary</span>
      </TechBadge>
      <TechBadge className="top-[30%] -left-4 md:-left-16">
        <span className="text-emerald-400 font-bold mr-1">🌿</span>
        <span className="text-white/70">Spring Boot</span>
      </TechBadge>
      <TechBadge className="bottom-[35%] -left-2 md:-left-12">
        <span className="text-rose-400 font-bold mr-1">🤖</span>
        <span className="text-white/70">Android SDK</span>
      </TechBadge>
      <TechBadge className="-bottom-2 right-2 md:-right-6">
        <span className="text-sky-400 font-bold mr-1">⚛</span>
        <span className="text-white/70">React Native</span>
      </TechBadge>
      <TechBadge className="bottom-[15%] -right-2 md:-right-14">
        <span className="text-amber-400 font-bold mr-1">🐍</span>
        <span className="text-white/70">Python</span>
      </TechBadge>
    </div>
  );
}
