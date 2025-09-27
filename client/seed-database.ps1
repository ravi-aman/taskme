# Tasky Database Seeding Script
# Run this script to populate your MongoDB database with sample data
# Prerequisites: Make sure your server is running on http://localhost:8800

Write-Host "Starting Tasky Database Seeding..." -ForegroundColor Green
Write-Host ""

# Check if server is running
try {
    # Test with a simple GET request to check server health
    $response = Invoke-RestMethod -Uri "http://localhost:8800/api/user/register" -Method POST -ContentType "application/json" -Body '{"email":"healthcheck@test.com"}' -ErrorAction SilentlyContinue
    Write-Host "Server is running" -ForegroundColor Green
} catch {
    if ($_.Exception.Response.StatusCode -eq 400) {
        Write-Host "Server is running" -ForegroundColor Green
    } else {
        Write-Host "Server is not running on http://localhost:8800" -ForegroundColor Red
        Write-Host "Please start your server first and try again." -ForegroundColor Yellow
        exit 1
    }
}

Write-Host ""
Write-Host "Creating sample users..." -ForegroundColor Cyan

# Sample users data
$users = @(
    @{
        name = "Codewave Asante"
        title = "Administrator"
        role = "Admin"
        email = "admin@gmail.com"
        password = "password123"
        isAdmin = $true
        isActive = $true
    },
    @{
        name = "John Doe"
        title = "Software Engineer" 
        role = "Developer"
        email = "john.doe@example.com"
        password = "password123"
        isAdmin = $false
        isActive = $true
    },
    @{
        name = "Jane Smith"
        title = "Product Manager"
        role = "Manager"
        email = "jane.smith@example.com"
        password = "password123"
        isAdmin = $false
        isActive = $true
    },
    @{
        name = "Alex Johnson"
        title = "UX Designer"
        role = "Designer"
        email = "alex.johnson@example.com"
        password = "password123"
        isAdmin = $false
        isActive = $true
    },
    @{
        name = "Emily Wilson"
        title = "Data Analyst"
        role = "Analyst"
        email = "emily.wilson@example.com"
        password = "password123"
        isAdmin = $false
        isActive = $true
    }
)

# Create users
$createdUsers = @()
foreach ($user in $users) {
    try {
        $userJson = $user | ConvertTo-Json -Compress
        $response = Invoke-RestMethod -Uri "http://localhost:8800/api/user/register" -Method POST -ContentType "application/json" -Body $userJson
        Write-Host "Created user: $($user.name)" -ForegroundColor Green
        $createdUsers += $user.email
    } catch {
        if ($_.Exception.Response.StatusCode -eq 400) {
            Write-Host "User already exists: $($user.name)" -ForegroundColor Yellow
            $createdUsers += $user.email
        } else {
            Write-Host "Failed to create user: $($user.name) - $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "Logging in as admin..." -ForegroundColor Cyan

# Login as admin
try {
    $loginData = @{
        email = "admin@gmail.com"
        password = "password123"
    } | ConvertTo-Json -Compress
    
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:8800/api/user/login" -Method POST -ContentType "application/json" -Body $loginData -SessionVariable session
    Write-Host "Successfully logged in as admin" -ForegroundColor Green
} catch {
    Write-Host "Failed to login as admin: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Please make sure the admin user was created successfully." -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Creating sample tasks..." -ForegroundColor Cyan

# Sample tasks data
$tasks = @(
    @{
        title = "Test task"
        date = "2024-02-09T00:00:00.000Z"
        priority = "high"
        stage = "todo"
        assets = @()
        subTasks = @(@{
            title = "Tasky tutorial creation"
            date = "2024-02-09T00:00:00.000Z"
            tag = "tutorial"
        })
        isTrashed = $false
    },
    @{
        title = "Website Project Proposal"
        date = "2024-02-07T00:00:00.000Z"
        priority = "high"
        stage = "todo"
        assets = @()
        subTasks = @(@{
            title = "Blog App Dashboard"
            date = "2024-02-06T00:00:00.000Z"
            tag = "Design"
        })
        isTrashed = $false
    },
    @{
        title = "Review Code Changes"
        date = "2024-02-05T00:00:00.000Z"
        priority = "medium"
        stage = "in progress"
        assets = @()
        subTasks = @()
        isTrashed = $false
    },
    @{
        title = "Bug Fixing"
        date = "2024-02-07T00:00:00.000Z"
        priority = "high"
        stage = "in progress"
        assets = @()
        subTasks = @(@{
            title = "Check Login code and fix bugs asap"
            date = "2024-02-08T00:00:00.000Z"
            tag = "Bug Fixing"
        })
        isTrashed = $false
    },
    @{
        title = "Tasky YouTube Tutorial Video"
        date = "2024-02-11T00:00:00.000Z"
        priority = "medium"
        stage = "completed"
        assets = @()
        subTasks = @()
        isTrashed = $false
    },
    @{
        title = "Mobile App Development"
        date = "2024-02-12T00:00:00.000Z"
        priority = "high"
        stage = "todo"
        assets = @()
        subTasks = @()
        isTrashed = $false
    },
    @{
        title = "Database Optimization"
        date = "2024-02-10T00:00:00.000Z"
        priority = "medium"
        stage = "in progress"
        assets = @()
        subTasks = @()
        isTrashed = $false
    },
    @{
        title = "User Interface Redesign"
        date = "2024-02-08T00:00:00.000Z"
        priority = "normal"
        stage = "completed"
        assets = @()
        subTasks = @()
        isTrashed = $false
    },
    @{
        title = "Deprecated Feature Removal"
        date = "2024-02-06T00:00:00.000Z"
        priority = "low"
        stage = "todo"
        assets = @()
        subTasks = @()
        isTrashed = $true
    },
    @{
        title = "Old Documentation Update"
        date = "2024-02-05T00:00:00.000Z"
        priority = "low"
        stage = "todo"
        assets = @()
        subTasks = @()
        isTrashed = $true
    }
)

# Create tasks
$createdTasks = 0
foreach ($task in $tasks) {
    try {
        $taskJson = $task | ConvertTo-Json -Compress -Depth 10
        $response = Invoke-RestMethod -Uri "http://localhost:8800/api/task/create" -Method POST -ContentType "application/json" -Body $taskJson -WebSession $session
        Write-Host "Created task: $($task.title)" -ForegroundColor Green
        $createdTasks++
    } catch {
        Write-Host "Failed to create task: $($task.title) - $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Database seeding completed!" -ForegroundColor Green
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "   • Users created/verified: $($createdUsers.Count)" -ForegroundColor White
Write-Host "   • Tasks created: $createdTasks" -ForegroundColor White
Write-Host ""
Write-Host "Login credentials:" -ForegroundColor Cyan
Write-Host "   • Admin: admin@gmail.com / password123" -ForegroundColor White
Write-Host "   • All users: password123" -ForegroundColor White
Write-Host ""
Write-Host "Your app should now show real data instead of dummy data!" -ForegroundColor Green