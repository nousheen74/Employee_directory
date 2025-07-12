// Employee Directory - Form Handling Logic
// Handles add/edit forms, validation, and form submission

// Form state
let currentEditEmployeeId = null;
let isFormDirty = false;

// DOM elements
const formElements = {
    formOverlay: document.getElementById('form-overlay'),
    formContainer: document.querySelector('.form-container'),
    formTitle: document.getElementById('form-title'),
    employeeForm: document.getElementById('employee-form'),
    firstName: document.getElementById('firstName'),
    lastName: document.getElementById('lastName'),
    email: document.getElementById('email'),
    department: document.getElementById('department'),
    role: document.getElementById('role'),
    submitBtn: document.querySelector('#employee-form button[type="submit"]'),
    cancelBtn: document.getElementById('cancel-btn'),
    closeFormBtn: document.getElementById('close-form-btn'),
    firstNameError: document.getElementById('firstName-error'),
    lastNameError: document.getElementById('lastName-error'),
    emailError: document.getElementById('email-error'),
    departmentError: document.getElementById('department-error'),
    roleError: document.getElementById('role-error')
};

// Initialize form functionality
document.addEventListener('DOMContentLoaded', function() {
    setupFormEventListeners();
    initializeFormValidation();
});

function setupFormEventListeners() {
    formElements.employeeForm.addEventListener('submit', handleFormSubmit);
    formElements.cancelBtn.addEventListener('click', handleCancel);
    formElements.closeFormBtn.addEventListener('click', handleCancel);
    
    const formInputs = [
        formElements.firstName,
        formElements.lastName,
        formElements.email,
        formElements.department,
        formElements.role
    ];
    
    formInputs.forEach(input => {
        input.addEventListener('input', markFormAsDirty);
        input.addEventListener('blur', validateField);
    });
    
    formElements.formOverlay.addEventListener('click', function(e) {
        if (e.target === formElements.formOverlay) {
            handleCancel();
        }
    });
    
    formElements.formContainer.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

function initializeFormValidation() {
    clearAllErrors();
    resetFormState();
}

// Form display functions
function showAddForm() {
    resetFormState();
    formElements.formTitle.textContent = 'Add New Employee';
    clearForm();
    formElements.formOverlay.classList.remove('hidden');
    
    setTimeout(() => {
        formElements.firstName.focus();
    }, 100);
}

function showEditForm(employee) {
    currentEditEmployeeId = employee.id;
    formElements.formTitle.textContent = 'Edit Employee';
    populateForm(employee);
    formElements.formOverlay.classList.remove('hidden');
    
    setTimeout(() => {
        formElements.firstName.focus();
    }, 100);
}

function hideForm() {
    formElements.formOverlay.classList.add('hidden');
    resetFormState();
    clearForm();
}

function populateForm(employee) {
    formElements.firstName.value = employee.firstName || '';
    formElements.lastName.value = employee.lastName || '';
    formElements.email.value = employee.email || '';
    formElements.department.value = employee.department || '';
    formElements.role.value = employee.role || '';
    clearAllErrors();
    isFormDirty = false;
}

function clearForm() {
    formElements.firstName.value = '';
    formElements.lastName.value = '';
    formElements.email.value = '';
    formElements.department.value = '';
    formElements.role.value = '';
    clearAllErrors();
    isFormDirty = false;
}

function resetFormState() {
    currentEditEmployeeId = null;
    isFormDirty = false;
}

// Form validation
function validateField(event) {
    const field = event.target;
    const fieldName = field.name;
    const value = field.value.trim();
    
    clearFieldError(fieldName);
    
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'firstName':
            isValid = validateRequired(value, 'First Name');
            if (isValid) {
                isValid = validateName(value, 'First Name');
            }
            break;
        case 'lastName':
            isValid = validateRequired(value, 'Last Name');
            if (isValid) {
                isValid = validateName(value, 'Last Name');
            }
            break;
        case 'email':
            isValid = validateRequired(value, 'Email');
            if (isValid) {
                isValid = validateEmail(value);
            }
            break;
        case 'department':
            isValid = validateRequired(value, 'Department');
            break;
        case 'role':
            isValid = validateRequired(value, 'Role');
            break;
    }
    
    if (!isValid) {
        showFieldError(fieldName, errorMessage);
        field.classList.add('error');
    } else {
        field.classList.remove('error');
    }
    
    return isValid;
}

