import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';

function MinhTestPicture({ position, rotation, scale, onClick }) {
    const gltf = useLoader(GLTFLoader, '/NTST/Game Station.glb');
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            // Áp dụng một phép quay ban đầu để đảm bảo bức tranh xuất hiện chính diện
            ref.current.rotation.set(
                rotation[0] * (Math.PI / 180),
                (rotation[1]) * (Math.PI / 180),
                rotation[2] * (Math.PI / 180)
            );
        }
    }, [rotation]);

    // Nhân bản đối tượng
    const clonedScene = clone(gltf.scene);

    const handleClick = () => {
        if (onClick) {
            onClick(position, rotation, null, clonedScene);
        }
    };

    const handlePointerOver = (e) => {
        document.body.style.cursor = 'pointer';
    };
    const handlePointerOut = (e) => {
        document.body.style.cursor = 'default';
    };

    return (
        <group 
            ref={ref} 
            position={position} 
            scale={scale} 
            onClick={handleClick} 
            onPointerOver={handlePointerOver} 
            onPointerOut={handlePointerOut}
        >
            <primitive object={clonedScene} />
        </group>
    );
}

export default MinhTestPicture;
