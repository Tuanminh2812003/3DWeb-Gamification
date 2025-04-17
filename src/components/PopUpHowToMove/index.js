import React from 'react';
import Modal from '@mui/material/Modal';
import { Box, Button } from '@mui/material';
import "./PopUpHowToMove.css";
import ButtonVR from '../ButtonVR';

const PopUpHowToMove = ({ open, handleClose }) => {
    return (
        <Modal open={open} onClose={() => handleClose('free')} BackdropProps={{ invisible: true }}>
            <Box 
                sx={{
                    position: 'absolute',
                    top: '40%', // Start higher than center
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: {
                        xs: '95%', // 90% width on extra small screens
                        sm: '90%', // 80% width on small screens
                        md: '50%',  //
                    },
                    maxHeight: '90%',
                    overflow: 'auto',
                    textAlign: 'center',
                    animation: 'slideDown 0.5s forwards, fadeIn 0.5s forwards',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div className='popUpMove__content' 
                    style={{ 
                        position: 'relative',
                        width: '100%',
                        display: 'flex',
                        height: '100%',
                        padding: '20px',
                    }}
                >
                    <div style={{ 
                        position: 'absolute',
                        backgroundColor: '#E6E1D9',
                        top: '0',
                        left: '0',
                        width: '100%',
                        opacity: '0.8',
                        display: 'flex',
                        height: '100%',
                    }}>

                    </div>
                    <div className='popUpMove__content0' style={{ marginBottom: '40px', position: 'relative' }}>
                        <img src='/NTST/HDSD0.png' className='popUpMove__content__content__inner__img'/>
                    </div>
                    <div className='popUpMove__content__inner'>
                        <div className='popUpMove__content1' style={{ marginBottom: '32px', position: 'relative' }}>
                            <img src='/NTST/HDSD1.png' className='popUpMove__content__content__inner__img'/>
                        </div>
                        <div className='popUpMove__content3' style={{  position: 'relative' }}>
                            <img src='/NTST/HDSD3.png' className='popUpMove__content__content__inner__img'/>
                        </div>
                    </div>
                    <div className='popUpMove__content__inner'>
                        <div className='popUpMove__content2' style={{ marginBottom: '32px', position: 'relative' }}>
                            <img src='/NTST/HDSD2.png' className='popUpMove__content__content__inner__img'/>
                        </div>
                        <div className='popUpMove__content4' style={{ position: 'relative' }}>
                        {/* <Button
                            onClick={() => handleClose('update')} 
                            className='button1'
                            style={{ marginBottom: '0px !important' }}
                        >
                            BẮT ĐẦU TOUR
                        </Button> */}
                        {/* <Button 
                            onClick={() => handleClose('free')} 
                            className='button2'
                        >
                            BẮT ĐẦU TRẢI NGHIỆM
                        </Button> */}
                        
                    </div>
                    </div>
                    <div className='popUpMove__content5'>
                        <Button 
                            onClick={() => handleClose('free')} 
                            className='button2'
                        >
                            BẮT ĐẦU CHƠI
                        </Button>
                    </div>
                    
                </div>
            </Box>
        </Modal>
    );
};

export default PopUpHowToMove;
