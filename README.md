# Editor.js

![Alt text](/screenshots/1.png?raw=true "Optional Title")

Editor.js easy allows you to create new CodeMirror textareas, with a few more nice features including preview. Editor.js includes CodeMirror, and a few modes including XML, CSS, htmlmixed and JavaScript. But, you can easily include any other mode, theme or whatever. 

### Getting started

This is just a basic example, without livepreview.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Editor.js</title>
</head>
<body>
    <div>
        <textarea id="editor">&lt;div id="my-editor"&gt;
    My Editor.js!
&lt;/div&gt;</textarea>
    </div>

    <script src="public/js/bundle.js"></script>
    <script type="text/javascript">
        var editor = new Editor({
            textareas: {
                'editor': {
                    'element': '#editor'
                }
            }
        });
    </script>
</body>
</html>
```

### Documentation

| Options | Type | Default | Description |
|---|---|---|---|
| [textareas](https://github.com/eklundkristoffer/Editor.js/wiki/Textareas) | Object | | Holds all textareas to transform into CodeMirror |

### Live preview

We don't support this at the moment. But! There is a workaround to get it working:
```js
editor.preview.textareas.html.codemirror.on('change', function(cm, change) {
    editor.preview.compile();
});
```
Yes, you have to call it on every textarea you want to livepreview. 
