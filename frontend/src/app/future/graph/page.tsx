// import React from "react";

// export const GraphPage = () => {
//   return <div>graph</div>;
// };
// export default GraphPage;

"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

const USER_BIRTHDAY = "1995-11-11";
const TARGET_AMOUNT = 20000000; // 目標金額：2000万円

const calculateYearsUntilSixty = (birthday: string): number => {
  const birthDate = new Date(birthday);
  const sixtyDate = new Date(
    birthDate.getFullYear() + 60,
    birthDate.getMonth(),
    birthDate.getDate()
  );
  const today = new Date();
  const diff = sixtyDate.getTime() - today.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

const GraphPage = () => {
  const [numericBalance, setNumericBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/balances");
        const data = await res.json();
        const numericBalance = parseInt(data.balances[0].balance, 10);
        setNumericBalance(numericBalance);
      } catch (e) {
        console.error("残高取得失敗", e);
      }
    };
    fetchBalance();
  }, []);

  if (numericBalance === null) return <div>Loading...</div>;

  const years = calculateYearsUntilSixty(USER_BIRTHDAY);
  const interestRate = 0.02;
  const difference = TARGET_AMOUNT - numericBalance;

  const annualPayment = difference * (interestRate / (Math.pow(1 + interestRate, years) - 1));

  const labels = [0, 5, 10, 20, 30];
  const data = labels.map((year) => {
    const accumulated =
      annualPayment * ((Math.pow(1 + interestRate, year) - 1) / interestRate);
    return Math.round(numericBalance + accumulated);
  });

  const chartData = {
    labels: labels.map((y) => `${y}年後`),
    datasets: [
      {
        label: "貯蓄推移（万円）",
        data: data.map((d) => d / 10000),
        borderColor: "#f59e0b",
        backgroundColor: "#f59e0b",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
        min: 300,
        max: 2100,
        title: { display: true, text: "貯金額（万円）" },
      },
      x: {
        title: { display: true, text: "経過年数" },
      },
    },
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">減債基金係数による貯蓄予測グラフ</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default GraphPage;
