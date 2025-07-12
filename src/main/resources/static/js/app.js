// Employee Directory - Main Application Logic
// Handles dashboard functionality, search, filter, sort, pagination

// Application state
let currentEmployees = [];
let currentPage = 1;
let itemsPerPage = 10;
let currentSortBy = '';
let currentSortOrder = 'asc';
let currentFilters = {};
let currentSearchText = '';

// DOM elements
const elements = {
    employeeList: document.getElementById('employee-list'),
    dashboard: document.getElementById('dashboard'),
    searchInput: document.getElementById('search-input'),
    searchBtn: document.getElementById('search-btn'),
    filterBtn: document.getElementById('filter-btn'),
    filterPanel: document.getElementById('filter-panel'),
    applyFilterBtn: document.getElementById('apply-filter-btn'),
    clearFilterBtn: document.getElementById('clear-filter-btn'),
    sortSelect: document.getElementById('sort-select'),
    filterFirstName: document.getElementById('filter-firstName'),
    filterDepartment: document.getElementById('filter-department'),
    filterRole: document.getElementById('filter-role'),
    paginationInfo: document.getElementById('pagination-info'),
    itemsPerPageSelect: document.getElementById('items-per-page'),
    prevPageBtn: document.getElementById('prev-page-btn'),
    nextPageBtn: document.getElementById('next-page-btn'),
    pageNumbers: document.getElementById('page-numbers'),
    addEmployeeBtn: document.getElementById('add-employee-btn'),
    formOverlay: document.getElementById('form-overlay'),
    closeFormBtn: document.getElementById('close-form-btn')
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadInitialData();
});

function initializeApp() {
    itemsPerPage = parseInt(elements.itemsPerPageSelect.value);
    elements.filterPanel.classList.add('hidden');
    elements.formOverlay.classList.add('hidden');
}

function setupEventListeners() {
    // Search
    elements.searchInput.addEventListener('input', handleSearch);
    elements.searchBtn.addEventListener('click', handleSearch);
    
    // Filter
    elements.filterBtn.addEventListener('click', toggleFilterPanel);
    elements.applyFilterBtn.addEventListener('click', applyFilters);
    elements.clearFilterBtn.addEventListener('click', clearFilters);
    
    // Sort
    elements.sortSelect.addEventListener('change', handleSort);
    
    // Pagination
    elements.itemsPerPageSelect.addEventListener('change', handleItemsPerPageChange);
    elements.prevPageBtn.addEventListener('click', goToPreviousPage);
    elements.nextPageBtn.addEventListener('click', goToNextPage);
    
    // Form
    elements.addEmployeeBtn.addEventListener('click', showAddForm);
    elements.closeFormBtn.addEventListener('click', hideForm);
    
    // Close form when clicking outside
    elements.formOverlay.addEventListener('click', function(e) {
        if (e.target === elements.formOverlay) {
            hideForm();
        }
    });
}

function loadInitialData() {
    currentEmployees = EmployeeData.getAllEmployees();
    displayEmployees();
}

// Display employees
function displayEmployees() {
    let filteredEmployees = applySearchAndFilters(currentEmployees);
    const paginationResult = EmployeeData.getPaginatedEmployees(
        filteredEmployees, 
        currentPage, 
        itemsPerPage
    );
    
    updatePaginationInfo(paginationResult);
    updatePaginationControls(paginationResult);
    renderEmployeeCards(paginationResult.employees);
}

function applySearchAndFilters(employees) {
    let result = [...employees];
    
    if (currentSearchText.trim()) {
        result = EmployeeData.searchEmployees(currentSearchText);
    }
    
    if (Object.keys(currentFilters).length > 0) {
        result = EmployeeData.filterEmployees(currentFilters);
    }
    
    if (currentSortBy) {
        result = EmployeeData.sortEmployees(result, currentSortBy, currentSortOrder);
    }
    
    return result;
}

function renderEmployeeCards(employees) {
    elements.employeeList.innerHTML = '';
    
    if (employees.length === 0) {
        elements.employeeList.innerHTML = `
            <div class="no-employees">
                <p>No employees found matching your criteria.</p>
                <button class="btn btn-primary" onclick="clearAllFilters()">Clear All Filters</button>
            </div>
        `;
        return;
    }
    
    employees.forEach(employee => {
        const employeeCard = createEmployeeCard(employee);
        elements.employeeList.appendChild(employeeCard);
    });
    
    setupEmployeeCardEventListeners();
}

