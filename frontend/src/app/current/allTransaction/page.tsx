"use client";

import React, { useEffect, useState } from "react";

// Transaction の型を定義
type Transaction = {
  transactionDate: string;
  transactionType: number; // 1 = 入金, 2 = 出金
  amount: number;
  balance: number;
};

export const AllTransactionPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/transactions");
        const json = await res.json();
        const allData = json.transactions as Transaction[];

        // 3月分だけ抽出（2025-03）
        const marchData = allData.filter((t) =>
          t.transactionDate.startsWith("2025-03")
        );

        setTransactions(marchData);
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
    <div className="p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">入出金履歴</h1>

      {error && <p className="text-red-500">{error}</p>}

      {transactions.length === 0 && !error ? (
        <p>取引データがありません。</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-left">日付</th>
              <th className="border px-4 py-2 text-left">種類</th>
              <th className="border px-4 py-2 text-right">金額</th>
              <th className="border px-4 py-2 text-right">残高</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{t.transactionDate}</td>
                <td className="border px-4 py-2">
                  {Number(t.transactionType) === 1 ? "入金" : "出金"}
                </td>
                <td className="border px-4 py-2 text-right">
                  {t.amount.toLocaleString()} 円
                </td>
                <td className="border px-4 py-2 text-right">
                  {t.balance.toLocaleString()} 円
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllTransactionPage;
