# ComplaintGuard | Digital Complaint Management System

ComplaintGuard is a modern, responsive, and efficient web-based platform designed to streamline the process of submitting and tracking complaints. Built with a focus on premium aesthetics and user experience, it features a glassmorphism design system and role-based access.

## 🚀 Features

- **Premium UI/UX**: Modern glassmorphism design with smooth transitions and a responsive layout.
- **Role-Based Login**: Dedicated login flows for Users and Administrators.
- **Complaint Submission**: Easy-to-use form with category selection and description.
- **Real-Time Tracking**: Track complaint status using a unique Complaint ID or email.
- **Admin Dashboard**: A powerful interface for administrators to view, filter, and update complaint statuses.
- **Dark/Light Mode**: Seamless theme switching with persistent user preference.
- **Data Persistence**: Uses `localStorage` for frontend-only data management (simulating a database).

## 🛠️ Technology Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System).
- **Icons**: Font Awesome 6.
- **Fonts**: Google Fonts (Inter).
- **Logic**: Vanilla JavaScript (ES6+).
- **Storage**: Browser LocalStorage.

## 📂 Project Structure

```text
Digital_Complaint_System/
├── index.html        # Landing Page
├── login.html        # Login Page (User/Admin)
├── complaint.html    # Complaint Registration Page
├── track.html        # Tracking Page
├── admin.html        # Admin Dashboard
├── css/
│   └── style.css     # Core Design System & Component Styles
├── js/
│   └── script.js    # Core Logic & Auth Handling
└── README.md         # Project Documentation
```

## 🚦 How to Use

1.  **Launch**: Open `index.html` in any modern web browser.
2.  **Register**: Click "File a Complaint" or navigate to the Register page.
3.  **Login**: Use the "Login" button to access your account or the admin dashboard.
    - *Note: Login is simulated; any email will work.*
4.  **Admin Access**: Log in as an "Administrator" to access the dashboard at `admin.html`.
5.  **Tracking**: Use the unique ID generated after submission (e.g., `CG-12345`) to track your complaint on the tracking page.

## 📄 License

This project is open-source and available under the MIT License.
