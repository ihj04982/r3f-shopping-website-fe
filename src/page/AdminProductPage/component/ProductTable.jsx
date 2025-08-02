import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { currencyFormat } from "../../../utils/number";

const ProductTable = ({ header, data, deleteItem, openEditForm }) => {
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
                <TableRow key={index}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell sx={{ minWidth: "100px" }}>{item.name}</TableCell>
                  <TableCell>{currencyFormat(item.price)}</TableCell>
                  <TableCell>
                    {Object.keys(item.stock).map((size, index) => (
                      <Box key={index}>
                        {size}:{item.stock[size]}
                      </Box>
                    ))}
                  </TableCell>
                  <TableCell>
                    <img src={item.image} width={100} alt="image" />
                  </TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell sx={{ minWidth: "100px" }}>
                    <IconButton color="error" size="small" onClick={() => deleteItem(item._id)} sx={{ mr: 1 }}>
                      <DeleteIcon />
                    </IconButton>
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

export default ProductTable;
