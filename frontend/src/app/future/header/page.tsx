"use client";

import React, { useEffect, useState } from "react";

const Header: React.FC = () => {
  // 現在の残高を数値として管理
  const [currentBalance, setCurrentBalance] = useState<number>(0);

  // 目標金額（2,000万円をベタ打ち）
  const TARGET_AMOUNT = 20_000_000;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Flaskのエンドポイント を呼び出し
        const res = await fetch("http://127.0.0.1:5000/balances");
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        // data.balances[0].balance のような構造を想定
        if (data && data.balances && data.balances.length > 0) {
          const numericBalance = parseInt(data.balances[0].balance, 10);
          setCurrentBalance(numericBalance);
        }
      } catch (error) {
        console.error("残高取得エラー:", error);
      }
    };

    fetchData();
  }, []);

  // 差額 = 目標金額 - 現在残高
  const difference = TARGET_AMOUNT - currentBalance;

  return (
    <header className="bg-yellow-100 flex flex-row items-center justify-center">
      <p className="text-gray-800">
        目標金額：{TARGET_AMOUNT.toLocaleString()}円{" - "}
        現在残高：{currentBalance.toLocaleString()}円{" = "}
        目標到達まで：{difference.toLocaleString()}円
      </p>
    </header>
  );
};

export default Header;
