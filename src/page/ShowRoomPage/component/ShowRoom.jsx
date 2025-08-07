import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import { CameraControls, ContactShadows } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";

const ShowRoom = () => {
    const gltf = useLoader(GLTFLoader, "./models/sunglasses.glb");
    const { raycaster } = useThree();
    const cameraControlsRef = useRef(null);

    useEffect(() => {
        gltf.scene.children.forEach((child) => {
            child.children.forEach((child) => {
                if (child.isMesh) {
                    console.log(child.name);
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

    // TODO: 버튼 클릭시 턴테이블 동작하도록 수정
    // useFrame(() => {
    //     const angle = Date.now() / 3000;
    //     cameraControlsRef.current.setPosition(Math.sin(angle) * 2, 2, Math.cos(angle) * 2);
    // });

    const handleClick = () => {
        const intersects = raycaster.intersectObjects(gltf.scene.children, true);
        if (intersects.length > 0) {
            const firstObject = intersects[0].object;
            const firstMaterial = firstObject.material;
            const cloneMaterial = firstMaterial.clone();
            firstObject.material = cloneMaterial;
            const mat = firstObject.material;
            mat.color = new THREE.Color("white");
            cameraControlsRef.current.fitToBox(firstObject, true);
        }
    };
    return (
        <>
            <CameraControls ref={cameraControlsRef} dollyToCursor={true} minDistance={2} maxDistance={10} />
            {/* <mesh scale={5} position={[0, -0.8, 0]}>
                <cylinderGeometry args={[0.5, 0.2, 0.3, 50]} />
                <meshStandardMaterial />
            </mesh> */}
            <directionalLight position={[3, 3, 3]} />
            <pointLight position={[0, 5, 0]} intensity={3} />
            <primitive object={gltf.scene} onClick={handleClick} />
            <ContactShadows scale={5} position={[0, 0, 0]} resolution={512} opacity={0.8} blur={0.5} />
        </>
    );
};

export default ShowRoom;
