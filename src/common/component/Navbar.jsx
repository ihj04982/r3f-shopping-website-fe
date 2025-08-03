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
} from "@mui/material";
import {
  Person as PersonIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingBag as ShoppingBagIcon,
  Inventory as InventoryIcon,
  Close as CloseIcon,
  DeviceHub,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user/userSlice";

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { cartItemCount } = useSelector((state) => state.cart);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const menuList = ["ShowRoom", "여성", "Divided", "남성", "신생아/유아", "아동", "H&M HOME", "Sale", "지속가능성"];
  let navigate = useNavigate();

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        return navigate("/");
      }
      navigate(`?name=${event.target.value}`);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
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
          <ListItem button key={index}>
            <ListItemText primary={menu} />
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
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <DeviceHub sx={{ fontSize: 40 }} />
            </Link>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {user ? (
              <Button color="inherit" startIcon={<PersonIcon />} onClick={handleLogout}>
                {!isMobile && "로그아웃"}
              </Button>
            ) : (
              <Button color="inherit" startIcon={<PersonIcon />} onClick={() => navigate("/login")}>
                {!isMobile && "로그인"}
              </Button>
            )}

            <IconButton color="inherit" onClick={() => navigate("/cart")}>
              <Badge badgeContent={cartItemCount || 0} color="error">
                <ShoppingBagIcon />
              </Badge>
            </IconButton>

            <IconButton color="inherit" onClick={() => navigate("/account/purchase")}>
              <InventoryIcon />
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
          display: { xs: 'none', md: 'flex' },
          justifyContent: "space-between",
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
                <Button color="inherit" sx={{ textTransform: "none" }}>
                  {menu}
                </Button>
              </Box>
            ))}
          </Box>
        </Box>

        <TextField
          placeholder="제품검색"
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
          sx={{ width: 200 }}
        />
      </Box>
    </Box>
  );
};

export default Navbar;
