import React, {
    useMemo,
    useRef,
} from "react";

import {
    useFrame,
    useLoader,
} from "@react-three/fiber";

import {
    TextureLoader,
    AdditiveBlending,
    NormalBlending,
} from "three";


export default function Particles({
    texturePath,

    position = [0, 0, 0],

    rotation = [0, 0, 0],

    scale,

    size = 0.2,

    count = 500,

    area = [70, 40, 70],

    opacity = 1,

    color,

    speed = 0.002,

    additive = false,
}) {

    const particlesRef =
        useRef();

    const particleTexture =
        useLoader(
            TextureLoader,
            texturePath
        );


    const finalSize =
        scale !== undefined
            ? scale
            : size;


    const particlePositions =
        useMemo(() => {

            const positions =
                new Float32Array(
                    count * 3
                );


            for (
                let i = 0;
                i < count;
                i++
            ) {

                positions[i * 3] =
                    (Math.random() - 0.5)
                    * area[0];


                positions[i * 3 + 1] =
                    (Math.random() - 0.5)
                    * area[1];


                positions[i * 3 + 2] =
                    (Math.random() - 0.5)
                    * area[2];

            }


            return positions;

        }, [
            count,
            area[0],
            area[1],
            area[2],
        ]);


    useFrame(
        (_, delta) => {

            if (
                !particlesRef.current
            ) return;


            particlesRef.current
                .rotation.y +=
                speed
                * delta
                * 60;

        }
    );


    return (

        <points
            ref={particlesRef}

            position={position}

            rotation={rotation}

            frustumCulled={false}
        >

            <bufferGeometry>

                <bufferAttribute
                    attach="attributes-position"

                    count={count}

                    array={
                        particlePositions
                    }

                    itemSize={3}
                />

            </bufferGeometry>


            <pointsMaterial

                map={
                    particleTexture
                }

                size={
                    finalSize
                }

                /* Không truyền color
                   => giữ màu texture gốc */

                {...(
                    color
                        ? { color }
                        : {}
                )}

                transparent

                opacity={
                    opacity
                }

                alphaTest={
                    0.08
                }

                depthWrite={
                    false
                }

                sizeAttenuation

                blending={
                    additive
                        ? AdditiveBlending
                        : NormalBlending
                }

            />

        </points>

    );

}