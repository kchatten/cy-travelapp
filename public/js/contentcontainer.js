import { isOpen } from './navbar.js';

import { InitializeRegistrationLogic } from './registration.js';
import { InitializeLoginLogic } from './login.js';

const contentContainer = document.getElementById('content-container');

let lastButtonId = null;

function UpdateContent(buttonId, result) { // The function to update our dynamic content container, it takes in an input parameter of the id of the button clicked and outputs a result. I actually do not now why this works. Reading it as written, if the updateContent resolves successfully, it then proceeds to check the id of the button. If it fails, it wipes the screen and then checks the id of the button. If you remove the WupeContainer() from the else, forms will not be removed when navigating between tabs and they will inappropriately appear stacked within the content container,S

    console.log(`DEBUG: running UpdateContent function with input parameter ${buttonId}`);
    console.log(`DEBUG: ${lastButtonId}`)

    if (result) { // Updates the container while it is offscreen.
        if (buttonId === "register" || buttonId === "registerLink") { // When we wish to update the container with content relevant to the registration 'page'.
            console.log('DEBUG: Displaying registration tab.');
            UpdateContainerRegister(); // Update the content of the container to display the registration 'page'.
            LoadRegistrationLogic(); // Load the registration logic after the content has been updated.

        } else if (buttonId === "login" || buttonId === "loginLink") { // When we wish to update the container with the content relevant to the login 'page'.
            console.log(`DEBUG: Displaying login tab.`);
            UpdateContainerLogin(); // Update the content of the container to display the login 'page'.
            LoadLoginLogic();

        } else if (buttonId === "accountrecovery") { // When we wish to update the container with the content relevant to the account recovery 'page'.
            console.log(`DEBUG: Displaying Account Recovery Tab`);
            UpdateContainerRecovery() // Update the content of the container to display the account recovery 'page'.
        }
    } else { // Updates the container while it is onscreen.
        WipeContainer();
        if (buttonId === "register" || buttonId === "registerLink") {
            console.log('DEBUG: Displaying registration tab.');

            UpdateContainerRegister();
            LoadRegistrationLogic();

        } else if (buttonId === "login") {
            console.log(`DEBUG: Displaying login tab.`);
            UpdateContainerLogin();
            LoadLoginLogic();

        } else if (buttonId === "accountrecovery") {
            console.log(`DEBUG: Displaying Account Recovery Tab`);

            UpdateContainerRecovery()
        }
    }
}
function ToggleContainer(buttonId) { // The function to toggle the container, it takes an input paremeter of the id of the button clicked.
    const container = document.getElementById('nav-organizer'); // Grab the navigational organizer.
    if (buttonId === lastButtonId) { // If the buttonId matches the lastButtonId, the user is trying to minimize the container.    
        if (isOpen) { // Check the status of isOpen, if it resolves as true, the container is open.
            container.style.right = '-984px'; // Close the container
            console.log('DEBUG: Closing container...');
        } else { // isOpen resolved as false, the container is closed.
            container.style.right = '0'; // Open the container
            console.log('DEBUG: Opening container...');
        }
    } else {
        // If the buttonId does not match the lastButtonId, the user is trying to display the container.
        container.style.right = '0'; // Open the container
        console.log('DEBUG: Opening container...');
    }    
    lastButtonId = buttonId; // Update lastButtonId.
}
function WipeContainer() { // The function for removing all content in the dynamic content container.
    console.log(`DEBUG: Wiping container...`)
    contentContainer.innerHTML = '';
}
function UpdateContainerRegister() { // The function for updating the content in the dynamic content container to display the registration 'page'

    const registrationContainer = document.createElement('div'); // Create container div
    registrationContainer.classList.add('container'); // Give it the class .container for styling purposes.

    const registrationForm = document.createElement('form'); // Create form element
    registrationForm.id = 'registration-form'; // Give it an id
    registrationForm.action = '/register'; // Define the endpoint.
    registrationForm.method = 'POST'; // Define the method
    registrationContainer.appendChild(registrationForm); // Attach the registration form to the registration container.

    // Create titleplate div
    const titleplate = document.createElement('div');
    titleplate.id = 'titleplate';
    titleplate.style.display = 'flex';
    titleplate.style.flexDirection = 'column';
    titleplate.style.alignItems = 'center';
    titleplate.marginBottom = '10px';
    registrationForm.appendChild(titleplate);

    // Create image element
    const logo = document.createElement('img');
    logo.src = 'https://i.ibb.co/CzX5Dt7/travelnest-logo.png';
    logo.alt = 'Your Logo';
    logo.classList.add('logo');
    titleplate.appendChild(logo);

    // Create h3 element
    const heading3 = document.createElement('h3');
    heading3.textContent = 'Sign up for an account';
    registrationForm.appendChild(heading3);

    // Create h6 element
    const heading6 = document.createElement('h6');
    heading6.textContent = 'Travel near. Travel far.';
    registrationForm.appendChild(heading6);

    // Create label and input elements for Full Name
    const labelFullName = document.createElement('label');
    labelFullName.textContent = 'Full Name:';
    registrationForm.appendChild(labelFullName);

    const inputFullName = document.createElement('input');
    inputFullName.type = 'text';
    inputFullName.id = 'name';
    inputFullName.name = 'name';
    inputFullName.placeholder = 'Your Name';
    registrationForm.appendChild(inputFullName);

    // Create label and input elements for Email
    const labelEmail = document.createElement('label');
    labelEmail.textContent = 'Email:';
    registrationForm.appendChild(labelEmail);

    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.id = 'email';
    inputEmail.name = 'email';
    inputEmail.placeholder = 'Your Email';
    registrationForm.appendChild(inputEmail);

    // Create label and input elements for Password
    const labelPassword = document.createElement('label');
    labelPassword.textContent = 'Password:';
    registrationForm.appendChild(labelPassword);

    const inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.id = 'password';
    inputPassword.name = 'password';
    inputPassword.placeholder = 'Your Pa****rd';
    registrationForm.appendChild(inputPassword);

    // Create label and input elements for Location
    const labelLocation = document.createElement('label');
    labelLocation.textContent = 'Location:';
    registrationForm.appendChild(labelLocation);

    const inputLocation = document.createElement('input');
    inputLocation.type = 'text';
    inputLocation.id = 'location';
    inputLocation.name = 'location';
    inputLocation.placeholder = 'Where ya from?';
    registrationForm.appendChild(inputLocation);

    // Create error message div
    const errorMessage = document.createElement('div');
    errorMessage.id = 'error-message';
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '16px';
    registrationForm.appendChild(errorMessage);

    // Create submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    registrationForm.appendChild(submitButton);

    // Create login button
    const loginButton = document.createElement('button');
    loginButton.textContent = 'Login Now!';
    loginButton.style.backgroundColor = 'transparent';
    loginButton.style.border = 'none';

    // Add event listener to the login button
    loginButton.addEventListener('click', function () {
        lastButtonId = 'login';
        console.log(`DEBUG: ${lastButtonId}`)
        UpdateContent('login');
    });

    // Create link paragraph
    const linkParagraph = document.createElement('div');
    linkParagraph.classList.add('-link');
    linkParagraph.textContent = 'Already have an account? ';
    linkParagraph.appendChild(loginButton);

    // Append elements to the container
    registrationContainer.appendChild(linkParagraph);

    // Append container to the contentContainer
    contentContainer.appendChild(registrationContainer);

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();
    });  
}
function UpdateContainerLogin() { // The function for updating the content in the dynamic content container to display the login 'page'

    // Create container div
    const loginContainer = document.createElement('div');
    loginContainer.classList.add('container');

    // Create form element
    const loginForm = document.createElement('form');
    loginForm.id = 'login-form';
    loginForm.action = '/login';
    loginForm.method = 'POST';
    loginContainer.appendChild(loginForm)


    // Create titleplate div
    const titleplate = document.createElement('div');
    titleplate.id = 'titleplate';
    titleplate.style.display = 'flex';
    titleplate.style.flexDirection = 'column';
    titleplate.style.alignItems = 'center';
    titleplate.marginBottom = '10px';
    loginForm.appendChild(titleplate);

    // Create image element
    const logo = document.createElement('img');
    logo.src = 'https://i.ibb.co/CzX5Dt7/travelnest-logo.png';
    logo.alt = 'Your Logo';
    logo.classList.add('logo');
    titleplate.appendChild(logo);

    // Create h3 element
    const heading3 = document.createElement('h3');
    heading3.textContent = 'Login';
    loginForm.appendChild(heading3);

    // Create h6 element
    const heading6 = document.createElement('h6');
    heading6.textContent = 'Travel near. Travel far.';
    loginForm.appendChild(heading6);

    // Create label and input elements for Email
    const labelLoginEmail = document.createElement('label');
    labelLoginEmail.textContent = 'Email:';
    loginForm.appendChild(labelLoginEmail);

    const loginEmailInput = document.createElement('input');
    loginEmailInput.type = 'email';
    loginEmailInput.id = 'email';
    loginEmailInput.name = 'email';
    loginEmailInput.placeholder = 'Your Email';
    loginForm.appendChild(loginEmailInput);

    // Create label and input elements for Password
    const labelLoginPassword = document.createElement('label');
    labelLoginPassword.textContent = 'Password:';
    loginForm.appendChild(labelLoginPassword);

    const loginPasswordInput = document.createElement('input');
    loginPasswordInput.type = 'password';
    loginPasswordInput.id = 'password';
    loginPasswordInput.name = 'password';
    loginPasswordInput.placeholder = 'Your Pa****rd';
    loginForm.appendChild(loginPasswordInput);

    // Create error message div
    const errorMessage = document.createElement('div');
    errorMessage.id = 'error-message';
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '16px';
    loginForm.appendChild(errorMessage);

    // Create submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    loginForm.appendChild(submitButton);


    // Create link paragraph
    const linkParagraph = document.createElement('div');
    linkParagraph.classList.add('-link');
    linkParagraph.textContent = 'Not signed up yet? ';
    linkParagraph.style.marginTop = '10px';
    loginContainer.appendChild(linkParagraph);

    // Create register button
    const registerButton = document.createElement('button');
    registerButton.textContent = 'Sign Up Now!';
    registerButton.style.backgroundColor = 'transparent';
    registerButton.style.border = 'none';
    linkParagraph.appendChild(registerButton);

    // Add registerLink listener to the login button
    registerButton.addEventListener('click', function () {
        lastButtonId = 'registerLink';
        console.log(lastButtonId)
        UpdateContent('registerLink');
    });


    // Append container to the contentContainer
    contentContainer.appendChild(loginContainer);

    // Add event listener to the registration form if needed
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
    });
}
function UpdateContainerRecovery() { // The function for updating the content in the dynamic content container to display the account recovery 'page'

    // Create recovery type form
    const recoveryTypeForm = document.createElement('form');
    recoveryTypeForm.id = 'recovery-type';
    contentContainer.appendChild(recoveryTypeForm);

    // Create titleplate div
    const titleplate = document.createElement('div');
    titleplate.id = 'titleplate';
    titleplate.style.display = 'flex';
    titleplate.style.flexDirection = 'column';
    titleplate.style.alignItems = 'center';
    titleplate.marginBottom = '10px';
    recoveryTypeForm.appendChild(titleplate);

    // Create logo image
    const logo = document.createElement('img');
    logo.src = 'https://i.ibb.co/CzX5Dt7/travelnest-logo.png';
    logo.alt = 'Your Logo';
    logo.classList.add('logo');
    titleplate.appendChild(logo);

    // Create heading
    const heading = document.createElement('h3');
    heading.textContent = 'Account Recovery';
    titleplate.appendChild(heading);

    // Create recovery type label
    const recoveryTypeLabel = document.createElement('label');
    recoveryTypeLabel.textContent = 'Recovery Type:';
    recoveryTypeForm.appendChild(recoveryTypeLabel);

    // Create recovery type dropdown
    const recoveryTypeSelect = document.createElement('select');
    recoveryTypeSelect.id = 'recovery-type-selected';
    recoveryTypeSelect.name = 'recovery-type-selected';
    recoveryTypeForm.appendChild(recoveryTypeSelect);

    recoveryTypeSelect.addEventListener('change', function () {
        const selectedOption = this.value;
        if (selectedOption === 'password') {
            passwordRecoveryForm.style.display = 'flex';
            emailRecoveryForm.style.display = 'none';
        } else if (selectedOption === 'email') {
            passwordRecoveryForm.style.display = 'none';
            emailRecoveryForm.style.display = 'flex';
        } else {
            // For other options, hide both forms
            passwordRecoveryForm.style.display = 'none';
            emailRecoveryForm.style.display = 'none';
        }
    });

    // Create options for the dropdown
    const optionClean = document.createElement('option');
    optionClean.value = 'clean';
    optionClean.textContent = 'Change something about my account...';
    recoveryTypeSelect.appendChild(optionClean);

    const optionPassword = document.createElement('option');
    optionPassword.value = 'password';
    optionPassword.textContent = 'Change my password.';
    recoveryTypeSelect.appendChild(optionPassword);

    const optionEmail = document.createElement('option');
    optionEmail.value = 'email';
    optionEmail.textContent = 'Change my email.';
    recoveryTypeSelect.appendChild(optionEmail);

    // Create password recovery form
    const passwordRecoveryForm = document.createElement('form');
    passwordRecoveryForm.id = 'recovery-container-password';
    passwordRecoveryForm.style.flexDirection = 'column';
    passwordRecoveryForm.style.justifySelf = 'center';
    passwordRecoveryForm.style.alignItems = 'center';
    passwordRecoveryForm.style.backgroundColor = 'white';
    passwordRecoveryForm.style.width = '350px';
    passwordRecoveryForm.style.padding = '10px';
    passwordRecoveryForm.style.display = 'none';
    contentContainer.appendChild(passwordRecoveryForm);

    // Create the content of the password recovery form.

    const newPasswordLabel = document.createElement('label'); // The new password.
    newPasswordLabel.textContent = `New Password:`;
    passwordRecoveryForm.appendChild(newPasswordLabel);

    const passwordRecoveryNewPasswordInput = document.createElement('input');
    passwordRecoveryNewPasswordInput.id = 'password-recovery-new-password';
    passwordRecoveryNewPasswordInput.setAttribute('type', 'password');
    passwordRecoveryNewPasswordInput.setAttribute(`placeholder`, `Enter new password...`);
    passwordRecoveryForm.appendChild(passwordRecoveryNewPasswordInput);

    const newPasswordConfirmLabel = document.createElement('label'); // The confirmed new password.
    newPasswordConfirmLabel.textContent = `New Password:`;
    passwordRecoveryForm.appendChild(newPasswordConfirmLabel);

    const passwordRecoveryNewPasswordConfirmInput = document.createElement('input');
    passwordRecoveryNewPasswordConfirmInput.id = 'password-recovery-confirm-new-password';
    passwordRecoveryNewPasswordConfirmInput.setAttribute('type', 'password');
    passwordRecoveryNewPasswordConfirmInput.setAttribute(`placeholder`, `Confirm new password...`);
    passwordRecoveryForm.appendChild(passwordRecoveryNewPasswordConfirmInput);

    const oldPasswordLabel = document.createElement('label'); // The old password.
    oldPasswordLabel.textContent = `Old Password:`;
    passwordRecoveryForm.appendChild(oldPasswordLabel);

    const passwordRecoveryOldPasswordInput = document.createElement('input');
    passwordRecoveryOldPasswordInput.id = 'password-recovery-old-password';
    passwordRecoveryOldPasswordInput.setAttribute('type', 'password');
    passwordRecoveryOldPasswordInput.setAttribute(`placeholder`, `Enter old password...`);
    passwordRecoveryForm.appendChild(passwordRecoveryOldPasswordInput);

    const oldPasswordConfirmLabel = document.createElement('label'); // The confirmed old password.
    oldPasswordConfirmLabel.textContent = `Confirm Old Password:`;
    passwordRecoveryForm.appendChild(oldPasswordConfirmLabel);

    const passwordRecoveryOldPasswordConfirmInput = document.createElement('input');
    passwordRecoveryOldPasswordConfirmInput.id = 'password-recovery-confirm-old-password';
    passwordRecoveryOldPasswordConfirmInput.setAttribute('type', 'password');
    passwordRecoveryOldPasswordConfirmInput.setAttribute(`placeholder`, `Confirm old password...`);
    passwordRecoveryForm.appendChild(passwordRecoveryOldPasswordConfirmInput);

    // Create submit button
    const passwordSubmitButton = document.createElement('button');
    passwordSubmitButton.type = 'submit';
    passwordSubmitButton.textContent = 'Submit';
    passwordRecoveryForm.appendChild(passwordSubmitButton);
    passwordRecoveryForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Handle form submission logic
        console.log(`DEBUG: Attempting to change password..`);
    });

    // Create email recovery form
    const emailRecoveryForm = document.createElement('form');
    emailRecoveryForm.id = 'recovery-container-email';
    emailRecoveryForm.style.flexDirection = 'column';
    emailRecoveryForm.style.justifyContent = 'center';
    emailRecoveryForm.style.alignItems = 'center';
    emailRecoveryForm.style.backgroundColor = 'white';
    emailRecoveryForm.style.width = '350px';
    emailRecoveryForm.style.padding = '10px';
    emailRecoveryForm.style.display = 'none';
    contentContainer.appendChild(emailRecoveryForm);

    const newEmailLabel = document.createElement('label'); // The new email.
    newEmailLabel.textContent = `New Email:`;
    emailRecoveryForm.appendChild(newEmailLabel);

    const newEmailInput = document.createElement('input');
    newEmailInput.id = 'new-email-input';
    newEmailInput.setAttribute('type', 'email');
    newEmailInput.setAttribute('placeholder', 'Enter your new email...')
    emailRecoveryForm.appendChild(newEmailInput);

    const newEmailPasswordLabel = document.createElement('label'); // The new email.
    newEmailPasswordLabel.textContent = `Confirm your password:`;
    emailRecoveryForm.appendChild(newEmailPasswordLabel);

    const newEmailPasswordInput = document.createElement('input');
    newEmailPasswordInput.id = 'new-email-password-input';
    newEmailPasswordInput.setAttribute('type', 'password');
    newEmailPasswordInput.setAttribute('placeholder', 'Enter your current password...')
    emailRecoveryForm.appendChild(newEmailPasswordInput);

    // Create submit button
    const emailSubmitButton = document.createElement('button');
    emailSubmitButton.type = 'submit';
    emailSubmitButton.textContent = 'Submit';
    emailRecoveryForm.appendChild(emailSubmitButton);
    emailRecoveryForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Handle form submission logic
        console.log(`DEBUG: Attempting to change email..`);
    });


    // Create link paragraph
    const linkParagraph = document.createElement('div');
    linkParagraph.classList.add('-link');
    linkParagraph.textContent = 'Not signed up yet? ';
    linkParagraph.style.marginTop = '10px';
    contentContainer.appendChild(linkParagraph);

    // Create signup button
    const signUpLink = document.createElement('button');
    signUpLink.setAttribute('id', 'registerLink');
    signUpLink.textContent = 'Sign up now';
    signUpLink.style.backgroundColor = 'transparent';
    signUpLink.style.border = 'none';
    linkParagraph.appendChild(signUpLink);

    // Create error message div
    const errorMessage = document.createElement('div');
    errorMessage.id = 'error-message';
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '16px';
    recoveryTypeForm.appendChild(errorMessage);


    // Add event listener to the sign up link
    signUpLink.addEventListener('click', function () {
        lastButtonId = 'registerLink';
        console.log(lastButtonId)
        UpdateContent('registerLink');
    });
}
function LoadRegistrationLogic() { // The function that calls for the initialization of our registration logic. We call it again here so that we can better control timing between the creation of the form and the initialization of the logic ensuring that all necessary elements are created before they are requested.
    InitializeRegistrationLogic();
}
function LoadLoginLogic() {
    InitializeLoginLogic();
}
document.addEventListener('DOMContentLoaded', function () { // Listen for the page to load.
    const container = document.getElementById('nav-organizer'); // Grab the navigational organizer (a transparent div element that contains our navigational buttons.)
    let buttons = container.querySelectorAll('button'); // Grab all buttons within that container.
    buttons.forEach(function (button) { // For every button within the buttons array, run a function.
        button.addEventListener('click', function () { // Add an event listener to the button that listens for a click event and runs a function.            
            UpdateContent(button.id); // Run the UpdateContent function with a paremeter of the id of the button that the user clicked.
            ToggleContainer(button.id); // Run the ToggleContainer function with a paremter of the id of the button that the user clicked.
        });
    });
});
document.addEventListener('toggleContainerResult', function (event) { // Listen for the toggleContainerResult event
    const result = event.detail;

    if (result) {
        const lastButtonClickedId = buttons[buttons.length - 1].id;

        console.log('DEBUG: ToggleContainer resolved as true. Proceeding with content update.');
        // Call UpdateContent with the appropriate buttonId
        UpdateContent(lastButtonClickedId); // Example: assuming buttons[0] is the button clicked
    } else {
        console.log('DEBUG: ToggleContainer resolved as false. Not proceeding with content update.');
    }
});