function createEmployeeCard(employee) {
    const card = document.createElement('div');
    card.className = 'employee-card';
    card.setAttribute('data-employee-id', employee.id);
    
    card.innerHTML = `
        <div class="employee-info">
            <h3 class="employee-name">${employee.firstName} ${employee.lastName}</h3>
            <p class="employee-id">ID: ${employee.id}</p>
            <p class="employee-email">${employee.email}</p>
            <p class="employee-department">Department: ${employee.department}</p>
            <p class="employee-role">Role: ${employee.role}</p>
        </div>
        <div class="employee-actions">
            <button class="btn btn-edit edit-btn" data-id="${employee.id}">Edit</button>
            <button class="btn btn-delete delete-btn" data-id="${employee.id}">Delete</button>
        </div>
    `;
    
    return card;
}

function setupEmployeeCardEventListeners() {
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const employeeId = parseInt(this.getAttribute('data-id'));
            handleEditEmployee(employeeId);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const employeeId = parseInt(this.getAttribute('data-id'));
            handleDeleteEmployee(employeeId);
        });
    });
}

// Search functionality
function handleSearch() {
    const searchText = elements.searchInput.value.trim();
    currentSearchText = searchText;
    currentPage = 1;
    displayEmployees();
}

// Filter functionality
function toggleFilterPanel() {
    elements.filterPanel.classList.toggle('hidden');
}

function applyFilters() {
    const filters = {
        firstName: elements.filterFirstName.value.trim(),
        department: elements.filterDepartment.value,
        role: elements.filterRole.value
    };
    
    Object.keys(filters).forEach(key => {
        if (!filters[key]) {
            delete filters[key];
        }
    });
    
    currentFilters = filters;
    currentPage = 1;
    elements.filterPanel.classList.add('hidden');
    displayEmployees();
}

function clearFilters() {
    elements.filterFirstName.value = '';
    elements.filterDepartment.value = '';
    elements.filterRole.value = '';
    currentFilters = {};
    currentPage = 1;
    displayEmployees();
}

function clearAllFilters() {
    elements.searchInput.value = '';
    currentSearchText = '';
    clearFilters();
}

// Sort functionality
function handleSort() {
    const sortValue = elements.sortSelect.value;
    
    if (sortValue) {
        const [sortBy, sortOrder] = sortValue.split('-');
        currentSortBy = sortBy;
        currentSortOrder = sortOrder || 'asc';
    } else {
        currentSortBy = '';
        currentSortOrder = 'asc';
    }
    
    displayEmployees();
}

// Pagination functionality
function updatePaginationInfo(paginationResult) {
    const { startIndex, endIndex, totalEmployees } = paginationResult;
    elements.paginationInfo.textContent = 
        `Showing ${startIndex}-${endIndex} of ${totalEmployees} employees`;
}

function updatePaginationControls(paginationResult) {
    const { currentPage, totalPages } = paginationResult;
    elements.prevPageBtn.disabled = currentPage <= 1;
    elements.nextPageBtn.disabled = currentPage >= totalPages;
    renderPageNumbers(currentPage, totalPages);
}

function renderPageNumbers(currentPage, totalPages) {
    elements.pageNumbers.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `btn btn-page ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => goToPage(i));
        elements.pageNumbers.appendChild(pageBtn);
    }
}

function handleItemsPerPageChange() {
    itemsPerPage = parseInt(elements.itemsPerPageSelect.value);
    currentPage = 1;
    displayEmployees();
}

function goToPage(page) {
    currentPage = page;
    displayEmployees();
}

function goToPreviousPage() {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
}

function goToNextPage() {
    const filteredEmployees = applySearchAndFilters(currentEmployees);
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    
    if (currentPage < totalPages) {
        goToPage(currentPage + 1);
    }
}

// Employee operations
function handleEditEmployee(employeeId) {
    const employee = EmployeeData.getEmployeeById(employeeId);
    
    if (!employee) {
        alert('Employee not found!');
        return;
    }
    
    if (window.EmployeeForm) {
        window.EmployeeForm.showEditForm(employee);
    }
}

function handleDeleteEmployee(employeeId) {
    const employee = EmployeeData.getEmployeeById(employeeId);
    
    if (!employee) {
        alert('Employee not found!');
        return;
    }
    
    const confirmDelete = confirm(
        `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?\n\nThis action cannot be undone.`
    );
    
    if (confirmDelete) {
        const success = EmployeeData.deleteEmployee(employeeId);
        
        if (success) {
            currentEmployees = EmployeeData.getAllEmployees();
            displayEmployees();
            showNotification('Employee deleted successfully!', 'success');
        } else {
            showNotification('Failed to delete employee!', 'error');
        }
    }
}

// Form handling
function showAddForm() {
    if (window.EmployeeForm) {
        window.EmployeeForm.showAddForm();
    }
}

function hideForm() {
    elements.formOverlay.classList.add('hidden');
}

function refreshEmployeeDisplay() {
    currentEmployees = EmployeeData.getAllEmployees();
    currentPage = 1;
    displayEmployees();
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Make functions available globally
window.EmployeeApp = {
    refreshEmployeeDisplay,
    showNotification,
    hideForm
};
