import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PictureFrame from '../../components/PictureFrame';
import './ModelPopUp.scss';

const ModelPopup = ({ open, onClose, imageUrl, info, modelUrl, video, imageInfo, onAudioEnded, tourActive, hotspots = [] }) => {
    const [selectedHotspot, setSelectedHotspot] = useState(null);
    const audioRef = useRef(null);

    useEffect(() => {
        const audioElement = audioRef.current;

        if (audioElement && video && tourActive) {
            audioElement.play().catch((e) => {
                console.warn("Autoplay bị chặn:", e);
            });

            audioElement.addEventListener('ended', onAudioEnded);

            return () => {
                audioElement.pause();
                audioElement.currentTime = 0;
                audioElement.removeEventListener('ended', onAudioEnded);
            };
        }
    }, [video, tourActive, onAudioEnded]);

    useEffect(() => {
        // Nếu chọn hotspot và description chứa iframe, thì pause audio
        if (selectedHotspot?.description?.includes('<iframe')) {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        }
    }, [selectedHotspot]);

    const handleClose = () => {
        setSelectedHotspot(null);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Thông tin tác phẩm</DialogTitle>
            <div className="dialogContent">
                {!selectedHotspot && (
                    <>
                        <Canvas className="canvas">
                            <PictureFrame
                                position={[0, 0, 0]}
                                rotation={[0, 0, 0]}
                                scale={2}
                                imageUrl={imageUrl}
                                modelUrl={modelUrl}
                                info={info}
                                onClick={() => {}}
                                type={'model'}
                                hotspots={hotspots}
                                onHotspotClick={setSelectedHotspot}
                            />
                            <OrbitControls />
                        </Canvas>
                        <img className='image-default' src={imageInfo} alt="Chi tiết tác phẩm" style={{ maxWidth: '100%', marginTop: '20px' }} />
                    </>
                )}

                {selectedHotspot?.componentData && (
                <div className="image-default">
                    <Canvas className="canvas">
                    <PictureFrame
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                        scale={3}
                        imageUrl={selectedHotspot.componentData.imageUrl}
                        modelUrl={selectedHotspot.componentData.modelUrl}
                        info={selectedHotspot.componentData.info}
                        onClick={() => {}}
                        type={'model'}
                        hotspots={[]}
                        onHotspotClick={() => {}}
                    />
                    <OrbitControls />
                    </Canvas>
                    <div style={{ marginTop: "24px" }} className='image-default__inner__button' onClick={() => setSelectedHotspot(null)}>
                    Quay lại
                    </div>
                </div>
                )}

                {selectedHotspot?.description && (
                    <div className="image-default">
                        <div className='image-default__inner' dangerouslySetInnerHTML={{ __html: selectedHotspot.description }} />
                        <div style={{marginTop:"24px"}} className='image-default__inner__button' onClick={() => setSelectedHotspot(null)}>
                            Quay lại
                        </div>
                    </div>
                )}

                {video && (
                    <audio ref={audioRef} src={video} autoPlay controls style={{display:"none"}} />
                )}
            </div>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Đóng</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModelPopup;
