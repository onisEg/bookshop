import {
  Box,
  Grid,
  Typography,
  IconButton,
  Container,
  Divider,
  ListItemText,
  ListItem,
  List,
  Drawer,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import TobNav from "../TobNav/TobNav";
import "./Navbar.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { CartContext } from "../../../../Context/CartContext";

export default function Navbar() {
  // الحصول على عدد المنتجات في السلة من CartContext
  const cartContext = useContext(CartContext);
  const totalItemsInCart = cartContext
    ? cartContext.cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;
  // =======================
  let navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };
  // const list = () => (

  // );
  return (
    <Box id="navbar">
      <TobNav />
      {/* Navigation bar */}
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #e0e0e0",
          py: 1,
        }}
      >
        <Container>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Grid item xs={6} sm={3} md={2} lg={2}>
              <Box
                sx={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "var(--blue-color)",
                  backgroundImage: "url('/booklogo.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </Grid>
            <Grid item sm={6} md={8} lg={8}>
              <Box
                className="tabs-nav"
                sx={{
                  display: { xs: "none", sm: "flex" },
                  alignItems: "center",
                  justifyContent: "center",
                  textTransform: "uppercase",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Link to="/dashbord/home" className="nav-link active">
                  <Typography>Home</Typography>
                </Link>
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
               
                <Link to="/dashbord/books" className="nav-link">
                  <Typography>Books</Typography>
                </Link>
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                <Link to="/dashbord/new-release" className="nav-link">
                  <Typography>New Release</Typography>
                </Link>
              
              </Box>
            </Grid>
            <Grid item sm={3} md={2} lg={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: { xs: "block", sm: "none" } }}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                  >
                    {
                      <Box
                        sx={{ width: 250, mt: 6 }}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                      >
                        <List>
                          {[
                            "Home",
                         
                            "Books",
                            "New Release",
                           
                          ].map((text) => (
                            <ListItem
                              button
                              key={text}
                              sx={{ textAlign: "center" }}
                            >
                              <ListItemText primary={text} />
                            </ListItem>
                          ))}
                          <Divider />
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              gap: 1,
                              mt: 2,
                            }}
                          >
                            <IconButton color="inherit">
                              <PersonOutlineOutlinedIcon />
                            </IconButton>
                            <IconButton color="inherit">
                              <ShoppingBagOutlinedIcon />
                            </IconButton>
                            <IconButton color="inherit">
                              <FavoriteBorderOutlinedIcon />
                            </IconButton>
                          </Box>
                        </List>
                      </Box>
                    }
                  </Drawer>
                </Box>
                <Box
                  className="Nav-icons"
                  sx={{
                    display: { xs: "none", sm: "flex" }, // Hide on mobile
                    color: "var(--blue-color)",
                    gap: 1, // Adjusts spacing between icons
                  }}
                >
                  <IconButton color="inherit">
                    <PersonOutlineOutlinedIcon />
                  </IconButton>
                  <Divider orientation="vertical" flexItem sx={{ ml: 1 }} />
                  <IconButton
                    color="inherit"
                    onClick={() => navigate("/dashbord/cart")}
                  >
                    <Badge badgeContent={totalItemsInCart} color="error">
                      <ShoppingBagOutlinedIcon />
                    </Badge>
                  </IconButton>
                  <Divider orientation="vertical" flexItem sx={{ ml: 1 }} />
                  <IconButton color="inherit">
                    <FavoriteBorderOutlinedIcon />
                  </IconButton>
                  <Divider orientation="vertical" flexItem sx={{ ml: 1 }} />
                  <IconButton color="inherit" onClick={() => navigate("/")}>
                    <Logout />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
