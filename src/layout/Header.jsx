/* eslint-disable jsx-a11y/alt-text */
import  React, {useEffect, useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useLocation, useNavigate } from "react-router";
import EditNoteIcon from "@mui/icons-material/EditNote";
import storage from "redux-persist/lib/storage";
import { userFlush } from "../store/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/images/inkspire_logo_final_black.png";
import { changeTheme } from "../store/theme/actions";
import axios from "../axios/AxiosConfig";

const pages = [
  {name: `FAQs`, rouete: '/faqs'},
];

const settings = [
  { rouete: "/profile-detail", name: "Profile" },
  { rouete: "/blogs-dashboard", name: "Dashboard" },
  { rouete: "/logout", name: "Logout" },
];

const adminSettings = [
  { rouete: "/blogs-dashboard", name: "Dashboard" },
  { rouete: "/logout", name: "Logout" },
];

const label = { inputProps: { "aria-label": "Switch demo" } };

function Header() {
  // let url =
  //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTODgikvgcP-cKJ4XFH0nO-OaFPzVNKT9kzjg&usqp=CAU";
  const nav = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [address, setAddress] = React.useState(null); //use this state to render the address on frontend
  const { auth } = useSelector((state) => state.auth);
  const [isWalletConnected, setIsWalletConnected] = React.useState(false);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [url, setURL]=useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTODgikvgcP-cKJ4XFH0nO-OaFPzVNKT9kzjg&usqp=CAU");
   
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = async (page = "") => {
    if (page) {
      if (window?.vitePassport) {
        try {
          await window.vitePassport.connectWallet();
          console.log(window.vitePassport);
          const activeNetwork = await window.vitePassport.getNetwork();
          const connectedAddress =
            await window.vitePassport.getConnectedAddress();
          setAddress(connectedAddress);
          setIsWalletConnected(Boolean(connectedAddress));
          console.log(activeNetwork);
        } catch (error) {
          console.log(error);
        }
      }
    }
    setAnchorElNav(null);
  };
  const dispatch = useDispatch();
  const disconnectWallet = async () => {
    await window.vitePassport.disconnectWallet();
  };

  const handleCloseUserMenu = (address) => {
    if (address === "/logout") {
      storage.removeItem("persist:root");
      window.localStorage.clear();
      sessionStorage.clear();
      dispatch(userFlush());
      nav("/login");
    } else {
      nav(address);
    }
    setAnchorElUser(null);
  };
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeThemeHandler = (value) => {
    dispatch(changeTheme());
  };

  
  useEffect(() => {
    const id = localStorage.getItem("id");
    if(id){
      axios.get('/user/getuser?id='+id)
        .then(response => {
          // You can perform any additional logic here based on the response
          const userData = response.data.data;
          setURL(userData.avatar);
          return;
        })
        .catch(error => {
          // Handle errors here if the request fails
          return console.error('Error:', error);
      });
    }
  }, [])

  return (
    <AppBar
      position="static"
      sx={{
        color: { xs: "black" },
        bgcolor: location.pathname === "/" ? "#daf3fc" : "white",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            href="/"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              cursor: "pointer",
              textDecoration: "none",
              display: { md: "flex", xs: "none" },
            }}
            onClick={() => nav("/")}
          >
            <img src={`${Logo}`} style={{ width: "12rem" }} />
          </Typography>

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
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={() => nav('/our-story')}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
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
            onClick={() => nav("/")}
          >
            <img src={`${Logo}`} style={{ width: "12rem" }} />

          </Typography>
          <Box
            direction={"row"}
            mr={5}
            justifyContent={"end"}
            spacing={3}
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => {
                  if (page.name === "Connect Wallet") {
                    handleCloseNavMenu(page.name);
                  } else {
                    nav(page.rouete)
                    handleCloseNavMenu();
                  }
                  if (page.name === "Disconnect") {
                    disconnectWallet();
                  }
                }}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
            <div>
              <Button sx={{ my: 2, color: "black", display: "block" }}>
                <a style={{textDecoration: 'none', color: 'black'}} href="https://www.makingcents.xyz/index.html" >About Us</a>
              </Button>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <Switch {...label} onChange={changeThemeHandler} defaultChecked />
            </div>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {token && (
              <IconButton onClick={() => nav("/story")} sx={{ mx: 1 }}>
                <EditNoteIcon />
              </IconButton>
            )}

            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {token ? (
                <div>
                  <Avatar
                    size="large"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    src={url}
                  />
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    {role === "admin" ? adminSettings.map((setting) => (
                      <MenuItem
                        key={setting.name}
                        onClick={() => handleCloseUserMenu(setting.rouete)}
                      >
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    )) : settings.map((setting) => (
                      <MenuItem
                        key={setting.name}
                        onClick={() => handleCloseUserMenu(setting.rouete)}
                      >
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => nav("/login")}
                  sx={{
                    borderRadius: "25px",
                    whiteSpace: "nowrap",
                    color: "white",
                    bgcolor: "black",
                    ":hover": {
                      bgcolor: "wheat",
                      color: "black",
                    },
                    fontSize:[8,10,13,15],
                  }}

                >
                  Membership
                </Button>
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
