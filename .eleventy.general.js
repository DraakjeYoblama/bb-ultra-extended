module.exports = function (eleventyConfig) {
    // These are the settings for all browsers
    // for browser specific settings, see .eleventy.browser.js

    // file types that are copied to the _dist folder, possibly processed by 11ty
    eleventyConfig.setTemplateFormats([
        "html",
        "njk",
        "css",
        "js",
        "json",
        "png",
        "jpg"
    ]);

    // files that are copied directly, without processing
    eleventyConfig.addPassthroughCopy("LICENSE");
    eleventyConfig.addPassthroughCopy("src/modules");

    // filter to convert an object to a JSON string
    eleventyConfig.addFilter('stringify', (data) => {
        return JSON.stringify(data, null, "\t")
    })
};

module.exports.config = {
    markdownTemplateEngine: "false",
    htmlTemplateEngine: "false",
    njkTemplateEngine: "njk",
    dir: {
        input: "src",
        data: "_data",
        output: "_dist"
    }
};