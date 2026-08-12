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
  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
    <section className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
      <HeroText />
      <ParallaxBackground />
      <figure className="absolute inset-0 w-full h-full">
        <Canvas camera={{ position: [0, 1, 3] }}>
          <Suspense fallback={<Loader />}>
            <Float>
              <ComputerDesk
                scale={isMobile ? 0.23 : 0.4}
                position={isMobile ? [0, -1.5, 0] : [3, -2, -1]}
              />
              <OrbitControls enableZoom={false} />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-midnight/70 border border-white/10 backdrop-blur-md text-xs text-neutral-400">
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
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta,
    );
  });
}

export default Hero;
