// ==UserScript==
// @name        Highlight Links to Wikipedia
// @version     0.3
// @description Append small Wikipedia logos to links which lead to Wikipedia articles.
// @include     *
// @exclude     *://*wikipedia.org/*
// ==/UserScript==

!function(SCALE) {
    var urlMatcher = /https?:\/\/([^.\/]+\.)?wikipedia\.org\/wiki\//;
    var logo = (function() {
        var template = document.createElement('img');
        template.src = 'http://wikipedia.org/favicon.ico';
        template.style.verticalAlign = 'super';
        template.style.padding = '0';
        template.style.borderWidth = '0';
        template.style.margin = '0';
        return function(fontSize) {
            var logo = template.cloneNode();
            logo.width = logo.height = fontSize * SCALE;
            return logo;
        };
    }());
    [].slice.call(document.querySelectorAll('a[href*="wikipedia.org/wiki/"]')).forEach(function(a) {
        if (urlMatcher.test(a.href)) {
            var em = parseInt(window.getComputedStyle(a).fontSize);
            a.parentNode.insertBefore(logo(em), a.nextSibling);
        }
    });
}(0.75);
