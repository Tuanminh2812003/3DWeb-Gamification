import React, {
    Suspense,
    useMemo,
    useRef,
    useEffect,
} from "react";

import {
    Canvas,
    useFrame,
} from "@react-three/fiber";

import {
    OrbitControls,
    Environment,
    ContactShadows,
    Center,
    useGLTF,
} from "@react-three/drei";

import * as THREE
    from "three";

import Particles
    from "../../components/Particles/index";

import "./ThapRuaShowcase.css";


const SCENE_Y_OFFSET = 1.7;

const MODEL_Y_OFFSET = 0.4;


/* =========================================================
    MODEL
========================================================= */

function ThapRuaModel() {
    const { scene } =
        useGLTF(
            "/Farm/md_rua.glb"
        );

    const model =
        useMemo(() => {
            const clone =
                scene.clone(true);

            clone.traverse(
                (child) => {
                    if (
                        !child.isMesh
                    ) return;

                    child.castShadow =
                        true;

                    child.receiveShadow =
                        true;

                    const materials =
                        Array.isArray(
                            child.material
                        )
                            ? child.material
                            : [
                                child.material
                            ];

                    materials.forEach(
                        (mat) => {
                            if (
                                !mat
                            ) return;

                            mat.envMapIntensity =
                                0.55;

                            if (
                                "roughness"
                                in mat
                            ) {
                                mat.roughness =
                                    Math.max(
                                        mat.roughness
                                        ?? 0.65,

                                        0.62
                                    );
                            }

                            if (
                                "metalness"
                                in mat
                            ) {
                                mat.metalness =
                                    Math.min(
                                        mat.metalness
                                        ?? 0,

                                        0.05
                                    );
                            }

                            mat.needsUpdate =
                                true;
                        }
                    );
                }
            );

            return clone;
        }, [scene]);

    return (
        <Center
            position={[
                0,

                SCENE_Y_OFFSET
                    + MODEL_Y_OFFSET,

                0,
            ]}
        >
            <primitive
                object={
                    model
                }

                scale={1.6}
            />
        </Center>
    );
}



/* =========================================================
    BACKGROUND
========================================================= */

function BackgroundWorld() {
    return (
        <>
            <mesh
                scale={45}

                position={[
                    0,
                    4,
                    0,
                ]}
            >
                <sphereGeometry
                    args={[
                        1,
                        64,
                        64,
                    ]}
                />

                <meshBasicMaterial
                    color="#020a0f"

                    side={
                        THREE.BackSide
                    }
                />
            </mesh>
        </>
    );
}



/* =========================================================
    HALO
========================================================= */

function MysticalHalo() {
    return (
        <group
            position={[
                0,

                2.5
                    + SCENE_Y_OFFSET,

                -10,
            ]}
        >
            <mesh>
                <circleGeometry
                    args={[
                        8,
                        128,
                    ]}
                />

                <meshBasicMaterial
                    color="#0f5263"

                    transparent

                    opacity={0.045}

                    depthWrite={
                        false
                    }

                    blending={
                        THREE
                            .AdditiveBlending
                    }
                />
            </mesh>

            <mesh
                position={[
                    0,
                    0,
                    0.05,
                ]}
            >
                <circleGeometry
                    args={[
                        5,
                        128,
                    ]}
                />

                <meshBasicMaterial
                    color="#3ba2ae"

                    transparent

                    opacity={0.035}

                    depthWrite={
                        false
                    }

                    blending={
                        THREE
                            .AdditiveBlending
                    }
                />
            </mesh>

            <mesh
                position={[
                    0,
                    0,
                    0.1,
                ]}
            >
                <circleGeometry
                    args={[
                        2.7,
                        128,
                    ]}
                />

                <meshBasicMaterial
                    color="#b0e1dd"

                    transparent

                    opacity={0.02}

                    depthWrite={
                        false
                    }

                    blending={
                        THREE
                            .AdditiveBlending
                    }
                />
            </mesh>

            <mesh
                position={[
                    0,
                    0,
                    0.15,
                ]}
            >
                <ringGeometry
                    args={[
                        3.4,
                        3.45,
                        128,
                    ]}
                />

                <meshBasicMaterial
                    color="#76cbd0"

                    transparent

                    opacity={0.035}

                    depthWrite={
                        false
                    }

                    blending={
                        THREE
                            .AdditiveBlending
                    }
                />
            </mesh>
        </group>
    );
}



