import React from "react";
import HeaderPage from "./header/page";
import AdvicePage from "./advice/page";
import GraphPage from "./graph/page";
import PeriodPage from "./period/page";
import HomeButton from "../components/buttons/HomeButton";

const FuturePage = () => {
  return (
    <section>
      {/* ヘッダー */}
      <div className="flex flex-row w-full h-40 border-b-4 border-gray-400 bg-yellow-100">
        <HeaderPage />
        <div className="ml-auto">
          <HomeButton />
        </div>
      </div>

      {/* グラフ & その他 */}
      <div className="w-full h-[800] flex flex-row justify-center pt-25 gap-6 bg-gray-100">
        {/* グラフ */}
        <div className="w-2/3 max-w-2xl border-4 border-gray-300 rounded-lg p-8 bg-white mb-45 h-auto min-h-[250px]">
          <GraphPage />
        </div>

        {/* 期間 & アドバイス */}
        <div className="w-1/3 flex flex-col gap-3">
          <div className="border-4 border-gray-300 rounded-lg p-8 bg-white  h-auto min-h-[250px]">
            <PeriodPage />
          </div>
          <div className="border-4 border-gray-300 rounded-lg p-8 bg-white h-auto min-h-[250px]">
            <AdvicePage />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuturePage;
