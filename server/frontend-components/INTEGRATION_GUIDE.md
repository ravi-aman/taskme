# TaskMe Frontend Integration Guide

## Profile & Change Password Feature Integration

This guide will help you integrate the Profile and Change Password functionality into your TaskMe frontend application.

## Backend Changes (Already Implemented)
✅ Added `GET /api/user/profile` endpoint to fetch user profile
✅ Updated `PUT /api/user/profile` endpoint for profile updates  
✅ Updated `PUT /api/user/change-password` endpoint for password changes

## Frontend Components Provided

### 1. Profile.jsx
- Complete profile management component
- View and edit user information (name, title, role)
- Email is read-only for security
- Responsive design with loading states

### 2. ChangePassword.jsx  
- Secure password change functionality
- Password strength validation
- Show/hide password toggles
- Comprehensive form validation

### 3. ProfileDropdown.jsx
- Dropdown menu for avatar/profile button
- Navigation to Profile and Change Password pages
- Integrated logout functionality
- Clean, accessible design

### 4. AppRouter.jsx
- Example routing setup with React Router

## Integration Steps

### Step 1: Install Required Dependencies
```bash
npm install react-router-dom react-toastify
```

### Step 2: Copy Components to Your Project
Copy these files to your components directory:
- `Profile.jsx`
- `ChangePassword.jsx` 
- `ProfileDropdown.jsx`

### Step 3: Update Your Routing
Add these routes to your main router:

```jsx
import Profile from './components/Profile';
import ChangePassword from './components/ChangePassword';

// Add to your Routes component:
<Route path="/profile" element={<Profile />} />
<Route path="/change-password" element={<ChangePassword />} />
```

### Step 4: Replace Your Current Profile Avatar
Replace your existing profile avatar dropdown with the new ProfileDropdown component:

```jsx
import ProfileDropdown from './components/ProfileDropdown';

// In your navbar/header component:
<ProfileDropdown 
  user={currentUser} 
  onLogout={() => {
    // Your logout logic here
    // Clear user state, redirect to login, etc.
  }}
/>
```

### Step 5: Add Toast Notifications
Add react-toastify to your app root:

```jsx
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// In your App.jsx or root component:
function App() {
  return (
    <div className="App">
      {/* Your app content */}
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
```

### Step 6: Ensure API Base URL
Make sure your API calls are pointing to the correct base URL. If needed, update the fetch URLs in the components:

```jsx
// Change from:
fetch('/api/user/profile', ...)

// To (if needed):
fetch('http://localhost:8800/api/user/profile', ...)
```

## Features Included

### Profile Management
- ✅ View current profile information
- ✅ Edit name, title, and role
- ✅ Email is read-only (security best practice)
- ✅ Form validation
- ✅ Loading states
- ✅ Success/error messages
- ✅ Responsive design

### Password Management  
- ✅ Current password verification
- ✅ New password with strength requirements:
  - Minimum 6 characters
  - At least one uppercase letter
  - At least one lowercase letter  
  - At least one number
- ✅ Password confirmation
- ✅ Show/hide password toggles
- ✅ Real-time validation feedback
- ✅ Secure password handling

### User Experience
- ✅ Clean, modern UI using Tailwind CSS
- ✅ Accessible design with proper ARIA labels
- ✅ Loading states and error handling
- ✅ Toast notifications for user feedback
- ✅ Mobile-responsive design

## API Endpoints Used

### GET /api/user/profile
Fetches current user profile information
```javascript
Response: {
  status: true,
  user: {
    _id: "...",
    name: "John Doe",
    email: "john@example.com", 
    title: "Senior Developer",
    role: "Developer",
    isAdmin: false,
    isActive: true
  }
}
```

### PUT /api/user/profile
Updates user profile information
```javascript
Request Body: {
  name: "Updated Name",
  title: "Updated Title", 
  role: "Updated Role",
  _id: "user_id" // optional for admins
}
```

### PUT /api/user/change-password
Changes user password
```javascript
Request Body: {
  password: "newPassword123"
}
```

## Styling Notes
The components use Tailwind CSS classes. If you're not using Tailwind, you'll need to either:
1. Install Tailwind CSS in your project, or
2. Convert the Tailwind classes to your preferred CSS solution

## Security Features
- ✅ Authentication required for all endpoints
- ✅ Password hashing on backend
- ✅ JWT token validation
- ✅ Password strength requirements
- ✅ Email cannot be changed (prevents account takeover)
- ✅ Secure cookie handling

## Testing the Integration
1. Start your backend server (should be running on port 8800)
2. Login to your application  
3. Click on the profile avatar
4. Test the "Profile" option - should show and allow editing of user info
5. Test the "Change Password" option - should show password change form
6. Test the "Logout" option - should log you out successfully

## Troubleshooting

### Common Issues:
1. **404 errors**: Make sure backend server is running on correct port
2. **401 errors**: Ensure user is logged in and cookies are being sent
3. **CORS errors**: Check CORS configuration in backend
4. **Styling issues**: Ensure Tailwind CSS is properly configured

### Debug Tips:
- Check browser network tab for API calls
- Check browser console for JavaScript errors  
- Verify authentication cookies are present
- Check backend server logs for errors

This integration provides a complete profile management solution that integrates seamlessly with your existing TaskMe application!