/* =========================================================
    LIGHT RAYS
========================================================= */

function FakeLightRays() {
    return (
        <group
            position={[
                0,

                2
                    + SCENE_Y_OFFSET,

                -6,
            ]}
        >
            <mesh
                rotation={[
                    0,
                    0,
                    -0.25,
                ]}

                position={[
                    -2.4,
                    0,
                    0,
                ]}
            >
                <planeGeometry
                    args={[
                        1.7,
                        14,
                    ]}
                />

                <meshBasicMaterial
                    color="#6fc4d0"

                    transparent

                    opacity={0.01}

                    depthWrite={
                        false
                    }

                    blending={
                        THREE
                            .AdditiveBlending
                    }

                    side={
                        THREE.DoubleSide
                    }
                />
            </mesh>

            <mesh
                rotation={[
                    0,
                    0,
                    0.18,
                ]}

                position={[
                    2.2,
                    0,
                    0,
                ]}
            >
                <planeGeometry
                    args={[
                        1.1,
                        13,
                    ]}
                />

                <meshBasicMaterial
                    color="#8dd8d6"

                    transparent

                    opacity={0.008}

                    depthWrite={
                        false
                    }

                    blending={
                        THREE
                            .AdditiveBlending
                    }

                    side={
                        THREE.DoubleSide
                    }
                />
            </mesh>

            <mesh>
                <planeGeometry
                    args={[
                        0.8,
                        15,
                    ]}
                />

                <meshBasicMaterial
                    color="#69b8c5"

                    transparent

                    opacity={0.006}

                    depthWrite={
                        false
                    }

                    blending={
                        THREE
                            .AdditiveBlending
                    }

                    side={
                        THREE.DoubleSide
                    }
                />
            </mesh>
        </group>
    );
}



/* =========================================================
    LAKE
========================================================= */

function Lake() {
    return (
        <>
            <mesh
                rotation={[
                    -Math.PI / 2,
                    0,
                    0,
                ]}

                position={[
                    0,
                    -1.55
                        + SCENE_Y_OFFSET,

                    0,
                ]}

                receiveShadow
            >
                <circleGeometry
                    args={[
                        32,
                        128,
                    ]}
                />

                <meshPhysicalMaterial
                    color="#01080c"

                    roughness={0.22}

                    metalness={0.4}

                    clearcoat={1}

                    clearcoatRoughness={
                        0.18
                    }
                />
            </mesh>

            <mesh
                rotation={[
                    -Math.PI / 2,
                    0,
                    0,
                ]}

                position={[
                    0,

                    -1.52
                        + SCENE_Y_OFFSET,

                    0,
                ]}
            >
                <circleGeometry
                    args={[
                        8,
                        128,
                    ]}
                />

                <meshBasicMaterial
                    color="#176377"

                    transparent

                    opacity={0.012}

                    depthWrite={
                        false
                    }

                    blending={
                        THREE
                            .AdditiveBlending
                    }
                />
            </mesh>

            <mesh
                rotation={[
                    -Math.PI / 2,
                    0,
                    0,
                ]}

                position={[
                    0,

                    -1.5
                        + SCENE_Y_OFFSET,

                    0,
                ]}
            >
                <ringGeometry
                    args={[
                        2.2,
                        5.5,
                        128,
                    ]}
                />

                <meshBasicMaterial
                    color="#3c9aa5"

                    transparent

                    opacity={0.015}

                    depthWrite={
                        false
                    }

                    blending={
                        THREE
                            .AdditiveBlending
                    }

                    side={
                        THREE.DoubleSide
                    }
                />
            </mesh>
        </>
    );
}



