// plug-in
const gulp = require('gulp');
const cleancss = require('gulp-clean-css');
const sass = require('gulp-sass');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');

// gulpタスク作成
// =======================
// sassをコンパイル(翻訳する)
// =======================
function build_css(){
  return gulp.src('./scss/style.scss')
      .pipe(sass())
      .pipe(gulp.dest('css/'));
}
exports.build_css = build_css;

// =======================
// CSS圧縮
// =======================
function clean_css(){
  return gulp.src('./css/style.css')  //圧縮もとファイル
        .pipe(cleancss()) //圧縮処理
        .pipe(gulp.dest('dest/css/'));  //吐き出し先
}
exports.clean_css = clean_css;

// ==============================================
// SASSをコンパイルしたあと、そのコンパイル済みファイルを圧縮する
// ==============================================
exports.sass_clean_build = gulp.series(build_css, clean_css);
const sass_clean_builder = gulp.series(build_css, clean_css);



// 画像圧縮
// 圧縮前後のディレクトリ
const paths = {
  srcDir:'src',
  dstDir:'dest',
  scss:'scss'
};
// 圧縮タスク
function image_min() {
  const srcGlob = paths.sreDir + '/**/*.+(jpg|jpeg|png|gif)'; //** :アスタリスク2つで、配下のディレクトリ全て
  const dstGlob = paths.dstDir;
  return
  gulp.src( srcGlob )
    .pipe(changed( dstGlob ))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      // v4から jpegtran → mozjpeg   https://teratail.com/questions/235821
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest( dstGlob ));
}
exports.image_min = image_min;

// ============================
// Gulpを使ったファイルの監視
// ============================
// watch()を使う v3→v4で変更点が大きいので注意！
// 第一引数は監視したいディレクトリ配下
// (v3)第二引数に変更があった場合に実行するタスクを配列形式で指定
// (v4)第二引数に変更があった場合に実行するタスクを直接指定
// 今回は、指定したディレクトリの配下全てのファイルを見て、何か変更があった時に、指定のタスク(この場合 imagemin )を実行する。自動ビルドや圧縮、コンパイルができるようになる
function watch_image(){
  return gulp.watch(paths.srcDir + '/**/*', gulp.default());
}
exports.watch_image = watch_image;

// =======================
// 監視によりSASSを更新しただけで反映されるようにする
// =======================
function watch_css(){
  return gulp.watch('scss/**' , sass_clean_builder);
}
exports.watch_css = watch_css;
