import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const HotspotModel = ({ position, scale = 0.05, onClick }) => {
  const gltf = useLoader(GLTFLoader, '/Farm/click_hand.glb'); // Đường dẫn model của bạn

  return (
    <group position={position} onClick={onClick}>
      <primitive object={gltf.scene} scale={[scale, scale, scale]} />
    </group>
  );
};

export default HotspotModel;
