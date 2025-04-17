import React, { useState, useEffect, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VideoTexture, MathUtils, DoubleSide } from 'three';

const ModelLoaderWithVideo = ({ path, position, rotation = [0, 0, 0], scale, videoUrl, mesh, onClick }) => {
    const model = useLoader(GLTFLoader, path);
    const videoRef = useRef();
    const [videoTexture, setVideoTexture] = useState(null); // Khởi tạo state để lưu trữ videoTexture

    useEffect(() => {
        // Tạo phần tử video
        const video = document.createElement('video');
        video.src = videoUrl;
        video.crossOrigin = 'anonymous';
        video.loop = true;
        video.muted = true;  // 🔥 Bắt buộc để autoplay trên iOS
        video.playsInline = true; // 🔥 Bắt buộc để không bị full màn hình trên iOS
        video.autoplay = true;  // 🔥 Yêu cầu tự động phát

        video.play().catch((error) => {
            console.error('Lỗi phát video:', error);
        });

        // Tạo VideoTexture từ phần tử video
        const newVideoTexture = new VideoTexture(video);
        newVideoTexture.center.set(0.5, 0.5);
        newVideoTexture.rotation = MathUtils.degToRad(180);

        setVideoTexture(newVideoTexture); // Lưu videoTexture vào state
        videoRef.current = video;

        return () => {
            video.pause();
            video.src = '';
            videoRef.current = null;
        };
    }, [videoUrl]);

    useEffect(() => {
        if (videoTexture) {
            // Tìm và gán VideoTexture cho lưới màn hình trong mô hình
            model.scene.traverse((child) => {
                if (child.isMesh && child.name === mesh) { // Thay 'Cube007' thành tên của lưới bạn muốn gán texture
                    child.material.map = videoTexture;
                    child.material.side = DoubleSide;
                    child.material.needsUpdate = true;
                }
            });
        }
    }, [model, videoTexture]); // Chạy khi videoTexture được tạo

    // Xử lý hover
    const handlePointerOver = (e) => {
        document.body.style.cursor = 'pointer';
    };

    const handlePointerOut = (e) => {
        document.body.style.cursor = 'default';
    };

    return (
        <group 
            position={position} 
            rotation={rotation} 
            scale={scale}
            onPointerOver={handlePointerOver} 
            onPointerOut={handlePointerOut}
            onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick(); // Gọi callback khi click
            }}
        >
            <primitive object={model.scene} />
        </group>
    );
};

export default ModelLoaderWithVideo;