/* =========================================================
    MIST
========================================================= */

function RotatingMist() {
    const ref1 =
        useRef();

    const ref2 =
        useRef();

    useFrame(
        (_, delta) => {
            if (
                ref1.current
            ) {
                ref1.current
                    .rotation.z +=
                    delta
                    * 0.015;
            }

            if (
                ref2.current
            ) {
                ref2.current
                    .rotation.z -=
                    delta
                    * 0.012;
            }
        }
    );

    return (
        <>
            <mesh
                ref={ref1}

                rotation={[
                    -Math.PI / 2,
                    0,
                    0,
                ]}

                position={[
                    0,

                    -1.05
                        + SCENE_Y_OFFSET
                        + MODEL_Y_OFFSET,

                    0,
                ]}
            >
                <ringGeometry
                    args={[
                        1.8,
                        5.4,
                        128,
                    ]}
                />

                <meshBasicMaterial
                    color="#8fc8cd"

                    transparent

                    opacity={0.014}

                    depthWrite={
                        false
                    }

                    blending={
                        THREE
                            .AdditiveBlending
                    }

                    side={
                        THREE.DoubleSide
                    }
                />
            </mesh>

            <mesh
                ref={ref2}

                rotation={[
                    -Math.PI / 2,
                    0,
                    0,
                ]}

                position={[
                    0,

                    -0.72
                        + SCENE_Y_OFFSET
                        + MODEL_Y_OFFSET,

                    0,
                ]}
            >
                <ringGeometry
                    args={[
                        0.9,
                        3.6,
                        128,
                    ]}
                />

                <meshBasicMaterial
                    color="#c2dfdc"

                    transparent

                    opacity={0.009}

                    depthWrite={
                        false
                    }

                    blending={
                        THREE
                            .AdditiveBlending
                    }

                    side={
                        THREE.DoubleSide
                    }
                />
            </mesh>
        </>
    );
}



/* =========================================================
    LIGHTING
========================================================= */

function CinematicLights() {
    return (
        <>
            <ambientLight
                intensity={
                    0.22
                }
            />

            <spotLight
                position={[
                    5,
                    8,
                    6,
                ]}

                intensity={
                    36
                }

                angle={0.32}

                penumbra={
                    0.95
                }

                distance={
                    25
                }

                decay={2}

                color="#e5bd82"

                castShadow

                shadow-mapSize-width={
                    2048
                }

                shadow-mapSize-height={
                    2048
                }
            />

            <spotLight
                position={[
                    0,
                    5,
                    -8,
                ]}

                intensity={
                    58
                }

                angle={
                    0.68
                }

                penumbra={1}

                distance={
                    30
                }

                decay={2}

                color="#4dbacd"
            />

            <pointLight
                position={[
                    -5,
                    2,
                    -1,
                ]}

                intensity={
                    5.5
                }

                distance={
                    11
                }

                color="#3289b5"
            />

            <pointLight
                position={[
                    4,
                    1,
                    3,
                ]}

                intensity={
                    2.8
                }

                distance={
                    8
                }

                color="#e6ad67"
            />
        </>
    );
}



/* =========================================================
    PARTICLES
========================================================= */

