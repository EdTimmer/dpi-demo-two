import { useMemo, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import sphereFragmentShader from '../../../shaders/fragment.glsl?raw'
// import sphereFragmentShader from '../../../shaders/fragment_two.glsl?raw'
import sphereVertexShader from '../../../shaders/vertex.glsl?raw'
import { shaderMaterial } from '@react-three/drei'
import { extend, ReactThreeFiber, useFrame } from '@react-three/fiber';

const SphereAnimatedMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  sphereVertexShader,
  sphereFragmentShader
)

extend({ SphereMaterial: SphereAnimatedMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      sphereMaterial: ReactThreeFiber.Object3DNode<THREE.ShaderMaterial, typeof SphereAnimatedMaterial>;
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

  const texture = useTexture(cushionMaterialProps.envMapImage);

  const envMap = useMemo(() => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.needsUpdate = true;
    return texture;
  }, [texture]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} scale={scale} renderOrder={1}>
      <sphereGeometry args={[size, 32, 32]} />
      <sphereMaterial ref={materialRef} attach="material" />
    </mesh>
  );
};

export default Cushion;