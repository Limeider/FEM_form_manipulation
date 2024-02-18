const yearInput = document.querySelector('.expiration-year');
function renderCurrentYear() {
    const now = new Date();
    const timeframe = 10;
    yearInput.min = now.getFullYear();
    yearInput.max = now.getFullYear() + timeframe;
}

renderCurrentYear();

const errorMessages = document.querySelectorAll('.error-message');
const paymentForm = document.querySelector('.payment-form');
const inputName = document.querySelector('input[name="card-name"]');
const inputNumber = document.querySelector('input[name="card-number"]');
const inputMonth = document.querySelector('input[name="expiration-month"]');
const inputYear = document.querySelector('input[name="expiration-year"]');
const cvcNumber = document.querySelector('input[name="cvc"]');
const completeState = document.querySelector('.complete-state');

paymentForm.addEventListener('submit', function (e) {
    e.preventDefault();
    handleFormValidation();
    displayFormDetails();
})

let isValid;
function handleFormValidation() {
    isValid = true;
    handleNameInput(inputName);
    handleNumberInput(inputNumber);
    handleMonthInput(inputMonth);
    handleYearInput(inputYear);
    handleCVCInput(cvcNumber);

    if (isValid) {
        paymentForm.style.display = "none";
        completeState.style.display = "block";
    }
}

function handleNameInput(element) {
    const value = String(element.value);
    const requiredLength = 25;
    const minLength = undefined;
    const regex = /^(?!\s+$)[a-zA-Z]+(?: [a-zA-Z]+)+$/gm;
    const errorMessageIndex = 0;
    const error = 'Wrong format, full name, alphabets only, no extra spaces';
    validateInput(value.trim(), requiredLength, minLength, regex, error, errorMessageIndex);
}

function handleNumberInput(element) {
    const value = String(element.value);
    const requiredLength = 19;
    const minLength = 19;
    const regex = /^\d{4} \d{4} \d{4} \d{4}$/gm;
    const errorMessageIndex = 1;
    const error = 'Wrong format, only numbers, one space after every 4 numbers';
    validateInput(value.trim(), requiredLength, minLength, regex, error, errorMessageIndex);
}

function handleMonthInput(element) {
    const value = String(element.value);
    const requiredLength = 2;
    const minLength = 1;
    const regex = /^(0[1-9]|1[0-2])$/gm;
    const errorMessageIndex = 2;
    const error = '(1-12)';
    validateInput(value.trim(), requiredLength, minLength, regex, error, errorMessageIndex);
}

function handleYearInput(element) {
    const value = String(element.value);
    const requiredLength = 4;
    const minLength = 4;
    const regex = /^\d{4}$/gm;
    const errorMessageIndex = 3;
    const error = `(${yearInput.min} - ${yearInput.max})`;
    validateInput(value.trim(), requiredLength, minLength, regex, error, errorMessageIndex);
}

function handleCVCInput(element) {
    const value = String(element.value);
    const requiredLength = 3;
    const minLength = 3;
    const regex = /^\d{3}$/gm;
    const errorMessageIndex = 4;
    const error = 'Only 3 numbers, no spaces';
    validateInput(value.trim(), requiredLength, minLength, regex, error, errorMessageIndex);
}

function validateInput(value, requiredLength, minLength, regex, regexError, errorMessageIndex) {
    removeErrorMessage(errorMessageIndex);

    if (value === '') {
        isValid = false;
        renderError('Cannot be blank', errorMessageIndex);
    }
    if (value.length > requiredLength) {
        isValid = false;
        renderError(`Cannot be longer than ${requiredLength}`, errorMessageIndex);
    }
    if (value.length < minLength) {
        isValid = false;
        renderError(`Cannot be less than ${minLength}`, errorMessageIndex);
    }
    if (!regex.test(value)) {
        isValid = false;
        renderError(`${regexError}`, errorMessageIndex);
    }
}

function removeErrorMessage(index) {
    errorMessages[index].textContent = '';
}

function renderError(error, index) {
    errorMessages[index].textContent = error;
}

const inputs = document.querySelectorAll('input:not([type="submit"])');

function displayFormDetails() {
    const displayLocations = document.querySelectorAll('.card-image-container span');
    const values = [];
    inputs.forEach(input => {
        values.push(input.value);
    })
    for (let i = 0; i < inputs.length; i++) {
        displayLocations[i].textContent = values[i];
    }
}

const completeStateButton = document.querySelector('.complete-state > button');
completeStateButton.addEventListener('click', function (e) {
    paymentForm.style.display = "block";
    completeState.style.display = "none";
    inputs.forEach(input => {
        input.value = ''
    })
})
