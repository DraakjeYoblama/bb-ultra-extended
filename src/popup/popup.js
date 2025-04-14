function saveOptions(e) {
    e.preventDefault();
    const module = e.target.closest('.module');
    const enabled = e.target.checked;
    const data = { [module.id]: { enabled: enabled } }; // TODO make this be able to store more information
    browser.storage.sync.set(data);
    console.log(`Saved ${module.id}`);
}

function restoreOptions() {
    function setCurrentChoice(module, result) {
        module.querySelector('.switch input[type="checkbox"]').checked = result.enabled || false;
        // if no value is defined, it defaults to false
        // this should not happen, because the module loader sets a default value
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    document.querySelectorAll(".module").forEach((module) => {
        let getting = browser.storage.sync.get(module.id);
        getting.then((result) => setCurrentChoice(module, result[module.id]), onError);
    });
    console.log("Restored options");
}

function loaded() {
    document.body.addEventListener("input", saveOptions); // TODO: how about this doesn't update with every input?
    restoreOptions();
}

document.addEventListener("DOMContentLoaded", loaded);
