import React, { useEffect, useState } from "react";
import "./BusinessHome.scss";
import {
  BarChart,
  LineChart,
  PieChart,
  SparkLineChart,
  Bar,
} from "@mui/x-charts";
import { Box, Card, Paper, styled, useTheme, Grid } from "@mui/material";
import TopSellingTable from "../../../components/TopSellingTable/TopSellingTable";
import axios from "axios";
import { api } from "../../../constant/constant";
import SalesOverview from "../../../components/Dashboard/SalesOverview";
import MonthRevenue from "../../../components/Dashboard/MonthRevenue";
import CardOverView from "../../../components/CardOverview/CardOverview";
import { useParams } from "react-router-dom";

function BusinessHome() {
  const [weekRow, setWeekRow] = useState([]);
  const [revenueWeek, setRevenueWeek] = useState([{ data: [] }, { data: [] }]);
  const [dashboardRow, setDashboardRow] = useState([]);
  const [dataMonth, setDataMonth] = useState({
    RevenueMonth: [],
    dayOfMonth: [],
  });
  const [productsList, setProductsList] = useState([]);
  const {tenatURL}=useParams()
  const getDashboardData = async () => {
    const dashboardData = await axios.get(`${api}dashboard/get-revenue`);
    console.log(dashboardData.data.data);
    const data = dashboardData.data.data;
    const dataweek = data.week;
    let weekRow = [];
    let revenueWeek = [{ data: [] }, { data: [] }];
    for (let i = 0; i <= 6; i++) {
      weekRow.push(dataweek[i].dayOfWeek);
      revenueWeek[0].data.push(dataweek[i].numberOfOrder[0]);
      revenueWeek[1].data.push(dataweek[i].numberOfOrder[1]);
    }
    setWeekRow(weekRow);
    setRevenueWeek(revenueWeek);
    setDataMonth(data.month);
    const productsList = await axios.get(`${api}dashboard/top-selling`);
    setProductsList(productsList.data);
  };
  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <div className="Businesshome-container">
      <h2 className="label">Dashboard</h2>
      <CardOverView tenantURL={tenatURL} />
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <SalesOverview
            row={weekRow}
            data1={revenueWeek[0]}
            data2={revenueWeek[1]}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MonthRevenue data={dataMonth} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <TopSellingTable productsList={productsList} />
    </div>
  );
}

export default BusinessHome;
