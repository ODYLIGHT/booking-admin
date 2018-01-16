# 周知しておきたい変更点をまとめる

## 2018/01/16
@angular/cliをアップデートしましたのでモジュールの入れ直しをお願いします

※`yarn.lock`を残したままモジュールを入れ直すと、generateコマンドがエラーになる可能性があります
```
$ rm -rf node_modules yarn.lock (or rmdir /s/q node_modules yarn.lock)
$ npm install (or yarn install)
```

