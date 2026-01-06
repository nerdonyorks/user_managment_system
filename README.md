# user_managment_system
Role-Based Authentication | Admin Dashboard | User Portal

A full-stack User Management System built with Node.js, Express, MongoDB, and EJS, supporting User login/signup, Admin login, Admin dashboard, and User home screen with proper authentication, authorization, and session handling.

✨ Key Features
🔐 Authentication

User Signup & Login

Admin Login (separate flow)

Secure session-based authentication

Password hashing using bcrypt

Protected routes using middleware

👤 User Module

User registration

User login

User home screen

Profile access

Session-based access control

🛠️ Admin Module

Admin login

Admin dashboard

View all users

Create, update, delete users

Search users

Admin-only route protection

🧱 Architecture Overview
MVC + Service Layer Architecture


Models → Database schema (Mongoose)

Controllers → Handle request & response

Services → Business logic

Routes → API endpoints

Middleware → Auth, logging, error handling

Views → Server-side rendered EJS templates

Public → Static assets (CSS & JS)



📁 Project Structure
user-management-system/
├── src/
│   ├── config/              # Database configuration
│   ├── models/              # Mongoose schemas
│   ├── controllers/         # Request handlers
│   ├── services/            # Business logic
│   ├── middleware/          # Auth, logger, error handling
│   ├── routes/              # Express routes
│   ├── utils/               # Validators & helpers
│   └── app.js               # Express app config
│
├── public/                  # Static assets
├── views/                   # EJS templates
│   ├── admin/               # Admin pages
│   └── *.ejs
│
├── server.js                # Entry point
├── .env                     # Environment variables
├── package.json
└── README.md






⚙️ Tech Stack
Backend

Node.js

Express.js

MongoDB + Mongoose

express-session

connect-mongo

bcryptjs

express-validator

cookie-parser

Frontend

EJS (Server-Side Rendering)

HTML5 / CSS3

Vanilla JavaScript

🔑 Environment Variables (.env)
PORT=3000
MONGODB_URI=mongodb://localhost:27017/user_management
SESSION_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development

🚀 Installation & Setup
1️⃣ Clone & Initialize
git clone https://github.com/your-username/user-management-system.git
cd user-management-system
npm install

2️⃣ Start MongoDB

Ensure MongoDB is running locally or update MONGODB_URI.

3️⃣ Run the App
npm run dev


Open:

http://localhost:3000

🔐 Default Admin Credentials

⚠️ Change after first login

Email: admin@admin.com

Password: Admin@123

🛡️ Middleware Usage
Middleware	Purpose
authMiddleware	Protect routes & validate roles
loggerMiddleware	Request logging
errorHandler	Centralized error handling
express-validator	Input validation
📌 API Routes
🔐 Authentication
Method	Route	Description
POST	/auth/signup	User registration
POST	/auth/login	User login
GET	/auth/logout	Logout
👤 User Routes
Method	Route	Description
GET	/user/home	User home screen
GET	/user/profile	User profile
🛠️ Admin Routes
Method	Route	Description
POST	/admin/login	Admin login
GET	/admin/dashboard	Admin dashboard
GET	/admin/users	List users
POST	/admin/users	Create user
PUT	/admin/users/:id	Update user
DELETE	/admin/users/:id	Delete user
GET	/admin/users/search	Search users
🧪 Validation & Error Handling

Server-side input validation using express-validator

Centralized error handler middleware

Graceful handling of auth & DB errors

🔒 Security Practices

Password hashing (bcrypt)

Session stored in MongoDB

HttpOnly cookies

Role-based access checks

Environment-based configs

🖥️ Views (EJS)
Page	Description
login.ejs	User login
signup.ejs	User registration
home.ejs	User home
admin/login.ejs	Admin login
admin/dashboard.ejs	Admin panel
admin/users.ejs	User management
🔮 Future Improvements

JWT support (stateless auth)

Pagination & filters

Password reset

Email verification

Audit logs

Rate limiting

👨‍💻 Author

Shiyas
Full-Stack Developer
