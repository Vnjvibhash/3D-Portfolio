import { Canvas, useFrame } from '@react-three/fiber';
import HeroText from '../components/HeroText';
import { ComputerDesk } from '../components/ComputerDesk';
import { Float, OrbitControls, ContactShadows, useCursor } from '@react-three/drei';
import { useMediaQuery } from 'react-responsive';
import { useState, useRef, useEffect, Suspense } from 'react';
import { easing } from 'maath';
import Loader from '../components/Loader';
import ParallaxBackground from '../components/parallaxBackground';

const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 640 });
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const isTablet = useMediaQuery({ minWidth: 854, maxWidth: 1150 });

  const scale = isSmall ? 0.09 : isMobile ? 0.115 : isTablet ? 0.15 : 0.20;
  const defaultY = isSmall ? -1.05 : isMobile ? -0.95 : isTablet ? -0.55 : -0.45;
  const defaultX = isMobile ? 0 : isTablet ? 2.50 : 3.45;
  const defaultZ = isMobile ? -0.4 : -0.6; // Moved backward in 3D depth
  const rotation = isMobile
    ? [0, -Math.PI * 0.68, 0]
    : [0, -Math.PI * 0.72, 0];

  const minX = isMobile ? -1.5 : 0.2;
  const maxX = isMobile ? 1.5 : 4.2;

  const [currentX, setCurrentX] = useState(defaultX);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setCurrentX(defaultX);
  }, [defaultX]);

  return (
    <section className="relative w-full min-h-screen flex items-start justify-center overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-start justify-start">
        <HeroText />
      </div>
      <ParallaxBackground />
      <figure className="absolute inset-0 w-full h-full">
        <Canvas camera={{ position: [0, 1, 3], fov: 60 }}>
          <Suspense fallback={<Loader />}>
            <OrbitControls
              enabled={!isDragging}
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 2 + 0.05}
              minPolarAngle={Math.PI / 6}
              maxAzimuthAngle={Math.PI / 2.5}
              minAzimuthAngle={-Math.PI / 2.5}
            />
            <ModelContainer
              scale={scale}
              y={defaultY}
              z={defaultZ}
              rotation={rotation}
              currentX={currentX}
              setCurrentX={setCurrentX}
              minX={minX}
              maxX={maxX}
              isDragging={isDragging}
              setIsDragging={setIsDragging}
            />
            <ContactShadows
              position={[currentX, defaultY - (isMobile ? 0.45 : 0.65), defaultZ]}
              opacity={0.38}
              scale={5.5}
              blur={2.5}
              far={3.5}
              color="#5c33cc"
            />
          </Suspense>
        </Canvas>
      </figure>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-midnight/80 border border-white/15 backdrop-blur-md text-xs text-neutral-300 shadow-xl">
        <span className="inline-block size-2 rounded-full bg-lavender animate-pulse" />
        <span>Click &amp; drag 3D desk on X-axis • Drag background to rotate</span>
      </div>
    </section>
  );
};

function ModelContainer({
  scale,
  y,
  z,
  rotation,
  currentX,
  setCurrentX,
  minX,
  maxX,
  isDragging,
  setIsDragging,
}) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const dragStartRef = useRef({ pointerX: 0, startX: 0 });

  useCursor(hovered, isDragging ? 'grabbing' : 'grab', 'auto');

  const onPointerDown = (e) => {
    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStartRef.current = {
      pointerX: e.clientX,
      startX: currentX,
    };
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    e.stopPropagation();
    const deltaPx = e.clientX - dragStartRef.current.pointerX;
    const factor = 4.8 / window.innerWidth;
    const newX = dragStartRef.current.startX + deltaPx * factor;
    const clampedX = Math.max(minX, Math.min(maxX, newX));
    setCurrentX(clampedX);
  };

  const onPointerUp = (e) => {
    if (isDragging) {
      e.stopPropagation();
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch {}
      setIsDragging(false);
    }
  };

  useFrame((state, delta) => {
    if (groupRef.current) {
      easing.damp(groupRef.current.position, 'x', currentX, 0.1, delta);
      groupRef.current.position.y = y;
      groupRef.current.position.z = z;

      if (!isDragging) {
        groupRef.current.rotation.y = (state.mouse.x * Math.PI) / 24;
        groupRef.current.rotation.x = (-state.mouse.y * Math.PI) / 32;
      }
    }
  });

  return (
    <group
      ref={groupRef}
      position={[currentX, y, z]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => {
        setHovered(false);
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <Float
        speed={isDragging ? 0 : 1.5}
        rotationIntensity={isDragging ? 0 : 0.15}
        floatIntensity={isDragging ? 0 : 0.3}
      >
        <ComputerDesk
          scale={scale}
          position={[0, 0, 0]}
          rotation={rotation}
        />
      </Float>
    </group>
  );
}

export default Hero;



