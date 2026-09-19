import React, {
    Suspense,
    useMemo,
    useRef,
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


                            /*
                             * Không cho model phản sáng
                             * quá mạnh.
                             *
                             * Mục đích:
                             * giấu bớt geometry rùa.
                             */

                            mat.envMapIntensity =
                                0.45;


                            if (
                                "roughness"
                                in mat
                            ) {

                                mat.roughness =
                                    Math.max(
                                        mat.roughness
                                        ?? 0.65,

                                        0.68
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

        <Center>

            <primitive

                object={model}

                scale={1}

            />

        </Center>

    );

}



/* =========================================================
    BACKGROUND SPHERE
========================================================= */

function BackgroundWorld() {

    return (

        <>

            <mesh
                scale={45}
                position={[
                    0,
                    4,
                    0
                ]}
            >

                <sphereGeometry
                    args={[
                        1,
                        64,
                        64
                    ]}
                />


                <meshBasicMaterial

                    color="#020a0f"

                    side={
                        THREE.BackSide
                    }

                />

            </mesh>


            {/* tầng xanh phía dưới */}

            <mesh
                position={[
                    0,
                    -4,
                    -15
                ]}
            >

                <circleGeometry
                    args={[
                        18,
                        128
                    ]}
                />


                <meshBasicMaterial

                    color="#063545"

                    transparent

                    opacity={0.11}

                    blending={
                        THREE.AdditiveBlending
                    }

                    depthWrite={false}

                />

            </mesh>

        </>

    );

}



/* =========================================================
    HALO / MẶT TRĂNG ẢO
========================================================= */

function MysticalHalo() {

    return (

        <group
            position={[
                0,
                2.5,
                -10
            ]}
        >

            {/* halo ngoài */}

            <mesh>

                <circleGeometry
                    args={[
                        8,
                        128
                    ]}
                />

                <meshBasicMaterial

                    color="#0f5263"

                    transparent

                    opacity={0.075}

                    depthWrite={false}

                    blending={
                        THREE.AdditiveBlending
                    }

                />

            </mesh>


            {/* halo giữa */}

            <mesh
                position={[
                    0,
                    0,
                    0.05
                ]}
            >

                <circleGeometry
                    args={[
                        5,
                        128
                    ]}
                />

                <meshBasicMaterial

                    color="#3ba2ae"

                    transparent

                    opacity={0.065}

                    depthWrite={false}

                    blending={
                        THREE.AdditiveBlending
                    }

                />

            </mesh>


            {/* lõi */}

            <mesh
                position={[
                    0,
                    0,
                    0.1
                ]}
            >

                <circleGeometry
                    args={[
                        2.7,
                        128
                    ]}
                />

                <meshBasicMaterial

                    color="#b0e1dd"

                    transparent

                    opacity={0.04}

                    depthWrite={false}

                    blending={
                        THREE.AdditiveBlending
                    }

                />

            </mesh>


            {/* ring */}

            <mesh
                position={[
                    0,
                    0,
                    0.15
                ]}
            >

                <ringGeometry
                    args={[
                        3.4,
                        3.45,
                        128
                    ]}
                />

                <meshBasicMaterial

                    color="#76cbd0"

                    transparent

                    opacity={0.09}

                    depthWrite={false}

                    blending={
                        THREE.AdditiveBlending
                    }

                />

            </mesh>

        </group>

    );

}



/* =========================================================
    GOD RAY GIẢ
========================================================= */

function FakeLightRays() {

    return (

        <group
            position={[
                0,
                2,
                -6
            ]}
        >

            <mesh
                rotation={[
                    0,
                    0,
                    -0.25
                ]}
                position={[
                    -2.4,
                    0,
                    0
                ]}
            >

                <planeGeometry
                    args={[
                        1.7,
                        14
                    ]}
                />

                <meshBasicMaterial

                    color="#6fc4d0"

                    transparent

                    opacity={0.022}

                    depthWrite={false}

                    blending={
                        THREE.AdditiveBlending
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
                    0.18
                ]}
                position={[
                    2.2,
                    0,
                    0
                ]}
            >

                <planeGeometry
                    args={[
                        1.1,
                        13
                    ]}
                />

                <meshBasicMaterial

                    color="#8dd8d6"

                    transparent

                    opacity={0.018}

                    depthWrite={false}

                    blending={
                        THREE.AdditiveBlending
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
                    -0.05
                ]}
            >

                <planeGeometry
                    args={[
                        0.8,
                        15
                    ]}
                />

                <meshBasicMaterial

                    color="#69b8c5"

                    transparent

                    opacity={0.014}

                    depthWrite={false}

                    blending={
                        THREE.AdditiveBlending
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
                    0
                ]}

                position={[
                    0,
                    -1.55,
                    0
                ]}

                receiveShadow

            >

                <circleGeometry
                    args={[
                        32,
                        128
                    ]}
                />


                <meshPhysicalMaterial

                    color="#01080c"

                    roughness={0.2}

                    metalness={0.45}

                    clearcoat={1}

                    clearcoatRoughness={
                        0.15
                    }

                />

            </mesh>


            {/* ánh sáng mặt hồ */}

            <mesh
                rotation={[
                    -Math.PI / 2,
                    0,
                    0
                ]}
                position={[
                    0,
                    -1.52,
                    0
                ]}
            >

                <circleGeometry
                    args={[
                        9,
                        128
                    ]}
                />


                <meshBasicMaterial

                    color="#176377"

                    transparent

                    opacity={0.025}

                    blending={
                        THREE.AdditiveBlending
                    }

                    depthWrite={false}

                />

            </mesh>


            {/* vòng sáng */}

            <mesh
                rotation={[
                    -Math.PI / 2,
                    0,
                    0
                ]}
                position={[
                    0,
                    -1.5,
                    0
                ]}
            >

                <ringGeometry
                    args={[
                        2.2,
                        6,
                        128
                    ]}
                />


                <meshBasicMaterial

                    color="#3c9aa5"

                    transparent

                    opacity={0.03}

                    blending={
                        THREE.AdditiveBlending
                    }

                    depthWrite={false}

                    side={
                        THREE.DoubleSide
                    }

                />

            </mesh>

        </>

    );

}



