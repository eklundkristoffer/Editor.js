/**
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
*/

class Preview {
    /**
    * Create a new Preview instance.
    * @return {Preview}
    */
    constructor(editor) {
        this.editor = editor;
        this.textareas = editor.options.textareas;
        this.options = editor.options.preview;
        this.attachClickEvent();

        if (this.options.compiler) {
            this.options.compiler(this.editor, this, this.textareas);
        } else {
            this.compileAll();
        }
    }

    /**
    * Compile all textareas and show them as preview.
    * @return {Void}
    */
    compileAll() {
        var that = this, val = '';

        Object.keys(this.textareas).forEach(function(name) {
            var obj = that.textareas[name];
            var value = obj['codemirror'].getValue();

            if (obj.tags) {
                // Wrap the code around given tags. 
                val += obj.tags[0] + value + obj.tags[1];
            } else if (val == '') {
                // This only runs if the val hasn't been set already, 
                // by onCompile, or whatever. 
                val += value;
            }
        });

        if (! (val == '')) {
            this.compile(val);
        }
    }

    /**
    * Compile the given value.
    * @return {Void}
    */
    compile(value) {
        this.iframe = this.createAndInsertIframe();

        var doc = this.iframe.contentWindow || this.iframe.contentDocument;

        if (doc.document) {
            doc = doc.document;
        }

        doc.open().write(value);
        doc.close();
    }

    /**
    * Create and add the iframe to DOM.
    * @return {Element}
    */
    createAndInsertIframe() {
        if (! (typeof(document.querySelectorAll(this.options.element + ' iframe')[0]) == 'undefined')) {
            document.querySelectorAll(this.options.element)[0].removeChild(document.getElementById("result"));
        }

        if (this.options.onRun) {
            this.options.onRun();
        }
            
        var iframe = document.createElement('iframe');
        iframe.id = 'result';
        iframe.src = "javascript: '';";
        iframe.style = 'height: 100%; width: 100%; border: none;';

        document.querySelectorAll(this.options.element)[0].appendChild(iframe);

        return iframe;
    }

    /**
    * Bind click event to preview button.
    * @return {Void}
    */
    attachClickEvent() {
        var instance = this;

        document.querySelectorAll(this.options.button)[0].addEventListener("click", function() {
            instance.compile();
        });
    }

    onCompile(callback) {
        return callback(this.textareas);
    }
}

window.Preview = Preview;