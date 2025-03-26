"use client";
import React, { useState } from "react";

export const MonthlyTransactionPage = () => {
  const [data, setData] = useState<transactionType>();
  return (
    <section>
      <div>月別入出金一覧</div>
    </section>
  );
};

export default MonthlyTransactionPage;
