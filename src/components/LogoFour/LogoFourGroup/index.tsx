import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MathUtils } from 'three';
import * as THREE from 'three';
import { GUI } from 'lil-gui';
import Cushion from './Cushion';
import LogoTextBold from './LogoTextBold';
import { listOfImages } from '../../../utilities/listOfImages';
import CushionCover from './CushionCover';

interface Props {
  isMouseEntered: boolean;
  isFacingUser: boolean;
  setIsFacingUser: (isFacingUser: boolean) => void;
}

function LogoFourGroup({ isMouseEntered, isFacingUser, setIsFacingUser }: Props) {
  const logoFourGroupRef = useRef<Group>(null);

  // Set the initial rotation on mount only
  useEffect(() => {
    if (logoFourGroupRef.current) {
      logoFourGroupRef.current.rotation.y = isFacingUser ? 0 : Math.PI;
    }
  }, [isFacingUser]);

  useFrame((state, delta) => {
    if (logoFourGroupRef.current) {
      // Apply a "breathing" effect on the X axis.
      logoFourGroupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.12;

      // Determine the starting rotation.
      const initialRotation = isFacingUser ? 0 : Math.PI;
      // Set the target rotation: rotate an extra PI when the mouse enters.
      const targetY = isMouseEntered ? initialRotation + Math.PI : initialRotation;
      
      // Incorporate delta into the interpolation factor for frame rate independence.
      const speed = 3; // Adjust this to control the smoothness/speed
      const lerpFactor = 1 - Math.exp(-speed * delta);
      
      // Interpolate the current rotation towards the target rotation.
      logoFourGroupRef.current.rotation.y = MathUtils.lerp(
        logoFourGroupRef.current.rotation.y,
        targetY,
        lerpFactor
      );

      // Optionally, snap to target if very close.
      if (Math.abs(logoFourGroupRef.current.rotation.y - targetY) < 0.001) {
        logoFourGroupRef.current.rotation.y = targetY;
      }
    }
  });

  // ROTATION GUI REFS
  const rotationFolderRef = useRef<GUI | null>(null);
  const rotationControllersRef = useRef<Record<string, any>>({});

  // // TEXT BOLD GUI REFS
  const textBoldFolderRef = useRef<GUI | null>(null);
  const textBoldControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [textBoldMaterialProps, setTextBoldMaterialProps] = useState({
    color: '#c0c0c0',
    // color: '#fbd641', // gold color
    metalness: 1,
    roughness: 0.15,
    reflectivity: 1,
    clearcoat: 1,     // Adds a clear coat layer
    clearcoatRoughness: 0.1,
    opacity: 1.0,
  });

  // CUSHION GUI REFS
  const cushionFolderRef = useRef<GUI | null>(null);
  const cushionControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [cushionMaterialProps, setCushionMaterialProps] = useState({
    color: '#000',
    opacity: 1.0,
    roughness: 0,     
    metalness: 0,
    emissive: '#fff',
    emissiveIntensity: 0.01,
    envMapIntensity: 1.0,
    envMapImages: listOfImages,
    envMapImage: '/images/bw_1.png',
  });

  // CUSHION COVER GUI REFS
  const cushionCoverFolderRef = useRef<GUI | null>(null);
  const cushionCoverControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [cushionCoverMaterialProps, setCushionCoverMaterialProps] = useState({
    color: '#e4e3e3',
    opacity: 0.3,
  });

  useEffect(() => {
    const guiFour = new GUI({
      title: 'RIGHT - SECOND FROM THE TOP',
      width: 350,
    });

    // Position the GUI
    guiFour.domElement.style.position = 'absolute';
    guiFour.domElement.style.right = '10px';
    guiFour.domElement.style.top = '915px';

      // ROTATION FOLDER
      const rotationFolder = guiFour.addFolder('Rotation');
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
    const textBoldFolder = guiFour.addFolder('Text Bold');
    textBoldFolderRef.current = textBoldFolder;
    const localTextBoldProps = {
      color: textBoldMaterialProps.color,
      metalness: textBoldMaterialProps.metalness,
      roughness: textBoldMaterialProps.roughness,
      reflectivity: textBoldMaterialProps.reflectivity,
      clearcoat: textBoldMaterialProps.clearcoat,
      clearcoatRoughness: textBoldMaterialProps.clearcoatRoughness,
      opacity: textBoldMaterialProps.opacity,
    };

    // Add controls for each property
    textBoldControllersRef.current.colorController = textBoldFolder
      .addColor(localTextBoldProps, 'color')
      .name('Color')
      .onChange((value: string) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, color: value }));
      });

    textBoldControllersRef.current.metalnessController = textBoldFolder
      .add(localTextBoldProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((value: number) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, metalness: value }));
      });

    textBoldControllersRef.current.roughnessController = textBoldFolder
      .add(localTextBoldProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((value: number) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, roughness: value }));
      });

    textBoldControllersRef.current.reflectivityController = textBoldFolder
      .add(localTextBoldProps, 'reflectivity', 0, 1, 0.01)
      .name('Reflectivity')
      .onChange((value: number) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, reflectivity: value }));
      });

    textBoldControllersRef.current.clearcoatController = textBoldFolder
      .add(localTextBoldProps, 'clearcoat', 0, 1, 0.01)
      .name('Clearcoat')
      .onChange((value: number) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, clearcoat: value }));
      });

    textBoldControllersRef.current.clearcoatRoughnessController = textBoldFolder
      .add(localTextBoldProps, 'clearcoatRoughness', 0, 1, 0.01)
      .name('Clearcoat Roughness')
      .onChange((value: number) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, clearcoatRoughness: value }));
      });

    textBoldControllersRef.current.opacityController = textBoldFolder
      .add(localTextBoldProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((value: number) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, opacity: value }));
      });

