---

# Job Board

A full-stack employment platform designed to streamline the recruitment process for employers and simplify job applications for candidates. Built with a MERN (MongoDB, Express.js, React.js, Node.js) stack, the Job Board includes features like secure authentication, responsive design, and automated email notifications, offering an efficient and user-friendly job application experience.

## Table of Contents
- [Features](#features)
- [File Structure](#file-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- **Responsive Design:** Accessible across devices for enhanced usability.
- **JWT Authentication:** Secure login and registration for users and employers.
- **Automated Email Notifications:** Sends updates for application submissions and status.
- **Efficient Recruitment Process:** Reduces recruitment time by 50% with an intuitive user experience.

## File Structure

### Backend
The backend is structured to separate core functionalities into modular components.

```plaintext
backend/
├── controllers          # Handles request logic for routes
├── mail
│   └── templates        # Email templates for notifications
├── middleware           # Authentication and other middleware
├── models               # Database schemas and models
├── routes               # API routes for handling requests
├── utils                # Helper functions and utilities
├── app.js               # Main application entry point
├── package.json         # Backend dependencies and scripts
└── package-lock.json
```

### Frontend
The frontend provides a responsive, user-friendly interface built with React.

```plaintext
frontend/
├── public               # Static files
├── src                  # Core React app source code
├── package.json         # Frontend dependencies and scripts
├── package-lock.json
├── vercel.json          # Deployment configuration
└── README.md
```

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/job-board.git
   cd job-board
   ```

2. **Install dependencies:**

   - **Backend:**
     ```bash
     cd backend
     npm install
     ```

   - **Frontend:**
     ```bash
     cd ../frontend
     npm install
     ```

3. **Set up environment variables:**

   - **Backend (.env):**
     - `PORT`: Server port
     - `DB_URI`: MongoDB connection URI
     - `JWT_SECRET`: Secret key for JWT
     - `SMTP_USER` and `SMTP_PASS`: Credentials for sending email

4. **Run the application:**

   - **Backend:**
     ```bash
     cd backend
     npm start
     ```

   - **Frontend:**
     ```bash
     cd ../frontend
     npm start
     ```

## Usage

- **Employer Features:** Post jobs, manage applications, and view applicant profiles.
- **Job Seeker Features:** Search jobs, submit applications, and receive email notifications.
- **Authentication:** Login and register securely with JWT.

## Technologies Used

- **Frontend:** React.js, Redux, Axios
- **Backend:** Node.js, Express.js, MongoDB, JWT
- **Email Service:** Node Mailer, SMTP
