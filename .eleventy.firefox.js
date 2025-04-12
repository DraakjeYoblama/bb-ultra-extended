const generalSettings = require("./.eleventy.general.js");

module.exports = function (eleventyConfig) {
    // Apply general settings
    // You can edit these in .eleventy.general.js
    generalSettings(eleventyConfig);

    // files that are copied directly, without processing
    eleventyConfig.addPassthroughCopy({ "src/manifest-v2.json": "manifest.json" });
};

const generalConfig = generalSettings.config;
module.exports.config = {
    ...generalConfig, // Default specific settings
    // overrides
    dir: {
        ...generalConfig.dir,
        output: "_dist/firefox"
    }
};