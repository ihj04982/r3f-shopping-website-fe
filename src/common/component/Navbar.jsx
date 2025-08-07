import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    TextField,
    InputAdornment,
    Badge,
    useMediaQuery,
    useTheme,
    Typography,
} from "@mui/material";
import {
    Person as PersonIcon,
    Menu as MenuIcon,
    Search as SearchIcon,
    ShoppingBag as ShoppingBagIcon,
    Inventory as InventoryIcon,
    Close as CloseIcon,
    ShoppingCart,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ user }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { cartItemCount } = useSelector((state) => state?.cart || { cartItemCount: 0 });
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const menuList = [
        { name: "ShowRoom", path: "/showroom" },
        { name: "Glasses", path: "/" },
        { name: "Sunglasses", path: "/" },
        { name: "Accessories", path: "/" },
    ];
    let navigate = useNavigate();

    const onCheckEnter = (event) => {
        if (event.key === "Enter") {
            if (event.target.value === "") {
                return navigate("/");
            }
            navigate(`?name=${event.target.value}`);
        }
    };

    const moveToMyPage = () => {
        if (user) {
            navigate("/account");
        } else {
            navigate("/login");
        }
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerList = () => (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
                <IconButton onClick={toggleDrawer(false)}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <List>
                {menuList.map((menu, index) => (
                    <ListItem
                        key={index}
                        component="button"
                        onClick={() => {
                            navigate(menu.path);
                            toggleDrawer(false)();
                        }}
                        sx={{ width: "100%", textAlign: "left", border: "none", background: "none" }}
                    >
                        <ListItemText primary={menu.name} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerList()}
            </Drawer>

            {user && user.level === "admin" && (
                <Box sx={{ bgcolor: "primary.main", color: "white", textAlign: "center", py: 1 }}>
                    <Link to="/admin/product?page=1" style={{ color: "white", textDecoration: "none" }}>
                        Admin page
                    </Link>
                </Box>
            )}

            <AppBar position="static" color="default" elevation={1}>
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
                        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                            <Typography variant="h2" component="h2" sx={{ fontWeight: 700, fontSize: "1.5rem" }}>
                                PROJECT
                            </Typography>
                        </Link>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconButton color="inherit" onClick={moveToMyPage}>
                            <PersonIcon />
                        </IconButton>

                        <IconButton color="inherit" onClick={() => navigate("/cart")}>
                            <Badge badgeContent={cartItemCount || 0} color="error">
                                <ShoppingBagIcon />
                            </Badge>
                        </IconButton>

                        {isMobile && (
                            <IconButton color="inherit" onClick={() => setShowSearchBox(true)}>
                                <SearchIcon />
                            </IconButton>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile Search Box - appears below navbar */}
            {isMobile && showSearchBox && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 2,
                        bgcolor: "background.paper",
                        borderBottom: 1,
                        borderColor: "divider",
                    }}
                >
                    <TextField
                        fullWidth
                        placeholder="제품검색"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        onKeyPress={onCheckEnter}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        size="small"
                        autoFocus
                    />
                    <IconButton onClick={() => setShowSearchBox(false)} sx={{ ml: 1 }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            )}

            <Box
                sx={{
                    display: { xs: "none", md: "flex" },
                    justifyContent: "center",
                    alignItems: "center",
                    px: 2,
                    py: 1,
                    bgcolor: "background.paper",
                    borderBottom: 1,
                    borderColor: "divider",
                }}
            >
                <Box component="nav">
                    <Box
                        component="ul"
                        sx={{
                            display: "flex",
                            listStyle: "none",
                            m: 0,
                            p: 0,
                            gap: 3,
                        }}
                    >
                        {menuList.map((menu, index) => (
                            <Box component="li" key={index}>
                                <Button
                                    color="inherit"
                                    sx={{ textTransform: "none" }}
                                    onClick={() => navigate(menu.path)}
                                >
                                    {menu.name}
                                </Button>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Navbar;
