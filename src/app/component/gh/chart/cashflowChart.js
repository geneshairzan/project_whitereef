import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import h from "@gh/helper";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const labels = h.date.monthListShort;

let groupedData = (data) =>
  data.reduce((accumulator, currentValue) => {
    // const key = currentValue.date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const key = h.date.onWhichMonthOfYear(currentValue?.date);
    if (!accumulator[key]) {
      accumulator[key] = [];
    }
    accumulator[key].push(currentValue);
    return accumulator;
  }, {});

export default function CashflowChart({ raw, isCommulative = false }) {
  function getDataset(raw, canNull) {
    if (!isCommulative) return raw;
    return raw.reduce((accumulator, currentValue, index) => {
      if (isCommulative && index > h.date.todayMonth) {
        accumulator.push(0);
        return accumulator;
      }
      if (index === 0) {
        accumulator.push(currentValue);
      } else {
        const previousValue = accumulator[index - 1];
        const sum = previousValue + currentValue;
        accumulator.push(sum);
      }
      return accumulator;
    }, []);
  }

  let groupByMonth = groupedData(raw);
  const options = {
    animation: {
      duration: 100,
    },
    plugins: {
      title: {
        display: false,
        text: "Chart.js Bar Chart - Stacked",
      },
      legend: {
        display: false,
        // position: "bottom",
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      // intersect: false,
    },
    scales: {
      x: {
        stacked: true,
        maxTicksLimit: 12,
        ticks: {
          callback: function (value, index, values) {
            return labels[value]; // Modify the callback function to return the rotated label
          },
          maxRotation: 90, // Set the maximum rotation angle to 90 degrees
          minRotation: 90, // Set the minimum rotation angle to 90 degrees
        },
      },
      y: {
        stacked: true,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        type: "line",
        label: "cashflow",
        borderColor: "#333333",
        borderWidth: 1,
        fill: false,
        // data: labels.map(() => Math.random() * 1000),
        data: getDataset(
          labels.map((d, ix) => {
            return groupByMonth[ix] ? groupByMonth[ix]?.reduce((a, b) => a + b.amount, 0) : 0;
          })
        ),
      },
      {
        type: "bar",
        label: "expense",
        backgroundColor: "#e63946",
        data: labels.map(() => Math.random() * 1000),
        borderColor: "white",
        // borderWidth: 2,
        barThickness: 4,
        // barPercentage: 0.5,
        data: getDataset(
          labels.map((d, ix) => {
            if (isCommulative && ix > h.date.todayMonth) {
              console.log("here");
              return 0;
            }
            return groupByMonth[ix]
              ? groupByMonth[ix]?.filter((dx) => dx.amount < 0).reduce((a, b) => a + b.amount, 0)
              : 0;
          })
        ),
      },
      {
        type: "bar",
        label: "income",
        backgroundColor: "#17a369",
        data: labels.map(() => Math.random() * 1000),
        // borderWidth: 2,
        barThickness: 4,
        data: getDataset(
          labels.map((d, ix) => {
            return groupByMonth[ix]
              ? groupByMonth[ix]?.filter((dx) => dx.amount >= 0).reduce((a, b) => a + b.amount, 0)
              : 0;
          })
        ),
      },
    ],
  };

  return <Chart type="bar" data={data} options={options} />;
}
