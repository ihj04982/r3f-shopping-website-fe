import React from "react";
import { Box, IconButton } from "@mui/material";
import { COLOR_ARRAY } from "../../../constants/showroom.constants";

const ColorSelection = ({ onColorChange, selectedColor }) => {
    const handleColorChange = (color) => {
        onColorChange(color);
    };

    return (
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            {COLOR_ARRAY.map((color) => (
                <IconButton
                    key={color.name}
                    onClick={() => handleColorChange(color.value)}
                    sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: color.value,
                        border: selectedColor === color.value ? "3px solid #202124" : "2px solid #e8eaed",
                        borderRadius: "50%",
                        transition: "all 200ms cubic-bezier(0.16, 1, 0.3, 1)",
                        "&:hover": {
                            backgroundColor: color.value,
                            opacity: 0.9,
                            transform: "scale(1.1)",
                        },
                        "&:active": {
                            transform: "scale(0.95)",
                        },
                    }}
                    title={color.name}
                />
            ))}
        </Box>
    );
};

export default ColorSelection;
