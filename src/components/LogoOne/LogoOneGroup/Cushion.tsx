import { useMemo, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import sphereFragmentShader from '../../../shaders/one/fragment_one.glsl?raw'
// import sphereFragmentShader from '../../../shaders/fragment_two.glsl?raw'
import sphereVertexShader from '../../../shaders/one/vertex_one.glsl?raw'
import { shaderMaterial } from '@react-three/drei'
import { extend, ReactThreeFiber, useFrame } from '@react-three/fiber';

const SphereAnimatedMaterialOne = shaderMaterial(
  {
    uTime: 0,
  },
  sphereVertexShader,
  sphereFragmentShader
)

extend({ SphereMaterialOne: SphereAnimatedMaterialOne });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      sphereMaterialOne: ReactThreeFiber.Object3DNode<THREE.ShaderMaterial, typeof SphereAnimatedMaterialOne>;
    }
  }
}


interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  size: number;
  scale: [number, number, number];
  cushionMaterialProps: {
    color: string;
    metalness: number;
    roughness: number;
    opacity: number;
    envMapIntensity: number;
    emissive: string;
    emissiveIntensity: number;
    envMapImages: string[];
    envMapImage: string;
  },
}

const Cushion = ({ position, rotation, size, scale, cushionMaterialProps }: Props) => {
  const shapeOneRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null!)

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} scale={scale} renderOrder={1}>
      <sphereGeometry args={[size, 32, 32]} />
      <sphereMaterialOne ref={materialRef} attach="material" />
    </mesh>
  );
};

export default Cushion;