import React, { useState } from "react";
import { Box, Tabs, Tab, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { PART_MATCAP_PALETTES, PART_ORDER } from "../../../constants/showroom.constants";

const CustomizeToolbar = ({ partColors, onPartColorChange }) => {
    const theme = useTheme();

    const [selectedPartTab, setSelectedPartTab] = useState(0);

    const handlePartTabChange = (event, newValue) => {
        setSelectedPartTab(newValue);
    };

    const handleColorSelect = (partType, colorId) => {
        onPartColorChange(partType, colorId);
    };

    const getPartDisplayName = (partType) => {
        const names = {
            base: "프레임",
            lense: "렌즈",
            gem: "장식",
            tip: "다리",
        };
        return names[partType] || partType;
    };

    const currentPartType = PART_ORDER[selectedPartTab];
    const currentMatcaps = PART_MATCAP_PALETTES[currentPartType] || [];

    return (
        <Box>
            <Tabs
                value={selectedPartTab}
                onChange={handlePartTabChange}
                variant="fullWidth"
                scrollButtons="auto"
                sx={{
                    mb: 2,
                }}
            >
                {PART_ORDER.map((partType) => (
                    <Tab key={partType} label={getPartDisplayName(partType)} />
                ))}
            </Tabs>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(44px, 1fr))",
                    gap: 1.5,
                    justifyItems: "center",
                }}
            >
                {currentMatcaps.map((material) => (
                    <IconButton
                        key={material.id}
                        onClick={() => handleColorSelect(currentPartType, material.id)}
                        sx={{
                            width: 44,
                            height: 44,
                            backgroundColor: material.previewColor,
                            border:
                                partColors[currentPartType] === material.id
                                    ? `3px solid ${theme.palette.primary.main}`
                                    : `1px solid ${theme.palette.divider}`,
                        }}
                        title={material.name}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default CustomizeToolbar;
