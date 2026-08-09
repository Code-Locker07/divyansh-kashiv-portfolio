/**
 * iPhone Mockup Component — Realistic Display with Animated Screen
 * - Realistic iPhone frame with side buttons, proper notch
 * - Real-time clock in status bar
 * - Cool glitch/scale name reveal effect for "Divyansh Kashiv"
 * - Animated bar chart, stats pills, floating tech badges
 * - Mouse-reactive parallax tilt
 * - Slightly smaller size
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

/* ─── Real-time clock ─── */
function useRealTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

/* ─── Cool name reveal with glitch + fade effect ─── */
function NameReveal() {
  const [phase, setPhase] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const cycle = () => {
      // Phase 0: Glitch in
      setGlitchActive(true);
      setPhase(1);

      setTimeout(() => {
        // Phase 1: Stable display
        setGlitchActive(false);
        setPhase(2);
      }, 600);

      setTimeout(() => {
        // Phase 2: Glitch out
        setGlitchActive(true);
        setPhase(3);
      }, 3000);

      setTimeout(() => {
        // Phase 3: Brief blank
        setPhase(0);
      }, 3500);
    };

    cycle();
    const interval = setInterval(cycle, 3500);
    return () => clearInterval(interval);
  }, []);

  const name = 'Divyansh Kashiv';

  if (phase === 0) return null;

  return (
    <div className="relative min-h-[1.5em] flex items-center justify-center">
      <h3
        className="font-bold text-lg md:text-xl tracking-tight text-white"
        style={{
          animation: glitchActive ? 'glitchText 0.3s ease-in-out' : undefined,
          textShadow: glitchActive
            ? '2px 0 #ff00ff, -2px 0 #00ffff'
            : '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.2)',
          filter: glitchActive ? 'blur(0.5px)' : 'none',
          transition: 'all 0.15s ease',
        }}
      >
        {name}
      </h3>
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }}
      />
    </div>
  );
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
    <div className="flex items-end gap-[3px] h-14 px-2">
      {heights.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm transition-all duration-1000 ease-in-out"
          style={{
            height: `${h}%`,
            background: i % 2 === 0
              ? 'linear-gradient(to top, #8b5cf6, #a78bfa)'
              : 'linear-gradient(to top, #00d4aa, #34d399)',
            boxShadow: `0 0 8px ${i % 2 === 0 ? 'rgba(139,92,246,0.4)' : 'rgba(0,212,170,0.4)'}`,
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
  const currentTime = useRealTime();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = ((e.clientX - centerX) / rect.width) * 6;
    const y = -((e.clientY - centerY) / rect.height) * 6;
    setMousePos({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center py-6">
      {/* Phone mockup */}
      <div
        className="relative transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
        }}
      >
        {/* Side buttons */}
        <div className="absolute -left-[3px] top-[20%] w-[3px] h-8 bg-gray-700 rounded-l-sm" />
        <div className="absolute -left-[3px] top-[35%] w-[3px] h-12 bg-gray-700 rounded-l-sm" />
        <div className="absolute -left-[3px] top-[52%] w-[3px] h-12 bg-gray-700 rounded-l-sm" />
        <div className="absolute -right-[3px] top-[30%] w-[3px] h-16 bg-gray-700 rounded-r-sm" />

        {/* iPhone frame */}
        <div className="relative rounded-[1.5rem] p-[4px] bg-gradient-to-b from-gray-600 via-gray-800 to-gray-900 shadow-2xl shadow-purple-500/20">
          {/* Inner bezel */}
          <div className="rounded-[1.3rem] bg-black p-[2px]">
            {/* Screen */}
            <div className="relative rounded-[1.1rem] bg-gradient-to-b from-[#0a0a1a] via-[#0d1117] to-[#0a0a1a] overflow-hidden w-[200px] md:w-[230px] h-[400px] md:h-[460px]">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-lg z-10 flex items-center justify-center gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-800 border border-gray-700" />
                <div className="w-3 h-3 rounded-full bg-gray-900 border border-gray-800" />
              </div>

              {/* Status bar */}
              <div className="flex justify-between items-center px-5 pt-1.5 text-[9px] text-white/60 font-mono">
                <span className="font-medium">{currentTime}</span>
                <div className="flex gap-1.5 items-center">
                  <span className="text-[8px]">●●●</span>
                  <span className="text-[8px]">WiFi</span>
                  <span className="text-[8px]">🔋</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col items-center px-3 pt-4 gap-3">
                {/* Typing name with glitch effect */}
                <div className="text-center">
                  <p className="text-white/40 text-[8px] font-mono tracking-[0.2em] uppercase mb-1">
                    portfolio.live
                  </p>
                  <NameReveal />
                </div>

                {/* Bar chart */}
                <div className="w-full glass rounded-lg p-2.5 border border-purple-500/10">
                  <p className="text-[8px] text-white/40 font-mono mb-1.5 uppercase tracking-wide">Algorithm Performance</p>
                  <BarChart />
                  <div className="flex justify-between mt-1 text-[7px] text-white/30 font-mono">
                    <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span>
                  </div>
                </div>

                {/* Stats pills */}
                <div className="w-full grid grid-cols-2 gap-1.5">
                  {STATS.map((stat, i) => (
                    <div
                      key={i}
                      className="glass rounded-md px-2.5 py-1.5 flex items-center gap-1.5 border border-white/5"
                    >
                      <span className="text-[11px]">{stat.icon}</span>
                      <span className="text-white/90 text-[10px] font-mono font-semibold">{stat.label}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom label */}
                <p className="text-white/30 text-[8px] font-mono mt-0.5">
                  java · android · spring boot
                </p>
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating tech badges */}
      <TechBadge className="top-2 right-0 md:-right-6">
        <span className="text-purple-400 font-bold mr-1">☕</span>
        <span className="text-white/70">Java</span>
      </TechBadge>
      <TechBadge className="top-[28%] -left-2 md:-left-14">
        <span className="text-emerald-400 font-bold mr-1">🌿</span>
        <span className="text-white/70">Spring Boot</span>
      </TechBadge>
      <TechBadge className="bottom-[32%] -left-1 md:-left-10">
        <span className="text-rose-400 font-bold mr-1">🤖</span>
        <span className="text-white/70">Android</span>
      </TechBadge>
      <TechBadge className="-bottom-1 right-1 md:-right-4">
        <span className="text-sky-400 font-bold mr-1">⚛</span>
        <span className="text-white/70">React</span>
      </TechBadge>
      <TechBadge className="bottom-[12%] -right-1 md:-right-12">
        <span className="text-amber-400 font-bold mr-1">🐍</span>
        <span className="text-white/70">Python</span>
      </TechBadge>
    </div>
  );
}
