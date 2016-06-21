/**
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
*/

require("codemirror/mode/xml/xml");
require('codemirror/mode/css/css');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/javascript/javascript');

var CodeMirror = require('codemirror');

class Editor {
    /**
    * Create a new Editor instance.
    * @return {Editor}
    */
    constructor(options) {
        this.options = options;
        
        var that = this;

        Object.keys(options.textareas).forEach(function(name) {
            var obj = options.textareas[name];

            obj['codemirror'] = that.codemirror(obj.element, obj.codemirror || {});
        });

        if (this.options.preview) {
            this.preview = new Preview(this);
        }
    }

    /**
    * Create a new CodeMirror instance at given element.
    * @return {CodeMirror}
    */
    codemirror(element, options) {
        if (this.options.codemirror) {
            options = merge_options(this.options.codemirror, options);
        }

        return CodeMirror.fromTextArea(document.querySelectorAll(element)[0], options);
    }
}

window.CodeMirror = CodeMirror;
window.Editor = Editor;
