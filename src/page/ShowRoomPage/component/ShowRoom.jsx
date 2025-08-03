import React from "react";
import * as THREE from "three";
// import { useLoader } from "@react-three/fiber";
// import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

const ShowRoom = () => {
    // const obj = useLoader(OBJLoader, "./models/custom.obj");

    return (
        <>
            {/* <primitive object={obj} /> */}
            <mesh rotation={[0, THREE.MathUtils.degToRad(45), 0]}>
                <boxGeometry />
                <meshStandardMaterial color="red" />
            </mesh>
        </>
    );
};

export default ShowRoom;
