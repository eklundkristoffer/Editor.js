var elixir = require('laravel-elixir');

/*
|--------------------------------------------------------------------------
| Elixir Asset Management
|--------------------------------------------------------------------------
|
| Elixir provides a clean, fluent API for defining some basic Gulp tasks
| for your Laravel application. By default, we are compiling the Sass
| file for our application, as well as publishing vendor resources.
|
*/

elixir.config.assetsPath = './resources/';
elixir.config.publicPath = './public/';

elixir(function(mix) {
    mix.sass('editor.scss');

    mix.browserify([
        'helpers.js',
        'preview.js',
        'editor.js',
        'main.js'
    ]);
});