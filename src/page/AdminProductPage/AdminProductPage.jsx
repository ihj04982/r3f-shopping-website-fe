import React, { useEffect, useState } from "react";
import { Container, Button, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchBox from "../../common/component/SearchBox";
import NewItemDialog from "./component/NewItemDialog";
import ProductTable from "./component/ProductTable";
import { getProductList, deleteProduct, setSelectedProduct } from "../../features/product/productSlice";

const AdminProductPage = () => {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const dispatch = useDispatch();
  const { productList, totalPageNum } = useSelector((state) => state.product);
  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  }); //검색 조건들을 저장하는 객체

  const [mode, setMode] = useState("new");

  const tableHeader = ["#", "Sku", "Name", "Price", "Stock", "Image", "Status", ""];

  //상품리스트 가져오기 (url쿼리 맞춰서)

  useEffect(() => {
    //검색어나 페이지가 바뀌면 url바꿔주기 (검색어또는 페이지가 바뀜 => url 바꿔줌=> url쿼리 읽어옴=> 이 쿼리값 맞춰서  상품리스트 가져오기)
  }, [searchQuery]);

  const deleteItem = (id) => {
    //아이템 삭제하가ㅣ
  };

  const openEditForm = (product) => {
    //edit모드로 설정하고
    // 아이템 수정다이얼로그 열어주기
  };

  const handleClickNewItem = () => {
    //new 모드로 설정하고
    // 다이얼로그 열어주기
  };

  const handlePageChange = (event, newPage) => {
    //  쿼리에 페이지값 바꿔주기
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Box sx={{ mt: 2 }}>
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="제품 이름으로 검색"
            field="name"
          />
        </Box>
        <Button variant="contained" sx={{ mt: 2, mb: 2 }} onClick={handleClickNewItem}>
          Add New Item +
        </Button>

        <ProductTable header={tableHeader} data="" deleteItem={deleteItem} openEditForm={openEditForm} />
      </Container>

      <NewItemDialog mode={mode} showDialog={showDialog} setShowDialog={setShowDialog} />
    </Box>
  );
};

export default AdminProductPage;
