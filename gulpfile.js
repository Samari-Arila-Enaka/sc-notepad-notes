const { src, dest, series } = require('gulp');
const htmlMinify = require('html-minifier');

const options = {
    collapseWhitespace: true,
    removeComments: true,
};

function html() {
    return src('src/*.html')
        .on('data', function(file) {
            const bufferFile = Buffer.from(htmlMinify.minify(file.contents.toString(), options));
            return file.contents = bufferFile;
        })
        .pipe(dest('dist'));
}

exports.build = series(html);
