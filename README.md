# キャッシュフロー管理 PWA

## ファイル構成
```
cashflow-pwa/
├── index.html      ← メインアプリ
├── manifest.json   ← PWA設定
├── sw.js           ← Service Worker（オフライン対応）
└── README.md       ← このファイル
```

## セットアップ方法

### ローカルで使う場合
HTTPSまたはlocalhostが必要なため、ローカルサーバーを起動してください。

```bash
# Python 3
python3 -m http.server 8080

# Node.js (npx)
npx serve .
```

ブラウザで `http://localhost:8080` にアクセスしてください。

### スマホのホーム画面に追加（iOS Safari）
1. SafariでURLを開く
2. 共有ボタン（□↑）をタップ
3. 「ホーム画面に追加」を選択

### スマホのホーム画面に追加（Android Chrome）
1. ChromeでURLを開く
2. メニュー（⋮）→「ホーム画面に追加」

## 機能
- 口座残高の手動入力・保存
- 取引（クレカ返済/現金引き出し）の追加・削除
- 時系列の残高シミュレーション（赤字警告付き）
- JSONエクスポート/インポート（データバックアップ）
- オフライン動作対応（Service Worker）
- データはLocalStorageに保存
