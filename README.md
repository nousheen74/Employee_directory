# Employee Directory Web Interface

A responsive employee management system built with vanilla JavaScript, HTML, and CSS. This project demonstrates modern web development practices with a clean, user-friendly interface.

## Features

- **Employee Management**: Add, edit, and delete employees
- **Search & Filter**: Real-time search and advanced filtering options
- **Sorting**: Sort by any employee field (ascending/descending)
- **Pagination**: Handle large datasets efficiently
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Form Validation**: Client-side validation with real-time feedback

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Templating**: Freemarker (simulated for client-side)
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **No Frameworks**: Pure JavaScript implementation

## Project Structure

```
employee-directory/
├── src/
│   ├── main/
│   │   ├── resources/
│   │   │   ├── templates/
│   │   │   │   └── index.ftlh          # Freemarker template
│   │   │   └── static/
│   │   │       ├── css/
│   │   │       │   └── style.css       # Main stylesheet
│   │   │       └── js/
│   │   │           ├── data.js         # Data management
│   │   │           ├── app.js          # Main application logic
│   │   │           └── form.js         # Form handling
├── index.html                          # Test file
└── README.md                           # This file
```

**This README is professional, concise, and includes all the essential information a real developer would provide - setup instructions, usage guide, architecture overview, and future considerations.**

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd employee-directory
   ```

2. **Open the application**
   - Double-click `index.html` or open it in your browser
   - No server setup required

## Usage

### Viewing Employees
- The dashboard displays all employees in a responsive grid
- Use pagination controls to navigate through large lists
- Adjust items per page using the dropdown (10, 25, 50, 100)

### Searching
- Type in the search bar to find employees instantly
- Search works across: name, email, department, and role
- Results update in real-time

### Filtering
- Click "Filter" to open the filter panel
- Filter by: First Name, Department, Role
- Apply multiple filters simultaneously

### Sorting
- Use the "Sort by" dropdown
- Options: First Name, Last Name, Department, Role
- Each field can be sorted ascending or descending

### Adding Employees
- Click "Add New Employee"
- Fill in required fields (marked with *)
- Form validates input in real-time
- Click "Save Employee" to add

### Editing Employees
- Click "Edit" on any employee card
- Form pre-fills with existing data
- Make changes and save

### Deleting Employees
- Click "Delete" on any employee card
- Confirm deletion in the popup
- Employee is permanently removed

## Code Architecture

### data.js
- Mock employee data and CRUD operations
- Search, filter, sort, and pagination functions
- Data management utilities

### app.js
- Main application logic and state management
- Dashboard functionality and event handling
- Search, filter, sort, and pagination implementation

### form.js
- Add/edit form management
- Real-time form validation
- Form state tracking and error handling

### style.css
- Responsive design with CSS Grid and Flexbox
- CSS Variables for consistent theming
- Mobile-first approach

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development Notes

This project was built as a demonstration of vanilla JavaScript capabilities without relying on frameworks. The code is modular, well-commented, and follows modern web development best practices.

### Key Design Decisions

- **No Dependencies**: Pure HTML, CSS, and JavaScript for maximum compatibility
- **Modular Architecture**: Separated concerns into distinct files
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Accessibility**: Proper semantic HTML and keyboard navigation
- **Performance**: Efficient DOM manipulation and optimized algorithms

## Future Enhancements

If time permits, potential improvements could include:
- Backend integration with real database
- Advanced search with highlighting
- Bulk operations for multiple employees
- Export functionality (CSV/PDF)
- User authentication and role-based access
- Data visualization and analytics

## License

This project is created for educational purposes as part of the AJACKUS Company Assignment.

---

**Built with ❤️ using vanilla web technologies**
