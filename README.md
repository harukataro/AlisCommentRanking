# alisCommentRanking

このプログラムの目的はALIS (https://alis.to)の記事のコメント数のランキングを出力するプログラムです。

こちらはGAS（Google Apprication Scprit)のプラットフォームを利用して開発しています。

使い方
Google Driveにて新しいスプレッドシートを用意します。
ツール⇒スクリプトエディタにてスクリプトエディタを開きます。
GSの中身はcode.gsを貼り付けてください。
新たにHTMLファイルを２つ作成してください。

コードの中ではスプレッドシートのIDを使用します。IDはスプレッドシートのアドレスから抽出してください。そのIDをスクリプトに入力ください。

https://docs.google.com/spreadsheets/d/<spreadsheetID>

code.gsに2箇所
alis_comment_ranking.html に1箇所

記載してください


またスプレッドシートにはRankingというタブが必要です。予め作成が必要となります。

動作

fetchAlisCommentInfo2()　によりALISのサイトよりデータを取得します。GASのスケジュール機能にて定期的に取得してください。101回ALIS APIを叩きますので頻度には注意してください。
