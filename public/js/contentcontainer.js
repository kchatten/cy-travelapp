import { isOpen } from './navbar.js';

const contentContainer = document.getElementById('content-container');

let lastButtonId = null;


function UpdateContent(buttonId, result) {
    console.log(`DEBUG: running UpdateContent function with input parameter ${buttonId}`);
    console.log(`DEBUG: ${lastButtonId}`)

    if (result) {
        if (buttonId === "register" || buttonId === "registerLink") {
            console.log('DEBUG: Displaying registration tab.');

            UpdateContainerRegister();

        } else if (buttonId === "login") {
            console.log(`DEBUG: Displaying login tab.`);
            UpdateContainerLogin();

        } else if (buttonId === "accountrecovery") {
            console.log(`DEBUG: Displaying Account Recovery Tab`);

            UpdateContainerRecovery()
        }
    } else {
        WipeContainer();
        if (buttonId === "register" || buttonId === "registerLink") {
            console.log('DEBUG: Displaying registration tab.');

            UpdateContainerRegister();

        } else if (buttonId === "login") {
            console.log(`DEBUG: Displaying login tab.`);
            UpdateContainerLogin();

        } else if (buttonId === "accountrecovery") {
            console.log(`DEBUG: Displaying Account Recovery Tab`);

            UpdateContainerRecovery()
        }
    }
}

function ToggleContainer(buttonId) {
    const container = document.getElementById('nav-organizer');
    const rightPosition = parseInt(container.style.right || '0');

    if (buttonId === lastButtonId) {
        // If the buttonId matches the lastButtonId
        // It means the user is trying to close the container
        if (isOpen) {
            container.style.right = '-984px'; // Close the container
            console.log('DEBUG: Closing container...');
        } else {
            container.style.right = '0'; // Open the container
            console.log('DEBUG: Opening container...');
        }
    } else {
        // If the buttonId does not match the lastButtonId
        // It means the user is trying to navigate within the container
        container.style.right = '0'; // Open the container
        console.log('DEBUG: Opening container...');
    }

    // Update lastButtonId after processing
    lastButtonId = buttonId;
}
function WipeContainer() {

    console.log(`DEBUG: Wiping container...`)
    contentContainer.innerHTML = '';
}

function UpdateContainerRegister() {

    // Grab the content container.
    const container = document.getElementById('nav-organizer');

    // Create container div
    const registrationContainer = document.createElement('div');
    registrationContainer.classList.add('container');

    // Create form element
    const form = document.createElement('form');
    form.id = 'signup-form';
    form.action = '/register';
    form.method = 'POST';
    registrationContainer.appendChild(form);

    // Create titleplate div
    const titleplate = document.createElement('div');
    titleplate.id = 'titleplate';
    titleplate.style.display = 'flex';
    titleplate.style.flexDirection = 'column';
    titleplate.style.alignItems = 'center';
    titleplate.marginBottom = '10px';
    form.appendChild(titleplate);

    // Create image element
    const logo = document.createElement('img');
    logo.src = 'https://i.ibb.co/CzX5Dt7/travelnest-logo.png';
    logo.alt = 'Your Logo';
    logo.classList.add('logo');
    titleplate.appendChild(logo);

    // Create h3 element
    const heading3 = document.createElement('h3');
    heading3.textContent = 'Sign up for an account';
    form.appendChild(heading3);

    // Create h6 element
    const heading6 = document.createElement('h6');
    heading6.textContent = 'Travel near. Travel far.';
    form.appendChild(heading6);

    // Create label and input elements for Full Name
    const labelFullName = document.createElement('label');
    labelFullName.textContent = 'Full Name:';
    form.appendChild(labelFullName);
    const inputFullName = document.createElement('input');
    inputFullName.type = 'text';
    inputFullName.id = 'name';
    inputFullName.name = 'name';
    inputFullName.placeholder = 'Your Name';
    form.appendChild(inputFullName);

    // Create label and input elements for Email
    const labelEmail = document.createElement('label');
    labelEmail.textContent = 'Email:';
    form.appendChild(labelEmail);
    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.id = 'email';
    inputEmail.name = 'email';
    inputEmail.placeholder = 'Your Email';
    form.appendChild(inputEmail);

    // Create label and input elements for Password
    const labelPassword = document.createElement('label');
    labelPassword.textContent = 'Password:';
    form.appendChild(labelPassword);
    const inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.id = 'password';
    inputPassword.name = 'password';
    inputPassword.placeholder = 'Your Pa****rd';
    form.appendChild(inputPassword);

    // Create label and input elements for Location
    const labelLocation = document.createElement('label');
    labelLocation.textContent = 'Location:';
    form.appendChild(labelLocation);
    const inputLocation = document.createElement('input');
    inputLocation.type = 'text';
    inputLocation.id = 'location';
    inputLocation.name = 'location';
    inputLocation.placeholder = 'Where ya from?';
    form.appendChild(inputLocation);

    // Create error message div
    const errorMessage = document.createElement('div');
    errorMessage.id = 'error-message';
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '16px';
    form.appendChild(errorMessage);

    // Create submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    form.appendChild(submitButton);

    // Create login button
    const loginButton = document.createElement('button');
    loginButton.textContent = 'Login Now!';
    loginButton.style.backgroundColor = 'transparent';
    loginButton.style.border = 'none';

    // Add event listener to the login button
    loginButton.addEventListener('click', function () {
        lastButtonId = 'login';
        console.log(lastButtonId)
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

    // Add event listener to the registration form if needed
    const registrationForm = document.getElementById('signup-form');
    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Handle form submission logic
        console.log(`DEBUG: Attempting to register..`);
    });
}

function UpdateContainerLogin() {

    // Grab the content container.
    const container = document.getElementById('nav-organizer');

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
        // Handle form submission logic
        console.log(`DEBUG: Attempting to log in..`);
    });
}

function UpdateContainerRecovery() {

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


    // Add event listener to the sign up link
    signUpLink.addEventListener('click', function () {
        lastButtonId = 'registerLink';
        console.log(lastButtonId)
        UpdateContent('registerLink');
    });
}



document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('nav-organizer');
    let buttons = container.querySelectorAll('button');
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Pass UpdateContent as the callback to ToggleContainer
            UpdateContent(button.id);
            ToggleContainer(button.id);
        });
    });
});

// Listen for the toggleContainerResult event
document.addEventListener('toggleContainerResult', function (event) {
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
