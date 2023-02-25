"use client";
import {
  Tooltip,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Title,
} from "chart.js";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const options = {
  title: {
    display: true,
    text: "Edition Data",
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "%",
      },
      suggestedMax: 100,
      suggestedMin: 0,
      ticks: {
        beginAtZero: true,
        stepSize: 50,
      },
    },
  },
};
const data = {
  labels: ["Burned", "Owned", "In Reverses", "In packs"],
  datasets: [
    {
      label: "Edition Data",
      data: [65, 59, 80, 81],
      backgroundColor: ["#EB3B62", "#DE378E", "#ADF85A", "#FDED45"],
      borderWidth: 0,
    },
  ],
};
export const CompareChart = () => {
  return <Bar data={data} options={options as any} />;
};
