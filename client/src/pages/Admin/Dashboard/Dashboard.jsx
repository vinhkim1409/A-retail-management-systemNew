import React from "react";
import "./Dashboard.scss";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import { Box, Card, Paper } from "@mui/material";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
// import { faPhone } from '@fortawesome/free-solid-svg-icons';
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { faEarthAsia } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
  return (
    <div className="Dashboard-container">
      <h2 className="label">DASHBOARD</h2>
      <div className="chart">
        <div className="leftchart">
          <div className="linechart">
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              width={380}
              height={250}
            />
          </div>
          <div className="piechart">
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "series A" },
                    { id: 1, value: 15, label: "series B" },
                    { id: 2, value: 20, label: "series C" },
                  ],
                },
              ]}
              width={380}
              height={250}
              className=""
            />
          </div>
        </div>
        <div className="rightchart">
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9"],
                  stroke: "white",
                },
              ]}
              series={[{ data: [4, 3, 5, 6, 7, 8, 9, 10, 11] }]}
              width={580}
              height={500}
              label={{ fill: 'white' }}
            />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
