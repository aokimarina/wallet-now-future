import React from "react";

// ユーザーデータ（モック）
const UserMockData = {
  id: 1,
  name: "砂場",
  age: 30,
  birthday: "1995-11-11",
};

// 60歳までの「年」と「日」を計算する関数（うるう年も考慮）
const calculateTimeUntilSixty = (birthday: string) => {
  const birthDate = new Date(birthday);
  const sixtyBirthday = new Date(
    birthDate.getFullYear() + 60,
    birthDate.getMonth(),
    birthDate.getDate()
  );
  const today = new Date();

  let remainingYears = sixtyBirthday.getFullYear() - today.getFullYear();
  let remainingMonths = sixtyBirthday.getMonth() - today.getMonth();
  let remainingDays = sixtyBirthday.getDate() - today.getDate();

  if (remainingDays < 0) {
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    remainingDays += lastMonth.getDate();
    remainingMonths -= 1;
  }
  if (remainingMonths < 0) {
    remainingMonths += 12;
    remainingYears -= 1;
  }

  return {
    years: remainingYears,
    months: remainingMonths,
    days: remainingDays,
  };
};

const remainingPeriod = calculateTimeUntilSixty(UserMockData.birthday);

const PeriodPage = () => {
  return (
    <section>
      <div className="max-w-lg mx-auto p-6 rounded-lg text-center">
        <div className="flex flex-row justify-center items-center">
          <div className="flex justify-center items-center space-x-2">
            <span className="text-amber-600 font-bold text-2xl">
              {UserMockData.name}
            </span>
            <span>さんの</span>
          </div>
        </div>
        <h2 className="text-gray-600 text-2xl font-semibold mb-2">
          目標期間 まで
        </h2>
        <div className="flex flex-row justify-center items-center mt-5">
          <div className="text-5xl font-bold text-amber-500 mb-2">
            {remainingPeriod.years}
          </div>
          <p className="text-xl text-gray-600">年</p>
          <div className="text-5xl font-bold text-amber-500 mb-2">
            {remainingPeriod.months}
          </div>
          <p className="text-xl text-gray-600">ヶ月</p>
          <div className="text-5xl font-bold text-amber-500 mb-2">
            {remainingPeriod.days}
          </div>
          <p className="text-xl text-gray-600">日です</p>
        </div>
      </div>
    </section>
  );
};

export default PeriodPage;
