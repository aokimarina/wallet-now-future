import React from "react";
import HeaderPage from "./header/page";
import GraphPage from "./graph/page";
import PeriodPage from "./period/page";
import HomeButton from "../components/buttons/HomeButton";
import AdviceForm from "./advice/page";

const FuturePage = () => {
  return (
    <section className="w-full min-h-screen bg-cover bg-center bg-no-repeat ">
      {/* ヘッダー */}
      <div className="w-full h-40 border-b-4 border-gray-300 bg-amber-50 text-4xl pt-13">
        <HeaderPage />
      </div>

      {/* グラフ & その他 */}
      <div
        className="w-full h-[800px] flex flex-row justify-center pt-25 gap-6 bg-gray-100 bg-opacity-80 bg-[url('/マーブル.png')] bg-no-repeat bg-cover
        "
      >
        {/* グラフ */}
        <div className="w-2/3 max-w-2xl border-4 border-gray-100 rounded-lg p-8 bg-white mb-38 h-auto min-h-[250px]">
          <GraphPage />
        </div>

        {/* 期間 & アドバイス */}
        <div className="w-1/3 flex flex-col gap-3">
          <div className="border-4 border-gray-100 rounded-lg p-8 bg-white h-auto min-h-[250px]">
            <PeriodPage />
          </div>
          <div className=" p-8 bg-white h-auto min-h-[250px]">
            <AdviceForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuturePage;
