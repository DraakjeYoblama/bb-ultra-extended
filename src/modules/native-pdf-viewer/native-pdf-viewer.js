// Credits to Tarik Kirgin for the original script
// from Blackboard Native PDF Viewer (https://github.com/tarikkirgin/blackboard-native-pdf-viewer)


// run processing when called from observer
async function observerCallback() {
    observer.disconnect();
    await Promise.all([processLinks(), processIframes()]);
    observer.observe(document.body, { childList: true, subtree: true });
}

// run callback when body changes
const observer = new MutationObserver(observerCallback);
observerCallback();

// process ally file links (normally hidden)
async function processLinks() {
    const hiddenPreviewLinks = document.querySelectorAll(
        "[data-ally-file-preview-url]"
    );
    if (hiddenPreviewLinks) {
        for (hiddenLink of hiddenPreviewLinks) {
            // Check if the link has already been revealed
            if (hiddenLink.getAttribute("data-link-revealed") === "true") {
                continue;
            }
            customLog("Revealing preview link.");
            
            // make link visible and set attributes
            hiddenLink.style.display = "";
            hrefLink = hiddenLink.getAttribute("data-ally-file-preview-url");
            /*try {
                const blobUrl = await fetchPdfUrl(hrefLink);
                if (blobUrl) {
                    hiddenLink.setAttribute("href", blobUrl);
                } else {
                    hiddenLink.setAttribute("href", hiddenLink.getAttribute("data-ally-file-preview-url"));
                }
            } catch (error) {
                customLog(`Error processing link: ${error}`, "error");
            }*/
            hiddenLink.setAttribute("href", hiddenLink.getAttribute("data-ally-file-preview-url"));
            hiddenLink.setAttribute("target", "_blank");

            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("focusable", "false");
            svg.setAttribute("aria-hidden", "true");
            svg.setAttribute("role", "presentation");
            svg.setAttribute("viewBox", "0 0 512 512");
            svg.setAttribute(
                "style",
                "width: 1em; height: 1em; font-size: 1.25rem; line-height: 1;"
            );
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("fill", "currentColor");
            path.setAttribute(
                "d",
                "M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"
            );
            svg.appendChild(path);
            hiddenLink.appendChild(svg);

            hiddenLink.setAttribute("data-link-revealed", "true");
        }
    }
}

// process iframes that contain pdfs
async function processIframes() {
    const iframes = document.querySelectorAll("iframe");
    for (const iframe of iframes) {
        // Check if the iframe has already been processed
        if (iframe.getAttribute("data-iframe-processed") === "true") {
            continue;
        }
        let src = iframe.getAttribute("src");
        if (src && src.includes("/bbcswebdav/") && src.includes("?")) {
            const modifiedSrc = src.split("?")[0]; // Remove query parameters
            await fetchPdfUrl(modifiedSrc).then((blobUrl) => {
                if (blobUrl) {
                    iframe.setAttribute("src", blobUrl); // Set the Blob URL as the iframe source
                    iframe.setAttribute("type", "application/pdf"); // Explicitly set the type
                }
            });
            iframe.setAttribute("data-iframe-processed", "true");
        }
    }
}

// fetch the pdf and create a blob url
// if the file is not a bdf, return null
async function fetchPdfUrl(url) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const contentType = response.headers.get("Content-Type");
        if (contentType === "application/pdf" || contentType === "application/octet-stream") {
            const blobUrl = URL.createObjectURL(blob); // Create a Blob URL
            // it needs to be a blob, because the server doesn't send a clear content type
            customLog(`Fetched PDF blob URL: ${blobUrl}`);
            return blobUrl;
        } else {
            customLog(`Not a PDF file: ${url}`);
        }
    } catch (error) {
        customLog(`Error fetching PDF: ${error}`, "error");
    }
    return null;
}

function customLog(message, type = "info") {
    console[type](
        `%c[Blackboard Native PDF Viewer]:%c${message}`,
        "font-weight: bold;"
    );
}