/* =========================================================
    MIST XOAY
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

                ref1.current.rotation.z
                    +=
                    delta * 0.025;

            }


            if (
                ref2.current
            ) {

                ref2.current.rotation.z
                    -=
                    delta * 0.018;

            }

        }
    );


    return (

        <>

            {/* sương thấp */}

            <mesh
                ref={ref1}

                rotation={[
                    -Math.PI / 2,
                    0,
                    0
                ]}

                position={[
                    0,
                    -1.05,
                    0
                ]}
            >

                <ringGeometry
                    args={[
                        1.3,
                        6.5,
                        128
                    ]}
                />


                <meshBasicMaterial

                    color="#93cfd0"

                    transparent

                    opacity={0.032}

                    depthWrite={false}

                    blending={
                        THREE.AdditiveBlending
                    }

                    side={
                        THREE.DoubleSide
                    }

                />

            </mesh>


            {/* lớp thứ hai cao hơn */}

            <mesh
                ref={ref2}

                rotation={[
                    -Math.PI / 2,
                    0,
                    0
                ]}

                position={[
                    0,
                    -0.72,
                    0
                ]}
            >

                <ringGeometry
                    args={[
                        0.5,
                        4.2,
                        128
                    ]}
                />


                <meshBasicMaterial

                    color="#c0ded8"

                    transparent

                    opacity={0.018}

                    depthWrite={false}

                    blending={
                        THREE.AdditiveBlending
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
    FOREGROUND HAZE

    Che một phần chân rùa khi camera xoay.
========================================================= */

function ForegroundHaze() {

    return (

        <>

            <mesh
                position={[
                    0,
                    -0.8,
                    3.5
                ]}
            >

                <planeGeometry
                    args={[
                        13,
                        2.4
                    ]}
                />


                <meshBasicMaterial

                    color="#b5d8d5"

                    transparent

                    opacity={0.018}

                    depthWrite={false}

                    blending={
                        THREE.AdditiveBlending
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
                intensity={0.13}
            />


            {/* ánh sáng vàng trên bia */}

            <spotLight

                position={[
                    5,
                    8,
                    6
                ]}

                intensity={25}

                angle={0.32}

                penumbra={0.95}

                distance={25}

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


            {/* back light xanh */}

            <spotLight

                position={[
                    0,
                    5,
                    -8
                ]}

                intensity={65}

                angle={0.68}

                penumbra={1}

                distance={30}

                decay={2}

                color="#4dbacd"

            />


            {/* side rim */}

            <pointLight

                position={[
                    -5,
                    2,
                    -1
                ]}

                intensity={4}

                distance={11}

                color="#3289b5"

            />


            {/* ánh sáng vàng yếu bên phải */}

            <pointLight

                position={[
                    4,
                    1,
                    3
                ]}

                intensity={1.8}

                distance={8}

                color="#e6ad67"

            />

        </>

    );

}



/* =========================================================
    PARTICLES

    Đây chính là component Particles của bạn.
========================================================= */

function MysticalParticles() {

    return (

        <>

            {/*
                Layer 1:
                bụi sáng toàn không gian.
            */}

            <Particles

                texturePath={
                    "/Farm/particles.png"
                }

                position={[
                    0,
                    1.5,
                    0
                ]}

                rotation={[
                    0,
                    0,
                    0
                ]}

                count={350}

                area={[
                    18,
                    9,
                    18
                ]}

                size={0.12}

                opacity={0.28}

                color="#8fd0dc"

                speed={0.0005}

                additive

            />


            {/*
                Layer 2:
                nhiều hạt quanh chân rùa.

                Đây là layer che model.
            */}

            <Particles

                texturePath={
                    "/Farm/particle.png"
                }

                position={[
                    0,
                    -0.45,
                    0
                ]}

                rotation={[
                    0,
                    0,
                    0
                ]}

                count={450}

                area={[
                    8,
                    2.1,
                    8
                ]}

                size={0.2}

                opacity={0.24}

                color="#a7d7d1"

                speed={0.001}

                additive

            />


            {/*
                Layer 3:
                background particles.
            */}

            <Particles

                texturePath={
                    "/Farm/particle.png"
                }

                position={[
                    0,
                    2,
                    -5
                ]}

                rotation={[
                    0,
                    0,
                    0
                ]}

                count={180}

                area={[
                    14,
                    8,
                    4
                ]}

                size={0.1}

                opacity={0.2}

                color="#59aebd"

                speed={-0.00035}

                additive

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
                    6,
                    24
                ]}
            />


            <BackgroundWorld />


            <MysticalHalo />


            <FakeLightRays />


            <Environment

                files="/hdri.jpg"

                background={false}

                environmentIntensity={
                    0.25
                }

            />


            <CinematicLights />


            <Lake />


            <RotatingMist />


            <ForegroundHaze />


            <ThapRuaModel />


            <ContactShadows

                position={[
                    0,
                    -1.5,
                    0
                ]}

                opacity={0.2}

                scale={10}

                blur={5}

                far={5}

                resolution={1024}

            />


            {/* PARTICLE CỦA BẠN */}

            <MysticalParticles />


            <OrbitControls

                enablePan={false}

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


                minDistance={
                    4.2
                }

                maxDistance={
                    10.5
                }


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
                    0.55,
                    0
                ]}

            />

        </>

    );

}



/* =========================================================
    PAGE
========================================================= */

export default function ThapRuaShowcase() {

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

                    position: [
                        6,
                        3,
                        7
                    ],

                    fov: 36,

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
                        0.85;

                    gl.outputColorSpace =
                        THREE
                            .SRGBColorSpace;

                }}

            >

                <Suspense
                    fallback={null}
                >

                    <Scene />

                </Suspense>

            </Canvas>


            {/* overlay */}

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


            {/* TEXT */}

            <div
                className={
                    "thap-rua-info"
                }
            >

                <div
                    className={
                        "thap-rua-subtitle"
                    }
                >

                    HÀ NỘI · DI SẢN

                </div>


                <h1>

                    THÁP RÙA

                </h1>


                <div
                    className={
                        "thap-rua-line"
                    }
                />


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