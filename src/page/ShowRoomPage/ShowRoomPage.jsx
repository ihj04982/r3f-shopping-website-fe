import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import { RotateLeft, ShoppingCart } from "@mui/icons-material";
import * as THREE from "three";
import ShowRoom from "./component/ShowRoom";
import { StudioLights, DustParticles, HazyAir, FilmGrain, DomeBackground } from "./component/StudioEffects";
import ColorSelection from "./component/ColorSelection";

const ShowRoomPage = () => {
    const [selectedColor, setSelectedColor] = useState("#000000");
    const [isRotating, setIsRotating] = useState(false);

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const handleRotationToggle = () => {
        setIsRotating(!isRotating);
    };

    const handleAddToCart = () => {
        console.log("Add to cart clicked");
    };

    return (
        <Box sx={{ width: "100%", height: "100%", background: "#0F1521", position: "relative" }}>
            <Canvas
                camera={{ position: [0, 2, 8], fov: 45 }}
                shadows
                gl={{
                    antialias: false,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.1,
                    outputColorSpace: THREE.SRGBColorSpace,
                }}
            >
                <Suspense fallback={null}>
                    <DomeBackground />
                    <StudioLights />
                    <HazyAir />

                    <ShowRoom selectedColor={selectedColor} isRotating={isRotating} />

                    <Environment preset="studio" environmentIntensity={0.4} />

                    <fog attach="fog" args={["#296283", 8, 30]} />

                    <FilmGrain />
                </Suspense>
            </Canvas>

            {/* 좌측 하단 - 회ㅌㅌ전 버튼 */}
            <Box sx={{ position: "absolute", bottom: 20, left: 20, zIndex: 1000 }}>
                <IconButton
                    onClick={handleRotationToggle}
                    sx={{
                        bgcolor: isRotating ? "primary.main" : "rgba(255, 255, 255, 0.1)",
                        color: isRotating ? "white" : "white",
                        width: 60,
                        height: 60,
                        border: "2px solid rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(10px)",
                        "&:hover": {
                            bgcolor: isRotating ? "primary.dark" : "rgba(255, 255, 255, 0.2)",
                        },
                    }}
                >
                    <RotateLeft />
                </IconButton>
            </Box>

            <Box sx={{ position: "absolute", bottom: 20, right: 20, zIndex: 1000 }}>
                <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={handleAddToCart}
                    sx={{
                        bgcolor: "primary.main",
                        color: "white",
                        px: 3,
                        py: 1.5,
                        borderRadius: 2,
                        backdropFilter: "blur(10px)",
                        border: "2px solid rgba(255, 255, 255, 0.2)",
                        "&:hover": {
                            bgcolor: "primary.dark",
                        },
                    }}
                >
                    Add to Cart
                </Button>
            </Box>

            <Box sx={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", zIndex: 1000 }}>
                <Box
                    sx={{
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                        p: 2,
                        borderRadius: 2,
                        backdropFilter: "blur(10px)",
                        border: "2px solid rgba(255, 255, 255, 0.2)",
                    }}
                >
                    <Typography variant="body2" sx={{ color: "white", mb: 1, textAlign: "center" }}>
                        Color
                    </Typography>
                    <ColorSelection onColorChange={handleColorChange} selectedColor={selectedColor} />
                </Box>
            </Box>

            <Box sx={{ position: "absolute", top: 20, right: 20, zIndex: 1000, maxWidth: 300 }}>
                <Box
                    sx={{
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                        p: 3,
                        borderRadius: 2,
                        backdropFilter: "blur(10px)",
                        border: "2px solid rgba(255, 255, 255, 0.2)",
                    }}
                >
                    <Typography variant="h6" sx={{ color: "white", mb: 2, fontWeight: "bold" }}>
                        Premium Sunglasses
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)", mb: 2 }}>
                        Experience luxury and style with our premium sunglasses collection. Crafted with precision and
                        designed for comfort, these sunglasses offer superior UV protection while maintaining an elegant
                        aesthetic.
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                        • 100% UV Protection
                        <br />
                        • Premium Materials
                        <br />
                        • Comfortable Fit
                        <br />• Lifetime Warranty
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default ShowRoomPage;
