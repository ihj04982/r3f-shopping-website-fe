import React, { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { CameraControls, ContactShadows, Float, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module";

const MODEL_URL = "https://7usit4sojdl2b6ev.public.blob.vercel-storage.com/sunglasses.glb";
// const MODEL_URL = "/public/models/sunglasses.glb";

const ShowRoom = ({ selectedColor, isRotating }) => {
    const gltf = useLoader(GLTFLoader, MODEL_URL, (loader) => {
        loader.setMeshoptDecoder(MeshoptDecoder);
    });

    const cameraControlsRef = useRef(null);
    const modelRef = useRef(null);

    // 그림자 세팅
    useEffect(() => {
        gltf.scene.traverse((obj) => {
            if (obj.isMesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;
            }
        });
    }, [gltf]);

    // 초기 카메라 위치/타겟
    useEffect(() => {
        cameraControlsRef.current?.setTarget(0, 0, 0, false);
        cameraControlsRef.current?.setPosition(2, 2, 2, false);
    }, []);

    // 자동 회전
    useFrame(() => {
        if (!isRotating || !cameraControlsRef.current) return;
        const t = Date.now() / 3000;
        cameraControlsRef.current.setPosition(Math.sin(t) * 2, 2, Math.cos(t) * 2);
    });

    // 포인터 클릭 핸들러 (정확한 교차 정보 제공)
    const onMeshClick = (e) => {
        e.stopPropagation(); // 상위 버블링 방지

        const mesh = e.object; // 실제 클릭된 Mesh
        console.log(gltf.scene);
        console.log("hit:", mesh.name, "parent:", mesh.parent?.name);

        // 재질 복제(공유 머티리얼 분리)
        if (Array.isArray(mesh.material)) {
            mesh.material = mesh.material.map((m) => m.clone());
            mesh.material.forEach((m) => m.color?.set?.(selectedColor));
        } else {
            mesh.material = mesh.material.clone();
            mesh.material.color?.set?.(selectedColor);
        }
    };

    // 바닥 (피킹 제외)
    const Ground = () => (
        <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
            raycast={() => null} // ← 클릭 대상에서 제외
        >
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="#0F1521" metalness={0.2} roughness={0.8} envMapIntensity={0.3} />
        </mesh>
    );

    // 성능: 미리 프리로드
    useGLTF.preload(MODEL_URL);

    return (
        <>
            <CameraControls ref={cameraControlsRef} dollyToCursor minDistance={2} maxDistance={10} />

            <Ground />

            {/* 모델 전체에 클릭 이벤트 부여 */}
            <primitive ref={modelRef} object={gltf.scene} onClick={onMeshClick} castShadow />

            <ContactShadows position={[0, 0.1, 0]} opacity={1} scale={10} blur={1} far={8} color="#0F1521" />
        </>
    );
};
export default ShowRoom;
