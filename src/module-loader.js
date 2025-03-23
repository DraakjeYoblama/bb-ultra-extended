async function readJSON(filePath) {
    try {
        // Fetch the JSON file
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the JSON data
        const jsonObject = await response.json();
        return jsonObject;
    } catch (err) {
        console.error(`Failed to fetch or parse include.json: ${err}`);
        return null;
    }
}

async function registerContentScript(scriptArray) {
    try {
        await browser.scripting.registerContentScripts(scriptArray);
        console.log('Content scripts registered successfully.');
    } catch (err) {
        console.error(`Failed to register content scripts: ${err}`);
    }
}

// Read the include.json file
readJSON('modules/include.json').then(async includeObj => {
    let includedModules = [];
    // Create an array of promises for reading module.json files
    const modulePromises = includeObj.modules.map(async module => {
        const moduleObj = await readJSON(`modules/${module}/module.json`);
        // Modify js and css file paths before adding to the array
        if (moduleObj.contentScriptParams.js) {
            moduleObj.contentScriptParams.js = moduleObj.contentScriptParams.js.map(filePath => `modules/${module}/${filePath}`);
        }
        if (moduleObj.contentScriptParams.css) {
            moduleObj.contentScriptParams.css = moduleObj.contentScriptParams.css.map(filePath => `modules/${module}/${filePath}`);
        }
        // Add the content script parameters to the includedModules array
        includedModules.push(moduleObj.contentScriptParams);
        console.log(`Included module: ${module}`);
    });

    // Wait for all module.json files to be read
    await Promise.all(modulePromises);
    registerContentScript(includedModules);
});