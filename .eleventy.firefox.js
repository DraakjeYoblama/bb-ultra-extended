const generalSettings = require("./.eleventy.general.js");

module.exports = function (eleventyConfig) {
    // Apply general settings
    // You can edit these in .eleventy.general.js
    generalSettings(eleventyConfig);

    // Browser-specific build flag for template selection
    eleventyConfig.addGlobalData("browser", "firefox");
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