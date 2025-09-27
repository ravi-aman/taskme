// Database Seeding Script for Tasky Application
// Run this script to populate your MongoDB database with sample data

const seedData = {
  users: [
    {
      name: "Codewave Asante",
      title: "Administrator",
      role: "Admin",
      email: "admin@gmail.com",
      password: "password123",
      isAdmin: true,
      isActive: true,
    },
    {
      name: "John Doe", 
      title: "Software Engineer",
      role: "Developer",
      email: "john.doe@example.com",
      password: "password123",
      isAdmin: false,
      isActive: true,
    },
    {
      name: "Jane Smith",
      title: "Product Manager", 
      role: "Manager",
      email: "jane.smith@example.com",
      password: "password123",
      isAdmin: false,
      isActive: true,
    },
    {
      name: "Alex Johnson",
      title: "UX Designer",
      role: "Designer", 
      email: "alex.johnson@example.com",
      password: "password123",
      isAdmin: false,
      isActive: true,
    },
    {
      name: "Emily Wilson",
      title: "Data Analyst",
      role: "Analyst",
      email: "emily.wilson@example.com", 
      password: "password123",
      isAdmin: false,
      isActive: true,
    },
  ],

  tasks: [
    {
      title: "Test task",
      date: "2024-02-09T00:00:00.000Z",
      priority: "high",
      stage: "todo",
      assets: [],
      activities: [{
        type: "assigned",
        activity: "Task assigned to team members",
        date: new Date(),
      }],
      subTasks: [{
        title: "Tasky tutorial creation",
        date: "2024-02-09T00:00:00.000Z",
        tag: "tutorial",
      }],
      isTrashed: false,
    },
    {
      title: "Website Project Proposal", 
      date: "2024-02-07T00:00:00.000Z",
      priority: "high",
      stage: "todo",
      assets: [],
      activities: [],
      subTasks: [{
        title: "Blog App Dashboard",
        date: "2024-02-06T00:00:00.000Z",
        tag: "Design",
      }],
      isTrashed: false,
    },
    {
      title: "Review Code Changes",
      date: "2024-02-05T00:00:00.000Z", 
      priority: "medium",
      stage: "in progress",
      assets: [],
      activities: [{
        type: "started",
        activity: "Code review started",
        date: new Date(),
      }],
      subTasks: [],
      isTrashed: false,
    },
    {
      title: "Bug Fixing",
      date: "2024-02-07T00:00:00.000Z",
      priority: "high", 
      stage: "in progress",
      assets: [],
      activities: [{
        type: "bug",
        activity: "Critical bug found in authentication module",
        date: new Date(),
      }],
      subTasks: [{
        title: "Check Login code and fix bugs asap",
        date: "2024-02-08T00:00:00.000Z",
        tag: "Bug Fixing",
      }],
      isTrashed: false,
    },
    {
      title: "Tasky YouTube Tutorial Video",
      date: "2024-02-11T00:00:00.000Z",
      priority: "medium",
      stage: "completed", 
      assets: [],
      activities: [{
        type: "completed",
        activity: "Video recording and editing completed",
        date: new Date(),
      }],
      subTasks: [],
      isTrashed: false,
    },
    {
      title: "Mobile App Development",
      date: "2024-02-12T00:00:00.000Z", 
      priority: "high",
      stage: "todo",
      assets: [],
      activities: [],
      subTasks: [],
      isTrashed: false,
    },
    {
      title: "Database Optimization",
      date: "2024-02-10T00:00:00.000Z",
      priority: "medium",
      stage: "in progress", 
      assets: [],
      activities: [{
        type: "in progress", 
        activity: "Optimizing database queries for better performance",
        date: new Date(),
      }],
      subTasks: [],
      isTrashed: false,
    },
    {
      title: "User Interface Redesign",
      date: "2024-02-08T00:00:00.000Z",
      priority: "normal",
      stage: "completed",
      assets: [],
      activities: [{
        type: "completed",
        activity: "UI redesign completed and approved",
        date: new Date(),
      }],
      subTasks: [],
      isTrashed: false,
    },
    // Trashed tasks
    {
      title: "Deprecated Feature Removal",
      date: "2024-02-06T00:00:00.000Z",
      priority: "low", 
      stage: "todo",
      assets: [],
      activities: [],
      subTasks: [],
      isTrashed: true, 
    },
    {
      title: "Old Documentation Update",
      date: "2024-02-05T00:00:00.000Z",
      priority: "low",
      stage: "todo",
      assets: [],
      activities: [],
      subTasks: [], 
      isTrashed: true,
    },
  ]
};

console.log('='.repeat(50));
console.log('📝 TASKY DATABASE SEEDING INSTRUCTIONS');
console.log('='.repeat(50));
console.log('');
console.log('To populate your database with sample data, follow these steps:');
console.log('');
console.log('🔹 METHOD 1: Using API Endpoints (Recommended)');
console.log('   Run these commands in PowerShell:');
console.log('');

// Generate user creation commands
console.log('   # Create Users:');
seedData.users.forEach((user, index) => {
  console.log(`   Invoke-RestMethod -Uri "http://localhost:8800/api/user/register" -Method POST -ContentType "application/json" -Body '${JSON.stringify(user).replace(/'/g, "''")}'`);
});

console.log('');
console.log('   # Login as admin to create tasks:');
console.log(`   $session = Invoke-RestMethod -Uri "http://localhost:8800/api/user/login" -Method POST -ContentType "application/json" -Body '{"email":"admin@gmail.com","password":"password123"}' -SessionVariable session`);
console.log('');
console.log('   # Create Tasks:');
seedData.tasks.forEach((task, index) => {
  const taskData = { ...task };
  // Remove activities temporarily as they need user IDs
  delete taskData.activities;
  console.log(`   Invoke-RestMethod -Uri "http://localhost:8800/api/task/create" -Method POST -ContentType "application/json" -Body '${JSON.stringify(taskData).replace(/'/g, "''")}' -WebSession $session`);
});

console.log('');
console.log('🔹 METHOD 2: Direct Database Insert');
console.log('   1. Connect to your MongoDB database');  
console.log('   2. Use the data objects above to insert directly into your collections');
console.log('');
console.log('⚠️  IMPORTANT NOTES:');
console.log('   • Make sure your server is running on http://localhost:8800');
console.log('   • Users will be created with password "password123"');
console.log('   • The admin user is: admin@gmail.com / password123');
console.log('   • Tasks require authentication, so create users first');
console.log('   • Team assignments will be handled automatically by the API');
console.log('');
console.log('🚀 After seeding, your app will show real data instead of dummy data!');
console.log('='.repeat(50));