import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import { CameraControls, ContactShadows, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const ShowRoom = ({ selectedColor, isRotating }) => {
    const gltf = useLoader(GLTFLoader, "/models/sunglasses.glb");
    const { raycaster } = useThree();
    const cameraControlsRef = useRef(null);
    const modelRef = useRef(null);

    useEffect(() => {
        gltf.scene.children.forEach((child) => {
            child.children.forEach((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
        });
    }, []);

    useEffect(() => {
        cameraControlsRef.current.setTarget(0, 0, 0, false);
        cameraControlsRef.current.setPosition(2, 2, 2, false);
    }, []);

    useFrame(() => {
        if (isRotating && cameraControlsRef.current) {
            const angle = Date.now() / 3000;
            cameraControlsRef.current.setPosition(Math.sin(angle) * 2, 2, Math.cos(angle) * 2);
        }
    });

    const handleClick = () => {
        const intersects = raycaster.intersectObjects(gltf.scene.children, true);
        if (intersects.length > 0) {
            const firstObject = intersects[0].object;
            const firstMaterial = firstObject.material;
            const cloneMaterial = firstMaterial.clone();
            firstObject.material = cloneMaterial;
            const mat = firstObject.material;
            mat.color = new THREE.Color(selectedColor);
            // cameraControlsRef.current.fitToBox(firstObject, true);
        }
    };

    return (
        <>
            <CameraControls ref={cameraControlsRef} dollyToCursor={true} minDistance={2} maxDistance={10} />
            {/* <mesh scale={5} position={[0, -0.8, 0]}>
                <cylinderGeometry args={[0.5, 0.2, 0.3, 50]} />
                <meshStandardMaterial />
            </mesh> */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color="#0F1521" metalness={0.2} roughness={0.8} envMapIntensity={0.3} />
            </mesh>
            <primitive ref={modelRef} object={gltf.scene} onClick={handleClick} castShadow />

            <ContactShadows position={[0, 0.1, 0]} opacity={1} scale={10} blur={1} far={8} color="#0F1521" />
        </>
    );
};

export default ShowRoom;
