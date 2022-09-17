module.exports = (options) => {
    // console.log("options", options);
    return {
        // name: "vite-plugin-html",
        enforce: 'pre',
        transformIndexHtml: (html) => {
            // console.log("html", html);
            return html.replace(/<%= title %>/g, options.inject.data.title || 'Document')
        }
    }
}