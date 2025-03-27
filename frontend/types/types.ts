export type BalanceType = {
  accountId: string; // 口座ID
  accountTypeCode: string; // 口座タイプコード
  accountTypeName: string; // 口座タイプ名
  balance: string; // 残高
  baseDate: string; // 基準日
  baseTime: string; // 基準時間
  withdrawableAmount: string; // 引き出し可能額
  previousDayBalance: string; // 前日の残高
  previousMonthBalance: string; // 前月の残高
  currencyCode: string; // 通貨コード
  currencyName: string; // 通貨名
};

export type TransactionType = {
  accountId: string;
  currencyCode: string;
  currencyName: string;
  dateFrom: string;
  dateTo: string;
  baseDate: string;
  baseTime: string;
  hasNext: string;
  count: string;
};

type Transaction = {
  transactionDate: string;
  transactionType: number; // 1 = 入金, 2 = 出金
  amount: number;
  balance: number;
  remarks: string;
};