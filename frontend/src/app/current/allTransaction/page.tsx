"use client";

import React, { useEffect, useState } from "react";

// Transaction の型を定義
type Transaction = {
  transactionDate: string;
  transactionType: number; // 1 = 入金, 2 = 出金
  amount: number;
  balance: number;
  remarks: string;
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

        //最新履歴がトップに来るようにソート
        const sorted = allData.sort(
          (a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime()
        );

        setTransactions(sorted);
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
  <h1 className="mt-10 text-3xl font-semibold mb-4 text-gray-800">入出金履歴</h1>
  <div className="mt-25 bg-white/70 shadow-md overflow-hidden backdrop-blur-md">
    <table className="w-full table-auto">
      <thead className="bg-purple-100" style={{ color: '#5C4E74' }}>
        <tr>
          <th className="border px-4 py-2 text-center">日付</th>
          <th className="border px-4 py-2 text-center">種別</th>
          <th className="border px-4 py-2 text-center">金額</th>
          <th className="border px-4 py-2 text-center">残高</th>
          <th className="border px-4 py-2 text-center">備考</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t, index) => (
          <tr key={index} className="hover:bg-purple-50 text-gray-800">
            <td className="border px-4 py-2">{t.transactionDate}</td>
            <td className="border px-4 py-2">{Number(t.transactionType) === 1 ? "入金" : "出金"}</td>
            <td className="border px-4 py-2 text-center">{Number(t.amount).toLocaleString()} 円</td>
            <td className="border px-4 py-2 text-center">{Number(t.balance).toLocaleString()} 円</td>
            <td className="border px-4 py-2">{t.remarks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default AllTransactionPage;
