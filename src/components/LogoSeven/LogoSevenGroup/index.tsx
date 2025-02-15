import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MathUtils } from 'three';
import * as THREE from 'three';
import { GUI } from 'lil-gui';
import Cushion from './Cushion';
import CushionCover from './CushionCover';
import DeloitteDigitalLogoGroup from './DeloitteDigitalLogoGroup';
import { listOfImages } from '../../../utilities/listOfImages';
import DPIText from './DPIText';

interface Props {
  isMouseEntered: boolean;
  isFacingUser: boolean;
  setIsFacingUser: (isFacingUser: boolean) => void;
}

function LogoSevenGroup({ isMouseEntered, isFacingUser, setIsFacingUser }: Props) {
  const logoSevenGroupRef = useRef<Group>(null);

  // Set the initial rotation on mount only
  useEffect(() => {
    // const initialRotation = isFacingUser ? 0 : Math.PI;
    if (logoSevenGroupRef.current) {
      logoSevenGroupRef.current.rotation.y = isFacingUser ? 0 : Math.PI;
    }
  }, [isFacingUser]);

  useFrame((state, delta) => {
    if (logoSevenGroupRef.current) {
      // Apply a "breathing" effect on the X axis.
      logoSevenGroupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.12;

      // Determine the starting rotation.
      const initialRotation = isFacingUser ? 0 : Math.PI;
      // Set the target rotation: rotate an extra PI when the mouse enters.
      const targetY = isMouseEntered ? initialRotation + Math.PI : initialRotation;
      
      // Incorporate delta into the interpolation factor for frame rate independence.
      const speed = 3; // Adjust this to control the smoothness/speed
      const lerpFactor = 1 - Math.exp(-speed * delta);
      
      // Interpolate the current rotation towards the target rotation.
      logoSevenGroupRef.current.rotation.y = MathUtils.lerp(
        logoSevenGroupRef.current.rotation.y,
        targetY,
        lerpFactor
      );

      // Optionally, snap to target if very close.
      if (Math.abs(logoSevenGroupRef.current.rotation.y - targetY) < 0.001) {
        logoSevenGroupRef.current.rotation.y = targetY;
      }
    }
  });

  // ROTATION GUI REFS
  const rotationFolderRef = useRef<GUI | null>(null);
  const rotationControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  // const [rotationProps, setRotationProps] = useState({
  //   initialRotation,
  //   rotationAmount,
  // });

  // TEXT BOLD GUI REFS
  const textBoldFolderRef = useRef<GUI | null>(null);
  const textBoldControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [textBoldMaterialProps, setTextBoldMaterialProps] = useState({
    color: '#fff',
    metalness: 0,
    roughness: 0,
    opacity: 1.0,
    emissive: '#fff',
    emissiveIntensity: 0.2,
  });

  // TEXT LIGHT GUI REFS
  const textLightFolderRef = useRef<GUI | null>(null);
  const textLightControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [textLightMaterialProps, setTextLightMaterialProps] = useState({
    color: '#fff',
    metalness: 0,
    roughness: 0,
    opacity: 1.0,
    emissive: '#fff',
    emissiveIntensity: 0.2,
  });

  // DPI TEXT GUI REFS
  const dpiTextFolderRef = useRef<GUI | null>(null);
  const dpiTextControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [dpiTextMaterialProps, setDpiTextMaterialProps] = useState({
    color: '#fff',
    opacity: 1.0,
    roughness: 1,       
    metalness: 0,
    emissive: '#fff',
    emissiveIntensity: 0.5,
  });  

  // SPHERE GUI REFS
  const sphereFolderRef = useRef<GUI | null>(null);
  const sphereControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [sphereMaterialProps, setSphereMaterialProps] = useState({
    color: '#4dff29',
    metalness: 0,
    roughness: 1,
    opacity: 1.0,
    emissive: '#fff',
    emissiveIntensity: 0,
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
    const guiSeven = new GUI({
      width: 350,
      title: 'LEFT - FOURTH FROM THE TOP'
    });
    // Position the GUI
    // guiFive.domElement.style.position = 'absolute';
    // guiFive.domElement.style.left = '500px';
    // guiFive.domElement.style.top = '500px';
    guiSeven.domElement.style.position = 'absolute';
    guiSeven.domElement.style.left = '10px';
    guiSeven.domElement.style.top = '2500px';

    // ROTATION FOLDER
    const rotationFolder = guiSeven.addFolder('Rotation');
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
    const textBoldFolder = guiSeven.addFolder('Text Bold');
    textBoldFolderRef.current = textBoldFolder;

    const localTextBoldProps = {
      color: textBoldMaterialProps.color,
      metalness: textBoldMaterialProps.metalness,
      roughness: textBoldMaterialProps.roughness,
      opacity: textBoldMaterialProps.opacity,
      emissive: textBoldMaterialProps.emissive,
      emissiveIntensity: textBoldMaterialProps.emissiveIntensity,
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
    
    textBoldControllersRef.current.emissiveController = textBoldFolder
      .addColor(localTextBoldProps, 'emissive')
      .name('Emissive')
      .onChange((emissive: string) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, emissive }));
      });

    textBoldControllersRef.current.emissiveIntensityController = textBoldFolder
      .add(localTextBoldProps, 'emissiveIntensity', 0, 1, 0.01)
      .name('Emissive Intensity')
      .onChange((emissiveIntensity: number) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, emissiveIntensity })); 
      });

    // TEXT LIGHT FOLDER
    const textLightFolder = guiSeven.addFolder('Text Light');
    textLightFolderRef.current = textLightFolder;

    const localTextLightProps = {
      color: textLightMaterialProps.color,
      metalness: textLightMaterialProps.metalness,
      roughness: textLightMaterialProps.roughness,
      opacity: textLightMaterialProps.opacity,
      emissive: textLightMaterialProps.emissive,
      emissiveIntensity: textLightMaterialProps.emissiveIntensity,
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
    
    textLightControllersRef.current.emissiveController = textLightFolder
      .addColor(localTextLightProps, 'emissive')
      .name('Emissive')
      .onChange((emissive: string) => {
        setTextLightMaterialProps((prev) => ({ ...prev, emissive }));
      }); 

    textLightControllersRef.current.emissiveIntensityController = textLightFolder
      .add(localTextLightProps, 'emissiveIntensity', 0, 1, 0.01)
      .name('Emissive Intensity')
      .onChange((emissiveIntensity: number) => {
        setTextLightMaterialProps((prev) => ({ ...prev, emissiveIntensity }));
      });
    
    // DPI TEXT FOLDER
    const dpiTextFolder = guiSeven.addFolder('DPI Text');
    dpiTextFolderRef.current = dpiTextFolder;
    // textFolderRef.current.open();

    const localDpiTextProps = {
      color: dpiTextMaterialProps.color,
      opacity: dpiTextMaterialProps.opacity,
      roughness: dpiTextMaterialProps.roughness,
      metalness: dpiTextMaterialProps.metalness,
      emissive: dpiTextMaterialProps.emissive,
      emissiveIntensity: dpiTextMaterialProps.emissiveIntensity,
    }

    // add controls for each property
    dpiTextControllersRef.current.colorController = dpiTextFolder
      .addColor(localDpiTextProps, 'color')
      .name('Color')
      .onChange((value: string) => {
        setDpiTextMaterialProps(prev => ({ ...prev, color: value }));
      });

    dpiTextControllersRef.current.opacityController = dpiTextFolder
      .add(localDpiTextProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((value: number) => {
        setDpiTextMaterialProps(prev => ({ ...prev, opacity: value }));
      });

    dpiTextControllersRef.current.roughnessController = dpiTextFolder
      .add(localDpiTextProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((value: number) => {
        setDpiTextMaterialProps(prev => ({ ...prev, roughness: value }));
      });

    dpiTextControllersRef.current.metalnessController = dpiTextFolder
      .add(localDpiTextProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((value: number) => {
        setDpiTextMaterialProps(prev => ({ ...prev, metalness: value }));
      });

    dpiTextControllersRef.current.emissiveController = dpiTextFolder
      .addColor(localDpiTextProps, 'emissive')
      .name('Emissive')
      .onChange((value: string) => {
        setDpiTextMaterialProps(prev => ({ ...prev, emissive: value }));
      });

    dpiTextControllersRef.current.emissiveIntensityController = dpiTextFolder
      .add(localDpiTextProps, 'emissiveIntensity', 0, 1, 0.01)
      .name('Emissive Intensity')
      .onChange((value: number) => {
        setDpiTextMaterialProps(prev => ({ ...prev, emissiveIntensity: value }));
      });

    // SPHERE FOLDER
    const sphereFolder = guiSeven.addFolder('Sphere');
    sphereFolderRef.current = sphereFolder;

    const localSphereProps = {
      color: sphereMaterialProps.color,
      metalness: sphereMaterialProps.metalness,
      roughness: sphereMaterialProps.roughness,
      opacity: sphereMaterialProps.opacity,
      emissive: sphereMaterialProps.emissive,
      emissiveIntensity: sphereMaterialProps.emissiveIntensity,
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

    sphereControllersRef.current.emissiveController = sphereFolder
      .addColor(localSphereProps, 'emissive')
      .name('Emissive')
      .onChange((emissive: string) => {
        setSphereMaterialProps((prev) => ({ ...prev, emissive }));
      });

    sphereControllersRef.current.emissiveIntensityController = sphereFolder
      .add(localSphereProps, 'emissiveIntensity', 0, 1, 0.01)
      .name('Emissive Intensity')
      .onChange((emissiveIntensity: number) => {
        setSphereMaterialProps((prev) => ({ ...prev, emissiveIntensity }));
      });

    // CUSHION FOLDER
    const cushionFolder = guiSeven.addFolder('Cushion');
    cushionFolderRef.current = cushionFolder;

    const localCushionProps = {
      color: cushionMaterialProps.color,
      opacity: cushionMaterialProps.opacity,
      roughness: cushionMaterialProps.roughness,
      metalness: cushionMaterialProps.metalness,
      envMapIntensity: cushionMaterialProps.envMapIntensity,
      emissive: cushionMaterialProps.emissive,
      emissiveIntensity: cushionMaterialProps.emissiveIntensity,
      envMapImages: cushionMaterialProps.envMapImages,
      envMapImage: cushionMaterialProps.envMapImage,     
    }

    // add controls for each property
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
    
    // CUSHION COVER FOLDER
    const cushionCoverFolder = guiSeven.addFolder('Cushion Cover');
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

    return () => {
      guiSeven.destroy();
    }

  }, []);

  return (
    <group position={[0, 0, 0]} scale={[1.0, 1.0, 1.0]} ref={logoSevenGroupRef}>
      <DeloitteDigitalLogoGroup
        textBoldMaterialProps={textBoldMaterialProps}
        textLightMaterialProps={textLightMaterialProps}
        sphereMaterialProps={sphereMaterialProps}
      />
      <DPIText text={'DP&I'} position={[0, 0, -1.7]} rotation={new THREE.Euler(0, Math.PI, 0)} size={0.7} depth={0.3} textMaterialProps={dpiTextMaterialProps} />
      <CushionCover size={0.93} scale={[1.7, 1.7, 1.7]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionCoverMaterialProps={cushionCoverMaterialProps} />
      <Cushion size={0.9} scale={[1.7, 1.7, 1.7]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionMaterialProps={cushionMaterialProps} />
    </group>    
  );
}

export default LogoSevenGroup;
