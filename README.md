# TeamD_section8

## いまとみらいのお財布アプリ

### 1. プロジェクト概要

貯蓄額の差額から将来の貯金を予想するアプリ

### 2. プロジェクトの目的

入出金の履歴から将来の不安を軽減する。

### 3. プロジェクト体制

- **開発メンバー**: 3 名

### 4. 使用技術

- **フロントエンド**: Next.js
- **バックエンド**: LLM ,sunabar

### 5. エンドポイント

- **GET**: 入出金履歴の取得
- **GET**: 残高の取得
- **GET**: LLM
- **POST**: LLM

####ページ構成

```
TeamD_section8/
└── frontend/
    ├── app/
    │    ├── HomePage
    │    │    └── page.tsx          # FuturePageとCurrentPageに遷移
    │    ├── FuturePage/
    │    │    ├── advice
    │    │    │    └── page.tsx           # LLMのページ
    │    │    ├── period
    │    │    │    └── page.tsx       # 残期間の表示
    │    │    ├── header
    │    │    │    └── page.tsx       # 目標金額との差額表示（sunabar残高照会 GET）
    │    │    ├── graph
    │    │    │    └── page.tsx       # グラフ表示
    │    │    └── servers             # API実装
    │    ├── CurrentPage/
    │    │    ├── AllTransaction
    │    │    │    └── page.tsx      # 入出金一覧（sunabar入出金明細照会 GET）
    │    │    ├── MonthlyTransaction
    │    │    │    └── page.tsx      # 月別一覧
    │    │    └── TotalSaving
    │    │         └── page.tsx       # 貯蓄額合計、差額
    │    └── server/
    │         ├── LLM.ts
    │         └── transactions.ts
   backend/
     ├── router/
     │    └── GET (sunabarの残高取得, sunabarの入出金明細取得)
     ├── servers/  # GETの呼び出し
     └── LLM  # AIによるアドバイス機能
```

データベース無し

####展望
入出金ができるようになればそこからデータを取ってきて将来の金額を出す。
