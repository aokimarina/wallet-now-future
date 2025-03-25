import React from "react";
import AllTransactionPage from "./allTransaction/page";
import MonthlyTransactionPage from "./monthlyTransaction/page";
import TotalSavingPage from "./totalSaving/page";

const CurrentPage = () => {
  return (
    <section className="flex flex-row justify-center items-center w-full mt-10">
      <div className="flex flex-row w-full justify-between gap-12">
        <div className="text-center w-full border-r-2 border-dotted border-gray-400 p-4 min-h-[900px]">
          <AllTransactionPage />
        </div>
        <div className="text-center w-full border-r-2 border-dotted border-gray-400 p-4 min-h-[900px]">
          <MonthlyTransactionPage />
        </div>
        <div className="text-center w-full p-4 min-h-[200px]">
          <TotalSavingPage />
        </div>
      </div>
    </section>
  );
};

export default CurrentPage;
