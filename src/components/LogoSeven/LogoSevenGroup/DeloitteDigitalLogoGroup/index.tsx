import { useRef } from 'react';
import { Group } from 'three';
import LogoTextBold from './LogoTextBold';
import * as THREE from 'three';
import GreenDotGlass from './GreenDotGlass';
import LogoTextLight from './LogoTextLight';

interface Props {
  textBoldMaterialProps: {
    color: string;
    metalness: number;
    roughness: number;
    opacity: number;
    emissive: string;
    emissiveIntensity: number;
  },
  textLightMaterialProps: {
    color: string;
    metalness: number;
    roughness: number;
    opacity: number;
    emissive: string;
    emissiveIntensity: number;
  },
  sphereMaterialProps: {
    color: string;
    metalness: number;
    roughness: number;
    opacity: number;
    emissive: string;
    emissiveIntensity: number;
  },
}

function DeloitteDigitalLogoGroup({ textBoldMaterialProps, textLightMaterialProps, sphereMaterialProps }: Props) {
  const logoGroupRef = useRef<Group>(null);

  return (
    <group position={[0.05, -0.05, 1.6]} scale={[0.3, 0.3, 0.3]} ref={logoGroupRef} rotation={new THREE.Euler(0, 0, 0)}>        
      <LogoTextBold text={'Deloitte'} position={[-0.15, 1.0, 0]} rotation={new THREE.Euler(0, 0, 0)} textBoldMaterialProps={textBoldMaterialProps} />
      <LogoTextLight text={'Digital'} position={[-1.7, -1.05, 0]} rotation={new THREE.Euler(0, 0, 0)} textLightMaterialProps={textLightMaterialProps} />
      <GreenDotGlass size={0.25} position={[4.2, 0.3, 0]} sphereMaterialProps={sphereMaterialProps} />
    </group>    
  );
}

export default DeloitteDigitalLogoGroup;