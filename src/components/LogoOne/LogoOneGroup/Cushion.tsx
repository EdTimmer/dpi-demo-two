import { useRef } from 'react';
import * as THREE from 'three';
import sphereFragmentShader from '../../../shaders/one/fragment_one.glsl?raw'
import sphereVertexShader from '../../../shaders/one/vertex_one.glsl?raw'
import { shaderMaterial } from '@react-three/drei'
import { extend, ReactThreeFiber, useFrame } from '@react-three/fiber';

interface SphereMaterialOneType extends THREE.ShaderMaterial {
  uTime: number;
  uNoise: number;
  uSpeed: number;
  uOscillationFrequency: number;
  ref: React.MutableRefObject<THREE.ShaderMaterial>;
}

const SphereAnimatedMaterialOne = shaderMaterial(
  {
    uTime: 0,
    uNoise: 1.0,
    uSpeed: 0.075,
    uOscillationFrequency: 11.0,
  },
  sphereVertexShader,
  sphereFragmentShader
);

extend({ SphereMaterialOne: SphereAnimatedMaterialOne });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      sphereMaterialOne: ReactThreeFiber.MaterialNode<
      SphereMaterialOneType,
        {
          uTime: number;
          uNoise: number;
          uSpeed: number;
          uOscillationFrequency: number;
        }
      >;
    }
  }
}

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  size: number;
  scale: [number, number, number];
  cushionMaterialProps: {
    noise: number;
    speed: number;
    oscillationFrequency: number;
  }
}

const Cushion = ({ position, rotation, size, scale, cushionMaterialProps }: Props) => {
  const shapeOneRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<SphereMaterialOneType>(null!)

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} scale={scale} renderOrder={1}>
      <sphereGeometry args={[size, 32, 32]} />
      <sphereMaterialOne
        ref={materialRef}
        attach="material"
        uNoise={cushionMaterialProps.noise}
        uSpeed={cushionMaterialProps.speed}
        uOscillationFrequency={cushionMaterialProps.oscillationFrequency}  
      />
    </mesh>
  );
};

export default Cushion;