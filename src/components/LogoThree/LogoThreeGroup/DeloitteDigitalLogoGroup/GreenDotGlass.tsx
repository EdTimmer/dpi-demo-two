interface Props {
  position: [number, number, number];
  size: number;
  sphereMaterialProps: {
    color: string;
    metalness: number;
    roughness: number;
    opacity: number;
    emissive: string;
    emissiveIntensity: number;
  };
}

const GreenDotGlass = ({ position, size, sphereMaterialProps }: Props) => {
  return (
    <mesh position={position} renderOrder={4}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={sphereMaterialProps.color}
        metalness={sphereMaterialProps.metalness}
        roughness={sphereMaterialProps.roughness}
        opacity={sphereMaterialProps.opacity}
        emissive={sphereMaterialProps.emissive}
        emissiveIntensity={sphereMaterialProps.emissiveIntensity}
        transparent
      />
    </mesh>
  );
};

export default GreenDotGlass;