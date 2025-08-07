import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    FormLabel,
    FormHelperText,
    Select,
    MenuItem,
    Alert,
    Box,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import CloudinaryUploadWidget from "../../../utils/CloudinaryUploadWidget";
import { CATEGORY, STATUS, COLORS } from "../../../constants/product.constants";
import { clearError, createProduct, editProduct, getProductList } from "../../../features/product/productSlice";
import { useSearchParams } from "react-router-dom";

const InitialFormData = {
    name: "",
    sku: "",
    stock: {},
    image: "",
    description: "",
    category: [],
    status: "active",
    color: "",
    price: 0,
};

const NewItemDialog = ({ mode, showDialog, setShowDialog }) => {
    const { error, success, selectedProduct } = useSelector((state) => state.product);
    const [formData, setFormData] = useState(mode === "new" ? { ...InitialFormData } : selectedProduct);
    const [stock, setStock] = useState([]);
    const dispatch = useDispatch();
    const [validationError, setValidationError] = useState("");
    const [query] = useSearchParams();

    useEffect(() => {
        if (success) setShowDialog(false);
    }, [success]);

    useEffect(() => {
        if (error || !success) {
            dispatch(clearError());
        }
        if (showDialog) {
            if (mode === "edit") {
                setFormData(selectedProduct);
                // 객체형태로 온 stock을 다시 배열로 세팅해주기
                const colorArray = Object.keys(selectedProduct.stock).map((color) => [
                    color,
                    selectedProduct.stock[color],
                ]);
                setStock(colorArray);
            } else {
                setFormData({ ...InitialFormData });
                setStock([]);
            }
        }
    }, [showDialog]);

    const handleClose = () => {
        //모든걸 초기화시키고;
        // 다이얼로그 닫아주기
        setFormData({ ...InitialFormData });
        setStock([]);
        setValidationError("");
        setShowDialog(false);
        dispatch(getProductList({ page: query.get("page") || 1, name: query.get("name") || "" }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (stock.length === 0) {
            setValidationError("재고를 추가해주세요");
            return;
        }

        if (formData.category.length === 0) {
            setValidationError("카테고리를 선택해주세요");
            return;
        }

        if (formData.image === "") {
            setValidationError("이미지를 추가해주세요");
            return;
        }
        const stockObject = stock.reduce((total, item) => {
            return { ...total, [item[0]]: parseInt(item[1]) };
        }, {});

        if (mode === "new") {
            //새 상품 만들기
            dispatch(createProduct({ ...formData, stock: stockObject }));
        } else {
            // 상품 수정하기
            dispatch(editProduct({ ...formData, stock: stockObject }));
        }
    };

    const handleChange = (event) => {
        //form에 데이터 넣어주기
        const { id, name, value } = event.target;
        const fieldName = name || id;
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };

    const addStock = () => {
        //재고타입 추가시 배열에 새 배열 추가
        setStock([...stock, []]);
    };

    const deleteStock = (idx) => {
        //재고 삭제하기
        const newStock = stock.filter((_, index) => index !== idx);
        setStock(newStock);
    };

    const handleColorChange = (value, index) => {
        //  재고 색상 변환하기
        const newStock = [...stock];
        newStock[index][0] = value;
        setStock(newStock);
    };

    const handleStockChange = (value, index) => {
        //재고 수량 변환하기
        const newStock = [...stock];
        newStock[index][1] = value;
        setStock(newStock);
    };

    const onHandleCategory = (event) => {
        const value = event.target.value;
        const categoryValue = typeof value === "string" ? value.split(",") : value;
        setFormData({
            ...formData,
            category: categoryValue,
        });
        if (categoryValue.length > 0) {
            setValidationError("");
        }
    };

    const uploadImage = (url) => {
        //이미지 업로드
        setFormData({
            ...formData,
            image: url,
        });
    };

    return (
        <Dialog open={showDialog} onClose={handleClose} maxWidth="md" fullWidth>
            <Box component="form" onSubmit={handleSubmit}>
                <DialogTitle>
                    {mode === "new" ? "Create New Product" : "Edit Product"}
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                {(error || validationError) && (
                    <Box sx={{ px: 3, pt: 1 }}>
                        <Alert severity="error">{error || validationError}</Alert>
                    </Box>
                )}

                <DialogContent>
                    <Box sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    id="sku"
                                    fullWidth
                                    label="Sku"
                                    value={formData.sku}
                                    onChange={handleChange}
                                    placeholder="Enter Sku"
                                    required
                                    name="sku"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    id="name"
                                    fullWidth
                                    label="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    required
                                    name="name"
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            id="description"
                            fullWidth
                            label="Description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            multiline
                            rows={3}
                            required
                            name="description"
                            sx={{ mt: 2 }}
                        />

                        <Box sx={{ mt: 2 }}>
                            <FormControl fullWidth id="stock">
                                <FormLabel>Stock</FormLabel>
                                <Button variant="outlined" size="small" onClick={addStock} sx={{ mt: 1 }}>
                                    Add +
                                </Button>
                                <Box sx={{ mt: 2 }}>
                                    {stock.map((item, index) => (
                                        <Grid container spacing={1} key={index} sx={{ mb: 1 }}>
                                            <Grid size={{ xs: 5 }}>
                                                <FormControl fullWidth id="color">
                                                    <Select
                                                        value={item[0] ? item[0].toLowerCase() : ""}
                                                        onChange={(event) =>
                                                            handleColorChange(event.target.value, index)
                                                        }
                                                        required
                                                        displayEmpty
                                                    >
                                                        <MenuItem value="" disabled>
                                                            Please Choose...
                                                        </MenuItem>
                                                        {COLORS.map((color, idx) => (
                                                            <MenuItem
                                                                key={idx}
                                                                value={color.toLowerCase()}
                                                                disabled={stock.some(
                                                                    (stockItem) => stockItem[0] === color.toLowerCase()
                                                                )}
                                                            >
                                                                {color}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid size={{ xs: 6 }}>
                                                <TextField
                                                    id="stock"
                                                    fullWidth
                                                    type="number"
                                                    placeholder="number of stock"
                                                    value={item[1]}
                                                    onChange={(event) => handleStockChange(event.target.value, index)}
                                                    required
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 1 }}>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => deleteStock(index)}
                                                    sx={{ mt: 1 }}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Box>
                            </FormControl>
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <FormControl fullWidth sx={{ gap: 1 }} id="image">
                                <FormLabel>Image</FormLabel>
                                <CloudinaryUploadWidget uploadImage={uploadImage} />
                                {formData.image && (
                                    <img
                                        id="uploadedimage"
                                        src={formData.image}
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                            marginTop: "8px",
                                            border: "1px solid #ddd",
                                            borderRadius: "4px",
                                        }}
                                        alt="uploadedimage"
                                    />
                                )}
                            </FormControl>
                        </Box>

                        <Grid container spacing={2} sx={{ mt: 3, alignItems: "flex-end" }}>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <TextField
                                    id="price"
                                    fullWidth
                                    label="Price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="0"
                                    required
                                    name="price"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <FormControl fullWidth>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        id="category"
                                        multiple
                                        value={formData.category}
                                        onChange={onHandleCategory}
                                    >
                                        {CATEGORY.map((item, idx) => (
                                            <MenuItem key={idx} value={item.toLowerCase()}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <FormControl fullWidth>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        id="status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        required
                                    >
                                        {STATUS.map((item, idx) => (
                                            <MenuItem key={idx} value={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" type="submit">
                        {mode === "new" ? "Submit" : "Edit"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default NewItemDialog;
