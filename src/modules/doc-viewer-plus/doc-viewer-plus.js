// Credits to Raj Kundu for the original script
// from Bb Doc Viewer+ (https://github.com/rajkundu/bb-doc-viewer-plus)

function getFilenameFromUri(uri) {
    return decodeURI(decodeURI(decodeURI(uri).split("%26").find((s) => s.includes("filename")).split('UTF-8').pop().split('%27%27').pop()));
}

function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

waitForElement('div.toolbar-end-container').then((parent) => {
    if (window.self !== window.top) {
        const btnSpan = document.createElement('span');

        const anchor = document.createElement('a');
        anchor.setAttribute('href', '');
        anchor.setAttribute('target', `bbdoc_${(new Date()).getTime()}`);

        const button = document.createElement('button');
        button.className = 'MuiButtonBaseroot-0-2-10 MuiIconButtonroot-0-2-1';
        button.setAttribute('tabindex', '0');
        button.setAttribute('type', 'button');
        button.setAttribute('aria-label', 'Open in New Tab');
        button.setAttribute('title', 'Open in New Tab');

        const span = document.createElement('span');
        span.className = 'MuiIconButtonlabel-0-2-9';

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('focusable', 'false');
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('role', 'presentation');
        svg.setAttribute('viewBox', '0 0 512 512');
        svg.setAttribute('margin', '5px');

        const style = document.createElement('style');
        style.textContent = 'svg{fill:#ffffff}';

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z');

        svg.appendChild(style);
        svg.appendChild(path);
        span.appendChild(svg);
        button.appendChild(span);
        anchor.appendChild(button);
        btnSpan.appendChild(anchor);
        parent.appendChild(btnSpan);
    }

    // Change title of page to filename of document being viewed
    document.title = getFilenameFromUri(window.location.href);
});

// Make files opened in new tab/window open in full view
if (window.location.href.includes('/file/') && window.history.length == 1) {
    waitForElement('bb-file-preview iframe').then((iframe) => {
        console.log("REDIRECTING to " + iframe.src);
        window.location.assign(iframe.src);
    });
}