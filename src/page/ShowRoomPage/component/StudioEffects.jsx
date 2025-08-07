import React, { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export function DomeBackground() {
    const gradientTexture = useMemo(() => {
        const canvas = document.createElement("canvas");
        canvas.width = 2;
        canvas.height = 512;
        const ctx = canvas.getContext("2d");

        const gradient = ctx.createLinearGradient(0, 0, 0, 512);
        gradient.addColorStop(0, "#0F1521"); // 위: 어두운 남색
        gradient.addColorStop(0.2, "#1a2938");
        gradient.addColorStop(0.4, "#296283"); // 중간: 청색
        gradient.addColorStop(0.6, "#5080a0");
        gradient.addColorStop(0.8, "#90a0b0");
        gradient.addColorStop(1, "#D2D3D5"); // 아래: 밝은 회색

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 2, 512);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }, []);

    return (
        <mesh scale={[-1, 1, 1]}>
            <sphereGeometry args={[50, 32, 32]} />
            <meshBasicMaterial map={gradientTexture} side={THREE.BackSide} depthWrite={false} />
        </mesh>
    );
}

export function FilmGrain() {
    const { viewport } = useThree();

    const noiseTexture = useMemo(() => {
        const canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext("2d");

        const imageData = ctx.createImageData(256, 256);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const noise = Math.random() * 255;
            data[i] = noise;
            data[i + 1] = noise;
            data[i + 2] = noise;
            data[i + 3] = 40;
        }

        ctx.putImageData(imageData, 0, 0);
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }, []);

    return (
        <mesh position={[0, 0, 5]} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry />
            <meshBasicMaterial
                map={noiseTexture}
                transparent
                opacity={0.04}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </mesh>
    );
}

// 텁텁한 공기를 위한 안개 박스
export function HazyAir() {
    return (
        <>
            <mesh position={[0, 3, 0]}>
                <boxGeometry args={[25, 12, 25]} />
                <meshBasicMaterial color="#296283" transparent opacity={0.08} depthWrite={false} />
            </mesh>

            <mesh position={[0, 5, -2]}>
                <boxGeometry args={[30, 15, 20]} />
                <meshBasicMaterial color="#0F1521" transparent opacity={0.06} depthWrite={false} />
            </mesh>

            <mesh position={[0, 1, 3]}>
                <boxGeometry args={[20, 8, 15]} />
                <meshBasicMaterial color="#296283" transparent opacity={0.05} depthWrite={false} />
            </mesh>
        </>
    );
}

// 스튜디오 조명 (새로운 색상 톤)
export function StudioLights() {
    return (
        <>
            <directionalLight
                position={[3, 8, 5]}
                intensity={0.9}
                color="#F2F2F2"
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-far={20}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />

            {/* <directionalLight position={[-5, 3, 2]} intensity={0.3} color="#D2D3D5" /> */}

            <spotLight position={[0, 4, 4]} angle={Math.PI / 5} intensity={5} color="#B0C0D0" penumbra={0.4} />

            {/* <ambientLight intensity={0.45} color="#7090a0" /> */}
        </>
    );
}
