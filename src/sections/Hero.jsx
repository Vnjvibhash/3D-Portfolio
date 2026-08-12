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
  const defaultY = isSmall ? -2.20 : isMobile ? -2.10 : isTablet ? -1.90 : -1.80;
  const defaultX = isMobile ? 0 : isTablet ? 1.80 : 2.55;
  const defaultZ = isMobile ? 0.25 : 0.35; // Moved forward toward the camera
  const rotation = isMobile
    ? [0, -Math.PI * 0.68, 0]
    : [0, -Math.PI * 0.72, 0];

  const minX = isMobile ? -1.8 : 0.0;
  const maxX = isMobile ? 1.8 : 3.6;
  const minY = isMobile ? -2.6 : -2.4;
  const maxY = isMobile ? 0.6 : 0.8;

  const [currentX, setCurrentX] = useState(defaultX);
  const [currentY, setCurrentY] = useState(defaultY);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setCurrentX(defaultX);
    setCurrentY(defaultY);
  }, [defaultX, defaultY]);

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
              z={defaultZ}
              rotation={rotation}
              currentX={currentX}
              setCurrentX={setCurrentX}
              currentY={currentY}
              setCurrentY={setCurrentY}
              minX={minX}
              maxX={maxX}
              minY={minY}
              maxY={maxY}
              isDragging={isDragging}
              setIsDragging={setIsDragging}
            />
            <ContactShadows
              position={[currentX, currentY - (isMobile ? 0.45 : 0.65), defaultZ]}
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
        <span>Click &amp; drag 3D desk freely • Drag background to rotate</span>
      </div>
    </section>
  );
};

function ModelContainer({
  scale,
  z,
  rotation,
  currentX,
  setCurrentX,
  currentY,
  setCurrentY,
  minX,
  maxX,
  minY,
  maxY,
  isDragging,
  setIsDragging,
}) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const dragStartRef = useRef({ pointerX: 0, pointerY: 0, startX: 0, startY: 0 });

  useCursor(hovered, isDragging ? 'grabbing' : 'grab', 'auto');

  const onPointerDown = (e) => {
    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStartRef.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      startX: currentX,
      startY: currentY,
    };
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    e.stopPropagation();
    const factor = 4.8 / window.innerWidth;
    const deltaX = (e.clientX - dragStartRef.current.pointerX) * factor;
    const deltaY = -(e.clientY - dragStartRef.current.pointerY) * factor;

    const newX = dragStartRef.current.startX + deltaX;
    const newY = dragStartRef.current.startY + deltaY;

    setCurrentX(Math.max(minX, Math.min(maxX, newX)));
    setCurrentY(Math.max(minY, Math.min(maxY, newY)));
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
      easing.damp(groupRef.current.position, 'y', currentY, 0.1, delta);
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
      position={[currentX, currentY, z]}
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



