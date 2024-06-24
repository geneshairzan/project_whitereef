import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AccountChart({ label, data, color }) {
  const options = {
    animation: {
      duration: 100,
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
        // position: "bottom",
      },
    },
    responsive: true,
  };
  const datax = {
    labels: label,
    weight: 0.2,
    datasets: [
      {
        label: "# of Votes",
        data: data,
        // weight: 22,
        // ofset: 16,
        spacing: 4,
        borderRadius: 16,
        // borderWidth: 24,
        // borderDash: 22,
        cutout: "80%",
        weight: 12,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={datax} options={options} />;
}
