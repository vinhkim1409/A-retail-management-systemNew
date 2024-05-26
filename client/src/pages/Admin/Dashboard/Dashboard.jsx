import React from "react";
import "./Dashboard.scss";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import { Box, Card, Paper, styled, useTheme, Grid } from "@mui/material";
import AdminSalesOverview from "../../../components/DashboardAdmin/AdminSalesOverview";
import CardOverviewAdmin from "../../../components/CardOverviewAdmin/CardOverviewAdmin";
function Dashboard() {
  return (
    <div className="Admin-container">
      <h2 className="label">Dashboard</h2>
      <CardOverviewAdmin/>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <AdminSalesOverview
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
