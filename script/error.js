export function displayError(parentElement, errorMessage = "Something went wrong, please try again later") {
    const errorContainerEl = document.createElement('div');
    errorContainerEl.id = 'error-container';
    errorContainerEl.className = 'error-container';
    errorContainerEl.innerHTML = `
        <h3>Error</h3>
        <p>${errorMessage}</p>
    `;

    if (parentElement.querySelector("#error-container")) {
        document.getElementById('error-container').innerHTML = errorContainerEl.innerHTML;
        return;
    }
    parentElement.appendChild(errorContainerEl);
}