# TaskMe API Endpoints Documentation

## Authentication
All protected endpoints require authentication via HTTP-only cookies. The JWT token is automatically sent with requests when using `credentials: 'include'` in fetch requests.

---

## User Authentication Endpoints

### 1. Register User
**POST** `/api/user/register`

**Authentication:** Not required

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "Password123",
  "isAdmin": false,
  "role": "Developer",
  "title": "Senior Developer"
}
```

**Response (Success - 201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "isAdmin": false,
  "role": "Developer",
  "title": "Senior Developer",
  "isActive": true,
  "tasks": [],
  "createdAt": "2025-09-28T10:00:00.000Z",
  "updatedAt": "2025-09-28T10:00:00.000Z"
}
```

**Response (Error - 400):**
```json
{
  "status": false,
  "message": "User already exists"
}
```

---

### 2. Login User
**POST** `/api/user/login`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "Password123"
}
```

**Response (Success - 200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "isAdmin": false,
  "role": "Developer",
  "title": "Senior Developer",
  "isActive": true,
  "tasks": [],
  "createdAt": "2025-09-28T10:00:00.000Z",
  "updatedAt": "2025-09-28T10:00:00.000Z"
}
```

**Response (Error - 401):**
```json
{
  "status": false,
  "message": "Invalid email or password"
}
```

**Response (Deactivated Account - 401):**
```json
{
  "status": false,
  "message": "User account has been deactivated, contact the administrator"
}
```

---

### 3. Logout User
**POST** `/api/user/logout`

**Authentication:** Not required (clears cookie)

**Request Body:** None

**Response (Success - 200):**
```json
{
  "message": "Logout successful"
}
```

---

## Profile Management Endpoints

### 4. Get User Profile
**GET** `/api/user/profile`

**Authentication:** Required (protectRoute middleware)

**Request Body:** None

**Response (Success - 200):**
```json
{
  "status": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "title": "Senior Developer",
    "role": "Developer",
    "isAdmin": false,
    "tasks": ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"],
    "isActive": true,
    "createdAt": "2025-09-28T10:00:00.000Z",
    "updatedAt": "2025-09-28T10:00:00.000Z"
  }
}
```

**Response (Error - 404):**
```json
{
  "status": false,
  "message": "User not found"
}
```

---

### 5. Update User Profile
**PUT** `/api/user/profile`

**Authentication:** Required (protectRoute middleware)

**Request Body:**
```json
{
  "name": "John Smith",
  "title": "Lead Developer",
  "role": "Team Lead",
  "_id": "507f1f77bcf86cd799439011"  // Optional: For admin to update other users
}
```

**Response (Success - 201):**
```json
{
  "status": true,
  "message": "Profile Updated Successfully.",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Smith",
    "email": "john.doe@example.com",
    "title": "Lead Developer",
    "role": "Team Lead",
    "isAdmin": false,
    "tasks": ["507f1f77bcf86cd799439012"],
    "isActive": true,
    "createdAt": "2025-09-28T10:00:00.000Z",
    "updatedAt": "2025-09-28T12:00:00.000Z"
  }
}
```

**Response (Error - 404):**
```json
{
  "status": false,
  "message": "User not found"
}
```

---

### 6. Change User Password
**PUT** `/api/user/change-password`

**Authentication:** Required (protectRoute middleware)

**Request Body:**
```json
{
  "password": "NewPassword123"
}
```

**Response (Success - 201):**
```json
{
  "status": true,
  "message": "Password chnaged successfully."
}
```

**Response (Error - 404):**
```json
{
  "status": false,
  "message": "User not found"
}
```

---

## Notification Endpoints

### 7. Get Notifications List
**GET** `/api/user/notifications`

**Authentication:** Required (protectRoute middleware)

**Request Body:** None

