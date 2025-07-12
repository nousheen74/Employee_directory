// Employee data and functions
const mockEmployees = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@ajackus.com",
        department: "IT",
        role: "Senior Developer"
    },
    {
        id: 2,
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.johnson@ajackus.com",
        department: "HR",
        role: "HR Manager"
    },
    {
        id: 3,
        firstName: "Michael",
        lastName: "Chen",
        email: "michael.chen@ajackus.com",
        department: "Sales",
        role: "Sales Representative"
    },
    {
        id: 4,
        firstName: "Emily",
        lastName: "Davis",
        email: "emily.davis@ajackus.com",
        department: "Marketing",
        role: "Marketing Specialist"
    },
    {
        id: 5,
        firstName: "David",
        lastName: "Wilson",
        email: "david.wilson@ajackus.com",
        department: "IT",
        role: "System Administrator"
    },
    {
        id: 6,
        firstName: "Lisa",
        lastName: "Brown",
        email: "lisa.brown@ajackus.com",
        department: "Finance",
        role: "Financial Analyst"
    },
    {
        id: 7,
        firstName: "Robert",
        lastName: "Taylor",
        email: "robert.taylor@ajackus.com",
        department: "Sales",
        role: "Sales Manager"
    },
    {
        id: 8,
        firstName: "Jennifer",
        lastName: "Garcia",
        email: "jennifer.garcia@ajackus.com",
        department: "Marketing",
        role: "Marketing Manager"
    },
    {
        id: 9,
        firstName: "Thomas",
        lastName: "Martinez",
        email: "thomas.martinez@ajackus.com",
        department: "IT",
        role: "Frontend Developer"
    },
    {
        id: 10,
        firstName: "Amanda",
        lastName: "Anderson",
        email: "amanda.anderson@ajackus.com",
        department: "HR",
        role: "HR Coordinator"
    },
    {
        id: 11,
        firstName: "Christopher",
        lastName: "Lee",
        email: "christopher.lee@ajackus.com",
        department: "Finance",
        role: "Accountant"
    },
    {
        id: 12,
        firstName: "Jessica",
        lastName: "White",
        email: "jessica.white@ajackus.com",
        department: "Sales",
        role: "Sales Representative"
    },
    {
        id: 13,
        firstName: "Daniel",
        lastName: "Harris",
        email: "daniel.harris@ajackus.com",
        department: "IT",
        role: "Backend Developer"
    },
    {
        id: 14,
        firstName: "Nicole",
        lastName: "Clark",
        email: "nicole.clark@ajackus.com",
        department: "Marketing",
        role: "Content Creator"
    },
    {
        id: 15,
        firstName: "Kevin",
        lastName: "Lewis",
        email: "kevin.lewis@ajackus.com",
        department: "Finance",
        role: "Financial Controller"
    }
];

// Get all employees
function getAllEmployees() {
    return [...mockEmployees];
}

// Get employee by ID
function getEmployeeById(id) {
    return mockEmployees.find(employee => employee.id === id) || null;
}

// Add new employee
function addEmployee(employeeData) {
    const newId = Math.max(...mockEmployees.map(emp => emp.id)) + 1;
    const newEmployee = {
        id: newId,
        ...employeeData
    };
    mockEmployees.push(newEmployee);
    return newEmployee;
}

// Update employee
function updateEmployee(id, employeeData) {
    const index = mockEmployees.findIndex(employee => employee.id === id);
    if (index === -1) return null;
    
    mockEmployees[index] = {
        ...mockEmployees[index],
        ...employeeData
    };
    return mockEmployees[index];
}

// Delete employee
function deleteEmployee(id) {
    const index = mockEmployees.findIndex(employee => employee.id === id);
    if (index === -1) return false;
    
    mockEmployees.splice(index, 1);
    return true;
}

// Search employees
function searchEmployees(searchText) {
    const lowerSearchText = searchText.toLowerCase();
    return mockEmployees.filter(employee => 
        employee.firstName.toLowerCase().includes(lowerSearchText) ||
        employee.lastName.toLowerCase().includes(lowerSearchText) ||
        employee.email.toLowerCase().includes(lowerSearchText) ||
        employee.department.toLowerCase().includes(lowerSearchText) ||
        employee.role.toLowerCase().includes(lowerSearchText)
    );
}

// Filter employees
function filterEmployees(filters) {
    return mockEmployees.filter(employee => {
        if (filters.firstName && !employee.firstName.toLowerCase().includes(filters.firstName.toLowerCase())) {
            return false;
        }
        if (filters.department && employee.department !== filters.department) {
            return false;
        }
        if (filters.role && employee.role !== filters.role) {
            return false;
        }
        return true;
    });
}

// Sort employees
function sortEmployees(employees, sortBy, sortOrder = 'asc') {
    return [...employees].sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];
        
        if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
        }
        
        if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });
}

// Pagination
function getPaginatedEmployees(employees, page, itemsPerPage) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedEmployees = employees.slice(startIndex, endIndex);
    
    return {
        employees: paginatedEmployees,
        currentPage: page,
        totalPages: Math.ceil(employees.length / itemsPerPage),
        totalEmployees: employees.length,
        startIndex: startIndex + 1,
        endIndex: Math.min(endIndex, employees.length)
    };
}

// Get unique departments
function getUniqueDepartments() {
    return [...new Set(mockEmployees.map(employee => employee.department))];
}

// Get unique roles
function getUniqueRoles() {
    return [...new Set(mockEmployees.map(employee => employee.role))];
}

// Make functions available globally
window.EmployeeData = {
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployees,
    filterEmployees,
    sortEmployees,
    getPaginatedEmployees,
    getUniqueDepartments,
    getUniqueRoles
};
