// Credits to Raj Kundu for the original script
// from Bb Doc Viewer+ (https://github.com/rajkundu/bb-doc-viewer-plus)

let modalSelector = '.ms-Layer';
let modalOpen = false;
const modalObserver = new MutationObserver(mutations => {
    modalOpen = document.querySelectorAll(modalSelector).length > 0;
});
modalObserver.observe(document.body, {
    childList: true,
    subtree: true
});

// Esc = close topmost Blackboard pane
document.addEventListener('keydown', (event) => {
    // Esc pressed and no modals are currently open
    if (event.key === "Escape" && !modalOpen) {
        let closeButtons = [...document.querySelectorAll("button.bb-close")];
        if (closeButtons.length > 0) {
            closeButtons.pop().click();
        }
    }
});
