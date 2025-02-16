import { useMemo, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
// import sphereFragmentShader from '../../../shaders/fragment.glsl?raw'
import sphereFragmentShader from '../../../shaders/two/fragment_two.glsl?raw'
import sphereVertexShader from '../../../shaders/two/vertex_two.glsl?raw'
import { shaderMaterial } from '@react-three/drei'
import { extend, ReactThreeFiber, useFrame } from '@react-three/fiber';

const SphereAnimatedMaterialTwo = shaderMaterial(
  {
    uTime: 0,
  },
  sphereVertexShader,
  sphereFragmentShader
)

extend({ SphereMaterialThree: SphereAnimatedMaterialTwo });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      sphereMaterialThree: ReactThreeFiber.Object3DNode<THREE.ShaderMaterial, typeof SphereAnimatedMaterialTwo>;
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
  const materialThreeRef = useRef<THREE.ShaderMaterial>(null!)

  useFrame(({ clock }) => {
    if (materialThreeRef.current) {
      materialThreeRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} scale={scale} renderOrder={1}>
      <sphereGeometry args={[size, 32, 32]} />
      <sphereMaterialThree ref={materialThreeRef} attach="material" />
    </mesh>
  );
};

export default Cushion;