function MysticalParticles() {

    return (

        <>

            {/* ========================================
                PARTICLE TOÀN KHÔNG GIAN

                Hạt vừa, màu texture nguyên bản
            ======================================== */}

            <Particles

                texturePath={
                    "/Farm/particle.png"
                }

                position={[
                    0,

                    1.0
                        + SCENE_Y_OFFSET,

                    0,
                ]}

                rotation={[
                    0,
                    0,
                    0,
                ]}

                count={
                    220
                }

                area={[
                    18,
                    8,
                    18,
                ]}

                size={
                    0.14
                }

                opacity={
                    0.8
                }

                speed={
                    0.00025
                }

                additive={
                    false
                }

            />


            {/* ========================================
                PARTICLE QUANH MODEL

                To hơn một chút để che phần rùa
            ======================================== */}

            <Particles

                texturePath={
                    "/Farm/particle.png"
                }

                position={[
                    0,

                    -0.3
                        + SCENE_Y_OFFSET
                        + MODEL_Y_OFFSET,

                    0,
                ]}

                rotation={[
                    0,
                    0,
                    0,
                ]}

                count={
                    150
                }

                area={[
                    7,
                    2.3,
                    7,
                ]}

                size={
                    0.2
                }

                opacity={
                    0.8
                }

                speed={
                    0.00055
                }

                additive={
                    false
                }

            />


            {/* ========================================
                PARTICLE PHÍA SAU

                Tạo chiều sâu
            ======================================== */}

            <Particles

                texturePath={
                    "/Farm/particle.png"
                }

                position={[
                    0,

                    1.8
                        + SCENE_Y_OFFSET,

                    -4,
                ]}

                rotation={[
                    0,
                    0,
                    0,
                ]}

                count={
                    90
                }

                area={[
                    13,
                    7,
                    4,
                ]}

                size={
                    0.12
                }

                opacity={
                    0.8
                }

                speed={
                    -0.00015
                }

                additive={
                    false
                }

            />

        </>

    );

}



/* =========================================================
    SCENE
========================================================= */

function Scene() {
    return (
        <>
            <color
                attach="background"

                args={[
                    "#010509"
                ]}
            />

            <fog
                attach="fog"

                args={[
                    "#03121a",
                    8,
                    30,
                ]}
            />

            <BackgroundWorld />

            <MysticalHalo />
            <PulseHalo />
            <EnergyRing />

            <FakeLightRays />

            <Environment
                files="/hdri.jpg"

                background={
                    false
                }

                environmentIntensity={
                    0.32
                }
            />

            <CinematicLights />

            <Lake />

            <RotatingMist />

            <ThapRuaModel />

            <ContactShadows
                position={[
                    0,

                    -1.5
                        + SCENE_Y_OFFSET
                        + MODEL_Y_OFFSET,

                    0,
                ]}

                opacity={
                    0.24
                }

                scale={
                    8
                }

                blur={
                    3.5
                }

                far={
                    4
                }

                resolution={
                    1024
                }
            />

            <MysticalParticles />

            <OrbitControls
                enablePan={
                    false
                }

                enableRotate

                enableZoom

                enableDamping

                dampingFactor={
                    0.055
                }

                rotateSpeed={
                    0.5
                }

                zoomSpeed={
                    0.65
                }

                minDistance={2.6}
                maxDistance={8.5}

                minPolarAngle={
                    Math.PI
                    * 0.25
                }

                maxPolarAngle={
                    Math.PI
                    * 0.45
                }

                autoRotate

                autoRotateSpeed={
                    0.18
                }

                target={[
                    0,

                    0.25
                        + SCENE_Y_OFFSET,

                    0,
                ]}
            />
        </>
    );
}



/* =========================================================
    PAGE
========================================================= */

