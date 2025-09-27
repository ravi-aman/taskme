# Tasky Additional Database Seeding Script
# Run this script to add more users with Indian names and additional tasks
# Prerequisites: Make sure your server is running on http://localhost:8800

Write-Host "Starting Tasky Additional Database Seeding..." -ForegroundColor Green
Write-Host ""

# Check if server is running
try {
    # Test with a simple request to check server health
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
Write-Host "Creating additional users with Indian names..." -ForegroundColor Cyan

# Additional users with Indian names
$additionalUsers = @(
    @{
        name = "Arjun Sharma"
        title = "Senior Software Engineer"
        role = "Developer"
        email = "arjun.sharma@company.com"
        password = "password123"
        isAdmin = $false
        isActive = $true
    },
    @{
        name = "Priya Patel"
        title = "UI/UX Designer"
        role = "Designer"
        email = "priya.patel@company.com"
        password = "password123"
        isAdmin = $false
        isActive = $true
    },
    @{
        name = "Rahul Kumar"
        title = "DevOps Engineer"
        role = "DevOps"
        email = "rahul.kumar@company.com"
        password = "password123"
        isAdmin = $false
        isActive = $true
    },
    @{
        name = "Sneha Reddy"
        title = "Product Manager"
        role = "Manager"
        email = "sneha.reddy@company.com"
        password = "password123"
        isAdmin = $false
        isActive = $true
    },
    @{
        name = "Vikram Singh"
        title = "QA Engineer"
        role = "QA"
        email = "vikram.singh@company.com"
        password = "password123"
        isAdmin = $false
        isActive = $true
    },
    @{
        name = "Anita Joshi"
        title = "Business Analyst"
        role = "Analyst"
        email = "anita.joshi@company.com"
        password = "password123"
        isAdmin = $false
        isActive = $true
    },
    @{
        name = "Kiran Gupta"
        title = "Frontend Developer"
        role = "Developer"
        email = "kiran.gupta@company.com"
        password = "password123"
        isAdmin = $false
        isActive = $true
    },
    @{
        name = "Deepak Agarwal"
        title = "Backend Developer"
        role = "Developer"
        email = "deepak.agarwal@company.com"
        password = "password123"
        isAdmin = $false
        isActive = $true
    },
    @{
        name = "Ritu Chandra"
        title = "Data Scientist"
        role = "Analyst"
        email = "ritu.chandra@company.com"
        password = "password123"
        isAdmin = $false
        isActive = $true
    },
    @{
        name = "Manish Verma"
        title = "System Administrator"
        role = "Admin"
        email = "manish.verma@company.com"
        password = "password123"
        isAdmin = $false
        isActive = $true
    }
)

# Create additional users
$createdUsers = @()
foreach ($user in $additionalUsers) {
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
Write-Host "Creating additional tasks..." -ForegroundColor Cyan

# Additional tasks with more variety
$additionalTasks = @(
    @{
        title = "E-commerce Website Development"
        date = "2024-03-15T00:00:00.000Z"
        priority = "high"
        stage = "in progress"
        assets = @()
        subTasks = @(
            @{
                title = "Design product catalog page"
                date = "2024-03-16T00:00:00.000Z"
                tag = "Frontend"
            },
            @{
                title = "Implement payment gateway"
                date = "2024-03-18T00:00:00.000Z"
                tag = "Backend"
            }
        )
        isTrashed = $false
    },
    @{
        title = "Mobile App Performance Optimization"
        date = "2024-03-20T00:00:00.000Z"
        priority = "high"
        stage = "todo"
        assets = @()
        subTasks = @(
            @{
                title = "Analyze app loading times"
                date = "2024-03-21T00:00:00.000Z"
                tag = "Analysis"
            }
        )
        isTrashed = $false
    },
    @{
        title = "API Documentation Update"
        date = "2024-03-10T00:00:00.000Z"
        priority = "medium"
        stage = "completed"
        assets = @()
        subTasks = @()
        isTrashed = $false
    },
    @{
        title = "Customer Support Dashboard"
        date = "2024-03-25T00:00:00.000Z"
        priority = "medium"
        stage = "in progress"
        assets = @()
        subTasks = @(
            @{
                title = "Create ticket management system"
                date = "2024-03-26T00:00:00.000Z"
                tag = "Feature"
            },
            @{
                title = "Add live chat integration"
                date = "2024-03-27T00:00:00.000Z"
                tag = "Integration"
            }
        )
        isTrashed = $false
    },
    @{
        title = "Security Audit and Penetration Testing"
        date = "2024-03-12T00:00:00.000Z"
        priority = "high"
        stage = "in progress"
        assets = @()
        subTasks = @(
            @{
                title = "Vulnerability assessment"
                date = "2024-03-13T00:00:00.000Z"
                tag = "Security"
            }
        )
        isTrashed = $false
    },
    @{
        title = "Machine Learning Model Training"
        date = "2024-03-30T00:00:00.000Z"
        priority = "high"
        stage = "todo"
        assets = @()
        subTasks = @(
            @{
                title = "Data preprocessing and cleaning"
                date = "2024-03-31T00:00:00.000Z"
                tag = "ML"
            },
            @{
                title = "Model evaluation and testing"
                date = "2024-04-02T00:00:00.000Z"
                tag = "ML"
            }
        )
        isTrashed = $false
    },
    @{
        title = "Social Media Integration"
        date = "2024-03-08T00:00:00.000Z"
        priority = "normal"
        stage = "completed"
        assets = @()
        subTasks = @()
        isTrashed = $false
    },
    @{
        title = "Database Migration to Cloud"
        date = "2024-03-18T00:00:00.000Z"
        priority = "high"
        stage = "in progress"
        assets = @()
        subTasks = @(
            @{
                title = "Setup cloud database instance"
                date = "2024-03-19T00:00:00.000Z"
                tag = "Infrastructure"
            },
            @{
                title = "Data migration script"
                date = "2024-03-20T00:00:00.000Z"
                tag = "Migration"
            }
        )
        isTrashed = $false
    },
    @{
        title = "User Analytics Dashboard"
        date = "2024-03-22T00:00:00.000Z"
        priority = "medium"
        stage = "todo"
        assets = @()
        subTasks = @(
            @{
                title = "Design analytics widgets"
                date = "2024-03-23T00:00:00.000Z"
                tag = "Design"
            }
        )
        isTrashed = $false
    },
    @{
        title = "Automated Testing Framework"
        date = "2024-03-14T00:00:00.000Z"
        priority = "medium"
        stage = "completed"
        assets = @()
        subTasks = @()
        isTrashed = $false
    },
    @{
        title = "Microservices Architecture Implementation"
        date = "2024-04-01T00:00:00.000Z"
        priority = "high"
        stage = "todo"
        assets = @()
        subTasks = @(
            @{
                title = "Service decomposition planning"
                date = "2024-04-02T00:00:00.000Z"
                tag = "Architecture"
            },
            @{
                title = "API gateway setup"
                date = "2024-04-03T00:00:00.000Z"
                tag = "Infrastructure"
            }
        )
        isTrashed = $false
    },
    @{
        title = "Content Management System"
        date = "2024-03-28T00:00:00.000Z"
        priority = "medium"
        stage = "in progress"
        assets = @()
        subTasks = @(
            @{
                title = "Rich text editor integration"
                date = "2024-03-29T00:00:00.000Z"
                tag = "Feature"
            }
        )
        isTrashed = $false
    },
    @{
        title = "Legacy Code Refactoring"
        date = "2024-03-05T00:00:00.000Z"
        priority = "normal"
        stage = "completed"
        assets = @()
        subTasks = @()
        isTrashed = $false
    },
    @{
        title = "Real-time Notification System"
        date = "2024-03-26T00:00:00.000Z"
        priority = "medium"
        stage = "todo"
        assets = @()
        subTasks = @(
            @{
                title = "WebSocket implementation"
                date = "2024-03-27T00:00:00.000Z"
                tag = "Backend"
            },
            @{
                title = "Push notification setup"
                date = "2024-03-28T00:00:00.000Z"
                tag = "Mobile"
            }
        )
        isTrashed = $false
    },
    @{
        title = "Blockchain Integration POC"
        date = "2024-04-05T00:00:00.000Z"
        priority = "normal"
        stage = "todo"
        assets = @()
        subTasks = @()
        isTrashed = $false
    },
    # Some trashed tasks
    @{
        title = "Old Payment System Removal"
        date = "2024-02-15T00:00:00.000Z"
        priority = "low"
        stage = "todo"
        assets = @()
        subTasks = @()
        isTrashed = $true
    },
    @{
        title = "Deprecated API Endpoints Cleanup"
        date = "2024-02-20T00:00:00.000Z"
        priority = "low"
        stage = "in progress"
        assets = @()
        subTasks = @()
        isTrashed = $true
    },
    @{
        title = "Legacy Dashboard Removal"
        date = "2024-02-25T00:00:00.000Z"
        priority = "low"
        stage = "todo"
        assets = @()
        subTasks = @()
        isTrashed = $true
    }
)

# Create additional tasks
$createdTasks = 0
foreach ($task in $additionalTasks) {
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
Write-Host "Additional database seeding completed!" -ForegroundColor Green
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "   • Additional users created: $($createdUsers.Count)" -ForegroundColor White
Write-Host "   • Additional tasks created: $createdTasks" -ForegroundColor White
Write-Host ""
Write-Host "New Indian Users Added:" -ForegroundColor Cyan
foreach ($user in $additionalUsers) {
    Write-Host "   • $($user.name) - $($user.title)" -ForegroundColor White
}
Write-Host ""
Write-Host "All users can login with password: password123" -ForegroundColor Yellow
Write-Host "Your app now has much more realistic data!" -ForegroundColor Green