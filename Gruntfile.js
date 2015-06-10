module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');
    // http://havelog.ayumusato.com/develop/javascript/e580-own_concat_pattern.html
    grunt.initConfig({
        concat: {
            options: {
                stripBanners: false,
                banner: [
                    '(function() {',
                    '"use strict";',
                    '',
                    ''
                ].join('\n'),
                footer: ['',
                    '}).call(this);'
                ].join('\n')
            },
            files: {
                // 元ファイルの指定
                src: [
                    'src/Array.FromCollection.js',
                    'src/Array.prototype.filter.js',
                    'src/Array.prototype.forEach.js',
                    'src/Array.prototype.map.js',
                    'src/Array.prototype.reduce.js',
                    'src/Date.prototype.getYMDhms.js',
                    'src/Class.js',
                    'src/StreamReader.js',
                    'src/StreamWriter.js',
                    'src/StreamUOpts.js',
                    'src/StreamReaderU.js',
                    'src/StreamWriterU.js',
                    'src/Ini.js',
                    'src/File.js',
                ],
                // 出力ファイルの指定
                dest: 'dist/JScriptExtender.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    // 出力ファイル: 元ファイル
                    'dist/JScriptExtender-min.js': 'dist/JScriptExtender.js'
                }
            }
        },
        watch: {
            js: {
                files: 'src/*.js',
                tasks: ['concat', 'uglify']
            }
        }
    });

    // プラグインのロード・デフォルトタスクの登録
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['concat', 'uglify']);

    // 更新監視は grunt watch でスタート
};