function PulseHalo() {
    const ref1 = useRef();
    const ref2 = useRef();

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();

        if (ref1.current) {
            const s = 1 + Math.sin(t * 0.9) * 0.03;
            ref1.current.scale.set(s, s, s);
            ref1.current.material.opacity =
                0.032 + (Math.sin(t * 0.9) + 1) * 0.006;
        }

        if (ref2.current) {
            const s = 1 + Math.sin(t * 0.65 + 1.2) * 0.04;
            ref2.current.scale.set(s, s, s);
            ref2.current.material.opacity =
                0.018 + (Math.sin(t * 0.65 + 1.2) + 1) * 0.004;
        }
    });

    return (
        <group position={[0, 2.5 + SCENE_Y_OFFSET, -9.7]}>
            <mesh ref={ref1}>
                <circleGeometry args={[4.8, 128]} />
                <meshBasicMaterial
                    color="#58aebb"
                    transparent
                    opacity={0.035}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            <mesh ref={ref2} position={[0, 0, 0.06]}>
                <circleGeometry args={[2.8, 128]} />
                <meshBasicMaterial
                    color="#c4e7df"
                    transparent
                    opacity={0.02}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
}

function EnergyRing() {
    const ref = useRef();

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (!ref.current) return;

        const cycle = (t * 0.18) % 1;
        const scale = 1 + cycle * 1.6;

        ref.current.scale.set(scale, scale, scale);
        ref.current.material.opacity = 0.022 * (1 - cycle);
    });

    return (
        <mesh
            ref={ref}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -1.44 + SCENE_Y_OFFSET, 0]}
        >
            <ringGeometry args={[1.2, 1.7, 128]} />
            <meshBasicMaterial
                color="#7ed0d8"
                transparent
                opacity={0.02}
                depthWrite={false}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

export default function ThapRuaShowcase() {
    const backgroundAudioRef = useRef(null);


    useEffect(() => {

        const audio = new Audio(
            "/Farm/Music/vanmieu.mp4"
        );

        audio.loop = true;

        // chỉnh âm lượng ở đây
        audio.volume = 0.45;

        backgroundAudioRef.current =
            audio;


        const playAudio = () => {

            audio
                .play()
                .catch((error) => {

                    console.warn(
                        "Không thể phát nhạc:",
                        error
                    );

                });

        };


        /*
            Trình duyệt chặn autoplay có tiếng,
            nên click/touch lần đầu sẽ kích hoạt nhạc.
        */

        window.addEventListener(
            "pointerdown",
            playAudio,
            {
                once: true,
            }
        );


        return () => {

            window.removeEventListener(
                "pointerdown",
                playAudio
            );


            audio.pause();

            audio.currentTime = 0;

            backgroundAudioRef.current =
                null;

        };

    }, []);

    return (
        
        <div
            className={
                "thap-rua-showcase"
            }
        >
            <Canvas
                shadows

                dpr={[
                    1,
                    2
                ]}

                camera={{
                    position: [4.8, 3.15, 5.6],
                    fov: 34,
                    near: 0.1,
                    far: 100,
                }}

                gl={{
                    antialias: true,

                    alpha: false,

                    powerPreference:
                        "high-performance",

                    toneMapping:
                        THREE
                            .ACESFilmicToneMapping,
                }}

                onCreated={({
                    gl
                }) => {
                    gl.toneMappingExposure =
                        1.08;

                    gl.outputColorSpace =
                        THREE
                            .SRGBColorSpace;
                }}
            >
                <Suspense
                    fallback={
                        null
                    }
                >
                    <Scene />
                </Suspense>
            </Canvas>

            <div
                className={
                    "scene-vignette"
                }
            />

            <div
                className={
                    "scene-top-haze"
                }
            />

            <div className="thap-rua-info">
            <div className="thap-rua-subtitle">
                HÀ NỘI · DI SẢN
            </div>

            <h1 className="thap-rua-title long-title">
                Bia Tiến sĩ Văn Miếu - Quốc Tử Giám
            </h1>

            <div className="thap-rua-line" />

            <p>
                Kéo chuột để khám phá
            </p>
        </div>

            <div
                className={
                    "thap-rua-help"
                }
            >
                <span>
                    GIỮ CHUỘT · XOAY
                </span>

                <span>
                    SCROLL · PHÓNG TO
                </span>
            </div>
        </div>
    );
}


useGLTF.preload(
    "/Farm/md_rua.glb"
);