// CUSHION FOLDER
const cushionFolder = guiFour.addFolder('Cushion');
cushionFolderRef.current = cushionFolder;

const localCushionProps = {
  color: cushionMaterialProps.color,
  emissive: cushionMaterialProps.emissive,
  opacity: cushionMaterialProps.opacity,
  emissiveIntensity: cushionMaterialProps.emissiveIntensity,
  metalness: cushionMaterialProps.metalness,
  roughness: cushionMaterialProps.roughness,
  envMapIntensity: cushionMaterialProps.envMapIntensity,
  envMapImages: cushionMaterialProps.envMapImages,
  envMapImage: cushionMaterialProps.envMapImage,
};
// Add controls for each property
cushionControllersRef.current.envMapImageController = cushionFolder
.add(localCushionProps, 'envMapImage', cushionMaterialProps.envMapImages) // Passing the array creates a dropdown.
.name('Reflected Image')
.onChange((selectedImage: string) => {
  // Update your material props with the selected image directly.
  setCushionMaterialProps((prev) => ({ ...prev, envMapImage: selectedImage }));
});

cushionControllersRef.current.colorController = cushionFolder
  .addColor(localCushionProps, 'color')
  .name('Color')
  .onChange((value: string) => {
    setCushionMaterialProps(prev => ({ ...prev, color: value }));
  });

cushionControllersRef.current.opacityController = cushionFolder
  .add(localCushionProps, 'opacity', 0, 1, 0.01)
  .name('Opacity')
  .onChange((value: number) => {
    setCushionMaterialProps(prev => ({ ...prev, opacity: value }));
  });

cushionControllersRef.current.emissiveController = cushionFolder
  .addColor(localCushionProps, 'emissive')
  .name('Emissive')
  .onChange((value: string) => {
    setCushionMaterialProps(prev => ({ ...prev, emissive: value }));
  });

cushionControllersRef.current.emissiveIntensityController = cushionFolder
  .add(localCushionProps, 'emissiveIntensity', 0, 1, 0.01)
  .name('Emissive Intensity')
  .onChange((value: number) => {
    setCushionMaterialProps(prev => ({ ...prev, emissiveIntensity: value }));
  });

cushionControllersRef.current.metalnessController = cushionFolder
  .add(localCushionProps, 'metalness', 0, 1, 0.01)
  .name('Metalness')
  .onChange((value: number) => {
    setCushionMaterialProps(prev => ({ ...prev, metalness: value }));
  });

cushionControllersRef.current.roughnessController = cushionFolder
  .add(localCushionProps, 'roughness', 0, 1, 0.01)
  .name('Roughness')
  .onChange((value: number) => {
    setCushionMaterialProps(prev => ({ ...prev, roughness: value }));
  });

cushionControllersRef.current.envMapIntensityController = cushionFolder
  .add(localCushionProps, 'envMapIntensity', 0, 2, 0.01)
  .name('Env Map Intensity')
  .onChange((value: number) => {
    setCushionMaterialProps(prev => ({ ...prev, envMapIntensity: value }));
  });

  // CUSHION COVER FOLDER
  const cushionCoverFolder = guiFour.addFolder('Cushion Cover');
  cushionCoverFolderRef.current = cushionCoverFolder;

  const localCushionCoverProps = {
    color: cushionCoverMaterialProps.color,
    opacity: cushionCoverMaterialProps.opacity,
  }

  // add controls for each property
  cushionCoverControllersRef.current.colorController = cushionCoverFolder
    .addColor(localCushionCoverProps, 'color')
    .name('Color')
    .onChange((color: string) => {
      setCushionCoverMaterialProps((prev) => ({ ...prev, color }));
    });

  cushionCoverControllersRef.current.opacityController = cushionCoverFolder
    .add(localCushionCoverProps, 'opacity', 0, 1, 0.01)
    .name('Opacity')
    .onChange((opacity: number) => {
      setCushionCoverMaterialProps((prev) => ({ ...prev, opacity }));
    });

    // Add controls for each property
    cushionControllersRef.current.colorController = cushionFolder
      .addColor(localCushionProps, 'color')
      .name('Color')
      .onChange((value: string) => {
        setCushionMaterialProps((prev) => ({ ...prev, color: value }));
      });

    cushionControllersRef.current.opacityController = cushionFolder
      .add(localCushionProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((value: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, opacity: value }));
      });

    cushionControllersRef.current.roughnessController = cushionFolder
      .add(localCushionProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((value: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, roughness: value }));
      });

    cushionControllersRef.current.metalnessController = cushionFolder
      .add(localCushionProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((value: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, metalness: value }));
      });

    return () => {
      guiFour.destroy();
    }    
  }, []);

  return (
    <group position={[0, 0, 0]} scale={[1.0, 1.0, 1.0]} ref={logoFourGroupRef}>
      <LogoTextBold text={'DP&I'} position={[0, 0, 0.3]} rotation={new THREE.Euler(0, 0, 0)} textBoldMaterialProps={textBoldMaterialProps} />
      <CushionCover size={0.93} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionCoverMaterialProps={cushionCoverMaterialProps} />
      <Cushion size={0.9} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionMaterialProps={cushionMaterialProps} />
    </group>    
  );
}

export default LogoFourGroup;
