import React from "react";
import "./BusinessHome.scss";
import { BarChart, LineChart, PieChart, SparkLineChart } from "@mui/x-charts";
import { Box, Card, Paper, styled, useTheme } from "@mui/material";
import StatCards2 from "../../../components/StatCard/StatCard";
import DoughnutChart from "../../../components/DoughnutChart";
import TopSellingTable from "../../../components/TopSellingTable/TopSellingTable";


const Title = styled("span")(() => ({
  fontSize: "20px",
  fontWeight: "500",
  marginRight: "8%",
  textTransform: "capitalize",
  marginLeft: "2%",
}));
const TitleCircle = styled("span")(() => ({
  fontSize: "20px",
  fontWeight: "500",
  marginRight: "8%",
  textTransform: "capitalize",
  marginLeft: "5%",
}));


const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.text.secondary,
}));

function BusinessHome() {
  return (
    <div className="Businesshome-container">
      <h2 className="label">Dashboard</h2>
      <div className="overview">
        <StatCards2 value1="10000" value2="2.88" value3="1000" />
      </div>

      <div className="chart">
        <Card style={{paddingTop:"1%", width:"75%"}} >
        <Title>Customer</Title>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: [
                  "T1",
                  "T2",
                  "T3",
                  "T4",
                  "T5",
                  "T6",
                  "T7",
                  "T8",
                  "T9",
                  "T10",
                  "T11",
                  "T12",
                ],
                stroke: "white",
              }
            ]}
            series={[
              { data: [4, 3, 5, 6, 7, 8, 9, 10, 11, 14, 15, 17] },
              { data: [4, 3, 5, 6, 7, 8, 9, 10, 11, 14, 15, 17] },
            ]}
           
            height={450}
            label={{ fill: "white" }}
          />
        </Card>
        <Card style={{width:"22%",paddingTop:"1%"}} minHeight="50%">
          <TitleCircle>Customer</TitleCircle>
          <SubTitle>Last 30 days</SubTitle>

          <DoughnutChart />
        </Card>
      </div>
      <TopSellingTable/>
    </div>
  );
}

export default BusinessHome;
