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
        this.textareas = editor.options.textareas;
        this.options = editor.options.preview;
        this.attachClickEvent();
        this.compile();
    }

    /**
    * Compile all textareas and show them as preview.
    * @return {Void}
    */
    compile() {
        this.iframe = this.createAndInsertIframe();
        var that = this, val = '';

        Object.keys(this.textareas).forEach(function(name) {
            var obj = that.textareas[name];

            if (obj.tags) {
                val += obj.tags[0] + obj['codemirror'].getValue() + obj.tags[1];
            } else {
                val += obj['codemirror'].getValue();
            }
        });

        var doc = this.iframe.contentWindow || this.iframe.contentDocument;

        if (doc.document) {
            doc = doc.document;
        }

        doc.open().write(val);
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
}

window.Preview = Preview;