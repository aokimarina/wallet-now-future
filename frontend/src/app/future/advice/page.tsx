"use client";
import { useState } from "react";
import axios from "axios";

const AdviceForm = () => {
  const [currentBalance, setCurrentBalance] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [remainingPeriod, setRemainingPeriod] = useState("");
  const [savingsThisMonth, setSavingsThisMonth] = useState("");
  const [advice, setAdvice] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // ポップアップ表示の状態

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !currentBalance ||
      !targetAmount ||
      !remainingPeriod ||
      !savingsThisMonth
    ) {
      setError("すべての項目を入力してください。");
      return;
    }
    if (
      parseFloat(currentBalance) < 0 ||
      parseFloat(targetAmount) < 0 ||
      parseFloat(remainingPeriod) <= 0 ||
      parseFloat(savingsThisMonth) < 0
    ) {
      setError("正しい数値を入力してください。（期間は1年以上）");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/generate_advice",
        {
          current_balance: currentBalance,
          target_amount: targetAmount,
          remaining_period: remainingPeriod,
          savings_this_month: savingsThisMonth,
        }
      );

      setAdvice(response.data.advice);
      setError("");
      setShowModal(true); // アドバイスを受け取ったらモーダル表示
    } catch (error) {
      console.error("Error fetching advice:", error);
      setAdvice("");
      setError("アドバイスの取得に失敗しました。");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-1">
        <div className="flex items-center space-x-2">
          <label className="w-40">現在の貯金額:</label>
          <input
            type="number"
            value={currentBalance}
            onChange={(e) => setCurrentBalance(e.target.value)}
            className="w-full p-2 border rounded text-sm"
          />
        </div>

        <div className="flex items-center space-x-2">
          <label className="w-40">目標金額:</label>
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className="w-full p-2 border rounded text-sm"
          />
        </div>

        <div className="flex items-center space-x-2">
          <label className="w-40">残期間（年）:</label>
          <input
            type="number"
            value={remainingPeriod}
            onChange={(e) => setRemainingPeriod(e.target.value)}
            className="w-full p-2 border rounded text-sm"
          />
        </div>

        <div className="flex items-center space-x-2">
          <label className="w-40">今月の貯金額:</label>
          <input
            type="number"
            value={savingsThisMonth}
            onChange={(e) => setSavingsThisMonth(e.target.value)}
            className="w-full p-2 border rounded text-sm"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="px-4 py-2 bg-amber-500 text-white hover:bg-amber-300 rounded"
          >
            アドバイスを生成
          </button>
        </div>
      </form>

      {/* ポップアップモーダル */}
      {showModal && (
        <div className=" fixed inset-0 flex justify-center items-center z-10 ">
          <div className="border-4 border-green-800 bg-yellow-50 p-4 rounded shadow-lg max-w-sm w-full">
            <p>{advice}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm bg-green-800 hover:bg-green-600 text-white rounded"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdviceForm;
