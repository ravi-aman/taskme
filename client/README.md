# Tasky - Modern Task Management Application

A powerful, cloud-based task management application built with React, Redux Toolkit, and Node.js. Tasky helps teams organize, track, and collaborate on tasks with an intuitive and modern interface.

## 🚀 Features

- **User Authentication** - Secure login/logout with JWT
- **Task Management** - Create, update, delete, and organize tasks
- **Team Collaboration** - Multi-user support with role-based access
- **Real-time Dashboard** - Statistics and charts for task tracking
- **Priority Levels** - Organize tasks by priority (High, Medium, Normal, Low)
- **Task Stages** - Track progress (To Do, In Progress, Completed, Trashed)
- **Responsive Design** - Works seamlessly on desktop and mobile

## 🛠 Tech Stack

**Frontend:**
- React 18 with Vite
- Redux Toolkit for state management
- Tailwind CSS for styling
- Headless UI for components
- Recharts for data visualization

**Backend:**
- Node.js with Express
- MongoDB for database
- JWT for authentication
- Mongoose ODM

## 🎯 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tasky
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd client
   npm install
   
   # Backend
   cd ../server
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env` in both client and server directories
   - Update environment variables with your configurations

4. **Start the application**
   ```bash
   # Start backend (from server directory)
   npm start
   
   # Start frontend (from client directory)
   npm run dev
   ```

## 🔑 Default Login Credentials

**Admin Access:**
- Email: admin@gmail.com
- Password: password123

**All Users:**
- Password: password123

## 📊 Database

The application comes with sample data including:
- 15 users with diverse roles
- 28+ realistic tasks across different stages
- Professional project scenarios

Use the seeding scripts to populate your database:
```bash
.\seed-database.ps1          # Initial data
.\seed-additional-data.ps1   # Additional users and tasks
```

## 🎨 Key Features

- **Dashboard Analytics** - Visual insights into task distribution and progress
- **Advanced Filtering** - Filter tasks by stage, priority, and assignee
- **Task Details** - Comprehensive task information with subtasks and activities
- **User Management** - Team overview with user profiles and roles
- **Trash Management** - Soft delete with recovery options

## 🚀 Deployment

Ready for deployment on platforms like:
- Frontend: Vercel, Netlify, AWS S3
- Backend: Heroku, AWS EC2, DigitalOcean
- Database: MongoDB Atlas, AWS DocumentDB

## 📝 License

This project is licensed under the MIT License.

---

**Tasky** - Making task management simple, efficient, and collaborative! ✨
