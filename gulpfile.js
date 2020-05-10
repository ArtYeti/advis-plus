const { src, dest, parallel , gulp , watch, series } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cssbeautify 	= require('gulp-cssbeautify');
const browserSync	= require('browser-sync'); 
const uglify      	= require('gulp-uglifyjs');
const cssnano		= require('gulp-cssnano');
const rename		= require('gulp-rename');
const del 			= require('del');
const imagemin 		= require('gulp-imagemin');
const pngquant		= require('imagemin-pngquant');
const cache 		= require('gulp-cache');
const autoprefixer	= require('gulp-autoprefixer');
const realFavicon 	= require('gulp-real-favicon');
const fs 			= require('fs');
const csscomb 		= require('gulp-csscomb');
const groupSize 	= require('./group-size') ;
const svgSprite 	= require("gulp-svg-sprites");
const svgstore 		= require('gulp-svgstore');
const svgmin 		= require('gulp-svgmin');
const gutil 		= require('gulp-util');
const sourcemaps 	= require('gulp-sourcemaps');
const listing 		= require('gulp-listing');
const gcmq 			= require('gulp-group-css-media-queries');
const babel 		= require('gulp-babel');
const cheerio 		= require('gulp-cheerio');		

var autoprefixerList = [
	'Chrome >= 45',
	'Firefox ESR',
	'Edge >= 12',
	'Explorer >= 10',
	'iOS >= 9',
	'Safari >= 9',
	'Android >= 4.4',
	'Opera >= 30'
];



function browser_sync() {
	browserSync({
		server: {
            baseDir: "app/"
        },
		notify: false
	});
}


function pages() {
	return src('app/page/*.pug')
	.pipe( pug({
		pretty: true
	}) )
	.pipe(dest('app/'))
	.pipe(browserSync.reload({stream: true}));
}


function clear(pages) {
	return del.sync(pages);
}
function scss() {
  return src('app/scss/**/*.scss')
	.pipe(sass())
	.pipe(autoprefixer({ // добавим префиксы
        browsers: autoprefixerList
	}))
	.pipe(gcmq())
	.pipe(csscomb())
	.pipe(cssbeautify())	
	.pipe(dest('app/style'))
	.pipe(browserSync.reload({stream: true}));
}
function css_libs() {
	parallel('scss');
	return src([
		'node_modules/bootstrap/dist/css/bootstrap.css',
		'app/libs/swiper-5.2.0/package/css/swiper.css'	,
		'app/libs/fancybox/dist/jquery.fancybox.min.css'	
	])
	.pipe(concat('libs.min.css'))
	.pipe(cssnano())
	.pipe(dest('app/style'));
}
  
function scripts_build() {
	return src([
			'app/js/hed_fot/head.js',
			'app/blocks/**/*.js' ,
			'app/js/hed_fot/footer.js',
		])
		.pipe(concat('script.js'))
		.pipe(babel({
            presets: ['@babel/env']
		}))
		.pipe(dest('app/js'))
		.pipe(browserSync.reload({stream: true}));
}

function scripts() {
	return src([
			'app/libs/jquery.min.js' ,
			'node_modules/bootstrap/dist/js/bootstrap.min.js',
			'app/libs/swiper-5.2.0/package/js/swiper.min.js',
			'app/libs/fancybox/dist/jquery.fancybox.min.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(dest('app/js'));
}

function svgSprites() {
	return src('app/images/s/*.svg')
		.pipe(svgmin())
		.pipe(svgstore({
			inlineSvg: true ,
			prefix: 'icon-'
			}))
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[style]').removeAttr('style');
				$('[stroke]').removeAttr('stroke');
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe(rename('sprite.svg'))
		.pipe(dest('app/images/sr'));
}

function watchFiles() {
	watch("app/page/**/*", pages);
	watch("app/blocks/**/*.pug", pages);
	watch("app/scss/**/*", scss);
	watch("app/components/**/*", scss);
	watch("app/blocks/**/*.scss", scss);
	watch("app/js/*.js" );
}

function clean() {
	return del(["dist/"]);
}

function cleanHeadFot() {
	return del(["dist/js/hed_fot"]);
}

//Вывод файлов на продакшн
function build() {
	buildCss = src(['app/style/*.css'])
	.pipe(dest('dist/style'));

	buildfavicon = src(['app/favicon/**/*'])
	.pipe(dest('dist/favicon'));

	buildFonts = src('app/fonts/**/*')
	.pipe(dest('dist/fonts'));

	buildImages = src('app/images/**/*')
	.pipe(dest('dist/images'));

	buildJs = src('app/js/*.js')
	.pipe(dest('dist/js'));

	buildJs2 = src('app/js/data/*.js')
	.pipe(dest('dist/js/data'));
	
	buildHtml = src('app/*.html')
	.pipe(dest('dist'));
};

function listing_file() {
	return src('app/*.html')
        .pipe(listing('listing.html'))
        .pipe(dest('app/'));
}

exports.scripts = scripts;
exports.scripts_build = scripts_build;
exports.scss = scss;
exports.pages = pages;
exports.browser_sync = browser_sync;
exports.css_libs = css_libs;
exports.watchFiles = watchFiles;
exports.cleanHeadFot = cleanHeadFot;
exports.clean = clean;
exports.svgSprites = svgSprites;
exports.listing_file = listing_file;
exports.default = parallel(watchFiles, scripts , css_libs , browser_sync);
exports.build = build;
exports.product = series(clean , parallel(pages, scripts , scss, css_libs), build , cleanHeadFot);