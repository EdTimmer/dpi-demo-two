import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MathUtils } from 'three';
import * as THREE from 'three';
import { GUI } from 'lil-gui';
import Cushion from './Cushion';
import DeloitteDigitalLogoGroup from './DeloitteDigitalLogoGroup';
import Text from './Text';
import CushionCover from './CushionCover';
import { listOfImages } from '../../../utilities/listOfImages';

interface Props {
  isMouseEntered: boolean;
  isFacingUser: boolean;
  setIsFacingUser: (isFacingUser: boolean) => void;
}

function LogoThreeGroup({ isMouseEntered, isFacingUser, setIsFacingUser }: Props) {
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

  // TEXT BOLD GUI REFS
  // const textBoldFolderRef = useRef<GUI | null>(null);
  // const textBoldControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  // const [textBoldMaterialProps, setTextBoldMaterialProps] = useState({
  //   color: '#fff',
  //   metalness: 0,
  //   roughness: 1,
  //   opacity: 1.0,
  //   emissive: '#fff',
  //   emissiveIntensity: 0.4,
  // });

  // // TEXT LIGHT GUI REFS
  // const textLightFolderRef = useRef<GUI | null>(null);
  // const textLightControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  // const [textLightMaterialProps, setTextLightMaterialProps] = useState({
  //   color: '#fff',
  //   metalness: 0,
  //   roughness: 1,
  //   opacity: 1.0,
  //   emissive: '#fff',
  //   emissiveIntensity: 0.4,
  // });
    // TEXT GUI REFS
  // const textFolderRef = useRef<GUI | null>(null);
  // const textControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  // const [textMaterialProps, setTextMaterialProps] = useState({
  //   color: '#fff',
  //   opacity: 1.0,
  //   roughness: 0.2,       
  //   metalness: 0.2,
  //   emissive: '#fff',
  //   emissiveIntensity: 0.2,
  // });
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

  // SPHERE GUI REFS
  const sphereFolderRef = useRef<GUI | null>(null);
  const sphereControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [sphereMaterialProps, setSphereMaterialProps] = useState({
    color: '#4dff29',
    metalness: 0,
    roughness: 1,
    opacity: 1.0,
    emissive: '#4dff29',
    emissiveIntensity: 0.2,
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
    emissiveIntensity: 0,
    envMapImages: listOfImages,
    envMapImage: '/images/silver_5.jpg',
  });

  // CUSHION COVER GUI REFS
  const cushionCoverFolderRef = useRef<GUI | null>(null);
  const cushionCoverageControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [cushionCoverMaterialProps, setCushionCoverageMaterialProps] = useState({
    color: '#e4e3e3',
    opacity: 0.1,
  });

  useEffect(() => {
    const guiThree = new GUI({
      width: 350,
      title: 'LEFT - SECOND FROM THE TOP x'
    });
    // Position the GUI
    guiThree.domElement.style.position = 'absolute';
    guiThree.domElement.style.left = '10px';
    guiThree.domElement.style.top = '915px';

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

    // // TEXT FOLDER
    // const textFolder = guiOne.addFolder('Text');
    // textFolderRef.current = textFolder;
    // // textFolderRef.current.open();

    // const localTextProps = {
    //   color: textMaterialProps.color,
    //   opacity: textMaterialProps.opacity,
    //   roughness: textMaterialProps.roughness,
    //   metalness: textMaterialProps.metalness,
    //   emissive: textMaterialProps.emissive,
    //   emissiveIntensity: textMaterialProps.emissiveIntensity,
    // }

    // // add controls for each property
    // textControllersRef.current.colorController = textFolder
    //   .addColor(localTextProps, 'color')
    //   .name('Color')
    //   .onChange((value: string) => {
    //     setTextMaterialProps(prev => ({ ...prev, color: value }));
    //   });

    // textControllersRef.current.opacityController = textFolder
    //   .add(localTextProps, 'opacity', 0, 1, 0.01)
    //   .name('Opacity')
    //   .onChange((value: number) => {
    //     setTextMaterialProps(prev => ({ ...prev, opacity: value }));
    //   });

    // textControllersRef.current.roughnessController = textFolder
    //   .add(localTextProps, 'roughness', 0, 1, 0.01)
    //   .name('Roughness')
    //   .onChange((value: number) => {
    //     setTextMaterialProps(prev => ({ ...prev, roughness: value }));
    //   });

    // textControllersRef.current.metalnessController = textFolder
    //   .add(localTextProps, 'metalness', 0, 1, 0.01)
    //   .name('Metalness')
    //   .onChange((value: number) => {
    //     setTextMaterialProps(prev => ({ ...prev, metalness: value }));
    //   });

    // textControllersRef.current.emissiveController = textFolder
    //   .addColor(localTextProps, 'emissive')
    //   .name('Emissive')
    //   .onChange((value: string) => {
    //     setTextMaterialProps(prev => ({ ...prev, emissive: value }));
    //   });

    // textControllersRef.current.emissiveIntensityController = textFolder
    //   .add(localTextProps, 'emissiveIntensity', 0, 1, 0.01)
    //   .name('Emissive Intensity')
    //   .onChange((value: number) => {
    //     setTextMaterialProps(prev => ({ ...prev, emissiveIntensity: value }));
    //   });
    // TEXT BOLD FOLDER
    const textBoldFolder = guiThree.addFolder('Text');
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

    // SPHERE FOLDER
    const sphereFolder = guiThree.addFolder('Sphere');
    sphereFolderRef.current = sphereFolder;

    const localSphereProps = {
      color: sphereMaterialProps.color,
      metalness: sphereMaterialProps.metalness,
      roughness: sphereMaterialProps.roughness,
      opacity: sphereMaterialProps.opacity,
      emissive: sphereMaterialProps.emissive,
      emissiveIntensity: sphereMaterialProps.emissiveIntensity
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
    const cushionFolder = guiThree.addFolder('Cushion');
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

    // CUSHION COVERAGE FOLDER
    const cushionCoverFolder = guiThree.addFolder('Cushion Cover');
    cushionCoverFolderRef.current = cushionCoverFolder;

    const localCushionCoverageProps = {
      color: cushionCoverMaterialProps.color,
      opacity: cushionCoverMaterialProps.opacity,
    }

    // add controls for each property
    cushionCoverageControllersRef.current.colorController = cushionCoverFolder
      .addColor(localCushionCoverageProps, 'color')
      .name('Color')
      .onChange((color: string) => {
        setCushionCoverageMaterialProps((prev) => ({ ...prev, color }));
      });

    cushionCoverageControllersRef.current.opacityController = cushionCoverFolder
      .add(localCushionCoverageProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((opacity: number) => {
        setCushionCoverageMaterialProps((prev) => ({ ...prev, opacity }));
      });
    
    return () => {
      guiThree.destroy();
    }
  }, []);

  return (
    <group position={[0, 0, 0]} scale={[1.0, 1.0, 1.0]} ref={logoThreeGroupRef}>
      {/* <DeloitteDigitalLogoGroup
        textBoldMaterialProps={textBoldMaterialProps}
        textLightMaterialProps={textLightMaterialProps}
        sphereMaterialProps={sphereMaterialProps}
      /> */}
      <Text text={'DP&I'} position={[0, 0, 0.3]} rotation={new THREE.Euler(0, 0, 0)} textBoldMaterialProps={textBoldMaterialProps} />

      {/* <Text text={'DP&I'} position={[0, 0, 0.3]} rotation={new THREE.Euler(0, 0, 0)} size={0.8} depth={0.5} textMaterialProps={textMaterialProps} /> */}
      <CushionCover size={0.92} scale={[1.7, 1.7, 0.3]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionCoverMaterialProps={cushionCoverMaterialProps} />
      <Cushion size={0.9} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionMaterialProps={cushionMaterialProps} />
    </group>    
  );
}

export default LogoThreeGroup;
