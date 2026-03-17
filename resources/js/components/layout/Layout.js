import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const section = {
    minHeight: "100vh",
    paddingTop: 5,
    backgroundColor: "#ebedef",
  };

  return (
    <>
      <ToastContainer autoClose={2000} />

      {/* NAVBAR */}
      <Navbar onMenuClick={handleDrawerToggle} isMobile={isMobile} />

      <Grid container>
        {/* DESKTOP SIDEBAR */}
        {!isMobile && (
          <Grid item md={2}>
            <Sidebar />
          </Grid>
        )}

        {/* CONTENT */}
        <Grid item xs={12} md={10}>
          <div style={section}>{children}</div>
        </Grid>

        {/* FOOTER */}
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>

      {/* MOBILE DRAWER SIDEBAR */}
      {isMobile && (
        <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
          <Sidebar />
        </Drawer>
      )}
    </>
  );
};

export default Layout;