function validateForm() {
    clearAllErrors();
    
    const fields = [
        { name: 'firstName', element: formElements.firstName },
        { name: 'lastName', element: formElements.lastName },
        { name: 'email', element: formElements.email },
        { name: 'department', element: formElements.department },
        { name: 'role', element: formElements.role }
    ];
    
    let isValid = true;
    
    fields.forEach(field => {
        const fakeEvent = { target: field.element };
        const fieldValid = validateField(fakeEvent);
        if (!fieldValid) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateRequired(value, fieldName) {
    if (!value || value.trim() === '') {
        showFieldError(fieldName.toLowerCase().replace(' ', ''), `${fieldName} is required`);
        return false;
    }
    return true;
}

function validateName(value, fieldName) {
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    if (!nameRegex.test(value)) {
        showFieldError(fieldName.toLowerCase().replace(' ', ''), `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`);
        return false;
    }
    return true;
}

function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        showFieldError('email', 'Please enter a valid email address');
        return false;
    }
    return true;
}

function showFieldError(fieldName, message) {
    const errorElement = formElements[`${fieldName}Error`];
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearFieldError(fieldName) {
    const errorElement = formElements[`${fieldName}Error`];
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

function clearAllErrors() {
    const errorElements = [
        formElements.firstNameError,
        formElements.lastNameError,
        formElements.emailError,
        formElements.departmentError,
        formElements.roleError
    ];
    
    errorElements.forEach(element => {
        if (element) {
            element.textContent = '';
            element.style.display = 'none';
        }
    });
    
    const inputs = [
        formElements.firstName,
        formElements.lastName,
        formElements.email,
        formElements.department,
        formElements.role
    ];
    
    inputs.forEach(input => {
        if (input) {
            input.classList.remove('error');
        }
    });
}

// Form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    const formData = getFormData();
    submitFormData(formData);
}

function getFormData() {
    return {
        firstName: formElements.firstName.value.trim(),
        lastName: formElements.lastName.value.trim(),
        email: formElements.email.value.trim(),
        department: formElements.department.value,
        role: formElements.role.value
    };
}

function submitFormData(formData) {
    try {
        let result;
        
        if (currentEditEmployeeId) {
            result = EmployeeData.updateEmployee(currentEditEmployeeId, formData);
            
            if (result) {
                showSuccessMessage('Employee updated successfully!');
            } else {
                showErrorMessage('Failed to update employee. Please try again.');
                return;
            }
        } else {
            result = EmployeeData.addEmployee(formData);
            
            if (result) {
                showSuccessMessage('Employee added successfully!');
            } else {
                showErrorMessage('Failed to add employee. Please try again.');
                return;
            }
        }
        
        hideForm();
        
        if (window.EmployeeApp && window.EmployeeApp.refreshEmployeeDisplay) {
            window.EmployeeApp.refreshEmployeeDisplay();
        }
        
    } catch (error) {
        showErrorMessage('An error occurred. Please try again.');
    }
}

// Form cancellation
function handleCancel() {
    if (isFormDirty) {
        const confirmCancel = confirm(
            'You have unsaved changes. Are you sure you want to cancel?\n\nYour changes will be lost.'
        );
        
        if (!confirmCancel) {
            return;
        }
    }
    
    hideForm();
}

function markFormAsDirty() {
    isFormDirty = true;
}

// Message display
function showSuccessMessage(message) {
    if (window.EmployeeApp && window.EmployeeApp.showNotification) {
        window.EmployeeApp.showNotification(message, 'success');
    } else {
        alert(message);
    }
}

function showErrorMessage(message) {
    if (window.EmployeeApp && window.EmployeeApp.showNotification) {
        window.EmployeeApp.showNotification(message, 'error');
    } else {
        alert(message);
    }
}

// Make functions available globally
window.EmployeeForm = {
    showAddForm,
    showEditForm,
    hideForm,
    validateForm,
    clearForm
};
