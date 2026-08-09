/**
 * Interactive 3D Phone Component
 * - Procedural low-poly phone model (rounded rect body, bezel, screen plane)
 * - Glassmorphic material on phone frame
 * - Mouse-reactive parallax rotation (max ~15 degrees, smooth damping)
 * - Screen content carousel cycling through project screenshots
 * - Dot indicators synced to transitions
 * - Ambient glow/shadow beneath phone
 * - Hover proximity scale-up and glow increase
 * - Click to cycle manually
 * - Performance: lazy-loaded, WebGL detection, reduced-motion support
 */

import { useRef, useMemo, useState, useEffect, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Project screenshot URLs ─── */
const SCREEN_IMAGES = [
  '/manus-storage/dark-hero-phone_41840e3b.png',
  '/manus-storage/dark-project-banking_93d15a3d.png',
  '/manus-storage/dark-project-game_4e1105cd.png',
  '/manus-storage/dark-project-portfolio_02b0d223.png',
];

const TRANSITION_INTERVAL = 3500;
const MAX_TILT = 0.25; // ~14 degrees

/* ─── Screen Carousel Component ─── */
function ScreenCarousel({ screenTexture }: { screenTexture: THREE.Texture }) {
  return (
    <mesh position={[0, 0, 0.065]}>
      <planeGeometry args={[0.84, 1.78]} />
      <meshBasicMaterial map={screenTexture} toneMapped={false} />
    </mesh>
  );
}

/* ─── Phone Model ─── */
function PhoneModel({ mousePos, isHovered, screenTexture, onScreenClick }: {
  mousePos: { x: number; y: number };
  isHovered: boolean;
  screenTexture: THREE.Texture;
  onScreenClick: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const currentRotation = useRef({ x: -0.1, y: 0.3 });
  const targetRotation = useRef({ x: -0.1, y: 0.3 });
  const glowIntensity = useRef(0.3);

  useFrame(() => {
    if (!groupRef.current) return;

    // Calculate target rotation based on mouse position
    targetRotation.current.x = -0.1 + mousePos.y * MAX_TILT;
    targetRotation.current.y = 0.3 + mousePos.x * MAX_TILT;

    // Smooth damping (lerp)
    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05;
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05;

    groupRef.current.rotation.x = currentRotation.current.x;
    groupRef.current.rotation.y = currentRotation.current.y;

    // Glow intensity based on hover
    const targetGlow = isHovered ? 0.6 : 0.3;
    glowIntensity.current += (targetGlow - glowIntensity.current) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Phone body - rounded rectangle */}
      <RoundedBox args={[1, 2.05, 0.12]} radius={0.08} smoothness={4} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#1a1a2e"
          metalness={0.3}
          roughness={0.2}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          envMapIntensity={1.2}
          transmission={0.05}
          transparent
          opacity={0.95}
        />
      </RoundedBox>

      {/* Screen bezel (slightly larger, dark) */}
      <RoundedBox args={[0.94, 1.94, 0.02]} radius={0.06} smoothness={4} position={[0, 0, 0.055]}>
        <meshPhysicalMaterial
          color="#0a0a1a"
          metalness={0.8}
          roughness={0.1}
        />
      </RoundedBox>

      {/* Screen content */}
      <group onClick={onScreenClick} onPointerOver={() => { document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = 'auto'; }}>
        <ScreenCarousel screenTexture={screenTexture} />
      </group>

      {/* Camera notch */}
      <mesh position={[0, 0.82, 0.065]}>
        <circleGeometry args={[0.035, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Ambient glow beneath phone */}
      <pointLight
        position={[0, -1.2, 0.3]}
        intensity={isHovered ? 3 : 1.5}
        color="#8b5cf6"
        distance={3}
      />

      {/* Subtle glow plane beneath */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]}>
        <circleGeometry args={[0.8, 32]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={glowIntensity.current} />
      </mesh>
    </group>
  );
}

/* ─── Main Interactive Phone ─── */
function InteractivePhoneInner({ images }: { images: string[] }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [screenIndex, setScreenIndex] = useState(0);
  const [textures, setTextures] = useState<THREE.Texture[]>([]);
  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);

  // Load textures using TextureLoader with onComplete callback
  useEffect(() => {
    let loaded: THREE.Texture[] = [];
    let loadedCount = 0;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    
    images.forEach((url) => {
      // Preload with Image to check if fetchable
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // Use CanvasTexture from the loaded image for guaranteed compatibility
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        tex.colorSpace = THREE.SRGBColorSpace;
        loaded.push(tex);
        loadedCount++;
        if (loadedCount === images.length) {
          setTextures([...loaded]);
        }
      };
      img.onerror = () => {
        // Fallback placeholder
        const canvas = document.createElement('canvas');
        canvas.width = 360;
        canvas.height = 760;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, 360, 760);
        ctx.fillStyle = '#8b5cf6';
        ctx.font = 'bold 28px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('DIVYANSH', 180, 350);
        ctx.fillText('KASHIV', 180, 390);
        ctx.fillText('DEV', 180, 430);
        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        loaded.push(tex);
        loadedCount++;
        if (loadedCount === images.length) {
          setTextures([...loaded]);
        }
      };
      img.src = url;
    });
    
    return () => {
      loaded.forEach((t) => t.dispose());
    };
  }, [images]);

  // Auto-cycle screens
  useEffect(() => {
    const interval = setInterval(() => {
      setScreenIndex((prev) => (prev + 1) % images.length);
    }, TRANSITION_INTERVAL);
    return () => clearInterval(interval);
  }, [images.length]);

  // Mouse tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMousePos({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const cycleScreen = useCallback(() => {
    setScreenIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  if (textures.length === 0) {
    return <div className="w-full h-full flex items-center justify-center">
      <div className="text-primary font-mono text-sm animate-pulse">Loading...</div>
    </div>;
  }

  return (
    <div
      className="w-full h-full"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 2, 3]} intensity={0.8} color="#ffffff" />
        <directionalLight position={[-2, 1, 2]} intensity={0.3} color="#8b5cf6" />
        <pointLight position={[0, -2, 2]} intensity={0.5} color="#a855f7" />
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
            <PhoneModel
              mousePos={mousePos}
              isHovered={isHovered}
              screenTexture={textures[screenIndex]}
              onScreenClick={cycleScreen}
            />
          </Float>
        </Suspense>
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}

/* ─── WebGL Detection & Fallback ─── */
function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ─── Exported Component with lazy loading ─── */
export default function Interactive3DPhone() {
  const [isVisible, setIsVisible] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fallbackImage] = useState(SCREEN_IMAGES[0]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Performance detection
  useEffect(() => {
    if (!hasWebGL() || (isMobile() && prefersReducedMotion())) {
      setUseFallback(true);
    }
  }, []);

  if (!isVisible) {
    return <div ref={containerRef} className="w-full h-[500px]" />;
  }

  if (useFallback) {
    // Static fallback with CSS parallax tilt
    return (
      <div ref={containerRef} className="w-full h-[500px] flex items-center justify-center">
        <div className="relative group">
          <img
            src={fallbackImage}
            alt="App Preview"
            className="w-[280px] md:w-[320px] rounded-2xl shadow-2xl shadow-purple-500/20 transition-transform duration-300 group-hover:scale-[1.02]"
            style={{
              animation: 'float 6s ease-in-out infinite',
            }}
          />
          {/* Glow beneath */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-8 bg-purple-500/30 blur-xl rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-[500px] md:h-[550px]">
      <InteractivePhoneInner images={SCREEN_IMAGES} />
    </div>
  );
}
