"use client";

import React, { useEffect, useState } from "react";

type Transaction = {
  transactionDate: string;
  transactionType: string; // 1 = 入金, 2 = 出金
  amount: string;
  balance: string;
};

const MarchSummaryPage = () => {
  const [_, setTransactions] = useState<Transaction[]>([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/transactions");
        const json = await res.json();
        const rawData = json.transactions as Transaction[];

        // 3月分だけ抽出
        const marchTransactions = rawData.filter((t) =>
          t.transactionDate.startsWith("2025-03")
        );

        // 金額変換と集計
        let totalIncome = 0;
        let totalExpense = 0;

        marchTransactions.forEach((t) => {
          const amount = Number(t.amount);
          if (t.transactionType === "1") {
            totalIncome += amount;
          } else if (t.transactionType === "2") {
            totalExpense += amount;
          }
        });

        setTransactions(marchTransactions);
        setIncome(totalIncome);
        setExpense(totalExpense);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("不明なエラーが発生しました");
        }
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="p-4 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">今月の収支サマリ</h1>

      {error && <p className="text-red-300">{error}</p>}

      <ul className="space-y-2 text-2xl pt-10">
        <li> 入金合計: {income.toLocaleString()} 円</li>
        <li> 出金合計: {expense.toLocaleString()} 円</li>
        <li> 差引収支: {(income - expense).toLocaleString()} 円</li>
      </ul>
    </div>
  );
};

export default MarchSummaryPage;