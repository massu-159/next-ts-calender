# next-ts-calender

アウトプットとして、Next.js を使った貯金カレンダーアプリケーションを作成。

TypeScript による型定義。

カレンダーに貯金額を入力できて、貯金額を管理。

<img src="https://user-images.githubusercontent.com/75517054/200572334-6d82d6f1-93c8-4f29-9c06-6d69d635804b.png" alt="デモ" width="450"/>

url：
https://github.com/massu-159/next-ts-calender

FullCalender ライブラリを使用。doc は[こちら](https://fullcalendar.io/)

参考：
https://qiita.com/FumioNonaka/items/936ca66c78361a02bbd4

## 目次

1. 環境構築
2. アプリケーションの仕様

## 1. 環境構築

### 1-1. ライブラリ インストール

```
npm install

または

yarn
```

### 1-2. アプリケーション実行

```
npm run dev

または

yarn dev
```

### 1-3. 環境変数の設定
ルートディレクトリに、`.env`ファイルを作成し、環境変数を設定。
```
NEXT_PUBLIC_FIREBASE_API_KEY=xxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SEND_ID=xxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxxxxxxxxxxxxxx
```

## 2. アプリケーションの仕様

### 2-1. 仕様

- 貯金
  - 貯金額一覧表示
  - 貯金額登録処理
  - 貯金額削除処理
  - 合計額表示
- カレンダー
  - カレンダー 1 ヶ月表示
  - ドラッグ&ドロップで貯金した日を変更

### 2-2. 構成技術

- next : 13.0.2
- react : 18.2.0
- react-dom : 18.2.0
- @fullcalendar/core : 5.11.3
- @fullcalendar/daygrid : 5.11.3
- @fullcalendar/interaction : 5.11.3
- @fullcalendar/react : 5.11.2
- next-transpile-modules : 10.0.0
- typescript : \*
- firebase : 9.13.0
- uuid : 9.0.0
