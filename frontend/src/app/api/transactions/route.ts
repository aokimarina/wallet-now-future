import { TransactionType } from "../../../../types/types";

export const fetchTransactions = async (): Promise<TransactionType[]> => {
  const response = await fetch("http://127.0.0.1:5000/transactions");
  if (!response.ok) {
    throw new Error(`データの取得に失敗しました：${await response.text()}`);
  }

  const data = await response.json();
  console.log(
    "-------------バックエンドからのtransactionデータ---------------"
  );
  console.log(data);
  return data;
};
