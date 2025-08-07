import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// 스튜디오 바닥
export function StudioFloor() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.6} envMapIntensity={0.5} />
        </mesh>
    );
}

// 밝은 회색 그라데이션 배경
export function StudioBackground() {
    const gradientTexture = useMemo(() => {
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext("2d");

        // 밝은 회색 그라데이션
        const gradient = ctx.createRadialGradient(256, 200, 100, 256, 256, 400);
        gradient.addColorStop(0, "#9090a0");
        gradient.addColorStop(0.5, "#707080");
        gradient.addColorStop(1, "#505060");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);

        // 노이즈 텍스처 추가
        for (let i = 0; i < 5000; i++) {
            const brightness = 80 + Math.random() * 40;
            ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${Math.random() * 0.03})`;
            ctx.fillRect(Math.random() * 512, Math.random() * 512, 1, 1);
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }, []);

    return (
        <>
            <mesh position={[0, 10, -20]} scale={[80, 40, 1]}>
                <planeGeometry />
                <meshBasicMaterial map={gradientTexture} />
            </mesh>

            <mesh position={[-30, 10, 0]} rotation={[0, Math.PI / 2, 0]} scale={[80, 40, 1]}>
                <planeGeometry />
                <meshBasicMaterial color="#606070" />
            </mesh>
            <mesh position={[30, 10, 0]} rotation={[0, -Math.PI / 2, 0]} scale={[80, 40, 1]}>
                <planeGeometry />
                <meshBasicMaterial color="#606070" />
            </mesh>
        </>
    );
}

// 노이즈 오버레이 (필름 그레인)
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
            data[i + 3] = 15;
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
                opacity={0.05}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </mesh>
    );
}

// 텁텁한 공기를 위한 안개 박스
export function HazyAir() {
    return (
        <mesh position={[0, 3, 0]}>
            <boxGeometry args={[20, 10, 20]} />
            <meshBasicMaterial color="#808090" transparent opacity={0.05} depthWrite={false} />
        </mesh>
    );
}

// 스튜디오 조명
export function StudioLights() {
    return (
        <>
            <directionalLight
                position={[5, 10, 5]}
                intensity={1.2}
                color="#f0f0f0"
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-far={20}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />

            <directionalLight position={[-5, 5, 0]} intensity={0.5} color="#e0e0f0" />

            <pointLight position={[0, 2, 3]} intensity={1} color="#00ffcc" distance={10} />

            <spotLight position={[0, 5, -5]} angle={Math.PI / 3} intensity={0.8} color="#a0a0b0" penumbra={0.5} />

            <ambientLight intensity={0.6} color="#808090" />
        </>
    );
}
