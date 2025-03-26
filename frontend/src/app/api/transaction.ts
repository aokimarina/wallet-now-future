import { BalanceType, TransactionType } from "../../../types/types";

//--------------------GET---------------------
export const fetchBalance = async (): Promise<BalanceType[]> => {
    const response = await fetch("https://api.sunabar.gmo-aozora.com/personal/v1/accounts/balances");
    if (!response.ok) {
      throw new Error(`データの取得に失敗しました：${await response.text()}`);
    }
  
    const data = await response.json();
    console.log("----------バックエンドからのBalanceデータ---------------");
    console.log(data);
    return data;
  };

//--------------------GET---------------------
export const fetchTransactions = async (): Promise<TransactionType[]> => {
    const response = await fetch("https://api.sunabar.gmo-aozora.com/personal/v1/accounts/transactions?accountId=302010010191&nextItemKey=0");
    if (!response.ok) {
      throw new Error(`データの取得に失敗しました：${await response.text()}`);
    }
  
    const data = await response.json();
    console.log("----------バックエンドからのBalanceデータ---------------");
    console.log(data);
    return data;
  };


