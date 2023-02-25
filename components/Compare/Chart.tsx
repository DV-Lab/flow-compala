"use client";
import {
  Tooltip,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Title,
} from "chart.js";
import { AMOUNT_DATA_MAP_ARRAY } from "constant/tier";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const CompareChart: IComponent<{
  amountData: IAmountNft;
}> = ({ amountData }) => {
  const options = {
    title: {
      display: true,
      text: "Edition Data",
      color: "#ffffff",
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

  const chartData: number[] = [];
  const { maximum } = amountData;
  Object.keys(amountData).map((k: string) => {
    if (!k.includes("maximum")) {
      const index = AMOUNT_DATA_MAP_ARRAY[k];
      chartData[index] = (amountData[k] / maximum) * 100;
    }
  });
  const data = {
    labels: ["Burned", "Owned", "In Reverses", "In packs"],
    datasets: [
      {
        label: "Edition Data",
        data: chartData,
        backgroundColor: ["#EB3B62", "#DE378E", "#ADF85A", "#FDED45"],
        borderWidth: 0,
      },
    ],
  };

  return <Bar data={data} options={options as any} />;
};
