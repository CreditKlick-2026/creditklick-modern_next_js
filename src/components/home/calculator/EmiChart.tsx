"use client";

import React from "react";
import dynamic from "next/dynamic";

const DoughnutChart = dynamic(
  () =>
    import("react-chartjs-2").then(async (mod) => {
      const { Chart, ArcElement, Tooltip, Legend } = await import("chart.js");
      Chart.register(ArcElement, Tooltip, Legend);
      return mod.Doughnut;
    }),
  { ssr: false }
);

interface EmiChartProps {
  totalInterest: number;
  loanAmount: number;
}

export const EmiChart: React.FC<EmiChartProps> = ({
  totalInterest,
  loanAmount,
}) => {
  const chartData = {
    labels: ["Total Interest", "Principal"],
    datasets: [
      {
        data: [totalInterest, loanAmount],
        backgroundColor: ["#BCE0FF", "#68ABE4"],
        borderColor: ["#68ABE4", "#BCE0FF"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="md:w-1/2 p-4 flex flex-col items-center justify-center">
      <div className="w-64 h-64">
        <DoughnutChart data={chartData} />
      </div>
    </div>
  );
};
