import React from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";

const ShowRoom = () => {
    const gltf = useLoader(GLTFLoader, "./models/sunglasses.glb");
    const { raycaster } = useThree();

    return (
        <>
            <primitive
                object={gltf.scene}
                onClick={(e) => {
                    const intersects = raycaster.intersectObjects(gltf.scene.children, true);
                    if (intersects.length > 0) {
                        const firstObject = intersects[0].object;
                        const firstMaterial = firstObject.material;
                        const cloneMaterial = firstMaterial.clone();

                        firstObject.material = cloneMaterial;
                        const mat = firstObject.material;
                        mat.color = new THREE.Color("red");
                    }
                }}
            />
        </>
    );
};

export default ShowRoom;
