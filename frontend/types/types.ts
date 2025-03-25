export type BalanceType = {
  accountId: number;          // 口座ID
  accountTypeCode: number;    // 口座タイプコード
  accountTypeName: string;    // 口座タイプ名
  balance: number;            // 残高
  baseDate: string;           // 基準日
  baseTime: string;           // 基準時間
  withdrawableAmount: number; // 引き出し可能額
  previousDayBalance: number; // 前日の残高
  previousMonthBalance: number; // 前月の残高
  currencyCode: string;      // 通貨コード
  currencyName: string;      // 通貨名
}

//TODO 変更する

export type TransactionType = {
  accountId: number;          // 口座ID
  accountTypeCode: number;    // 口座タイプコード
  accountTypeName: string;    // 口座タイプ名
  balance: number;            // 残高
  baseDate: string;           // 基準日
  baseTime: string;           // 基準時間
  withdrawableAmount: number; // 引き出し可能額
  previousDayBalance: number; // 前日の残高
  previousMonthBalance: number; // 前月の残高
  currencyCode: string;      // 通貨コード
  currencyName: string;      // 通貨名
}
