"use client";

import React, { useEffect, useState } from "react";

const Header: React.FC = () => {
  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const TARGET_AMOUNT = 20_000_000;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/balances");
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
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

  const difference = TARGET_AMOUNT - currentBalance;

  return (
    <header className="flex flex-row items-center justify-center pl-20 pr-20 text-gray-800 bg-yellow-50">
      <div>
        目標金額：{TARGET_AMOUNT.toLocaleString()}円{" - "}
        現在残高：{currentBalance.toLocaleString()}円{" = "}
        <div className="flex justify-center items-center pt-2">
          目標到達まで：{difference.toLocaleString()}円
        </div>
      </div>
    </header>
  );
};

export default Header;
