<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Directory - AJACKUS Assignment</title>
    
    <!-- Link to our CSS file for styling -->
    <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
    <!-- Main container for the entire application -->
    <div id="app">
        
        <!-- Header section with title and navigation -->
        <header class="header">
            <h1 class="header-title">Employee Directory</h1>
            <button id="add-employee-btn" class="btn btn-primary">Add New Employee</button>
        </header>

        <!-- Dashboard section - this is where employees are displayed -->
        <main class="dashboard" id="dashboard">
            
            <!-- Search and filter controls -->
            <div class="controls-section">
                
                <!-- Search bar -->
                <div class="search-container">
                    <input type="text" id="search-input" placeholder="Search employees..." class="search-input">
                    <button id="search-btn" class="btn btn-secondary">Search</button>
                </div>

                <!-- Filter and sort controls -->
                <div class="filter-sort-container">
                    <button id="filter-btn" class="btn btn-outline">Filter</button>
                    <select id="sort-select" class="select-input">
                        <option value="">Sort by...</option>
                        <option value="firstName">First Name</option>
                        <option value="lastName">Last Name</option>
                        <option value="department">Department</option>
                        <option value="role">Role</option>
                    </select>
                </div>
            </div>

            <!-- Filter panel (hidden by default) -->
            <div id="filter-panel" class="filter-panel hidden">
                <h3>Filter Employees</h3>
                <div class="filter-form">
                    <div class="filter-group">
                        <label for="filter-firstName">First Name:</label>
                        <input type="text" id="filter-firstName" class="filter-input">
                    </div>
                    <div class="filter-group">
                        <label for="filter-department">Department:</label>
                        <select id="filter-department" class="filter-input">
                            <option value="">All Departments</option>
                            <option value="IT">IT</option>
                            <option value="HR">HR</option>
                            <option value="Sales">Sales</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Finance">Finance</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="filter-role">Role:</label>
                        <select id="filter-role" class="filter-input">
                            <option value="">All Roles</option>
                            <option value="Manager">Manager</option>
                            <option value="Developer">Developer</option>
                            <option value="Analyst">Analyst</option>
                            <option value="Coordinator">Coordinator</option>
                            <option value="Specialist">Specialist</option>
                        </select>
                    </div>
                    <div class="filter-actions">
                        <button id="apply-filter-btn" class="btn btn-primary">Apply Filter</button>
                        <button id="clear-filter-btn" class="btn btn-outline">Clear</button>
                    </div>
                </div>
            </div>

            <!-- Employee list container -->
            <div class="employee-list-container">
                <!-- This is where Freemarker will render the employee list -->
                <div id="employee-list" class="employee-list">
                    <!-- Freemarker template code for rendering employees -->
                    <#if employees?? && employees?size gt 0>
                        <#list employees as employee>
                            <div class="employee-card" data-employee-id="${employee.id}">
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
                            </div>
                        </#list>
                    <#else>
                        <!-- Show message when no employees exist -->
                        <div class="no-employees">
                            <p>No employees found. Add your first employee to get started!</p>
                        </div>
                    </#if>
                </div>
            </div>

            <!-- Pagination controls -->
            <div class="pagination-container">
                <div class="pagination-info">
                    <span id="pagination-info">Showing 1-10 of 0 employees</span>
                    <select id="items-per-page" class="select-input">
                        <option value="10">10 per page</option>
                        <option value="25">25 per page</option>
                        <option value="50">50 per page</option>
                        <option value="100">100 per page</option>
                    </select>
                </div>
                <div class="pagination-controls">
                    <button id="prev-page-btn" class="btn btn-outline" disabled>Previous</button>
                    <div id="page-numbers" class="page-numbers"></div>
                    <button id="next-page-btn" class="btn btn-outline" disabled>Next</button>
                </div>
            </div>
        </main>

        <!-- Add/Edit Form (hidden by default) -->
        <div id="form-overlay" class="form-overlay hidden">
            <div class="form-container">
                <div class="form-header">
                    <h2 id="form-title">Add New Employee</h2>
                    <button id="close-form-btn" class="close-btn">&times;</button>
                </div>
                
                <form id="employee-form" class="employee-form">
                    <div class="form-group">
                        <label for="firstName">First Name *</label>
                        <input type="text" id="firstName" name="firstName" required class="form-input">
                        <span class="error-message" id="firstName-error"></span>
                    </div>
                    
                    <div class="form-group">
                        <label for="lastName">Last Name *</label>
                        <input type="text" id="lastName" name="lastName" required class="form-input">
                        <span class="error-message" id="lastName-error"></span>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" required class="form-input">
                        <span class="error-message" id="email-error"></span>
                    </div>
                    
                    <div class="form-group">
                        <label for="department">Department *</label>
                        <select id="department" name="department" required class="form-input">
                            <option value="">Select Department</option>
                            <option value="IT">IT</option>
                            <option value="HR">HR</option>
                            <option value="Sales">Sales</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Finance">Finance</option>
                        </select>
                        <span class="error-message" id="department-error"></span>
                    </div>
                    
                    <div class="form-group">
                        <label for="role">Role *</label>
                        <select id="role" name="role" required class="form-input">
                            <option value="">Select Role</option>
                            <option value="Manager">Manager</option>
                            <option value="Developer">Developer</option>
                            <option value="Analyst">Analyst</option>
                            <option value="Coordinator">Coordinator</option>
                            <option value="Specialist">Specialist</option>
                        </select>
                        <span class="error-message" id="role-error"></span>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">Save Employee</button>
                        <button type="button" id="cancel-btn" class="btn btn-outline">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Load JavaScript files -->
    <script src="/static/js/data.js"></script>
    <script src="/static/js/app.js"></script>
    <script src="/static/js/form.js"></script>
</body>
</html>