**Response (Success - 201):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "team": ["507f1f77bcf86cd799439011"],
    "text": "New task has been assigned to you. The task priority is set a high priority, so check and act accordingly. The task date is Sat Sep 28 2025. Thank you!!!",
    "task": {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Implement user authentication"
    },
    "notiType": "alert",
    "isRead": [],
    "createdAt": "2025-09-28T10:00:00.000Z",
    "updatedAt": "2025-09-28T10:00:00.000Z"
  }
]
```

---

### 8. Mark Notification as Read
**PUT** `/api/user/read-noti`

**Authentication:** Required (protectRoute middleware)

**Query Parameters:**
- `isReadType`: "all" or specific notification
- `id`: notification ID (required if isReadType is not "all")

**Examples:**
- Mark all notifications as read: `PUT /api/user/read-noti?isReadType=all`
- Mark specific notification as read: `PUT /api/user/read-noti?isReadType=single&id=507f1f77bcf86cd799439014`

**Request Body:** None

**Response (Success - 201):**
```json
{
  "status": true,
  "message": "Done"
}
```

---

## Admin-Only Endpoints

### 9. Get Team List
**GET** `/api/user/get-team`

**Authentication:** Required (protectRoute + isAdminRoute middleware)

**Request Body:** None

**Response (Success - 200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "title": "Senior Developer",
    "role": "Developer",
    "email": "john.doe@example.com",
    "isActive": true
  },
  {
    "_id": "507f1f77bcf86cd799439015",
    "name": "Jane Smith",
    "title": "UI/UX Designer",
    "role": "Designer",
    "email": "jane.smith@example.com",
    "isActive": true
  }
]
```

---

### 10. Activate/Deactivate User Profile
**PUT** `/api/user/:id`

**Authentication:** Required (protectRoute + isAdminRoute middleware)

**URL Parameters:**
- `id`: User ID to activate/deactivate

**Request Body:**
```json
{
  "isActive": true  // or false to deactivate
}
```

**Response (Success - 201):**
```json
{
  "status": true,
  "message": "User account has been activated"  // or "disabled"
}
```

**Response (Error - 404):**
```json
{
  "status": false,
  "message": "User not found"
}
```

---

### 11. Delete User Profile
**DELETE** `/api/user/:id`

**Authentication:** Required (protectRoute + isAdminRoute middleware)

**URL Parameters:**
- `id`: User ID to delete

**Request Body:** None

**Response (Success - 200):**
```json
{
  "status": true,
  "message": "User deleted successfully"
}
```

---

## Authentication Errors

### Unauthorized Access (401)
When accessing protected routes without authentication:
```json
{
  "status": false,
  "message": "Not authorized. Try login again."
}
```

### Admin Access Required (401)
When accessing admin routes without admin privileges:
```json
{
  "status": false,
  "message": "Not authorized as admin. Try login as admin."
}
```

---

## Frontend Implementation Examples

### Using Fetch API

#### Login Example:
```javascript
const loginUser = async (email, password) => {
  try {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('Login successful:', data);
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
```

#### Get Profile Example:
```javascript
const getUserProfile = async () => {
  try {
    const response = await fetch('/api/user/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
    });

    const data = await response.json();
    
    if (data.status) {
      return data.user;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Profile fetch error:', error);
    throw error;
  }
};
```

#### Update Profile Example:
```javascript
const updateProfile = async (profileData) => {
  try {
    const response = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(profileData),
    });

    const data = await response.json();
    
    if (data.status) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Profile update error:', error);
    throw error;
  }
};
```

---

## Notes

1. **Cookies**: The application uses HTTP-only cookies for JWT tokens. Always use `credentials: 'include'` in fetch requests.

2. **Password Security**: Passwords are automatically hashed using bcrypt before storing in the database.

3. **Admin Privileges**: Some endpoints require admin privileges. Regular users cannot access admin-only endpoints.

4. **Email Immutability**: Email addresses cannot be changed through the update profile endpoint for security reasons.

5. **Validation**: The backend performs validation on all inputs. Frontend should also implement client-side validation for better UX.

6. **Error Handling**: Always check the response status and handle errors appropriately in your frontend code.