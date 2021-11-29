addCss("https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.0.1/build/styles/monokai.min.css")
addCss("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/dark.min.css")
addScript("https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.0.1/build/highlight.min.js")
addScript("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/highlight.min.js")
function addScript(url) {

    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}
function addCss(url) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('style');
    script.type = 'text/css';
    script.src = url;
    head.appendChild(script);
}
function test(url) {
    document.write(url);
}

test("qweqwe")
hljs.initHighlightingOnLoad();
hljs.initLineNumbersOnLoad({
    // 让单行的时候也显示行号
    singleLine: true
});


