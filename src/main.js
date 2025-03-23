const scripts = [
    {
        "id": "doc-viewer-plus",
        "matches": [
            "*://*.api.blackboard.com/*",
            "*://*/ultra/*"
        ],
        "js": [
            "modules/doc-viewer-plus/doc-viewer-plus.js"
        ],
        "allFrames": true
    },
    {
        "id": "keyboard-navigation",
        "matches": [
            "*://*.api.blackboard.com/*",
            "*://*/ultra/*"
        ],
        "js": [
            "modules/keyboard-navigation/keyboard-navigation.js"
        ]
    },
    {
        "id": "native-pdf-viewer",
        "matches": [
            "*://*.api.blackboard.com/*",
            "*://*/ultra/*"
        ],
        "js": [
            "modules/native-pdf-viewer/native-pdf-viewer.js"
        ]
    }
];

async function registerContentScript() {
    try {
        await browser.scripting.registerContentScripts(scripts);
        console.log('Content scripts registered successfully.');
    } catch (err) {
        console.error(`Failed to register content scripts: ${err}`);
    }
}

// Call the async function to register the content script
registerContentScript();