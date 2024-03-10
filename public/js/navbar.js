const container = document.getElementById('nav-organizer');
const contentContainer = document.getElementById('content-container');

let computedRight = window.getComputedStyle(container).right;
let xValueBeforeSlide = Math.round(parseFloat(computedRight));
let isOpen = false;

container.addEventListener('transitionstart', () => {

    console.log(xValueBeforeSlide);
    console.log(`DEBUG: Transition has begun.`)  // This is not appearing immediately on the press of a button, so it will be unreliable as an identifier.
});

container.addEventListener('transitionend', () => {
    const computedRight = window.getComputedStyle(container).right;
    const xValueBeforeSlide = parseFloat(computedRight);

    if (xValueBeforeSlide === -984) {
        console.log('DEBUG: Container is currently closed.');
        WipeContainer(); // Wipe the container if it's closed
        isOpen = false; // Update the state
    } else {
        console.log('DEBUG: Container is currently open.');
        isOpen = true; // Update the state
    }
});

function WipeContainer() {
    console.log(`DEBUG: Wiping container...`)
    contentContainer.innerHTML = '';
}

export { isOpen };