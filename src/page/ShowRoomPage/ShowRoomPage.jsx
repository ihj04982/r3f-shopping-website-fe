import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Box } from "@mui/material";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import ShowRoom from "./component/ShowRoom";
import { FilmGrain, HazyAir, StudioBackground, StudioFloor, StudioLights } from "./component/StudioEffects";
// import ColorSelection from "./com ponent/ColorSelection";

const ShowRoomPage = () => {
    return (
        <Box sx={{ width: "100vw", height: "100vh", background: "#707080" }}>
            <Canvas
                camera={{ position: [6, 4, 10], fov: 45 }}
                shadows
                gl={{
                    antialias: false,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2,
                    outputColorSpace: THREE.SRGBColorSpace,
                }}
            >
                <Suspense fallback={null}>
                    {/* 스튜디오 환경 효과들 */}
                    <StudioBackground />
                    <StudioLights />
                    <StudioFloor />
                    <HazyAir />

                    {/* 기존 ShowRoom 컴포넌트 */}
                    <ShowRoom />

                    {/* 부드러운 그림자 */}
                    <ContactShadows
                        position={[0, -0.99, 0]}
                        opacity={0.5}
                        scale={15}
                        blur={2.5}
                        far={10}
                        color="#000000"
                    />

                    {/* 스튜디오 환경맵 */}
                    <Environment preset="studio" environmentIntensity={0.5} />

                    {/* 카메라 컨트롤 */}
                    <OrbitControls
                        enablePan={false}
                        minDistance={5}
                        maxDistance={20}
                        minPolarAngle={Math.PI / 6}
                        maxPolarAngle={Math.PI / 2}
                        enableDamping
                        dampingFactor={0.05}
                    />

                    {/* 포그 효과 */}
                    <fog attach="fog" args={["#707080", 10, 40]} />

                    {/* 필름 그레인 효과 */}
                    <FilmGrain />

                    {/* <axesHelper args={[5]} /> */}
                    {/* <gridHelper args={[10, 10]} /> */}
                </Suspense>
            </Canvas>
            {/* <ColorSelection /> */}
        </Box>
    );
};

export default ShowRoomPage;
