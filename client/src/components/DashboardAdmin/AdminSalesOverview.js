import React, { useEffect, useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "./DashboardCard";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { api } from "../../constant/constant";
import moment from "moment"

const AdminSalesOverview = ({ row, data1, data2 }) => {
  // select
  const [month, setMonth] = React.useState("1");

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const [data, setData] = useState();
  const [dayOfMonth, setDayOfMonth] = useState([]);
  const getData = async () => {
    const data = await axios.get(`${api}admin/get-data-dashboard`);

    const dayArray = data.data.data.month.dayOfMonth.map((day, index) => {
      if (index === 0) {
        return moment(day.firstDate).format('DD/MM/YYYY');
      }
      return moment(day.endDate).format('DD/MM/YYYY');
    });
    console.log(dayArray);
    setDayOfMonth(dayArray)
    setData(data.data.data);
  };
  useEffect(() => {
    getData();
  }, []);
  const options = {
    series: [
      {
        name: "Revenue",
        data: data?.month?.RevenueMonth,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: dayOfMonth,
      },
      tooltip: {
        
      },
    },
  };
  return (
    <DashboardCard
      title="Revenue Overview"
      // action={
      //     <Select
      //         labelId="month-dd"
      //         id="month-dd"
      //         value={month}
      //         size="small"
      //         onChange={handleChange}
      //     >
      //         <MenuItem value={1}>March 2023</MenuItem>
      //         <MenuItem value={2}>April 2023</MenuItem>
      //         <MenuItem value={3}>May 2023</MenuItem>
      //     </Select>
      // }
    >
      <ReactApexChart
        options={options.options}
        series={options.series}
        type="area"
        height="385px"
        width="1010px"
      />
    </DashboardCard>
  );
};

export default AdminSalesOverview;
