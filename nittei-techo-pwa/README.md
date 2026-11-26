# 日程手帳（PWA版）

## ファイル
- index.html … アプリ本体
- manifest.json … アプリ名・アイコン・全画面表示の設定
- sw.js … オフラインで起動するためのService Worker
- icons/ … ホーム画面用アイコン

## GitHub Pagesで公開する手順
1. GitHubで新しいリポジトリを作る（例: nittei-techo、Public）
2. 「Add file → Upload files」でこのフォルダの中身をすべてアップロード（icons フォルダごと）
3. Settings → Pages → Branch を「main」「/(root)」にして Save
4. 1〜2分後、https://<ユーザー名>.github.io/nittei-techo/ で開ける

## スマホに入れる
- iPhone: Safariで開く → 共有 → 「ホーム画面に追加」
- Android: Chromeで開く → メニュー → 「アプリをインストール」

## 注意
- 予定はその端末のブラウザ内に保存されます（端末間で同期はしません）
- 機種変更や念のための保存には「バックアップ」でJSONを書き出し、「復元」で読み込めます
- index.html を更新したら sw.js の VERSION を v2, v3… と上げると確実に反映されます
