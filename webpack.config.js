const path = require("path");

module.exports = {
    mode: 'development',//webpack4以降はモード指定しなければいけない
    watch: true,
    entry: {app: './src/index.js'},//エントリーポイント。連想配列にすることでappというキーに対してはindex.jsがentryとセットできる
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js', //バンドルのファイル名。[name]の部分にはentryで指定したキーが入る
    },
    devtool: 'inline-source-map',//ブラウザでのデバッグ用にソースマップを出力する

    //webpack-dev-server用設定
    devServer: {
        open: true,//ブラウザを自動で開く
        openPage: "index.html",//自動で指定したページを開く
        contentBase: path.resolve(__dirname, 'dist'),
        watchContentBase: true,
        port: 3000, // ポート番号


    }

};