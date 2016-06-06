/**
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
*/

class Preview {
    /**
    * Creates a new Preview instance. 
    * @param  {Object}  Editor
    * @return {void}
    */
    constructor(editor) {
        this.editor = editor;
        this.options = this.editor.options.preview;

        if (this.editor.options.html) {
            this.html = this.editor.options.html;
        }

        if (this.editor.options.css) {
            this.css = this.editor.options.css;
        }

        if (this.editor.options.js) {
            this.js = this.editor.options.js;
        }

        this.element = this.options.element;
        this.button = this.options.button;

        this.run();
        this.attachClickEvent();
    }

    /**
    * Attach click event to preview button. 
    * @return {Void}
    */
    attachClickEvent() {
        var instance = this;

        document.querySelectorAll(this.button)[0].addEventListener("click", function() {
            instance.run();
        });
    }

    /**
    * Compile and show the preview.
    * @return {Void}
    */
    run() {
        if (! (typeof(document.querySelectorAll(this.element + ' iframe')[0]) == 'undefined')) {
            document.querySelectorAll(this.element)[0].removeChild(document.getElementById("result"));
        }
            
        var iframe = document.createElement('iframe');
        iframe.id = 'result';
        iframe.src = "javascript: '';";
        iframe.style = 'height: 100%; width: 100%;';

        // Append the iframe to preview box.
        document.querySelectorAll(this.element)[0].appendChild(iframe);

        // Append the html to body of the iframe document.
        var val = this.html.codemirror.getValue();

        if (this.css) {
            val += '<style> '+ this.css.codemirror.getValue() +' </style>';
        }

        if (this.js) {
            val += '<scr' + 'ipt type="text/javascript"> '+ this.js.codemirror.getValue() +' </scr' + 'ipt>';
        }

        var doc = iframe.contentWindow || iframe.contentDocument;

        if (doc.document) {
            doc = doc.document;
        }

        // Open and write to the iframe document. 
        doc.open().write(val);
        doc.close();
    }
}

window.Preview = Preview;