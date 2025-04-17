// src/components/SoundZone.jsx
import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { PositionalAudio, AudioLoader, AudioListener, Vector3 } from 'three';

const SoundZone = ({ position = [0, 0, 0], audioUrl }) => {
  const meshRef = useRef();
  const soundRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    const listener = new AudioListener();
    camera.add(listener);

    const sound = new PositionalAudio(listener);
    soundRef.current = sound;

    const loader = new AudioLoader();
    loader.load(audioUrl, (buffer) => {
      sound.setBuffer(buffer);
      sound.setRefDistance(1);
      sound.setLoop(true);
      sound.setVolume(1);
      sound.play();
    });

    meshRef.current.add(sound);

    return () => {
      if (sound.isPlaying) sound.stop();
      camera.remove(listener);
    };
  }, []);

  return (
    <mesh ref={meshRef} position={position} visible={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial transparent opacity={0} />
    </mesh>
  );
};

export default SoundZone;
