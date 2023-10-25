const { src, dest, series } = require('gulp');
const htmlMinify = require('html-minifier');
const mustache = require('gulp-mustache');

const options = {
    collapseWhitespace: true,
    removeComments: true,
    removeAttributeQuotes: true,
};

const notes = [];

function html() {
    return src('src/*.html')
        .on('data', function(file) {
            const bufferFile = Buffer.from(htmlMinify.minify(file.contents.toString(), options));
            notes.push({
                text: `\`\`\`html\n${bufferFile.toString()}\n\`\`\``,
                name: `\`${file.stem}\``,
            });
            return file.contents = bufferFile;
        })
        .pipe(dest('dist'));
}

function templateBuild() {
    return src('template/README.md')
        .pipe(mustache({
            "notes": notes,
        }))
        .pipe(dest('.'));
}

exports.build = series(html, templateBuild);
