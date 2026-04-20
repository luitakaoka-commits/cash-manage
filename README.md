# MoneyFlow PWA - セットアップガイド

## ファイル構成

```
cashflow-pwa/
├── index.html          ← メインアプリ（全機能）
├── manifest.json       ← PWA設定
├── sw.js               ← Service Worker（オフライン対応）
├── firestore.rules     ← Firestoreセキュリティルール
├── icons/
│   ├── icon-192.png    ← アプリアイコン（要作成）
│   └── icon-512.png    ← アプリアイコン（要作成）
└── README.md
```

---

## ① Firebase プロジェクトの設定

### 1. Firebase Consoleでプロジェクトを作成
https://console.firebase.google.com/

### 2. 以下のサービスを有効化
- **Authentication** → メール/パスワード認証を有効化
- **Firestore Database** → 本番モードで作成（リージョン: asia-northeast1 推奨）

### 3. Webアプリを登録してAPIキーを取得
Firebase Console → プロジェクト設定 → 「アプリを追加」→ Web

取得した設定を `index.html` の以下の箇所に貼り付けてください：

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",          // ← ここに貼り付け
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4. Firestoreのセキュリティルールを設定
Firebase Console → Firestore → ルール タブ に `firestore.rules` の内容を貼り付けて公開。

---

## ② アイコンの準備

`icons/` フォルダを作成し、以下のサイズのPNGアイコンを用意してください：
- `icon-192.png` (192×192px)
- `icon-512.png` (512×512px)

💡 無料ツール: https://realfavicongenerator.net/ でPWAアイコンを一括生成できます。

---

## ③ ホスティング（推奨: Firebase Hosting）

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

または **Netlify** / **Vercel** にフォルダをドラッグ&ドロップするだけでもOKです。

---

## ④ スマホのホーム画面に追加

### iPhone (Safari)
1. Safariでアプリを開く
2. 共有ボタン → 「ホーム画面に追加」

### Android (Chrome)
1. Chromeでアプリを開く
2. メニュー → 「ホーム画面に追加」

---

## 機能一覧

| 機能 | 説明 |
|------|------|
| **真の余力表示** | 全残高 − 未決済支出 − 貯金/NISA目標 をリアルタイム計算 |
| **取引管理** | クレカ/出金/収入/振替/投資の5種類 |
| **Pending/Completed分離** | 未来の予測と過去の履歴を明確に分離 |
| **事後編集** | 取引の日付・金額・ステータスを後から変更可能 |
| **完了ボタン** | 完了時に口座残高を自動増減 |
| **固定費プリセット** | 電気・ガス・水道などを登録し一括追加 |
| **証券口座** | 投資元本・評価額・損益を管理 |
| **JSONエクスポート** | 全データをバックアップ |
| **オフライン対応** | Firestoreのオフライン永続化 + Service Worker |
| **マルチデバイス同期** | Firestoreリアルタイムリスナーで即時反映 |

---

## データモデル (Firestore)

```
users/{uid}/
  banks/{id}           → name, currentBalance
  cardTypes/{id}       → name
  brokerages/{id}      → name, totalInvestment, currentValuation
  transactions/{id}    → date, type, amount, status, memo, createdAt
  settings/main        → savingsGoal
  presetFixedCosts/{id}→ name, amount, type
```
