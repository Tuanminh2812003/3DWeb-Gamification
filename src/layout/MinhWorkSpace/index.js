import React, { useState, lazy, Suspense, useEffect, useRef, useCallback, useMemo, startTransition } from 'react';
import { useTimeContext } from '../../helpers/TimeContext.js'; // Sử dụng context
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

// camera và move
import { CameraProvider } from '../../helpers/CameraContext.js';
import Movement from '../../action/Movement/index';
import Movement2 from '../../action/Movement2/index';

import CameraClick from '../../action/CameraClick/index.js';
import { Vector3, Euler } from 'three';

import PictureFrame from '../../components/PictureFrame/index.js'; // hình ảnh
import ResizeHandler from '../../action/ResizeElement2/index.js'; // responsive model
import Minimap from '../../components/Minimap/index.js';

import Particles from "../../components/Particles/index";

// icon
import { MdOutlineZoomOutMap } from "react-icons/md";
import { MdOutlineZoomInMap } from "react-icons/md";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { RiDragMoveFill } from "react-icons/ri";
import { SiAwesomelists } from "react-icons/si";
import { PiListStarFill } from "react-icons/pi";
import { BsNewspaper } from "react-icons/bs";
import { MdSkipNext } from "react-icons/md";
import { MdSkipPrevious } from "react-icons/md";
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

import { Environment } from '@react-three/drei';
import SoundZone from '../../components/SoudZone/soundZone.js';

// Lazy load các thành phần để tránh tải tất cả cùng lúc
const ModelLoader2 = lazy(() => import('../../components/ModelLoader2/index.js'));
const ModelLoaderWithVideo = lazy(() => import('../../components/ModelLoaderWithVideo/index.js'));
const ModelAnimated2 = lazy(() => import('../../components/ModelAnimated2/index.js'));
const ModelPopup = lazy(() => import('../../components/ModelPopup/index.js'));
const PopUpHowToMove = lazy(() => import('../../components/PopUpHowToMove/index.js'));
const PopUpAboutTheExhibition = lazy(() => import('../../components/PopUpAboutTheExhibition/index.js'));
const PopUpListModel = lazy(() => import('../../components/PopUpListModel/index.js'));
const PopUpUpdate = lazy(() => import('../../components/PopUpUpdate/index.js'));
const PuzzleGame = lazy(() => import('../GamePuzzle/index.js'));
const PuzzleGame2 = lazy(() => import('../GamePuzzle/index2.js'));
const QuestionPopup = lazy(() => import('../../components/QuestionPopup/index.js'));

// Extend THREE with custom geometries
extend({ PlaneGeometry: THREE.PlaneGeometry, BoxGeometry: THREE.BoxGeometry });

