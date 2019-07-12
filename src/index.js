require('./assets/styles/reset.css');
require('./assets/styles/index.scss');

if (process.env.NODE_ENV === "development") {

    if (module.hot) {
        
        var hotEmitter = require("webpack/hot/emitter");
        hotEmitter.on("webpackHotUpdate", function (currentHash) {

            document.querySelectorAll('link[href][rel=stylesheet]').forEach((link) => {
                const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`)
                link.href = nextStyleHref
            })
        })
    }
}

window.showToast = function(text) {
    var x = document.getElementById('snackbar');
    x.innerHTML = String(text).replace(/<.*?>/, '');
    x.className = 'show';
    setTimeout(function(){ x.className = x.className.replace('show', ''); }, 3000);
}
