import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Divider,
  Grid,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    joined: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("auth_user"));
    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role?.name,
      joined: userData.created_at,
    });
  }, []);

  return (
    <Layout>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <Card sx={{ boxShadow: 5, borderRadius: 3 }}>
          <CardContent>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Avatar
                  sx={{ bgcolor: "#1976d2", mr: 2, width: 56, height: 56 }}
                >
                  <PersonIcon fontSize="large" />
                </Avatar>
                <Typography variant="h5">User Profile</Typography>
              </Box>
              <Box>
                <Link className="btn" to={`/app/profile/edit/${user.id}`}>
                  <Button variant="contained" sx={{ marginBottom: "30px" }}>
                    Edit Profile
                  </Button>
                </Link>
              </Box>
            </Grid>

            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle2" color="text.secondary">
                  Name:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{user.name}</Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="subtitle2" color="text.secondary">
                  Email:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{user.email}</Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="subtitle2" color="text.secondary">
                  Role:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{user.role}</Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="subtitle2" color="text.secondary">
                  Date Joined:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>
                  {user.joined
                    ? format(new Date(user.joined), "do MMMM, yyyy")
                    : "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

export default Profile;