function Home2(){

    // Memo hóa các model
const modelsConfig = useMemo(
    () => [
        // {
        //     path: "/NTST/Virtual Gallery.glb",
        //     position: [0, 0, 0],
        //     rotation: [0, 0, 0],
        //     scale: [1, 1, 1],
        //     clickable: false,
        // },
        {
            path: "/Farm/space.glb",
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            scale: [1, 1, 1],
            clickable: false,
        },
        {
            path: "/Farm/typo hanoi.glb",
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            scale: [1, 1, 1],
            clickable: false,
        },
        {
            path: "/Farm/bonus img hanoi.glb",
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            scale: [1, 1, 1],
            clickable: false,
        },
        
        ],
        []
    );

    // mảng items các bức tranh để làm tour
        const [items, setItems] = useState([
            // Your items here...
        ]);
        // mảng items các bức tranh để làm tour
    
        // KHAI BÁO
        // move
        const [yaw, setYaw] = useState(0);
        // move
    
    
        //game
        const { elapsedTime, setGameStartTime } = useTimeContext();
                        const [formattedTime, setFormattedTime] = useState("");
                        const [dem, setdem] = useState(0);
                        const [gameCompleted, setGameCompleted] = useState(false); // Trạng thái trò chơi hoàn thành

        const [showPuzzleGame1, setShowPuzzleGame1] = useState(false);
        const [currentModelPath1, setCurrentModelPath1] = useState("/Farm/manhghep.001.glb"); 
        const [showPuzzleGame2, setShowPuzzleGame2] = useState(false);
        const [currentModelPath2, setCurrentModelPath2] = useState("/Farm/manhghep.002.glb"); 
        const [showGamePopup, setShowGamePopup] = useState(false); // 🔥 State kiểm soát popup game

        const [showQuestionPopup, setShowQuestionPopup] = useState(false);
        const [currentVideo, setCurrentVideo] = useState("Farm/video/hoicham.mp4"); // State quản lý việc hiển thị video
        const [correctAnswer, setCorrectAnswer] = useState(false);
        const [showQuestionPopup2, setShowQuestionPopup2] = useState(false);
        const [currentVideo2, setCurrentVideo2] = useState("Farm/video/hoicham.mp4"); // State quản lý việc hiển thị video
        const [correctAnswer2, setCorrectAnswer2] = useState(false);
        const [showQuestionPopup3, setShowQuestionPopup3] = useState(false);
        const [currentVideo3, setCurrentVideo3] = useState("Farm/video/hoicham.mp4"); // State quản lý việc hiển thị video
        const [correctAnswer3, setCorrectAnswer3] = useState(false);
        const [showQuestionPopup4, setShowQuestionPopup4] = useState(false);
        const [currentVideo4, setCurrentVideo4] = useState("Farm/video/hoicham.mp4"); // State quản lý việc hiển thị video
        const [correctAnswer4, setCorrectAnswer4] = useState(false);

        const [showCompletePopup, setShowCompletePopup] = useState(false); // State cho pop-up hoàn thành
        const [nextPath, setNextPath] = useState("/ninhbinh"); // Path chuyển tiếp
        const navigate = useNavigate();  // Khai báo useNavigate để điều hướng trang
        //game
    
        //hàm game
        const formatTime = (time) => {
                            const seconds = Math.floor(time / 1000);
                            const minutes = Math.floor(seconds / 60);
                            const hours = Math.floor(minutes / 60);
                            const remainingMinutes = minutes % 60;
                            const remainingSeconds = seconds % 60;
                        
                            return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
                          };
                        
                          useEffect(() => {
                            // Chỉ cập nhật thời gian khi game chưa hoàn thành
                            if (!gameCompleted) {
                              const time = formatTime(elapsedTime);
                              setFormattedTime(time); // Cập nhật thời gian nếu trò chơi chưa hoàn thành
                            }
                          }, [elapsedTime, gameCompleted]); // Lắng nghe sự thay đổi của elapsedTime và gameCompleted
        const handlePuzzle1Complete = () => {
            setShowPuzzleGame1(false);
            if(currentModelPath1 !== "/Farm/done.glb"){
                setdem(dem + 1);
            }
            setCurrentModelPath1("/Farm/done.glb"); // Thay đổi model thành Statue 1.glb sau chiến thắng

        };
        const handleShowPuzzleGame1 = () => {
            startTransition(() => {
              setShowPuzzleGame1(true);
            });
          };

        const handlePuzzle2Complete = () => {
            setShowPuzzleGame2(false);
            if(currentModelPath2 !== "/Farm/done.glb"){
                setdem(dem + 1);
            }
            setCurrentModelPath2("/Farm/done.glb"); // Thay đổi model thành Statue 1.glb sau chiến thắng
        };
        const handleShowPuzzleGame2 = () => {
            startTransition(() => {
              setShowPuzzleGame2(true);
            });
          };

          const handleShowQuestionGame = () => {
            setShowQuestionPopup(true); // Hiển thị popup câu hỏi
          };
          const handleCloseQuestionPopup = (isCorrect) => {
            setCorrectAnswer(isCorrect);
            setShowQuestionPopup(false); // Đóng popup sau khi trả lời
            if(currentVideo !== ""){
                if (isCorrect) {
                    setdem(dem + 1);
                    setCurrentVideo(""); // Ẩn video khi trả lời đúng
                }
            }
          };
          const handleShowQuestionGame2 = () => {
            setShowQuestionPopup2(true); // Hiển thị popup câu hỏi
          };
          const handleCloseQuestionPopup2 = (isCorrect) => {
            setCorrectAnswer(isCorrect);
            setShowQuestionPopup2(false); // Đóng popup sau khi trả lời
            if(currentVideo2 !== ""){
                if (isCorrect) {
                    setdem(dem + 1);
                    setCurrentVideo2(""); // Ẩn video khi trả lời đúng
                }
            }
          };
          const handleShowQuestionGame3 = () => {
            setShowQuestionPopup3(true); // Hiển thị popup câu hỏi
          };
          const handleCloseQuestionPopup3 = (isCorrect) => {
            setCorrectAnswer3(isCorrect);
            setShowQuestionPopup3(false); // Đóng popup sau khi trả lời
            if(currentVideo3 !== ""){
                if (isCorrect) {
                    setdem(dem + 1);
                    setCurrentVideo3(""); // Ẩn video khi trả lời đúng
                }
            }
          };
          const handleShowQuestionGame4 = () => {
            setShowQuestionPopup4(true); // Hiển thị popup câu hỏi
          };
          const handleCloseQuestionPopup4 = (isCorrect) => {
            setCorrectAnswer4(isCorrect);
            setShowQuestionPopup4(false); // Đóng popup sau khi trả lời
            if(currentVideo4 !== ""){
                if (isCorrect) {
                    setdem(dem + 1);
                    setCurrentVideo4(""); // Ẩn video khi trả lời đúng
                }
            }
          };

        useEffect(() => {
            if (dem === 6) {
                setShowCompletePopup(true); // Hiển thị pop-up khi đã trả lời đủ 6 câu
            }
        }, [dem]);
    
        const handleCloseCompletePopup = () => {
            setShowCompletePopup(false); // Đóng pop-up
            navigate(nextPath); // Chuyển hướng đến path tiếp theo
        };
    
        //hàm game
    
        //audio
        const [introAudio, setIntroAudio] = useState(null); 
        const [introActive, setIntroActive] = useState(false); // <-- Added state for intro phase
        const [introPausedTime, setIntroPausedTime] = useState(0); // Thời gian đã phát của intro audio
        const [currentAudio, setCurrentAudio] = useState(null); // Để lưu lại audio hiện tại khi pause
        //audio
    
        // click và các chức năng liên quan
        const [clicked, setClicked] = useState(false);
        const [targetPosition, setTargetPosition] = useState([0, 0, 0]);
        const [targetRotation, setTargetRotation] = useState([0, 0, 0]);
        const [selectedImageUrl, setSelectedImageUrl] = useState(null);
        const [selectedModel, setSelectedModel] = useState(null);
        const [selectedInfo, setSelectedInfo] = useState(null); 
        const [selectedVideo, setSelectedVideo] = useState(null);
        const [selectedImageInfo, setSelectedImageInfo] = useState(null);
        const [selectedHotspots, setselectedHotspots] = useState(null);
        const [currentItemIndex, setCurrentItemIndex] = useState(0);
        const [cameraPosition, setCameraPosition] = useState(new Vector3(0, 1.6, 4));
        const [cameraRotation, setCameraRotation] = useState(new Euler(0, Math.PI, 0));
        const [showDetailsPrompt, setShowDetailsPrompt] = useState(false); // <-- Added state for details prompt
        const [promptTimeout, setPromptTimeout] = useState(null); // <-- Added state for prompt timeout
        const [showHowToMove, setShowHowToMove] = useState(true); // <-- Added state for how to move popup
        const [popupOpen, setPopupOpen] = useState(false); // <-- Added state for model popup
        // click và các chức năng liên quan
    
        // giao diện và respondsive
        const [isFullscreen, setIsFullscreen] = useState(false);
        const [landscapePromptVisible, setLandscapePromptVisible] = useState(false);
        const [navToggle, setNavToggle] = useState(false);
        // giao diện và respondsive
    
        // pop up
        const [instructionsOpen, setInstructionsOpen] = useState(true);
        const [popUpAboutTheExhibition, setPopUpAboutTheExhibition] = useState(false);
        const [popUpListModel, setPopUpListModel] = useState(false);
        const [popUpUpdate, setPopUpUpdate] = useState(false);
        // pop up
    
        //tour
        const [showCountdown, setShowCountdown] = useState(false);
        const countdownTimeout = useRef(null);
        const [tourActive, setTourActive] = useState(false);
        const [tourIndex, setTourIndex] = useState(0);
        const [countdown, setCountdown] = useState(10); // Đặt mặc định là 10 giây
        const [countdownInterval, setCountdownInterval] = useState(null);
        const [paused, setPaused] = useState(false); // Thêm trạng thái paused
        const [tourPopupOpen, setTourPopupOpen] = useState(false); // <-- Added state for tour popup
        const [freeExploration, setFreeExploration] = useState(true); // <-- Added state for free exploration
        const [showIntroVideo, setShowIntroVideo] = useState(false);
        const videoRef = useRef(null);
        //tour
    
        // HÀM
        // move
        const handleControl = (action, state) => {
            document.dispatchEvent(new CustomEvent('control', { detail: { action, state } }));
        };
        // move
    
        // click và các chức năng liên quan
        const handlePictureClick = useCallback((position, rotation, imageUrl, modelUrl, info, video, imageInfo, hotspots) => {
            console.log("handlePictureClick called with position:", position);
            console.log("handlePictureClick called with rotation:", rotation);
            console.log("handlePictureClick called with imageUrl:", imageUrl);
            console.log("handlePictureClick called with model:", modelUrl);
            console.log("handlePictureClick called with info:", info);
            console.log("handlePictureClick called with video", video);
            console.log("handlePictureClick called with hotspots", hotspots);
            
            const direction = new Vector3(0, 0, 4);
            const eulerRotation = new Euler(
                rotation[0] * (Math.PI / 180),
                rotation[1] * (Math.PI / 180),
                rotation[2] * (Math.PI / 180)
            );
            
            direction.applyEuler(eulerRotation);
            const newCameraPosition = [
                position[0] + direction.x,
                position[1] + direction.y,
                position[2] + direction.z
            ];
    
            console.log("rotation1", rotation[1]);
            
            let newCameraRotation = [
                rotation[0],
                rotation[1],
                rotation[2]
    
            ];
    
            // if(rotation[1] === 12){
            //     newCameraRotation = [
            //         rotation[0],
            //         rotation[1]+78,
            //         rotation[2]
            //     ];
            // }else if(rotation[1] === 24){
            //     newCameraRotation = [
            //         rotation[0],
            //         rotation[1]+66,
            //         rotation[2]
            //     ];
            // }else{
            //     newCameraRotation = [
            //         rotation[0],
            //         rotation[1]+90,
            //         rotation[2]
            //     ];
            // }
    
            console.log("newCameraPosition:", newCameraPosition);
            
            setTargetPosition(newCameraPosition);
            setTargetRotation(newCameraRotation);
            setSelectedImageUrl(imageUrl);
            setSelectedModel(modelUrl);
            setSelectedInfo(info);
            setSelectedVideo(video);
            setSelectedImageInfo(imageInfo);
            setselectedHotspots(hotspots);
            setClicked(true);
            setShowDetailsPrompt(true); // Hiển thị chi tiết prompt
            clearTimeout(promptTimeout); // Xóa timeout hiện tại nếu có
            setPromptTimeout(setTimeout(() => setShowDetailsPrompt(false), 5000)); // Ẩn prompt sau 5 giây
        }, [tourIndex, tourActive]);    
        
        const handleDetailClick = (imageUrl, info, video, modelUrl) => {
            console.log("Model in handleDetailClick:", modelUrl);
            setSelectedImageUrl(imageUrl);
            setSelectedInfo(info); // Set the selected info
            setSelectedVideo(video); // Set the selected video link
            setPopupOpen(true);
            setShowDetailsPrompt(false); // Hide the details prompt when popup opens
            setTourPopupOpen(false); // Hide the tour popup when model popup opens
            console.log("Selected Model:", selectedModel); // Debugging the selected model
    
            if(video){
                backgroundAudioRef.current.pause();
            }
        
            if (countdownInterval) {
                clearInterval(countdownInterval); // Dừng bộ đếm thời gian
                setCountdownInterval(null);
                setPaused(true); // Đặt trạng thái paused thành true
            }
        
            if (currentAudio) {
                currentAudio.pause(); // Dừng audio hiện tại nếu có
            }
    
            const audio = new Audio(video);
            setCurrentAudio(audio);
            if(tourActive){
                audio.play();
                audio.onended = handleAudioEnded;
            }
    
            console.log(modelUrl);
        };    
    
        const updateCameraState = (position, rotation) => {
            setCameraPosition(new Vector3(position.x, position.y, position.z));
            setCameraRotation(new Euler(rotation.x, rotation.y, rotation.z));
        };
    
        // hàm xử lý sự kiện hoàn tất di chuyển camera
        const handleCameraMoveComplete = () => {
            setClicked(false); // Reset clicked state after camera move complete
            if (tourActive) {
                setPopupOpen(true); // Tự động mở popup khi di chuyển đến bức tranh
            }
        };
    
        const handleListItemClick = (item) => {
            handlePictureClick(item.position, item.rotation, item.imageUrl, item.modelUrl, item.info, item.video, item.imageInfo, item.hotspots);
            handleClosePopUpListModel();
        };
    
        const handleNextItem = () => {
            if (currentItemIndex < items.length - 1) {
                const nextIndex = currentItemIndex + 1;
                setCurrentItemIndex(nextIndex);
                const nextItem = items[nextIndex];
                handlePictureClick(nextItem.position, nextItem.rotation, nextItem.imageUrl, nextItem.modelUrl, nextItem.info, nextItem.video, nextItem.imageInfo, nextItem.hotspots);
            }
        };
    
        const handlePreviousItem = () => {
            if (currentItemIndex > 0) {
                const prevIndex = currentItemIndex - 1;
                setCurrentItemIndex(prevIndex);
                const prevItem = items[prevIndex];
                handlePictureClick(prevItem.position, prevItem.rotation, prevItem.imageUrl, prevItem.modelUrl, prevItem.info, prevItem.video, prevItem.imageInfo, prevItem.hotspots);
            }
        };
    
        //Tour
    
        const handleStartVideo = () => {
            setShowIntroVideo(true);
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.requestFullscreen().catch(err => console.log("Lỗi fullscreen:", err));
                    videoRef.current.play();
                }
            }, 500); // Chờ một chút để state cập nhật
        };
    
        const handleCloseVideo = () => {
            setShowIntroVideo(false);
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        };
    
        const startTour = () => {
            setPaused(false);
            if (countdownInterval) {
                clearInterval(countdownInterval);
                setCountdownInterval(null);
            }
            
            if (introAudio) {
                introAudio.pause(); // Dừng intro audio nếu nó đang phát
                setIntroAudio(null); // Xóa đối tượng intro audio
            }
        
            setTourActive(true);
            setIntroActive(true); // <-- Set introActive to true
            setFreeExploration(false);
            setCountdown(300); // Đặt thời gian đếm ngược cho toàn bộ tour, ví dụ: 300 giây (5 phút)
            playIntroAudioAndMove();
        };
    
        const startFreeExploration = () => {
            setTourActive(false);
            setFreeExploration(true);
        };
    
        const moveToItem = (index) => {
            if (index < items.length) {
                const item = items[index];
                handlePictureClick(item.position, item.rotation, item.imageUrl, item.modelUrl, item.info, item.video, item.imageInfo, item.hotspots);
                setTourIndex(index);
                // setTourPopupOpen(true); 
            } else {
                endTour();
            }
        };
    
        const endTour = () => {
            setPaused(false);
            setTourActive(false);
            setTourIndex(0);
            setCountdown(0);
            setTourPopupOpen(false); // Ẩn popup tour
            setShowHowToMove(true); // Hiển thị popup HowToMove
        
            if (countdownInterval) {
                clearInterval(countdownInterval);
                setCountdownInterval(null);
            }
            
            if (introAudio) {
                introAudio.pause(); // Dừng intro audio nếu nó đang phát
                setIntroAudio(null); // Xóa đối tượng intro audio
            }
        };
    
        // pauseTour function to pause the tour
        const pauseTour = () => {
            setPaused(true);
            setFreeExploration(true);
        
            if (countdownInterval) {
                clearInterval(countdownInterval);
                setCountdownInterval(null);
            }
        
            if (introActive && introAudio) {
                introAudio.pause(); // Dừng intro audio
                setIntroPausedTime(introAudio.currentTime); // Lưu thời gian đã phát
            } else if (currentAudio) {
                currentAudio.pause(); // Dừng audio của tranh
            }
        };
    
        // continueTour function to continue the tour
        const continueTour = () => {
            setPaused(false);
            setFreeExploration(false);
        
            if (introActive && introAudio) {
                introAudio.currentTime = introPausedTime; // Tiếp tục từ thời gian đã tạm dừng
                introAudio.play();
            } else if (currentAudio) {
                currentAudio.play(); // Tiếp tục audio của tranh
            } else {
                moveToItem(tourIndex); // Di chuyển đến tranh hiện tại trong tour
            }
        
            let interval = setInterval(() => {
                setCountdown(prevCountdown => {
                    if (prevCountdown > 1) {
                        return prevCountdown - 1;
                    } else {
                        endTour();
                        return 0;
                    }
                });
            }, 1000);
            setCountdownInterval(interval);
        };    
        useEffect(() => {
            const handleMouseMove = () => {
                setShowCountdown(true);
                if (countdownTimeout.current) {
                    clearTimeout(countdownTimeout.current);
                }
                countdownTimeout.current = setTimeout(() => {
                    setShowCountdown(false);
                }, 1000); // Thời gian ẩn countdown sau 1 giây không có hoạt động chuột
            };
        
            window.addEventListener('mousemove', handleMouseMove);
        
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                if (countdownTimeout.current) {
                    clearTimeout(countdownTimeout.current);
                }
            };
        }, []);
        //Tour
    
        // giao diện và respondsive
        // Chặn cuộn trang trên thiết bị di động
        useEffect(() => {
            const disableScroll = (e) => {
                // Chỉ chặn cuộn khi không có popup nào đang mở và không hiển thị hướng dẫn
                if (!showHowToMove && !popupOpen) {
                    e.preventDefault();
                }
            };
        
            window.addEventListener('touchmove', disableScroll, { passive: false });
        
            return () => {
                window.removeEventListener('touchmove', disableScroll);
            };
        }, [showHowToMove, popupOpen]);
        useEffect(() => {
            const handleFullscreenChange = () => {
                setIsFullscreen(!!document.fullscreenElement);
            };
    
            document.addEventListener('fullscreenchange', handleFullscreenChange);
    
            return () => {
                document.removeEventListener('fullscreenchange', handleFullscreenChange);
            };
        }, []);
    
        const handleFullscreenToggle = () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        };
    
        const navHandler = () => {
            setNavToggle(prevData => !prevData);
        };
    
        const updateItemsForScreenSize = (newItems) => {
            setItems(newItems);
        };
        // giao diện và respondsive
    
        // pop up
        const handleClosePopup = () => {
            setPopupOpen(false);
            if (currentAudio) {
                currentAudio.pause(); // Dừng audio hiện tại
                setCurrentAudio(null); // Xóa đối tượng audio hiện tại
            }
            // ✅ Phát lại nhạc nền nếu có
            if (backgroundAudioRef.current) {
                backgroundAudioRef.current.play();
            }
            if (tourActive && !paused) {
                moveToItem(tourIndex + 1);
            }
        };    
    
        const handleCloseInstructions = () => {
            setInstructionsOpen(false);
        };
    
        const handleOpenInstructions = () => {
            setShowHowToMove(true);
        };
        const handleOpenPopUpUpdate = () => {
            setPopUpUpdate(true);
        };
        const handleClosePopUpUpdate = () => {
            setPopUpUpdate(false);
        };
    
        const handleClosePopUpAboutTheExhibition = () => {
            setPopUpAboutTheExhibition(false);
        };
    
        const handleOpenPopUpAboutTheExhibition = () => {
            setPopUpAboutTheExhibition(true);
        };
    
        const handleOpenPopUpListModel = () => {
            setPopUpListModel(true);
        };
    
        const handleClosePopUpListModel = () => {
            setPopUpListModel(false);
        };
    
        const handleCloseHowToMove = (mode) => {
            setShowHowToMove(false);
            if (mode === 'free') {
                startFreeExploration();
            } else if (mode === 'tour') {
                startTour();
            } else if (mode === 'update') {
                setPopUpUpdate(true);
            }
        };
        // pop up
    
        // kiểm tra hướng màn hình
        useEffect(() => {
            const handleOrientationChange = () => {
                if (window.orientation === 90 || window.orientation === -90) {
                    setLandscapePromptVisible(false);
                } else if (/Mobi|Android/i.test(navigator.userAgent)) {
                    setLandscapePromptVisible(true);
                }
            };
        
            window.addEventListener("orientationchange", handleOrientationChange);
        
            // kiểm tra hướng khi trang được tải
            handleOrientationChange();
        
            return () => {
                window.removeEventListener("orientationchange", handleOrientationChange);
            };
        }, []);
        
        const closeLandscapePrompt = () => {
            setLandscapePromptVisible(false);
        };
    
        // phát audio
        const playIntroAudioAndMove = () => {
            const audio = new Audio('/NTST/VR Gallery.mp4');
            setIntroAudio(audio); // Lưu intro audio vào state
            audio.play();
            audio.volume = 1;
            
            audio.onended = () => {
                setIntroActive(false); // <-- Set introActive to false
                startTourAfterIntro();
            };
        };
    
        const startTourAfterIntro = () => {
            setTourIndex(0);
            setFreeExploration(false);
            moveToItem(0);
        };
    
        const handleAudioEnded = () => {
            setCurrentAudio(null); // Xóa đối tượng audio hiện tại sau khi phát xong
            setPopupOpen(false);
            if (tourActive && !paused) {
                moveToItem(tourIndex + 1);
            }
        };    

    const backgroundAudioRef = useRef(null);
    
        useEffect(() => {
            const audio = new Audio('/Farm/Music/hanoi.MP3');
            audio.loop = true;
            audio.volume = 1;
            backgroundAudioRef.current = audio;
    
            const playAudio = () => {
                audio.play().catch((e) => {
                    console.warn("Autoplay bị chặn:", e);
                });
            };
    
            document.addEventListener("click", playAudio, { once: true });
    
            return () => {
                audio.pause();
                audio.currentTime = 0;
                document.removeEventListener("click", playAudio);
            };
        }, []);
    
    // phát audio
    

    return(
        <>
            <CameraProvider>
                <div className='main'>
                    {/* Thông báo xoay màn hình */}
                    {landscapePromptVisible && (
                        <div id="landscape-prompt">
                            <div className='landscape-prompt-content'>
                                <div class="iframe-container">
                                    <iframe src="https://giphy.com/embed/XXU2vaPVrnhV7ZAGpY" className='gif-rotate-phone'></iframe>
                                    <div class="iframe-overlay"></div>
                                </div>
                                
                                <p>
                                    Rotate device for better experience
                                </p>
                            </div>
                            <button onClick={closeLandscapePrompt}>✕</button>
                        </div>
                    )}
                    {/* Thông báo xoay màn hình */}
                    <Canvas dpr={[1, 2]}
                    shadows
                    gl={{
                        toneMapping: THREE.ACESFilmicToneMapping,
                        // colorSpace: THREE.LinearSRGBColorSpace, // Use this instead of `sRGBEncoding`
                        antialias: true 
                    }}>
                        <Environment files="/hdri.jpg" background />
                        <Suspense fallback={null}>
                                {/* Môi trường */}

                                {/* Render các ModelLoader từ mảng config */}
                                {modelsConfig.map((modelProps, index) => (
                                    <ModelLoader2 key={index} {...modelProps} />
                                ))}

                                {/* <ModelInspector path="/assets/space2/untitled.glb" /> */}

                                {/* <ModelLoaderWithVideo
                                    path="/NTST/TV Screen.glb"
                                    position={[0, 0, 0]}
                                    rotation={[0, 0, 0]}
                                    scale={[1, 1, 1]}
                                    videoUrl="/NTST/VR Gallery.mp4"
                                    mesh ="TV_Screen001"
                                /> */}
                                <ModelLoaderWithVideo
                                    path="/Farm/cauhoi_1.glb"
                                    position={[-5, 1.5, -3.94693]}
                                    rotation={[0, Math.PI, 0]}
                                    scale={[1, 1, 1]}
                                    videoUrl={currentVideo}
                                    mesh ="cauhoi_1"
                                    onClick={handleShowQuestionGame}
                                />
                                <ModelLoaderWithVideo
                                    path="/Farm/cauhoi_3.glb"
                                    position={[2, 1.5, -3.94693]}
                                    rotation={[0, Math.PI, 0]}
                                    scale={[1, 1, 1]}
                                    videoUrl={currentVideo3}
                                    mesh ="cauhoi_1"
                                    onClick={handleShowQuestionGame3}
                                />
                                <ModelLoaderWithVideo
                                    path="/Farm/cauhoi_4.glb"
                                    position={[5, 1.5, -3.94693]}
                                    rotation={[0, Math.PI, 0]}
                                    scale={[1, 1, 1]}
                                    videoUrl={currentVideo4}
                                    mesh ="cauhoi_1"
                                    onClick={handleShowQuestionGame4}
                                />
                                <ModelLoaderWithVideo
                                    path="/Farm/cauhoi_2.glb"
                                    position={[-2, 1.5, -3.94693]}
                                    rotation={[0, Math.PI, 0]}
                                    scale={[1, 1, 1]}
                                    videoUrl={currentVideo2}
                                    mesh ="cauhoi_1"
                                    onClick={handleShowQuestionGame2}
                                />
                                {/* <ModelAnimated2
                                    path="/NTST/Game Station.glb" // Đường dẫn đến file GLB/GLTF
                                    position={[0, 0, 0]}
                                    rotation={[0, 0, 0]}
                                    scale={[1, 1, 1]}
                                    onClick={() => setShowGamePopup(true)}
                                /> */}
                                <ModelAnimated2
                                    path={currentModelPath1} // Sử dụng trạng thái currentModelPath
                                    position={[-2.04031, 1.19156, 0.5]}
                                    rotation={[0, 0, 0]}
                                    scale={[1, 1, 1]}
                                    onClick={handleShowPuzzleGame1}
                                    
                                />
                                <ModelAnimated2
                                    path={currentModelPath2} // Sử dụng trạng thái currentModelPath
                                    position={[2.04031, 1.19156, 0.5]}
                                    rotation={[0, 0, 0]}
                                    scale={[1, 1, 1]}
                                    onClick={handleShowPuzzleGame2}
                                    
                                />
                                
                                <ambientLight intensity={2.5} />

                                {/* Chiếu sáng các model cụ thể */}
                                
                                {/* Môi trường */}

                                {/* item */}
                                
                                {items.map(item => (
                                    <PictureFrame
                                        key={item.id}
                                        position={item.position}
                                        rotation={item.rotation}
                                        scale={item.scale}
                                        imageUrl={item.imageUrl}
                                        modelUrl={item.modelUrl}
                                        info={item.info}
                                        video={item.video}
                                        type={item.type}
                                        imageInfo={item.imageInfo}
                                        onClick={(position, rotation) => handlePictureClick(position, rotation, item.imageUrl, item.modelUrl, item.info, item.video, item.imageInfo, item.hotspots)}
                                        onDetailClick={handleDetailClick}
                                        showDetailsPrompt={showDetailsPrompt} // Pass showDetailsPrompt state
                                        setShowDetailsPrompt={setShowDetailsPrompt} // Pass setShowDetailsPrompt function
                                        tourPopupOpen={tourPopupOpen && tourIndex === items.indexOf(item)}
                                        hover="1"
                                    />
                                ))}

                                {/* item */}

                                {/* Hàm bổ trợ */}
                                <CameraClick
                                    targetPosition={targetPosition}
                                    targetRotation={targetRotation}
                                    clicked={clicked}
                                    setClicked={setClicked}
                                    onMoveComplete={handleCameraMoveComplete}
                                    updateCameraState={updateCameraState}
                                />
                                {!clicked && <Movement2 cameraPosition={cameraPosition} cameraRotation={cameraRotation} clicked={clicked} freeExploration={freeExploration} />}
                                {/* Hàm bổ trợ */}
                                {/* <EffectComposer>
                                    <SSAO samples={31} radius={20} intensity={15} luminanceInfluence={0.6} />
                                    <DepthOfField focusDistance={0.015} focalLength={0.02} bokehScale={2} />
                                </EffectComposer> */}
                                {/* bloom, vignette, color correction, noise, film grain, Lens Distortion / Chromatic Aberration, Glitch, God Rays (Light Shafts), Hue/Saturation, Tone Mapping, Outline, Tilt Shift, Bloom Selective */}

                        </Suspense>
                    </Canvas>

                    {/* Thanh sidebar */}
                    <div className='sidebarMain'>
                        {/* <div className={`fullscreen_button ${navToggle ? 'fullscreen_button-change' : ""}`} onClick={handlePreviousItem}>
                            <MdSkipPrevious />
                        </div>
                        <div className={`fullscreen_button ${navToggle ? 'fullscreen_button-change' : ""}`} onClick={handleNextItem}>
                            <MdSkipNext />
                        </div> */}
                        {/* <div className={`fullscreen_button ${navToggle ? 'fullscreen_button-change' : ""}`} onClick={}>
                            <MdSkipPrevious />
                        </div>
                        <div className={`fullscreen_button ${navToggle ? 'fullscreen_button-change' : ""}`} onClick={handleOpenPopUpUpdate}>
                            <MdSkipNext />
                        </div> */}
                        <div type = "button" className={"cauhoi"}>
                            Thời gian đã chơi: {formattedTime} ---
                        </div>
                        <div type = "button" className={"cauhoi"}>
                            Màn 2 ---
                        </div>
                        <div type = "button" className={"cauhoi"}>
                            Đã trả lời: {dem}/6 câu hỏi
                        </div>
                        {!isFullscreen ? (
                            <button className={`fullscreen_button ${navToggle ? 'fullscreen_button-change' : ""}`} onClick={handleFullscreenToggle}><MdOutlineZoomOutMap /></button>
                        ) : (
                            <button className={`fullscreen_button ${navToggle ? 'fullscreen_button-change' : ""}`} onClick={handleFullscreenToggle}><MdOutlineZoomInMap /></button>
                        )}
                        {/* <div type = "button" className={`sidebar ${navToggle ? 'sidebar-change' : ""}`} onClick={navHandler}>
                            <div className='sidebar-top'></div>
                            <div className='sidebar-middle'></div>
                            <div className='sidebar-bottom'></div>
                        </div> */}
                    </div>
                    {navToggle ? (
                        <div className='sidebarDisc'>
                            <div className='sidebarDisc__button' onClick={handleFullscreenToggle}>
                                <div className='sidebarDisc__button__text'>Chế độ toàn màn hình</div>
                                {!isFullscreen ? (
                                    <button className={`fullscreen_button`}><MdOutlineZoomOutMap /></button>
                                ) : (
                                    <button className={`fullscreen_button`}><MdOutlineZoomInMap /></button>
                                )}
                            </div>
                            <div className='sidebarDisc__button' onClick={handleOpenInstructions}>
                                <div className='sidebarDisc__button__text'>Hướng dẫn di chuyển</div>
                                <div className='sidebarDisc__button__btn'><RiDragMoveFill /></div>
                            </div>
                            <div className='sidebarDisc__button' onClick={startTour}>
                                <div className='sidebarDisc__button__text'>Bắt đầu tham quan</div>
                                <div className='sidebarDisc__button__btn'><SiAwesomelists /></div>
                            </div>
                            {/* <div className='sidebarDisc__button' onClick={startTour}>
                                <div className='sidebarDisc__button__text'>Start tour</div>
                                <div className='sidebarDisc__button__btn'><SiAwesomelists /></div>
                            </div> */}
                            <div className='sidebarDisc__button' onClick={handleOpenPopUpListModel}>
                                <div className='sidebarDisc__button__text'>Danh sách mẫu vật</div>
                                <div className='sidebarDisc__button__btn'><PiListStarFill /></div>
                            </div>
                            <div className='sidebarDisc__button' onClick={handleOpenPopUpAboutTheExhibition}>
                                <div className='sidebarDisc__button__text'>Về triển lãm</div>
                                <div className='sidebarDisc__button__btn'><BsNewspaper /></div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    {/* Thanh sidebar */}

                    {/* Nút bấm di chuyển */}
                    {freeExploration && (
                        <div className="controler">
                            <div className='top'>
                                <button
                                    onMouseDown={() => handleControl('forward', true)}
                                    onMouseUp={() => handleControl('forward', false)}
                                    onTouchStart={() => handleControl('forward', true)}
                                    onTouchEnd={() => handleControl('forward', false)}
                                    className='controler__button'
                                >
                                    <FaChevronUp />
                                </button>
                            </div>
                            <div className='bottom'>
                                <button
                                    onMouseDown={() => handleControl('rotateLeft', true)}
                                    onMouseUp={() => handleControl('rotateLeft', false)}
                                    onTouchStart={() => handleControl('rotateLeft', true)}
                                    onTouchEnd={() => handleControl('rotateLeft', false)}
                                    className='controler__button'
                                >
                                    <FaChevronLeft />
                                </button>
                                <button
                                    onMouseDown={() => handleControl('backward', true)}
                                    onMouseUp={() => handleControl('backward', false)}
                                    onTouchStart={() => handleControl('backward', true)}
                                    onTouchEnd={() => handleControl('backward', false)}
                                    className='controler__button'
                                >
                                    <FaChevronDown />
                                </button>
                                <button
                                    onMouseDown={() => handleControl('rotateRight', true)}
                                    onMouseUp={() => handleControl('rotateRight', false)}
                                    onTouchStart={() => handleControl('rotateRight', true)}
                                    onTouchEnd={() => handleControl('rotateRight', false)}
                                    className='controler__button'
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
                        </div>
                    )}
                    {/* Nút bấm di chuyển */}

                    {/* Pop up */}
                    <ModelPopup 
                        open={popupOpen} 
                        onClose={handleClosePopup} 
                        imageUrl={selectedImageUrl} 
                        info={selectedInfo} 
                        modelUrl={selectedModel} 
                        video={selectedVideo} 
                        imageInfo={selectedImageInfo}
                        hotspots={selectedHotspots}
                        onAudioEnded={handleAudioEnded} 
                        tourActive={tourActive} 
                        
                    />
                    <PopUpHowToMove open={showHowToMove} handleClose={handleCloseHowToMove} />
                    <PopUpAboutTheExhibition open={popUpAboutTheExhibition} handleClose={handleClosePopUpAboutTheExhibition} />
                    <PopUpUpdate open={popUpUpdate} onClose={handleClosePopUpUpdate} />
                    <PopUpListModel open={popUpListModel} onClose={handleClosePopUpListModel} items={items} onItemClick={handleListItemClick} /> {/* List Popup */}
                    {/* Pop up */}

                    {/* Đếm thời gian tour */}
                    {tourActive && (
                        <div className={`tour-countdown ${showCountdown ? 'show' : ''}`}>
                            {!paused ? (
                                <div className="pause-tour" onClick={pauseTour}>
                                    Pause Tour
                                </div>
                            ) : (
                                <div className="pause-tour" onClick={continueTour}>
                                    Continue Tour
                                </div>
                            )}
                            <div className="end-tour" onClick={endTour}>
                                End Tour
                            </div>
                        </div>
                    )}
                    {/* Đếm thời gian tour */}

                    {showPuzzleGame1 && (
                        <div className="popup-overlay">
                            <div className="popup-content">
                                <button
                                    className="close-popup"
                                    onClick={() => setShowPuzzleGame1(false)}
                                >
                                    ✕
                                </button>
                                <PuzzleGame onComplete={handlePuzzle1Complete} />
                            </div>
                        </div>
                    )}
                    {showPuzzleGame2 && (
                        <div className="popup-overlay">
                            <div className="popup-content">
                                <button
                                    className="close-popup"
                                    onClick={() => setShowPuzzleGame2(false)}
                                >
                                    ✕
                                </button>
                                <PuzzleGame2 onComplete={handlePuzzle2Complete} />
                            </div>
                        </div>
                    )}

                    {showQuestionPopup && (
                            <QuestionPopup
                            question="Tên gọi Hà Nội chính thức xuất hiện vào năm nào?"
                            answers={["1830", "1832", "1831", "1837"]}
                            correctAnswer="1831"
                            onClose={handleCloseQuestionPopup}
                            />
                        )}
                        {showQuestionPopup2 && (
                            <QuestionPopup
                            question="Nơi nào ở Hà Nội được coi là cái nôi của nghệ thuật ca trù?"
                            answers={[" Quận Hoàn Kiếm", "Huyện Gia Lâm", "Huyện Từ Liêm", "Huyện Đông Anh"]}
                            correctAnswer="Huyện Đông Anh"
                            onClose={handleCloseQuestionPopup2}
                            />
                        )}
                        {showQuestionPopup3 && (
                            <QuestionPopup
                            question="Di tích Hoàng thành Thăng Long được UNESCO công nhận là Di sản văn hóa thế giới vào năm nào?"
                            answers={["2005", "2008", "2010", "2012"]}
                            correctAnswer="2010"
                            onClose={handleCloseQuestionPopup3}
                            />
                        )}
                        {showQuestionPopup4 && (
                            <QuestionPopup
                            question="Thành Cổ Loa được xây dựng theo hình dáng gì đặc biệt, thể hiện sự sáng tạo trong kiến trúc quân sự xưa?"
                            answers={["Hình bát giác", "Hình chữ nhật", "Hình xoắn ốc", "Hình tròn đồng tâm"]}
                            correctAnswer="Hình xoắn ốc"
                            onClose={handleCloseQuestionPopup4}
                            />
                        )}

                {showCompletePopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Chúc mừng bạn!</h2>
                        <p>Bạn đã qua màn 2, chuyển đến màn tiếp theo!</p>
                        <button onClick={handleCloseCompletePopup} className="close-btn">
                            Tiếp tục
                        </button>
                    </div>
                </div>
            )}
                    {/* 🔥 Popup chứa game */}
                    {showGamePopup && (
                        <div className="popup-overlay" style={{
                            alignItems: "center",
                        }}>
                            <div className="popup-content" style={{
                                backgroundImage:"url('/game/screen.jpg')", 
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                padding: "30px",
                            }}>
                                <button
                                    className="close-popup"
                                    onClick={() => setShowGamePopup(false)}
                                >
                                    ✕
                                </button>
                                <iframe 
                                    src="https://game-virtual.vercel.app/"
                                    frameBorder="0"
                                    allowFullScreen={true}
                                    webkitallowfullscreen="true"
                                    mozallowfullscreen="true"
                                    scrolling="no"
                                    className='game-iframe'
                                ></iframe>
                            </div>
                        </div>
                    )}
                    {/* Video toàn màn hình */}
                    {showIntroVideo && (
                        <div className="video-overlay">
                            <video ref={videoRef} className="intro-video" onEnded={handleCloseVideo}>
                                <source src="/NTST/VR Gallery.mp4" type="video/mp4" />
                                Trình duyệt của bạn không hỗ trợ video.
                            </video>
                            <button className="close-video" onClick={handleCloseVideo}>✕</button>
                        </div>
                    )}
                </div>
            </CameraProvider>
            {/* Respondsive */}
            <ResizeHandler updateItemsForScreenSize={updateItemsForScreenSize} level="HaNoi" />
            {/* Respondsive */}
        </>
    )
}

export default Home2;
