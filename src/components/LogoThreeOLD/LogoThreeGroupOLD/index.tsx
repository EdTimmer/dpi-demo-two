import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MathUtils } from 'three';
import * as THREE from 'three';
import { GUI } from 'lil-gui';
import LogoText from './TextSilverSlim';
import Cushion from './Cushion';
// import GreenDotMetalTwo from './GreenDotMetalTwo';
import { listOfImages } from '../../../utilities/listOfImages';
import CushionCover from './CushionCover';
import TextSilverSlim from './TextSilverSlim';
import { Caustics, Lightformer, MeshTransmissionMaterial } from '@react-three/drei';

interface Props {
  isMouseEntered: boolean;
  isFacingUser: boolean;
  setIsFacingUser: (isFacingUser: boolean) => void;
}

function LogoThreeGroupOLD({ isMouseEntered, isFacingUser, setIsFacingUser }: Props) {
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
    const guiThree = new GUI({ 
      width: 350,
      title: 'LEFT - SECOND FROM THE TOP'
    });
    // Position the GUI
    guiThree.domElement.style.position = 'absolute'; // Customize the position
    guiThree.domElement.style.left = '10px'; // Move this panel to the left side of the screen
    guiThree.domElement.style.top = '915px'; // Move it down slightly

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

    // TEXT FOLDER
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
      const cushionCoverFolder = guiThree.addFolder('Cushion Cover');
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

    // Cleanup on unmount
    return () => {
      guiThree.destroy();
    };
  }, []);

  return (
    <group position={[0, 0, 0]} scale={[1.0, 1.0, 1.0]} ref={logoThreeGroupRef}>
      <TextSilverSlim text={'DP&I'} position={[0, 0, 0.3]} rotation={new THREE.Euler(0, 0, 0)} size={0.8} depth={0.5} textMaterialProps={textMaterialProps} />
      <CushionCover size={0.93} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionCoverMaterialProps={cushionCoverMaterialProps} />
      <Cushion size={0.9} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionMaterialProps={cushionMaterialProps} />
      {/* <Caustics color="#FF8F20" position={[0, 0, 0]} lightSource={[5, 5, -10]} worldRadius={0.01} ior={1.2} intensity={0.005} causticsOnly={true} backside={false}> */}
        {/* <mesh castShadow receiveShadow position={[0, 0, 0]} scale={[1.7, 1.7, 0.4]}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshTransmissionMaterial resolution={1024} distortion={0.2} color="#FFF" thickness={1.5} anisotropy={0} />
        </mesh> */}
      {/* </Caustics> */}
      
    </group>    
  );
}

export default LogoThreeGroupOLD;
