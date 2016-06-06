/**
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
*/

require("codemirror/mode/xml/xml");
require('codemirror/mode/xml/xml');
require('codemirror/mode/css/css');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/javascript/javascript');

var CodeMirror = require('codemirror');

class Editor {
    /**
     * Creates a new Editor instance. 
     * @param {Object}  options
     * @return {void}
    */
    constructor(options = {}) {
        this.options = options;

        if (this.options.html) {
            var html = this.options.html;
            html.codemirrorOptions = html.codemirrorOptions || {}
            html.codemirror = this.codemirror(html.element, html.codemirrorOptions);
        }

        if (this.options.css) {
            var css = this.options.css;
            css.codemirrorOptions = css.codemirrorOptions || {}
            css.codemirror = this.codemirror(css.element, css.codemirrorOptions);
        }


        if (this.options.js) {
            var js = this.options.js;
            js.codemirrorOptions = js.codemirrorOptions || {}
            js.codemirror = this.codemirror(js.element, js.codemirrorOptions);
        }

        if (this.options.preview) {
            this.preview = new Preview(this);
        }
    }

    /**
     * Creates a new Codemirror instance.
     * @return {Object} CodeMirror
    */
    codemirror(element, options = {}) {
        if (this.options.globalCodemirrorOptions) {
            options = merge_options(this.options.globalCodemirrorOptions, options);
        }

        return CodeMirror.fromTextArea(document.querySelectorAll(element)[0], options);
    }
}

window.Editor = Editor;

