import React, { useEffect, useState } from "react";
import { Container, Box, Pagination, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchBox from "../../common/component/SearchBox";
import OrderDetailDialog from "./component/OrderDetailDialog";
import OrderTable from "./component/OrderTable";
import LoadingSpinner from "../../common/component/LoadingSpinner";
import { getOrderList, setSelectedOrder } from "../../features/order/orderSlice";

const AdminOrderPage = () => {
    const navigate = useNavigate();
    const [query] = useSearchParams();
    const dispatch = useDispatch();
    const { orderList, totalPageNum, loading } = useSelector((state) => state.order);
    const [searchQuery, setSearchQuery] = useState({
        page: query.get("page") || 1,
        orderNum: query.get("orderNum") || "",
    });
    const [open, setOpen] = useState(false);

    const tableHeader = ["#", "Order#", "Order Date", "User", "Order Item", "Address", "Total Price", "Status", ""];

    useEffect(() => {
        dispatch(getOrderList({ ...searchQuery }));
    }, [query]);

    useEffect(() => {
        if (searchQuery.orderNum === "") {
            delete searchQuery.orderNum;
        }
        const params = new URLSearchParams(searchQuery);
        const queryString = params.toString();

        navigate(`?${queryString}`);
    }, [searchQuery]);

    const openEditForm = (order) => {
        setOpen(true);
        dispatch(setSelectedOrder(order));
    };

    const handlePageChange = (event, newPage) => {
        setSearchQuery({ ...searchQuery, page: newPage });
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <LoadingSpinner size={60} message="주문 내역을 불러오는 중..." />
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center", minHeight: "100vh" }}>
            <Container maxWidth="lg">
                <Box sx={{ mt: 2 }}>
                    <SearchBox
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        placeholder="주문번호로 검색"
                        field="orderNum"
                    />
                </Box>

                <OrderTable header={tableHeader} data={orderList} openEditForm={openEditForm} />

                {totalPageNum > 1 && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}>
                        <Pagination
                            count={totalPageNum}
                            page={parseInt(searchQuery.page)}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                        />
                    </Box>
                )}
            </Container>

            {open && <OrderDetailDialog open={open} handleClose={handleClose} />}
        </Box>
    );
};

export default AdminOrderPage;
