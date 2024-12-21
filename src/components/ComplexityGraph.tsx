import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { AnimationState } from '../types/Algorithm';
import * as THREE from 'three';

interface ComplexityGraphProps {
  animationState: AnimationState;
  timeData: {
    best: number[];
    average: number[];
    worst: number[];
  };
  inputSizes: number[];
}

function ComplexityLine({ points, color }: { points: number[]; color: string }) {
  const linePoints = points.map((y, i) => 
    new THREE.Vector3(i - points.length/2, y/50, 0)
  );

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
  
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color={color} linewidth={2} />
    </line>
  );
}

function AnimatedComplexityMesh({ timeData, inputSizes }: { 
  timeData: { best: number[]; average: number[]; worst: number[] }; 
  inputSizes: number[];
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group>
      <ComplexityLine points={timeData.best} color="#4ade80" />
      <ComplexityLine points={timeData.average} color="#60a5fa" />
      <ComplexityLine points={timeData.worst} color="#f87171" />
      
      {/* Axis Labels */}
      <Text
        position={[5, 0, 0]}
        fontSize={0.5}
        color="white"
      >
        Input Size (n)
      </Text>
      <Text
        position={[0, 5, 0]}
        fontSize={0.5}
        rotation={[0, 0, Math.PI / 2]}
        color="white"
      >
        Time
      </Text>

      {/* Grid */}
      <gridHelper args={[20, 20, '#304050', '#304050']} />
    </group>
  );
}

export const ComplexityGraph: React.FC<ComplexityGraphProps> = ({ 
  animationState, 
  timeData,
  inputSizes 
}) => {
  return (
    <div className="w-full h-[400px] bg-gray-900 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [5, 5, 10], fov: 60 }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <AnimatedComplexityMesh timeData={timeData} inputSizes={inputSizes} />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
        />
      </Canvas>
    </div>
  );
};