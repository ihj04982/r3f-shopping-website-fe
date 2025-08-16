import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Pause, PlayArrow } from "@mui/icons-material";
import * as THREE from "three";
import ShowRoom from "./component/ShowRoom";
import { DEFAULT_PART_COLORS } from "../../constants/showroom.constants";
import CustomizeToolbar from "./component/CustomizeToolbar";

const ShowRoomPage = () => {
    const [partColors, setPartColors] = useState(DEFAULT_PART_COLORS);
    const [isRotating, setIsRotating] = useState(false);

    const handlePartColorChange = (partType, colorId) => {
        setPartColors((prev) => {
            const newColors = { ...prev, [partType]: colorId };
            return newColors;
        });
    };

    const handleRotationToggle = () => {
        setIsRotating(!isRotating);
    };

    const handleAddToCart = () => {
        console.log("Add to cart clicked");
        // TODO: 장바구니 기능 구현
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                background: "#f5f5f5",
                position: "relative",
            }}
        >
            <Grid container sx={{ p: 4, height: "100%" }}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="overline" sx={{ mb: 1 }}>
                            2025 컬렉션
                        </Typography>
                        <Typography variant="h1" sx={{ mb: 3, fontWeight: 300 }}>
                            Noona 02
                        </Typography>

                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            젠틀몬스터의 2025 주얼리 컬렉션을 소개합니다. 주얼리 디테일이 템플에 장식된 제품부터 진주
                            목걸이를 연상시키는 스테이트먼트 피스에 이르기까지 주얼리의 화려함을 통해 젠틀몬스터만의
                            독창적인 미적 감각을 드러내는 2025 컬렉션을 만나보세요.
                        </Typography>
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                                Customize
                            </Typography>
                            <CustomizeToolbar partColors={partColors} onPartColorChange={handlePartColorChange} />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 3,
                                mb: 1,
                            }}
                        >
                            <Typography variant="h4" color="text.primary">
                                $299
                            </Typography>
                            <Button variant="contained" onClick={handleAddToCart}>
                                Add to Cart
                            </Button>
                        </Box>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Canvas
                        camera={{ position: [0, 2, 8], fov: 45 }}
                        shadows="soft"
                        gl={{
                            antialias: true,
                            toneMapping: THREE.ACESFilmicToneMapping,
                            toneMappingExposure: 0.8,
                            outputColorSpace: THREE.SRGBColorSpace,
                            alpha: true,
                        }}
                        style={{
                            background: "transparent",
                            width: "100%",
                            height: "100%",
                            paddingLeft: 32,
                        }}
                    >
                        <Suspense fallback={null}>
                            <ambientLight intensity={0.5} />
                            <directionalLight
                                position={[10, 10, 5]}
                                intensity={1}
                                castShadow
                                shadow-mapSize={[2048, 2048]}
                            />

                            <ShowRoom partColors={partColors} isRotating={isRotating} />
                        </Suspense>
                    </Canvas>
                    <Button
                        variant="text"
                        onClick={handleRotationToggle}
                        startIcon={isRotating ? <Pause /> : <PlayArrow />}
                        sx={{
                            position: "absolute",
                            bottom: 10,
                            right: 10,
                            color: "text.secondary",
                        }}
                    >
                        {isRotating ? "Stop Rotation" : "Auto Rotate"}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ShowRoomPage;
