import { Canvas, useFrame } from '@react-three/fiber';
import HeroText from '../components/HeroText';
import { ComputerDesk } from '../components/ComputerDesk';
import { Float, OrbitControls } from '@react-three/drei';
import { useMediaQuery } from 'react-responsive';
import { easing } from 'maath';
import { Suspense } from 'react';
import Loader from '../components/Loader';
import ParallaxBackground from '../components/parallaxBackground';

const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 640 });
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const isTablet = useMediaQuery({ minWidth: 854, maxWidth: 1150 });

  const scale = isSmall ? 0.18 : isMobile ? 0.22 : isTablet ? 0.3 : 0.38;
  const position = isSmall
    ? [0, -1.3, 0]
    : isMobile
    ? [0, -1.2, 0]
    : isTablet
    ? [0.95, -0.7, 0]
    : [1.35, -0.65, 0];
  const rotation = isMobile
    ? [0, -Math.PI / 2 + 0.15, 0]
    : [0, -Math.PI / 2 + 0.28, 0];

  return (
    <section className="relative flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
      <HeroText />
      <ParallaxBackground />
      <figure className="absolute inset-0 w-full h-full">
        <Canvas camera={{ position: [0, 1, 3], fov: 60 }}>
          <Suspense fallback={<Loader />}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.35}>
              <ComputerDesk
                scale={scale}
                position={position}
                rotation={rotation}
              />
              <OrbitControls
                enableZoom={false}
                maxPolarAngle={Math.PI / 2 + 0.1}
                minPolarAngle={Math.PI / 6}
                maxAzimuthAngle={Math.PI / 2.5}
                minAzimuthAngle={-Math.PI / 2.5}
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-midnight/70 border border-white/10 backdrop-blur-md text-xs text-neutral-400 shadow-lg">
        <span className="inline-block size-1.5 rounded-full bg-lavender animate-pulse" />
        <span>Drag to rotate 3D desk</span>
      </div>
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 12, 1 + state.mouse.y / 14, 3],
      0.5,
      delta,
    );
  });
}

export default Hero;

