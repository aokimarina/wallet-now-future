"use client";

import React, { useEffect, useState } from "react";

type Transaction = {
  transactionDate: string;
  transactionType: string;
  amount: string;
  balance: string;
  remarks: string;
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat().format(amount) + " 円";
};

const getTransactionTypeLabel = (type: string): string => {
  return type === "1" ? "入金" : "出金";
};

const MonthlySummaryPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [months, setMonths] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/transactions");
        const json = await res.json();
        const rawData = json.transactions as Transaction[];

        setTransactions(rawData);

        const monthList = Array.from(
          new Set(rawData.map((t) => t.transactionDate.slice(0, 7)))
        ).sort();

        setMonths(monthList);
        setSelectedMonth(monthList[monthList.length - 1] || "");
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "不明なエラーが発生しました"
        );
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((t) =>
    t.transactionDate.startsWith(selectedMonth)
  );

  return (
    <div className="p-6 max-w-4xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">
        月ごとの収支サマリ
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* 月選択 */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <button
            className="flex items-center rounded-full  px-4 py-2 bg-purple-300 text-black font-semibold hover:bg-purple-200"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            月を選択
          </button>
          {isDropdownOpen && (
            <select
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                setIsDropdownOpen(false);
              }}
              className="absolute left-0 mt-2 w-full rounded-md border border-gray-300 bg-white text-black shadow-lg"
            >
              {months.map((month) => (
                <option key={month} value={month} className="text-center">
                  {month}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* 明細表示 */}
      {filteredTransactions.length > 0 ? (
        <div className="overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-4">
            {selectedMonth} の取引明細
          </h2>
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-black">
              <tr>
                <th className="border px-4 py-2 text-center">日付</th>
                <th className="border px-4 py-2 text-center">種別</th>
                <th className="border px-4 py-2 text-center">金額</th>
                <th className="border px-4 py-2 text-center">残高</th>
                <th className="border px-4 py-2 text-center">備考</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t, index) => (
                <tr key={index} className="hover:bg-gray-50 text-black">
                  <td className="border px-4 py-2">{t.transactionDate}</td>
                  <td className="border px-4 py-2 text-center">
                    {getTransactionTypeLabel(t.transactionType)}
                  </td>
                  <td
                    className={`border px-4 py-2 text-right ${
                      t.transactionType === "1" ? "text" : "text"
                    }`}
                  >
                    {formatCurrency(Number(t.amount))}
                  </td>
                  <td className="border px-4 py-2 text-right">
                    {formatCurrency(Number(t.balance))}
                  </td>
                  <td className="border px-4 py-2">{t.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">データがありません</p>
      )}
    </div>
  );
};

export default MonthlySummaryPage;
