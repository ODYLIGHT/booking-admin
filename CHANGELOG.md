# 周知しておきたい変更点をまとめる

## 追加・修正予定について
講師のプロファイルにおいて、`user_id`を削除方向で進めるのでフォームをコメントアウトする(2018/01/17)

## 2018/01/16
@angular/cliをアップデートしましたのでモジュールの入れ直しをお願いします

※`yarn.lock`を残したままモジュールを入れ直すと、generateコマンドがエラーになる可能性があります
```
$ rm -rf node_modules yarn.lock (or rmdir /s/q node_modules yarn.lock)
$ npm install (or yarn install)
```

