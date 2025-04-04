module.exports = function (eleventyConfig) {
  // call functions on eleventyConfig here

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

  // other things that are copied directly, without processing
  eleventyConfig.addPassthroughCopy("src/modules");
  eleventyConfig.addPassthroughCopy({ "src/manifest-v2.json": "manifest.json" });


  // filter to convert an object to a JSON string
  eleventyConfig.addFilter('stringify', (data) => {
      return JSON.stringify(data, null, "\t")
    })

  // return object options in the object starting on the line below
  return {
    markdownTemplateEngine: "false",
    htmlTemplateEngine: "false",
    njkTemplateEngine: "njk",
    dir: {
      input: "src",
      data: "_data",
      output: "_dist"
    }
  };
};