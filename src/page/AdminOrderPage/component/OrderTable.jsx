import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { currencyFormat } from "../../../utils/number";

const OrderTable = ({ header, data, openEditForm }) => {
    return (
        <Box sx={{ overflowX: "auto" }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {header.map((title, index) => (
                                <TableCell key={index}>{title}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.length > 0 ? (
                            data.map((item, index) => (
                                <TableRow key={item._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.orderNum}</TableCell>
                                    <TableCell>{item.createdAt.slice(0, 10)}</TableCell>
                                    <TableCell>{item.userId?.email || "N/A"}</TableCell>
                                    <TableCell sx={{ minWidth: "100px" }}>
                                        {item.items.length > 0 ? (
                                            <Box>
                                                {item.items[0].productId?.name || "Unknown"}
                                                {item.items.length > 1 && (
                                                    <Box
                                                        component="span"
                                                        sx={{ color: "text.secondary", fontSize: "0.875rem" }}
                                                    >
                                                        외 {item.items.length - 1}개
                                                    </Box>
                                                )}
                                            </Box>
                                        ) : (
                                            "No Items"
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {item.shipTo?.address} {item.shipTo?.city}
                                    </TableCell>
                                    <TableCell>{currencyFormat(item.totalPrice)}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell sx={{ minWidth: "100px" }}>
                                        <IconButton color="primary" size="small" onClick={() => openEditForm(item)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={header.length} align="center">
                                    No Data to show
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default OrderTable;
