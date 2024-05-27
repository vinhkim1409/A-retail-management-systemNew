import React from "react";
import Chart from "react-apexcharts";
import { makeStyles } from "@mui/material/styles";
import { Grid, Stack, Typography, Avatar } from "@mui/material";
import DashboardCard from "./DashboardCard";
import { PieChart } from "@mui/x-charts";
const MonthRevenue = ({ data }) => {
  return (
    <DashboardCard title="Month Revenue">
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: data?.RevenueMonth[0], label: "Week 1" },
              {
                id: 1,
                value: data?.RevenueMonth[1] == 0 ? 10000 : 100000,
                label: "Week 2",
              },
              {
                id: 2,
                value: data?.RevenueMonth[1] == 0 ? 10000 : 100000,
                label: "Week 3",
              },
              {
                id: 3,
                value: data?.RevenueMonth[1] == 0 ? 10000 : 100000,
                label: "Week 4",
              },
            ],
            highlightScope: { faded: "global", highlighted: "item" },
            faded: {
              innerRadius: 30,
              additionalRadius: -30,
              color: "gray",
            },
          },
        ]}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "bottom", horizontal: "left" },
            
          },
        }}
        width={350}
        height={400}
        sx={{marginTop:"-140px",marginLeft:"45px" }}
      />
    </DashboardCard>
  );
};

export default MonthRevenue;
