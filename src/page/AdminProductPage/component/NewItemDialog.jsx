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
import { CATEGORY, STATUS, SIZE } from "../../../constants/product.constants";
import { clearError, createProduct, editProduct } from "../../../features/product/productSlice";

const InitialFormData = {
  name: "",
  sku: "",
  stock: {},
  image: "",
  description: "",
  category: [],
  status: "active",
  price: 0,
};

const NewItemDialog = ({ mode, showDialog, setShowDialog }) => {
  const { error, success, selectedProduct } = useSelector((state) => state.product);
  const [formData, setFormData] = useState(mode === "new" ? { ...InitialFormData } : selectedProduct);
  const [stock, setStock] = useState([]);
  const dispatch = useDispatch();
  const [stockError, setStockError] = useState(false);

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
        // 객체형태로 온 stock을  다시 배열로 세팅해주기
        const sizeArray = Object.keys(selectedProduct.stock).map((size) => [size, selectedProduct.stock[size]]);
        setStock(sizeArray);
      } else {
        setFormData({ ...InitialFormData });
        setStock([]);
      }
    }
  }, [showDialog]);

  const handleClose = () => {
    //모든걸 초기화시키고;
    // 다이얼로그 닫아주기
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //재고를 입력했는지 확인, 아니면 에러
    // 재고를 배열에서 객체로 바꿔주기
    // [['M',2]] 에서 {M:2}로
    if (mode === "new") {
      //새 상품 만들기
    } else {
      // 상품 수정하기
    }
  };

  const handleChange = (event) => {
    //form에 데이터 넣어주기
  };

  const addStock = () => {
    //재고타입 추가시 배열에 새 배열 추가
  };

  const deleteStock = (idx) => {
    //재고 삭제하기
  };

  const handleSizeChange = (value, index) => {
    //  재고 사이즈 변환하기
  };

  const handleStockChange = (value, index) => {
    //재고 수량 변환하기
  };

  const onHandleCategory = (event) => {
    if (formData.category.includes(event.target.value)) {
      const newCategory = formData.category.filter((item) => item !== event.target.value);
      setFormData({
        ...formData,
        category: [...newCategory],
      });
    } else {
      setFormData({
        ...formData,
        category: [...formData.category, event.target.value],
      });
    }
  };

  const uploadImage = (url) => {
    //이미지 업로드
  };

  return (
    <Dialog open={showDialog} onClose={handleClose} maxWidth="md" fullWidth>
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

      {error && (
        <Box sx={{ px: 3, pt: 1 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="Enter Sku"
                required
                name="sku"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
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
            <FormControl fullWidth>
              <FormLabel>Stock</FormLabel>
              {stockError && (
                <Typography color="error" variant="caption">
                  재고를 추가해주세요
                </Typography>
              )}
              <Button variant="outlined" size="small" onClick={addStock} sx={{ mt: 1 }}>
                Add +
              </Button>
              <Box sx={{ mt: 2 }}>
                {stock.map((item, index) => (
                  <Grid container spacing={1} key={index} sx={{ mb: 1 }}>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <Select
                          value={item[0] ? item[0].toLowerCase() : ""}
                          onChange={(event) => handleSizeChange(event.target.value, index)}
                          required
                          displayEmpty
                        >
                          <MenuItem value="" disabled>
                            Please Choose...
                          </MenuItem>
                          {SIZE.map((size, idx) => (
                            <MenuItem
                              key={idx}
                              value={size.toLowerCase()}
                              disabled={stock.some((stockItem) => stockItem[0] === size.toLowerCase())}
                            >
                              {size}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        type="number"
                        placeholder="number of stock"
                        value={item[1]}
                        onChange={(event) => handleStockChange(event.target.value, index)}
                        required
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton color="error" onClick={() => deleteStock(index)} sx={{ mt: 1 }}>
                        <CloseIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <FormLabel>Image</FormLabel>
              <CloudinaryUploadWidget uploadImage={uploadImage} />
              <img
                id="uploadedimage"
                src={formData.image}
                style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "8px" }}
                alt="uploadedimage"
              />
            </FormControl>
          </Box>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={4}>
              <TextField
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
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <FormLabel>Category</FormLabel>
                <Select multiple value={formData.category} onChange={onHandleCategory} required>
                  {CATEGORY.map((item, idx) => (
                    <MenuItem key={idx} value={item.toLowerCase()}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <FormLabel>Status</FormLabel>
                <Select value={formData.status} onChange={handleChange} required name="status">
                  {STATUS.map((item, idx) => (
                    <MenuItem key={idx} value={item.toLowerCase()}>
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
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          {mode === "new" ? "Submit" : "Edit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewItemDialog;
