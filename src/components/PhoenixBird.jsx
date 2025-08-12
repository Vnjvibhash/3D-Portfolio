import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function PhoenixBird(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/models/phoenix_bird.glb');
  const { actions } = useAnimations(animations, group);

  // Play animation on load
  React.useEffect(() => {
    if (animations.length > 0) {
      actions[animations[0].name]?.play();
    }
  }, [actions, animations]);

  useFrame((state) => {
    if (group.current) {
      group.current.position.y =
        -0.5 + Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      rotation={[0, -Math.PI / 2, 1]}
      scale={0.008}
      position={props.position || [1, -1.5, 1]}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={5} castShadow />
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          position={[-0.625, 0, -17.137]}
          rotation={[-Math.PI / 2, 0, 0.053]}
        >
          <group
            name="5f59736c86d4457fa045aec4aea6b7e0fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.MatI_Ride_FengHuang_01a}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <skinnedMesh
                    name="Object_8"
                    geometry={nodes.Object_8.geometry}
                    material={materials.MatI_Ride_FengHuang_01b}
                    skeleton={nodes.Object_8.skeleton}
                  />
                  <group name="Object_6" rotation={[-Math.PI / 2, 0, 0]} />
                  <group
                    name="AMesh_Ride_FengHuang_01"
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/phoenix_bird.glb');
