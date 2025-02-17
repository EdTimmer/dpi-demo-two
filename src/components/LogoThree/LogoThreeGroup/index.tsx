import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MathUtils } from 'three';
import * as THREE from 'three';
import { GUI } from 'lil-gui';
import Cushion from './Cushion';
import Text from './Text';
import CushionCover from './CushionCover';
import { listOfImages } from '../../../utilities/listOfImages';

interface Props {
  isMouseEntered: boolean;
  isFacingUser: boolean;
  setIsFacingUser: (isFacingUser: boolean) => void;
  guiy: string;
}

function LogoThreeGroup({ isMouseEntered, isFacingUser, setIsFacingUser, guiy }: Props) {
  const logoThreeGroupRef = useRef<Group>(null);

  // Set the initial rotation on mount only
  useEffect(() => {
    if (logoThreeGroupRef.current) {
      logoThreeGroupRef.current.rotation.y = isFacingUser ? 0 : Math.PI;
    }
  }, [isFacingUser]);

  useFrame((state, delta) => {
      if (logoThreeGroupRef.current) {
        // Apply a "breathing" effect on the X axis.
        logoThreeGroupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.12;
  
        // Determine the starting rotation.
        const initialRotation = isFacingUser ? 0 : Math.PI;
        // Set the target rotation: rotate an extra PI when the mouse enters.
        const targetY = isMouseEntered ? initialRotation + Math.PI : initialRotation;
        
        // Incorporate delta into the interpolation factor for frame rate independence.
        const speed = 3; // Adjust this to control the smoothness/speed
        const lerpFactor = 1 - Math.exp(-speed * delta);
        
        // Interpolate the current rotation towards the target rotation.
        logoThreeGroupRef.current.rotation.y = MathUtils.lerp(
          logoThreeGroupRef.current.rotation.y,
          targetY,
          lerpFactor
        );
  
        // Optionally, snap to target if very close.
        if (Math.abs(logoThreeGroupRef.current.rotation.y - targetY) < 0.001) {
          logoThreeGroupRef.current.rotation.y = targetY;
        }
      }
    });

  // ROTATION GUI REFS
  const rotationFolderRef = useRef<GUI | null>(null);
  const rotationControllersRef = useRef<Record<string, any>>({});

  // // TEXT BOLD GUI REFS
  const textFolderRef = useRef<GUI | null>(null);
  const textControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [textMaterialProps, setTextMaterialProps] = useState({
    color: '#c0c0c0',
    metalness: 1,
    roughness: 0.15,
    reflectivity: 1,
    clearcoat: 1,     // Adds a clear coat layer
    clearcoatRoughness: 0.1,
    opacity: 1.0,
  });

  // CUSHION GUI REFS
  const cushionFolderRef = useRef<GUI | null>(null);
  const cushionControllersRef = useRef<Record<string, any>>({});
  const [cushionMaterialProps, setCushionMaterialProps] = useState({
    noiseSwirlSteps: 2,
    noiseSwirlValue: 1.0,
    noiseScale: 1.0,
    noiseTimeScale: 0.05,
    opacity: 0.3,
  });

  // CUSHION COVER GUI REFS
  const cushionCoverRef = useRef<GUI | null>(null);
  const cushionCoverControllersRef = useRef<Record<string, any>>({});
  const [cushionCoverMaterialProps, setCushionCoverMaterialProps] = useState({
    transmission: 0.99,
    roughness: 0,
    envMapImages: listOfImages,
    envMapImage: '/images/bw_3.jpg',
    envMapIntensity: 1.0,
  });

  useEffect(() => {
    const guiThree = new GUI({
      width: 350,
      title: 'LEFT - SECOND FROM THE TOP'
    });
    // Position the GUI
    guiThree.domElement.style.position = 'absolute';
    guiThree.domElement.style.left = '10px';
    guiThree.domElement.style.top = guiy;

    // ROTATION FOLDER
    const rotationFolder = guiThree.addFolder('Rotation');
    rotationFolderRef.current = rotationFolder;

    const localRotationProps = {
      isFacingUser,
    }

    // add rotation controls for each property with a step increment of Math.PI
    rotationControllersRef.current.isFacingUserController = rotationFolder
      .add(localRotationProps, 'isFacingUser')
      .name('Is Facing User')
      .onChange((isFacingUser: boolean) => {
        setIsFacingUser(isFacingUser);
      });

    // TEXT BOLD FOLDER
    const textFolder = guiThree.addFolder('Text');
    textFolderRef.current = textFolder;
    const localTextProps = {
      color: textMaterialProps.color,
      metalness: textMaterialProps.metalness,
      roughness: textMaterialProps.roughness,
      reflectivity: textMaterialProps.reflectivity,
      clearcoat: textMaterialProps.clearcoat,
      clearcoatRoughness: textMaterialProps.clearcoatRoughness,
      opacity: textMaterialProps.opacity,
    };

    // Add controls for each property
    textControllersRef.current.colorController = textFolder
      .addColor(localTextProps, 'color')
      .name('Color')
      .onChange((value: string) => {
        setTextMaterialProps((prev) => ({ ...prev, color: value }));
      });

    textControllersRef.current.metalnessController = textFolder
      .add(localTextProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((value: number) => {
        setTextMaterialProps((prev) => ({ ...prev, metalness: value }));
      });

    textControllersRef.current.roughnessController = textFolder
      .add(localTextProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((value: number) => {
        setTextMaterialProps((prev) => ({ ...prev, roughness: value }));
      });

    textControllersRef.current.reflectivityController = textFolder
      .add(localTextProps, 'reflectivity', 0, 1, 0.01)
      .name('Reflectivity')
      .onChange((value: number) => {
        setTextMaterialProps((prev) => ({ ...prev, reflectivity: value }));
      });

    textControllersRef.current.clearcoatController = textFolder
      .add(localTextProps, 'clearcoat', 0, 1, 0.01)
      .name('Clearcoat')
      .onChange((value: number) => {
        setTextMaterialProps((prev) => ({ ...prev, clearcoat: value }));
      });

    textControllersRef.current.clearcoatRoughnessController = textFolder
      .add(localTextProps, 'clearcoatRoughness', 0, 1, 0.01)
      .name('Clearcoat Roughness')
      .onChange((value: number) => {
        setTextMaterialProps((prev) => ({ ...prev, clearcoatRoughness: value }));
      });

    textControllersRef.current.opacityController = textFolder
      .add(localTextProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((value: number) => {
        setTextMaterialProps((prev) => ({ ...prev, opacity: value }));
      });
    
    // CUSHION FOLDER
    const cushionFolder = guiThree.addFolder('Cushion');
    cushionFolderRef.current = cushionFolder;
    const localCushionProps = {
      noiseSwirlSteps: cushionMaterialProps.noiseSwirlSteps,
      noiseSwirlValue: cushionMaterialProps.noiseSwirlValue,
      noiseScale: cushionMaterialProps.noiseScale,
      noiseTimeScale: cushionMaterialProps.noiseTimeScale,
      opacity: cushionMaterialProps.opacity,
    };

    // Add controls for each property
    cushionControllersRef.current.noiseSwirlStepsController = cushionFolder
      .add(localCushionProps, 'noiseSwirlSteps', 0, 10, 1)
      .name('Noise Swirl Steps')
      .onChange((value: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, noiseSwirlSteps: value }));
      });

    cushionControllersRef.current.noiseSwirlValueController = cushionFolder
      .add(localCushionProps, 'noiseSwirlValue', 0, 5, 0.1)
      .name('Noise Swirl Value')
      .onChange((value: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, noiseSwirlValue: value }));
      });

    cushionControllersRef.current.noiseScaleController = cushionFolder
      .add(localCushionProps, 'noiseScale', 0, 5, 0.1)
      .name('Noise Scale')
      .onChange((value: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, noiseScale: value }));
      });

    cushionControllersRef.current.noiseTimeScaleController = cushionFolder
      .add(localCushionProps, 'noiseTimeScale', 0, 1, 0.01)
      .name('Noise Time Scale')
      .onChange((value: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, noiseTimeScale: value }));
      });

    cushionControllersRef.current.opacityController = cushionFolder
      .add(localCushionProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((value: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, opacity: value }));
      });

      // CUSHION COVER FOLDER
    const cushionCoverFolder = guiThree.addFolder('Cushion Cover');
    cushionCoverRef.current = cushionCoverFolder;

    const localCushionCoverProps = {
      transmission: cushionCoverMaterialProps.transmission,
      roughness: cushionCoverMaterialProps.roughness,
      envMapImage: cushionCoverMaterialProps.envMapImage,
      envMapIntensity: cushionCoverMaterialProps.envMapIntensity,
    }

    // add controls for each property
    cushionCoverControllersRef.current.transmissionController = cushionCoverFolder
      .add(localCushionCoverProps, 'transmission', 0, 1, 0.01)
      .name('Transmission')
      .onChange((value: number) => {
        setCushionCoverMaterialProps(prev => ({ ...prev, transmission: value }));
      });

    cushionCoverControllersRef.current.roughnessController = cushionCoverFolder
      .add(localCushionCoverProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((value: number) => {
        setCushionCoverMaterialProps(prev => ({ ...prev, roughness: value }));
      });

    cushionCoverControllersRef.current.envMapImageController = cushionCoverFolder
      .add(localCushionCoverProps, 'envMapImage', listOfImages)
      .name('Env Map Image')
      .onChange((value: string) => {
        setCushionCoverMaterialProps(prev => ({ ...prev, envMapImage: value }));
      });

    cushionCoverControllersRef.current.envMapIntensityController = cushionCoverFolder
      .add(localCushionCoverProps, 'envMapIntensity', 0, 2, 0.01)
      .name('Env Map Intensity')
      .onChange((value: number) => {
        setCushionCoverMaterialProps(prev => ({ ...prev, envMapIntensity: value }));
      });
    
    return () => {
      guiThree.destroy();
    }
  }, []);

  return (
    <group position={[0, 0, 0]} scale={[1.0, 1.0, 1.0]} ref={logoThreeGroupRef}>
      {/* <DeloitteDigitalLogoGroup
        textMaterialProps={textMaterialProps}
        textLightMaterialProps={textLightMaterialProps}
        sphereMaterialProps={sphereMaterialProps}
      /> */}
      <Text text={'DP&I'} position={[0, 0, 0.3]} rotation={new THREE.Euler(0, 0, 0)} textMaterialProps={textMaterialProps} />

      {/* <Text text={'DP&I'} position={[0, 0, 0.3]} rotation={new THREE.Euler(0, 0, 0)} size={0.8} depth={0.5} textMaterialProps={textMaterialProps} /> */}
      <CushionCover size={0.91} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionCoverMaterialProps={cushionCoverMaterialProps} />
      <Cushion size={0.9} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionMaterialProps={cushionMaterialProps} />
    </group>    
  );
}

export default LogoThreeGroup;
