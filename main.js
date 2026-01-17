document.addEventListener("DOMContentLoaded", () => {
    console.log("main.js loaded");

    // Create core objects
    const avatar = new ISLAvatar("avatar-container");
    const translator = new ISLTranslator();

    // Grab UI elements
    const input = document.getElementById("text-input");
    const translateBtn = document.getElementById("translate-btn");
    const clearBtn = document.getElementById("clear-btn");
    const status = document.getElementById("status");

    translateBtn.addEventListener("click", async () => {
        const text = input.value.trim();
        if (!text) return;

        status.textContent = "Translating…";

        const sequence = translator.translateToISL(text);

        await avatar.performSequence(sequence, text.split(/\s+/));

        status.textContent = "Ready";
    });

    clearBtn.addEventListener("click", () => {
        input.value = "";
        avatar.reset();
        status.textContent = "Ready";
    });
});
