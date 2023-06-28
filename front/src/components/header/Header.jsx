import { LogoutOutlined } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.PNG";
import SearchBar from "../searchBar/SearchBar";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Header() {
  // const tokenUser = useSelector((state) => state.sessionState);
  const sesionLocal = JSON.parse(localStorage.getItem("session"));
  // console.log("sesion---->", sesionLocal);
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSesionClose = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/");
  };
  if (!sesionLocal) {
    return (
      <AppBar className="texts-login" position="relative">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 0,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem>
                  <NavLink className="color-header-res" to={"/login"}>
                    <LoginRoundedIcon></LoginRoundedIcon>
                  </NavLink>

                  <NavLink className="color-header-res2" to={"/login"}>
                    LOGIN
                  </NavLink>
                </MenuItem>
              </Menu>
            </Box>

            <NavLink to={"/"}>
              <img
                alt="logo"
                src={logo}
                width="100px"
                style={{ cursor: "pointer" }}
              />
            </NavLink>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>

            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              className="color-header"
            >
              <NavLink className="color-header" to={"/login"}>
                LOGIN
              </NavLink>
              <NavLink className="color-header" to={"/login"}>
                <LoginRoundedIcon></LoginRoundedIcon>
              </NavLink>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <SearchBar />
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

  if (sesionLocal && sesionLocal[0].role === "admin") {
    return (
      <AppBar className="texts-login" position="relative">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                
              
                <MenuItem>
                  <NavLink className="color-header-res" to={"/admin"}>
                    <SupervisorAccountRoundedIcon></SupervisorAccountRoundedIcon>
                  </NavLink>
                  <NavLink className="color-header-res2" to={"/admin"}>
                    ADMIN
                  </NavLink>
                </MenuItem>
                
                <MenuItem>
                  <NavLink className="color-header-res" to={"/cart"}>
                    <ShoppingCartIcon />
                  </NavLink>
                  <NavLink className="color-header-res2" to={"/cart"}>
                    CART
                  </NavLink>
                </MenuItem>

                <MenuItem>
                  <NavLink className="color-header-res" to={"/profile"}>
                    <AccountCircleIcon />{" "}
                  </NavLink>
                  <NavLink className="color-header-res2" to={"/profile"}>
                    {sesionLocal[0].username[0].toUpperCase() +
                      sesionLocal[0].username.slice(1)}
                  </NavLink>
                </MenuItem>
              </Menu>
            </Box>

            <NavLink to={"/"}>
              <img
                alt="logo"
                src={logo}
                width="100px"
                style={{ cursor: "pointer" }}
              />
            </NavLink>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>

            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              className="color-header"
            >
              <NavLink className="color-header" to={"/admin"}>
                <SupervisorAccountRoundedIcon></SupervisorAccountRoundedIcon>
              </NavLink>
              <NavLink className="color-header" to={"/admin"}>
                ADMIN
              </NavLink>

              <NavLink className="color-header" to={"/profile"}>
                <AccountCircleIcon />{" "}
              </NavLink>
              <NavLink className="color-header" to={"/profile"}>
                {sesionLocal[0].username[0].toUpperCase() +
                  sesionLocal[0].username.slice(1)}
              </NavLink>
              
              <NavLink className="color-header2" to={"/cart"}>
                  <ShoppingCartIcon />
              </NavLink>
              <NavLink className="color-header" to={"/cart"}>
                CART
              </NavLink>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <SearchBar />
            <Button
              variant="outlined"
              onClick={handleSesionClose}
              sx={{ ml: 3, color: "#ff6700" }}
              endIcon={<LogoutOutlined />}
            >
              LOGOUT
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

  if (sesionLocal && sesionLocal[0].role === "user") {
    return (
      <AppBar className="texts-login" position="relative">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem>
                  <NavLink className="color-header-res" to={"/cart"}>
                    <ShoppingCartIcon />
                  </NavLink>
                  <NavLink className="color-header-res2" to={"/cart"}>
                    CART
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink className="color-header-res" to={"/createProduct"}>
                    <AddBoxIcon></AddBoxIcon>
                  </NavLink>
                  <NavLink className="color-header-res2" to={"/createProduct"}>
                    CREATE PRODUCT
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink className="color-header-res" to={"/profile"}>
                    <AccountCircleIcon />{" "}
                  </NavLink>
                  <NavLink className="color-header-res2" to={"/profile"}>
                    {sesionLocal[0].username[0].toUpperCase() +
                      sesionLocal[0].username.slice(1)}
                  </NavLink>
                </MenuItem>
              </Menu>
            </Box>

            <NavLink to={"/"}>
              <img
                alt="logo"
                src={logo}
                width="100px"
                style={{ cursor: "pointer" }}
              />
            </NavLink>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>

            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              className="color-header"
            >
              <NavLink className="color-header2" to={"/profile"}>
                <AccountCircleIcon />{" "}
              </NavLink>
              <NavLink className="color-header" to={"/profile"}>
                {sesionLocal[0].username[0].toUpperCase() +
                  sesionLocal[0].username.slice(1)}
              </NavLink>
              <NavLink className="color-header2" to={"/cart"}>
                <ShoppingCartIcon />
              </NavLink>
              <NavLink className="color-header" to={"/cart"}>
                CART
              </NavLink>

              <NavLink className="color-header2" to={"/createProduct"}>
                <AddBoxIcon></AddBoxIcon>
              </NavLink>
              <NavLink className="color-header" to={"/createProduct"}>
                CREATE PRODUCT
              </NavLink>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <SearchBar />
            <Button
              variant="outlined"
              onClick={handleSesionClose}
              sx={{ ml: 3, color: "#ff6700" }}
              endIcon={<LogoutOutlined />}
            >
              LOGOUT
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}
