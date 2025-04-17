import React, { useRef, useEffect, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Html } from '@react-three/drei';
import "./PictureFrame.css";

function HotspotSphere({ position, onClick }) {
    const ref = useRef();
    const [hovered, setHovered] = useState(false);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        let animationFrame;

        const animate = () => {
            const pulse = hovered
                ? 1 + 0.3 * Math.sin(Date.now() / 150)  // mạnh hơn khi hover
                : 1 + 0.1 * Math.sin(Date.now() / 300); // nhẹ hơn khi không hover

            setScale(pulse);
            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationFrame);
    }, [hovered]);

    return (
        <mesh
            ref={ref}
            position={position}
            scale={[scale, scale, scale]}
            onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(true);
                document.body.style.cursor = 'pointer';
            }}
            onPointerOut={(e) => {
                e.stopPropagation();
                setHovered(false);
                document.body.style.cursor = 'default';
            }}
            onClick={onClick}
        >
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
                color={hovered ? '#DC9B49' : '#007bff'}
                emissive={hovered ? '#DC9B49' : '#00bfff'}
                emissiveIntensity={hovered ? 0.8 : 0.2}
            />
        </mesh>
    );
}

export default HotspotSphere;
