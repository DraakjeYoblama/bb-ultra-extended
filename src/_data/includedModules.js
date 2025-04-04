// This file generates an object using include.json and the module.json files of the included modules
const include = require('../modules/include.json');

// find the included modules and combine them in one object
let includedModules = {};
for (const moduleName of include.modules) {
    includedModules[moduleName] = require(`../modules/${moduleName}/module.json`);

    // add full path name to js and css files
    const params = includedModules[moduleName].contentScriptParams;
    if (params.js) {
        params.js = params.js.map(filePath => `modules/${moduleName}/${filePath}`);
    }
    if (params.css) {
        params.css = params.css.map(filePath => `modules/${moduleName}/${filePath}`);
    }
}

module.exports = includedModules;