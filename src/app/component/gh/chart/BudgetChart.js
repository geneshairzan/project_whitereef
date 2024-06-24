import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import { parseInt } from "lodash";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, annotationPlugin);

export default function App({ data, budget, todayWeek }) {
  let options = {
    responsive: true,

    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
    scales: {
      y: {
        min: 0,
        max: parseInt(budget) * 1.3,
        stepSize: budget / 10,
      },
    },
    plugins: {
      legend: {
        display: false,
        // position: "bottom",
      },
      annotation: {
        annotations: [
          // {
          //   // Indicates the type of annotation
          //   type: "box",
          //   xMin: 1,
          //   xMax: 2,
          //   yMin: 50000,
          //   yMax: 70000,
          //   backgroundColor: "rgba(255, 99, 132, 0.25)",
          // },
          {
            type: "line",
            mode: "horizontal",
            scaleID: "y",
            value: budget,
            borderColor: "red",
            borderWidth: 2,
          },
          {
            type: "line",
            mode: "vertical",
            scaleID: "x",
            value: todayWeek,
            borderColor: "coral",
            borderWidth: 1,
          },
        ],
      },
    },
  };
  return <Line options={options} data={data} redraw={true} />;
}
