import * as React from "react";
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
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
const pages = [""];

const ResponsiveAppBar = ({ onMenuClick }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#ebedef" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* HAMBURGER FOR MOBILE */}
          <IconButton
            size="large"
            edge="start"
            onClick={onMenuClick}
            color="dark"
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* LOGO */}
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "black" }}
          ></Typography>

          {/* USER MENU */}
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link to="/app/profile">
                <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
              </Link>
              <Link to="/app/logout">
                <MenuItem onClick={handleCloseUserMenu}>Logout</MenuItem>
              </Link>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
