import React from "react";
import { Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "./DashboardCard";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";

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

  // chart
  //   const optionscolumnchart = {
  //     chart: {
  //       type: "bar",
  //       fontFamily: "'Plus Jakarta Sans', sans-serif;",
  //       foreColor: "#adb0bb",
  //       toolbar: {
  //         show: true,
  //       },
  //       height: 400,
  //     },
  //     colors: [primary, secondary],
  //     plotOptions: {
  //       bar: {
  //         horizontal: false,
  //         barHeight: "60%",
  //         columnWidth: "70%",
  //         borderRadius: [7],
  //         borderRadiusApplication: "end",
  //         borderRadiusWhenStacked: "all",
  //       },
  //     },

  //     stroke: {
  //       show: true,
  //       width: 10,
  //       lineCap: "butt",
  //       colors: ["transparent"],
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     legend: {
  //       show: true,
  //     },
  //     grid: {
  //       borderColor: "rgba(0,0,0,0.1)",
  //       strokeDashArray: 3,
  //       xaxis: {
  //         lines: {
  //           show: false,
  //         },
  //       },
  //     },
  //     yaxis: {
  //       tickAmount: 4,
  //     },
  //     xaxis: {
  //       categories: row,
  //       axisBorder: {
  //         show: false,
  //       },
  //     },
  //     tooltip: {
  //       theme: theme.palette.mode === "dark" ? "dark" : "light",
  //       fillSeriesColor: false,
  //     },
  //   };
  //   const seriescolumnchart = [
  //     {
  //       name: "Revenue Of Website",
  //       data: data1.data,
  //     },
  //     {
  //       name: "Revenue Of Sendo",
  //       data: data2.data,
  //     },
  //   ];
  const options = {
    series: [
      {
        name:"Revenue",
        data: [3100000, 4000000, 2800000, 5100000, 4200000, 10900000, 10000000],
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
   
        categories: [
          "May-01",
          "May-05",
          "May-10",
          "May-15",
          "May-20",
          "May-25",
          "May-31",
          
        ],
        
      },
      tooltip: {
        x: {
          format: "yy/MM/dd",
        },
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
