// Select form elements and error message containers
const form = document.getElementById('registrationForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const dobInput = document.getElementById('dob');
const ageMessage = document.getElementById('ageMessage');
const submitButton = document.getElementById('submitButton');

// Regular expressions for validation
const nameRegex = /^[a-zA-Z\s]{3,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// Event listener for form submission
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Validate each field
    let isValid = true;

    if (!nameRegex.test(fullNameInput.value)) {
        showError(fullNameInput, 'Full Name is invalid.');
        isValid = false;
    } else {
        clearError(fullNameInput);
    }

    if (!emailRegex.test(emailInput.value)) {
        showError(emailInput, 'Email Address is invalid.');
        isValid = false;
    } else {
        clearError(emailInput);
    }

    if (!passwordRegex.test(passwordInput.value)) {
        showError(passwordInput, 'Password is invalid.');
        isValid = false;
    } else {
        clearError(passwordInput);
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
        showError(confirmPasswordInput, 'Passwords do not match.');
        isValid = false;
    } else {
        clearError(confirmPasswordInput);
    }

    if (!dateRegex.test(dobInput.value)) {
        showError(dobInput, 'Date of Birth is invalid.');
        isValid = false;
    } else {
        clearError(dobInput);
        // Calculate age and check if the user is 18 or older
        const dob = new Date(dobInput.value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
            age--;
        }
        if (age < 18) {
            ageMessage.textContent = 'You must be at least 18 years old.';
            isValid = false;
        } else {
            ageMessage.textContent = '';
        }
    }

    // Enable or disable the submit button based on validation
    submitButton= !isValid;

    // If the form is valid, you can proceed with form submission
    if (isValid) {
        form.submit();
    }
});

// Event listeners for real-time validation
fullNameInput.addEventListener('input', function () {
    if (nameRegex.test(fullNameInput.value)) {
        clearError(fullNameInput);
        showSuccess(fullNameInput);
    } else {
        showError(fullNameInput, 'Full Name is invalid.');
    }
    updateSubmitButtonState();
});

emailInput.addEventListener('input', function () {
    if (emailRegex.test(emailInput.value)) {
        clearError(emailInput);
        showSuccess(emailInput);
    } else {
        showError(emailInput, 'Email Address is invalid.');
    }
    updateSubmitButtonState();
});

passwordInput.addEventListener('input', function () {
    if (passwordRegex.test(passwordInput.value)) {
        clearError(passwordInput);
        showSuccess(passwordInput);
    } else {
        showError(passwordInput, 'Password is invalid.');
    }
    updateSubmitButtonState();
});

confirmPasswordInput.addEventListener('input', function () {
    if (passwordInput.value === confirmPasswordInput.value) {
        clearError(confirmPasswordInput);
        showSuccess(confirmPasswordInput);
    } else {
        showError(confirmPasswordInput, 'Passwords do not match.');
    }
    updateSubmitButtonState();
});

dobInput.addEventListener('input', function () {
    if (dateRegex.test(dobInput.value)) {
        clearError(dobInput);
        // Calculate age and check if the user is 18 or older
        const dob = new Date(dobInput.value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
            age--;
        }
        if (age < 18) {
            ageMessage.textContent = 'You must be at least 18 years old.';
        } else {
            ageMessage.textContent = '';
            showSuccess(dobInput);
        }
    } else {
        showError(dobInput, 'Date of Birth is invalid.');
    }
    updateSubmitButtonState();
});

// Helper function to display error messages
function showError(input, message) {
    const errorContainer = input.nextElementSibling;
    errorContainer.textContent = message;
    errorContainer.classList.remove('success');
    errorContainer.classList.add('error');
}

// Helper function to display success checkmark
function showSuccess(input) {
    const successContainer = input.nextElementSibling;
    successContainer.textContent = '✓';
    successContainer.classList.remove('error');
    successContainer.classList.add('success');
}

// Helper function to clear error messages
function clearError(input) {
    const errorContainer = input.nextElementSibling;
    errorContainer.textContent = '';
    errorContainer.classList.remove('error', 'success');
}

// Helper function to update submit button state
function updateSubmitButtonState() {
    submitButton.disabled = form.querySelectorAll('.error').length > 0 || ageMessage.textContent !== '';
}