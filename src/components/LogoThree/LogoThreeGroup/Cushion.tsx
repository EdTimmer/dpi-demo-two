import { useRef } from 'react';
import * as THREE from 'three';
import sphereFragmentShader from '../../../shaders/two/fragment_two.glsl?raw'
import sphereVertexShader from '../../../shaders/two/vertex_two.glsl?raw'
import { shaderMaterial } from '@react-three/drei'
import { extend, ReactThreeFiber, useFrame } from '@react-three/fiber';

interface SphereMaterialTwoType extends THREE.ShaderMaterial {
  uNoiseSwirlSteps: number,
  uNoiseSwirlValue: number,
  uNoiseScale: number,
  uNoiseTimeScale: number,
  uOpacity: number,
  ref: React.MutableRefObject<THREE.ShaderMaterial>;
}

const SphereAnimatedMaterialTwo = shaderMaterial(
  {
    uTime: 0,
    uNoiseSwirlSteps: 2,
    uNoiseSwirlValue: 1.0,
    uNoiseScale: 1.0,
    uNoiseTimeScale: 0.05,
    uOpacity: 0.3,
  },
  sphereVertexShader,
  sphereFragmentShader
)

extend({ SphereMaterialThree: SphereAnimatedMaterialTwo });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      sphereMaterialThree: ReactThreeFiber.MaterialNode<
      SphereMaterialTwoType,
        {
          uTime: number;
          uNoiseSwirlSteps: number,
          uNoiseSwirlValue: number,
          uNoiseScale: number,
          uNoiseTimeScale: number,
          uOpacity: number,
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
    noiseSwirlSteps: number,
    noiseSwirlValue: number,
    noiseScale: number,
    noiseTimeScale: number,
    opacity: number,
  }
}

const Cushion = ({ position, rotation, size, scale, cushionMaterialProps }: Props) => {
  const shapeOneRef = useRef<THREE.Mesh>(null);
  const materialThreeRef = useRef<SphereMaterialTwoType>(null!)

  useFrame(({ clock }) => {
    if (materialThreeRef.current) {
      materialThreeRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} scale={scale} renderOrder={1}>
      <sphereGeometry args={[size, 32, 32]} />
      <sphereMaterialThree
        ref={materialThreeRef}
        attach="material"
        uNoiseSwirlSteps={cushionMaterialProps.noiseSwirlSteps}
        uNoiseSwirlValue={cushionMaterialProps.noiseSwirlValue}
        uNoiseScale={cushionMaterialProps.noiseScale}
        uNoiseTimeScale={cushionMaterialProps.noiseTimeScale}
        uOpacity={cushionMaterialProps.opacity}
      />
    </mesh>
  );
};

export default Cushion;