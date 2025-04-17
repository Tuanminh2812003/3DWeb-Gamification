import React, { useRef, useEffect, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Html } from '@react-three/drei';
import "./PictureFrame.css";
import HotspotSphere from './HotspotSphere';

function PictureFrame({ position, rotation, scale, imageUrl, modelUrl, onClick, info = { artist: '', title: '', year: '' }, onDetailClick, showDetailsPrompt, setShowDetailsPrompt, tourPopupOpen, video, type, hover, hotspots, onHotspotClick, }) {
    const texture = useLoader(THREE.TextureLoader, imageUrl);
    const model = useLoader(GLTFLoader, modelUrl);
    const ref = useRef();
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const isHover = hover;

    useEffect(() => {
        if (ref.current) {
            const { width, height } = texture.image;
            const aspectRatio = width / height;
            ref.current.scale.set(aspectRatio * scale, scale, 1); // Set scale
        }
    }, [texture, scale]);

    useEffect(() => {
        if (clicked) {
            const timer = setTimeout(() => {
                setClicked(false);
            }, 5000); // Hide after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [clicked]);

    const handlePointerOver = (e) => {
        document.body.style.cursor = 'pointer';
        setHovered(true);
    };

    const handlePointerOut = (e) => {
        document.body.style.cursor = 'default';
        setHovered(false);
    };

    const handleClick = () => {
        if (onClick) {
            onClick(position, rotation, ref.current, info);
        }
        setClicked(true);
    };

    const handleDetailClick = (e) => {
        e.stopPropagation();
        setClicked(false);
        if (onDetailClick) {
            onDetailClick(imageUrl, info, video, model);
        }
    };

    useEffect(() => {
        if (tourPopupOpen) {
            setClicked(true);
        }
    }, [tourPopupOpen]);

    // Clone model to prevent changes in other instances
    const cloneModel = model ? model.scene.clone() : null;

    return (
        <>
            {isHover === "1" ? (
                <group
                position={position}
                rotation={rotation.map(r => r * (Math.PI / 180))}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onClick={handleClick}
            >
                {/* Render for image */}
                {type === 'image' ? (
                    <mesh ref={ref}>
                        <planeGeometry args={[1, 1]} />
                        <meshBasicMaterial map={texture} />
                    </mesh>
                ) : null}
    
                {/* Render for model */}
                {type === 'model' && model ? (
                    <primitive object={cloneModel || model.scene} scale={[scale, scale, scale]} />
                ) : null}
    
                {(hovered || clicked || tourPopupOpen) && (
                    <Html position={[0, 1, 0]} center>
                        <div className="picture-info">
                            <div className="picture-info__artist">{info.artist}</div>
                            <div className="picture-info__disc">{info.title} - {info.year}</div>
                            {(clicked || tourPopupOpen) && (
                                <button onClick={handleDetailClick} className="details-button">
                                    Xem chi tiết
                                </button>
                            )}
                        </div>
                    </Html>
                )}
            </group>
            ) : (
                <group
            position={position}
            rotation={rotation.map(r => r * (Math.PI / 180))}
        >
            {/* Render for image */}
            {type === 'image' ? (
                <mesh ref={ref}>
                    <planeGeometry args={[1, 1]} />
                    <meshBasicMaterial map={texture} />
                </mesh>
            ) : null}

            {/* Render for model */}
            {type === 'model' && model && (
            <group>
                <primitive object={cloneModel || model.scene} scale={[scale, scale, scale]} />

                {hotspots.map((hotspot) => (
                    <HotspotSphere
                        key={hotspot.id}
                        position={hotspot.position}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (typeof onHotspotClick === 'function') {
                                onHotspotClick(hotspot);
                            }
                        }}
                    />
                ))}
            </group>
            )}

            {(hovered || clicked || tourPopupOpen) && (
                <Html position={[0, -2, 0]} center>
                    <div className="picture-info">
                        <div className="picture-info__artist">{info.artist}</div>
                        <div className="picture-info__disc">{info.title} - {info.year}</div>
                        {(clicked || tourPopupOpen) && (
                            <button onClick={handleDetailClick} className="details-button">
                                Xem chi tiết
                            </button>
                        )}
                    </div>
                </Html>
            )}
        </group>
            )}
        </>
    );
}

export default PictureFrame;
