import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";

const SearchBox = ({ searchQuery, setSearchQuery, placeholder, field }) => {
    const [query] = useSearchParams();
    const [keyword, setKeyword] = useState(query.get(field) || "");

    const onCheckEnter = (event) => {
        if (event.key === "Enter") {
            setSearchQuery({ ...searchQuery, page: 1, [field]: event.target.value });
        }
    };

    return (
        <TextField
            placeholder={placeholder}
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            onKeyPress={onCheckEnter}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            variant="standard"
            sx={{ width: "50%" }}
        />
    );
};

export default SearchBox;
