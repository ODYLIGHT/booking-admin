# 周知しておきたい変更点をまとめる

## 追加・修正予定について
講師のプロファイルにおいて、`user_id`を削除方向で進めるのでフォームをコメントアウトする(2018/01/17)
同プロファイルの`顧客からの感想`も削除、ないしは受講履歴テーブルに移行検討中(2018/01/17)
トップページを開くと`get/menus`リクエストが2回走る(201/01/19)

## 2018/01/24
`search booking`のデータ表示テーブルで、`Date`が顧客のタイムゾーンを反映していない

## 2018/01/23
予約情報など、リクエストは名前だがIDが入ったデータはBE側でjoin取得するので
各テーブルコンポーネントの見直しをする(`student-information`-`lesson history`以降はその形でExpress側でごにょごにょしている)

## 2018/01/16
@angular/cliをアップデートしましたのでモジュールの入れ直しをお願いします

※`yarn.lock`を残したままモジュールを入れ直すと、generateコマンドがエラーになる可能性があります
```
$ rm -rf node_modules yarn.lock (or rmdir /s/q node_modules yarn.lock)
$ npm install (or yarn install)
```

