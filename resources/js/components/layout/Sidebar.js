import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import TuneIcon from "@mui/icons-material/Tune";
import WidgetsIcon from "@mui/icons-material/Widgets";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SegmentIcon from "@mui/icons-material/Segment";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ShareIcon from "@mui/icons-material/Share";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";

const drawerWidth = 230;

const ClippedDrawer = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    await axios
      .get(`/api/companysetup`)
      .then(({ data }) => {
        const alldata = data.data[0];
        setName(alldata._name);
        setImageUrl(alldata._image);
      })
      .catch(({ response: { data } }) => {
        toast("No Data Found");
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar
          style={{ minHeight: "69px", borderBottom: "1px solid #d8dbe0" }}
        >
          <Link style={{ textDecoration: "none" }} to="/app/dashboard">
            <img
              src={imageUrl}
              alt="nothing"
              style={{ marginTop: "2px", width: "175px" }}
            />
          </Link>
        </Toolbar>
        <Box sx={{ overflow: "auto" }}>
          <List>
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/category"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Item Categories"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/product"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <FastfoodIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Food Items"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/generalquery"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PermContactCalendarIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Form Submit"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/image"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CameraAltIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Gallery Images"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/hero-section"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TuneIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Hero Section"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/menu"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <WidgetsIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Menu"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/section"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AddRoadIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Sections"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/component"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SegmentIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Components"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/review"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <RemoveRedEyeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Reviews"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/faq"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HelpOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary={"FAQ"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/sociallink"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ShareIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Social Links"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/users"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PeopleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Users"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/role"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SupervisorAccountIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Roles"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/dashboard/companysetup"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Company Setup"} />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default ClippedDrawer;
