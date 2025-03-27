import React from "react";
import AllTransaction from "./allTransaction/page";
import MonthlyTransactionPage from "./monthlyTransaction/page";
import HomeButton from "../components/buttons/HomeButton";
import MarchSummaryPage from "./totalSaving/page";

const CurrentPage = () => {
  return (
    <section className="   bg-[url('/今ページ.png')] bg-no-repeat bg-cover">
      <div className="flex flex-row w-full justify-between gap-12">
        <div className="text-center w-full border-r-2 border-dotted border-gray-400 p-4 min-h-[900px]">
          <AllTransaction />
        </div>
        {
          <div className="text-center w-full border-r-2 border-dotted border-gray-400 p-4 min-h-[900px]">
            <MonthlyTransactionPage />
          </div>
        }
        <div className="text-center w-full p-4 min-h-[200px] flex flex-center items-center">
          <MarchSummaryPage />
        </div>
      </div>
      <div className="items-center">
        <HomeButton />
      </div>
    </section>
  );
};

export default CurrentPage;
