import React from "react";
import { Canvas } from "@react-three/fiber";
import { Box } from "@mui/material";
import { OrbitControls } from "@react-three/drei";
import ShowRoom from "./component/ShowRoom";

const ShowRoomPage = () => {
    return (
        <Box
            sx={{
                width: "100%",
                flex: 1,
                height: "100%",
            }}
        >
            <Canvas style={{ width: "100%", height: "100%" }}>
                {/* <axesHelper args={[5]} /> */}
                {/* <gridHelper args={[10, 10]} /> */}
                <ShowRoom />
            </Canvas>
        </Box>
    );
};

export default ShowRoomPage;
