import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import * as THREE from 'three';
import { GUI } from 'lil-gui';
import Cushion from './Cushion';
import DeloitteDigitalLogoGroup from './DeloitteDigitalLogoGroup';

interface Props {
  isMouseEntered: boolean;
  isMouseLeft: boolean;
  initialRotation: number;
  rotationAmount: number;
}

function LogoFiveGroup({ isMouseEntered, isMouseLeft, initialRotation, rotationAmount }: Props) {
  const LogoFiveGroupRef = useRef<Group>(null);

  // Set the initial rotation on mount only
  useEffect(() => {
    if (LogoFiveGroupRef.current) {
      LogoFiveGroupRef.current.rotation.y = initialRotation;
    }
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // The small 'breathing' rotation in X:
    if (LogoFiveGroupRef.current) {
      LogoFiveGroupRef.current.rotation.x = Math.sin(time * 0.5) * 0.12;
    }
  
    // Then the Y rotation on mouse enter/leave, scaled by delta:
    if (
      isMouseEntered &&
      LogoFiveGroupRef.current &&
      LogoFiveGroupRef.current.rotation.y <= initialRotation + rotationAmount
    ) {
      LogoFiveGroupRef.current.rotation.y += 3 * delta;
    } else if (
      isMouseLeft &&
      LogoFiveGroupRef.current &&
      LogoFiveGroupRef.current.rotation.y >= initialRotation
    ) {
      LogoFiveGroupRef.current.rotation.y -= 3 * delta;
    }
  });

  // TEXT BOLD GUI REFS
  const textBoldFolderRef = useRef<GUI | null>(null);
  const textBoldControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [textBoldMaterialProps, setTextBoldMaterialProps] = useState({
    color: '#000',
    metalness: 1.0,
    roughness: 0,
    opacity: 1.0,
  });

  // TEXT LIGHT GUI REFS
  const textLightFolderRef = useRef<GUI | null>(null);
  const textLightControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [textLightMaterialProps, setTextLightMaterialProps] = useState({
    color: '#000',
    metalness: 1.0,
    roughness: 0,
    opacity: 1.0,
  });

  // SPHERE GUI REFS
  const sphereFolderRef = useRef<GUI | null>(null);
  const sphereControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [sphereMaterialProps, setSphereMaterialProps] = useState({
    color: '#4dff29',
    metalness: 0,
    roughness: 1,
    opacity: 1.0,
  });

  // CUSHION GUI REFS
  const cushionFolderRef = useRef<GUI | null>(null);
  const cushionControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [cushionMaterialProps, setCushionMaterialProps] = useState({
    color: '#fff',
    opacity: 1.0,
    roughness: 0,     
    metalness: 1.0,
    envMapIntensity: 1.0,
    emissive: '#fff',
    emissiveIntensity: 0.3,
  });

  useEffect(() => {
    const guiFive = new GUI({
      width: 350,
      title: 'BOTTOM LEFT PIN'
    });
    // Position the GUI
    guiFive.domElement.style.position = 'absolute';
    guiFive.domElement.style.left = '10px';
    guiFive.domElement.style.top = '1550px';

    // TEXT BOLD FOLDER
    const textBoldFolder = guiFive.addFolder('Text Bold');
    textBoldFolderRef.current = textBoldFolder;

    const localTextBoldProps = {
      color: textBoldMaterialProps.color,
      metalness: textBoldMaterialProps.metalness,
      roughness: textBoldMaterialProps.roughness,
      opacity: textBoldMaterialProps.opacity,
    }

    // add controls for each property
    textBoldControllersRef.current.colorController = textBoldFolder
      .addColor(localTextBoldProps, 'color')
      .name('Color')
      .onChange((color: string) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, color }));
      });

    textBoldControllersRef.current.metalnessController = textBoldFolder
      .add(localTextBoldProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((metalness: number) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, metalness }));
      });

    textBoldControllersRef.current.roughnessController = textBoldFolder
      .add(localTextBoldProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((roughness: number) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, roughness }));
      });

    textBoldControllersRef.current.opacityController = textBoldFolder
      .add(localTextBoldProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((opacity: number) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, opacity }));
      });

    // TEXT LIGHT FOLDER
    const textLightFolder = guiFive.addFolder('Text Light');
    textLightFolderRef.current = textLightFolder;

    const localTextLightProps = {
      color: textLightMaterialProps.color,
      metalness: textLightMaterialProps.metalness,
      roughness: textLightMaterialProps.roughness,
      opacity: textLightMaterialProps.opacity,
    }

    // add controls for each property
    textLightControllersRef.current.colorController = textLightFolder
      .addColor(localTextLightProps, 'color')
      .name('Color')
      .onChange((color: string) => {
        setTextLightMaterialProps((prev) => ({ ...prev, color }));
      });

    textLightControllersRef.current.metalnessController = textLightFolder
      .add(localTextLightProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((metalness: number) => {
        setTextLightMaterialProps((prev) => ({ ...prev, metalness }));
      });

    textLightControllersRef.current.roughnessController = textLightFolder
      .add(localTextLightProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((roughness: number) => {
        setTextLightMaterialProps((prev) => ({ ...prev, roughness }));
      });

    textLightControllersRef.current.opacityController = textLightFolder
      .add(localTextLightProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((opacity: number) => {
        setTextLightMaterialProps((prev) => ({ ...prev, opacity }));
      });

    // SPHERE FOLDER
    const sphereFolder = guiFive.addFolder('Sphere');
    sphereFolderRef.current = sphereFolder;

    const localSphereProps = {
      color: sphereMaterialProps.color,
      metalness: sphereMaterialProps.metalness,
      roughness: sphereMaterialProps.roughness,
      opacity: sphereMaterialProps.opacity,
    }

    // add controls for each property
    sphereControllersRef.current.colorController = sphereFolder
      .addColor(localSphereProps, 'color')
      .name('Color')
      .onChange((color: string) => {
        setSphereMaterialProps((prev) => ({ ...prev, color }));
      });

    sphereControllersRef.current.metalnessController = sphereFolder
      .add(localSphereProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((metalness: number) => {
        setSphereMaterialProps((prev) => ({ ...prev, metalness }));
      });

    sphereControllersRef.current.roughnessController = sphereFolder
      .add(localSphereProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((roughness: number) => {
        setSphereMaterialProps((prev) => ({ ...prev, roughness }));
      });

    sphereControllersRef.current.opacityController = sphereFolder
      .add(localSphereProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((opacity: number) => {
        setSphereMaterialProps((prev) => ({ ...prev, opacity }));
      });

    // CUSHION FOLDER
    const cushionFolder = guiFive.addFolder('Cushion');
    cushionFolderRef.current = cushionFolder;

    const localCushionProps = {
      color: cushionMaterialProps.color,
      opacity: cushionMaterialProps.opacity,
      roughness: cushionMaterialProps.roughness,
      metalness: cushionMaterialProps.metalness,
      envMapIntensity: cushionMaterialProps.envMapIntensity,
      emissive: cushionMaterialProps.emissive,
      emissiveIntensity: cushionMaterialProps.emissiveIntensity,
    }

    // add controls for each property
    cushionControllersRef.current.colorController = cushionFolder
      .addColor(localCushionProps, 'color')
      .name('Color')
      .onChange((color: string) => {
        setCushionMaterialProps((prev) => ({ ...prev, color }));
      });

    cushionControllersRef.current.opacityController = cushionFolder
      .add(localCushionProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((opacity: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, opacity }));
      });

    cushionControllersRef.current.roughnessController = cushionFolder
      .add(localCushionProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((roughness: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, roughness }));
      });

    cushionControllersRef.current.metalnessController = cushionFolder
      .add(localCushionProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((metalness: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, metalness }));
      });

    cushionControllersRef.current.envMapIntensityController = cushionFolder
      .add(localCushionProps, 'envMapIntensity', 0, 1, 0.01)
      .name('Env Map Intensity')
      .onChange((envMapIntensity: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, envMapIntensity }));
      });
    
    cushionControllersRef.current.emissiveController = cushionFolder
      .addColor(localCushionProps, 'emissive')
      .name('Emissive')
      .onChange((emissive: string) => {
        setCushionMaterialProps((prev) => ({ ...prev, emissive }));
      });

     cushionControllersRef.current.emissiveIntensityController = cushionFolder
      .add(localCushionProps, 'emissiveIntensity', 0, 1, 0.01)
      .name('Emissive Intensity')
      .onChange((emissiveIntensity: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, emissiveIntensity }));
      });

    return () => {
      guiFive.destroy();
    }

  }, []);

  return (
    <group position={[0, 0, 0]} scale={[1.0, 1.0, 1.0]} ref={LogoFiveGroupRef}>
      <DeloitteDigitalLogoGroup
        textBoldMaterialProps={textBoldMaterialProps}
        textLightMaterialProps={textLightMaterialProps}
        sphereMaterialProps={sphereMaterialProps}
      />
      <Cushion size={0.9} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionMaterialProps={cushionMaterialProps} />
    </group>    
  );
}

export default LogoFiveGroup;
