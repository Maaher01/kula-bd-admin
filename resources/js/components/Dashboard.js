import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import {
  ShoppingCart,
  TrendingUp,
  PendingActions,
  Today,
} from "@mui/icons-material";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import CancelIcon from "@mui/icons-material/Cancel";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Layout from "./layout/Layout";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/admin/dashboard").then((res) => {
      setStats(res.data);
      setLoading(false);
    });
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        height: "100%",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>

          <Typography variant="h5" fontWeight="bold">
            {loading ? <CircularProgress size={20} /> : value}
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: color,
            color: "#fff",
            borderRadius: "50%",
            padding: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <Grid container spacing={3} sx={{ padding: "60px 40px" }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={<ShoppingCart />}
            color="#1976d2"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value={`৳ ${Math.round(stats.totalRevenue || 0)}`}
            icon={<TrendingUp />}
            color="#2e7d32"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Orders"
            value={stats.pendingOrders}
            icon={<PendingActions />}
            color="#f57c00"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Processing Orders"
            value={stats.processingOrders}
            icon={<RunningWithErrorsIcon />}
            color="#009688"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Delivered Orders"
            value={stats.deliveredOrders}
            icon={<DeliveryDiningIcon />}
            color="#43a047"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Cancelled Orders"
            value={stats.cancelledOrders}
            icon={<CancelIcon />}
            color="#d32f2f"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Today's Orders"
            value={stats.todayOrders}
            icon={<Today />}
            color="#8e24aa"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Today's Revenue"
            value={`৳ ${Math.round(stats.todayRevenue || 0)}`}
            icon={<MonetizationOnIcon />}
            color="#ffb300"
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
