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
    const isTyping = (
        document.activeElement.tagName === 'INPUT' ||
        document.activeElement.tagName === 'TEXTAREA' ||
        document.activeElement.isContentEditable
    );
    // Esc pressed and no modals are currently open
    if (event.key === "Escape" && !modalOpen) {
        let closeButtons = [...document.querySelectorAll("button.bb-close")];
        if (closeButtons.length > 0) {
            closeButtons.pop().click();
        }
    } else if (event.key === "ArrowLeft" && !modalOpen && !isTyping) {
        const prevButton = document.querySelector('.js-content-navigator-previous button');
        if (prevButton) {
            prevButton.click();
            console.log('Previous button clicked'); //todo remove this or whatever
        } else {
            console.log('Previous button not found');
        }
    } else if (event.key === "ArrowRight" && !modalOpen && !isTyping) {
        const nextButton = document.querySelector('.js-content-navigator-next button');
        if (nextButton) {
            nextButton.click();
            console.log('Next button clicked');
        } else {
            console.log('Next button not found');
        }
    }
});
