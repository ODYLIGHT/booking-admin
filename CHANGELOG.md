# Booking Adminを作成する過程で疑問点や未実装項目などのメモ

## [ Questions ]
- そもそも今あるダミーデータ構造で行くのかどうか・・・
- `Sing up`の英語・日本語画面ってどうやって切り替えるか
- プルダウンメニューはDB保存にして`System settings`で変更可能にするのか

## [ unreleased ]
- `student information`の`overview`における入力値バリデーション
- スケジュールテーブルを変更する  
スケジュール管理テーブルを廃止して日付はビュー側で管理する

<!-- ## [ データテーブルの構造メモ ]
### 講師のテーブル(`teachers` table)  
| Field      | Type        | Null         | Key          | Default      | Extra        | Comment      |
|:-----------|:------------|:-------------|:-------------|:-------------|:-------------|:-------------|
| id         | number      | NO           | primary key  |              | auto increment| 講師のID     | -->

