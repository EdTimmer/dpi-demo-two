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

function LogoOneGroup({ isMouseEntered, isFacingUser, setIsFacingUser, guiy }: Props) {
  const logoOneGroupRef = useRef<Group>(null);

  // Set the initial rotation on mount only
  useEffect(() => {
    if (logoOneGroupRef.current) {
      logoOneGroupRef.current.rotation.y = isFacingUser ? 0 : Math.PI;
    }
  }, [isFacingUser]);

  useFrame((state, delta) => {
      if (logoOneGroupRef.current) {
        // Apply a "breathing" effect on the X axis.
        logoOneGroupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.12;
  
        // Determine the starting rotation.
        const initialRotation = isFacingUser ? 0 : Math.PI;
        // Set the target rotation: rotate an extra PI when the mouse enters.
        const targetY = isMouseEntered ? initialRotation + Math.PI : initialRotation;
        
        // Incorporate delta into the interpolation factor for frame rate independence.
        const speed = 3; // Adjust this to control the smoothness/speed
        const lerpFactor = 1 - Math.exp(-speed * delta);
        
        // Interpolate the current rotation towards the target rotation.
        logoOneGroupRef.current.rotation.y = MathUtils.lerp(
          logoOneGroupRef.current.rotation.y,
          targetY,
          lerpFactor
        );
  
        // Optionally, snap to target if very close.
        if (Math.abs(logoOneGroupRef.current.rotation.y - targetY) < 0.001) {
          logoOneGroupRef.current.rotation.y = targetY;
        }
      }
    });

  // ROTATION GUI REFS
  const rotationFolderRef = useRef<GUI | null>(null);
  const rotationControllersRef = useRef<Record<string, any>>({});

  // TEXT GUI REFS
  const textFolderRef = useRef<GUI | null>(null);
  const textControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [textMaterialProps, setTextMaterialProps] = useState({
    color: '#fff',
    opacity: 1.0,
    roughness: 0.2,       
    metalness: 0.2,
    emissive: '#fff',
    emissiveIntensity: 0.2,
  });

  // CUSHION SHADER GUI REFS
  const cushionRef = useRef<GUI | null>(null);
  const cushionControllersRef = useRef<Record<string, any>>({});
  const [cushionMaterialProps, setCushionMaterialProps] = useState({
    noise: 1.0,
    speed: 0.15,
    oscillationFrequency: 11.0,
  });

  // CUSHION COVER GUI REFS
  const cushionCoverRef = useRef<GUI | null>(null);
  const cushionCoverControllersRef = useRef<Record<string, any>>({});
  const [cushionCoverMaterialProps, setCushionCoverMaterialProps] = useState({
    transmission: 1.0,
    roughness: 0,
    envMapImages: listOfImages,
    envMapImage: '/images/img_4.png',
    envMapIntensity: 1.0,
  });

  useEffect(() => {
    const guiOne = new GUI({
      width: 350,
      title: 'LEFT - FIRST FROM THE TOP'
    });
    // Position the GUI
    guiOne.domElement.style.position = 'absolute';
    guiOne.domElement.style.left = '10px';
    guiOne.domElement.style.top = guiy;

    // ROTATION FOLDER
    const rotationFolder = guiOne.addFolder('Rotation');
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

    // TEXT FOLDER
    const textFolder = guiOne.addFolder('Text');
    textFolderRef.current = textFolder;
    // textFolderRef.current.open();

    const localTextProps = {
      color: textMaterialProps.color,
      opacity: textMaterialProps.opacity,
      roughness: textMaterialProps.roughness,
      metalness: textMaterialProps.metalness,
      emissive: textMaterialProps.emissive,
      emissiveIntensity: textMaterialProps.emissiveIntensity,
    }

    // add controls for each property
    textControllersRef.current.colorController = textFolder
      .addColor(localTextProps, 'color')
      .name('Color')
      .onChange((value: string) => {
        setTextMaterialProps(prev => ({ ...prev, color: value }));
      });
    
    textControllersRef.current.metalnessController = textFolder
      .add(localTextProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, metalness: value }));
      });

    textControllersRef.current.roughnessController = textFolder
      .add(localTextProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, roughness: value }));
      });

    textControllersRef.current.emissiveController = textFolder
      .addColor(localTextProps, 'emissive')
      .name('Emissive')
      .onChange((value: string) => {
        setTextMaterialProps(prev => ({ ...prev, emissive: value }));
      });

    textControllersRef.current.emissiveIntensityController = textFolder
      .add(localTextProps, 'emissiveIntensity', 0, 1, 0.01)
      .name('Emissive Intensity')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, emissiveIntensity: value }));
      });
    
    textControllersRef.current.opacityController = textFolder
      .add(localTextProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, opacity: value }));
      });

    // CUSHION FOLDER
    const cushionFolder = guiOne.addFolder('Cushion');
    cushionRef.current = cushionFolder;
    // cushionRef.current.open();

    const localCushionProps = {
      noise: cushionMaterialProps.noise,
      speed: cushionMaterialProps.speed,
      oscillationFrequency: cushionMaterialProps.oscillationFrequency,
    }

    // add controls for each property
    cushionControllersRef.current.noiseController = cushionFolder
      .add(localCushionProps, 'noise', 0, 5, 0.01)
      .name('Noise')
      .onChange((value: number) => {
        setCushionMaterialProps(prev => ({ ...prev, noise: value }));
      });

    cushionControllersRef.current.speedController = cushionFolder
      .add(localCushionProps, 'speed', 0, 2, 0.001)
      .name('Speed')
      .onChange((value: number) => {
        setCushionMaterialProps(prev => ({ ...prev, speed: value }));
      });

    cushionControllersRef.current.oscillationFrequencyController = cushionFolder
      .add(localCushionProps, 'oscillationFrequency', 0, 20, 0.1)
      .name('Oscillation Frequency')
      .onChange((value: number) => {
        setCushionMaterialProps(prev => ({ ...prev, oscillationFrequency: value }));
      });
    
    // CUSHION COVER FOLDER
    const cushionCoverFolder = guiOne.addFolder('Cushion Cover');
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
      guiOne.destroy();
    }
  }, []);

  return (
    <group position={[0, 0, 0]} scale={[1.0, 1.0, 1.0]} ref={logoOneGroupRef}>
      <Text text={'DP&I'} position={[0, 0, 0.3]} rotation={new THREE.Euler(0, 0, 0)} size={0.8} depth={0.5} textMaterialProps={textMaterialProps} />
      <CushionCover size={0.91} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionCoverMaterialProps={cushionCoverMaterialProps} />
      <Cushion size={0.9} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionMaterialProps={cushionMaterialProps} />
    </group>    
  );
}

export default LogoOneGroup;
