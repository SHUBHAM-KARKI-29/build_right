
# build_right — Project Progress & Handover

## 1. Project Overview

**Project Name:** build_right

**Purpose:** An AI-assisted software development and QA management platform.

The goal is to build a full-stack application that helps users manage projects, document requirements, create test cases, and track testing results.

This project is also intended to demonstrate practical development and QA skills during job interviews.

## 2. Technology Stack

### Frontend
- React
- Vite
- JavaScript
- HTML
- CSS

### Backend
- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Maven
- JWT Authentication

### Database
- PostgreSQL 18
- Database name: build_right

### Development Tools
- Visual Studio Code
- Windows PowerShell
- Git and GitHub
- Postman / Browser Developer Console

## 3. Project Location

Main project folder:

`F:\CSE PROJECTS\build_right`

GitHub repository:

`https://github.com/SHUBHAM-KARKI-29/build_right.git`

### Folder Structure

```text
build_right/
│
├── backend/
│   └── src/main/java/build_right_backend/
│       ├── config/
│       ├── controller/
│       ├── dto/
│       ├── entity/
│       ├── repository/
│       └── service/
│
├── frontend/
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       └── ...
│
├── PROJECT_PROGRESS.md
└── README.md
```

## 4. Development Progress

### Day 1–5: Foundation and Authentication

Completed:
- Initial project setup.
- React frontend using Vite.
- Spring Boot backend setup.
- PostgreSQL database connection.
- User entity and repository.
- User registration API.
- Password hashing using BCrypt.
- User login API.
- JWT token generation and authentication.
- Protected backend endpoints.
- Frontend login and registration.
- Session-based login persistence using sessionStorage.
- Dashboard layout and navigation sections.

### Day 6: Project Management

Completed:
- Created Project entity.
- Created ProjectRepository.
- Created ProjectService.
- Created ProjectController.
- Implemented project creation API.
- Implemented project listing API.
- Protected project APIs using JWT.
- Connected frontend Projects section to backend.
- Saved projects in PostgreSQL.
- Verified project persistence after refreshing.

### Day 7: Requirements Management

Completed:
- Created Requirement entity.
- Created RequirementRepository.
- Created RequirementService.
- Created CreateRequirementRequest DTO.
- Created RequirementController.
- Implemented requirement creation API.
- Implemented requirement listing by project.
- Connected frontend Requirements section.
- Added project selection dropdown.
- Added requirement creation form.
- Displayed saved requirements.
- Verified database persistence after refreshing.

### Day 8: Test Case Management

Completed:
- Created TestCase entity.
- Created TestCaseRepository.
- Created TestCaseService.
- Created CreateTestCaseRequest DTO.
- Created TestCaseController.
- Implemented test case creation API.
- Implemented test case listing by requirement.
- Implemented test case status update API.
- Connected frontend Test Cases section.
- Added requirement selection dropdown.
- Added test case creation form.
- Displayed saved test cases.
- Added status dropdown with three options:
  - NOT_RUN
  - PASS
  - FAIL
- Implemented frontend PATCH request for status updates.
- Verified status updates through the API.
- Verified persistence after browser refresh.

### Current Test Data

Project:
- e commerce

Requirements:
1. User Login Functionality
2. User Registration

Test Cases:
1. Verify login with valid credentials — PASS
2. Verify login with invalid password — FAIL

These are development test records, not a complete automated test suite.

## 5. Backend API Endpoints

All endpoints except the public health, registration, and login endpoints require JWT authentication.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | /api/health | Health check |
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/users/me | Get current user |
| POST | /api/projects | Create project |
| GET | /api/projects | List projects |
| POST | /api/requirements/project/{projectId} | Create requirement |
| GET | /api/requirements/project/{projectId} | List requirements |
| POST | /api/test-cases/requirement/{requirementId} | Create test case |
| GET | /api/test-cases/requirement/{requirementId} | List test cases |
| PATCH | /api/test-cases/{testCaseId}/status?status={status} | Update test case status |

## 6. Database Tables

PostgreSQL database: `build_right`

Tables created:

### users
- id
- created_at
- email
- name
- password

### projects
Stores user project information.

### requirements
Stores requirements associated with projects.

### test_cases
Stores test cases associated with requirements.

Important relationships:

```text
Project
   |
   | One-to-Many
   |
Requirements
   |
   | One-to-Many
   |
Test Cases
```

## 7. Important Configuration

### Backend

Location:
`F:\CSE PROJECTS\build_right\backend`

Main configuration:
`backend/src/main/resources/application.properties`

- Database password is read using DB_PASSWORD.
- JWT secret is read using JWT_SECRET.
- Never hardcode actual passwords or JWT secrets.
- Never commit credentials to GitHub.

### JWT Secret Generation

Always use this four-line cryptographic method in PowerShell. The one-line GetBytes(32) method did not work with the user's PowerShell version.

```powershell
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$env:JWT_SECRET = [Convert]::ToBase64String($bytes)
$rng.Dispose()
```

## 8. How to Run the Project

### Start Backend

Open a new VS Code terminal:

```powershell
cd "F:\CSE PROJECTS\build_right\backend"
```

Set the database password and JWT secret in the same terminal:

```powershell
$env:DB_PASSWORD = Read-Host "Enter PostgreSQL password"
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$env:JWT_SECRET = [Convert]::ToBase64String($bytes)
$rng.Dispose()
```

Start Spring Boot:

```powershell
.\mvnw.cmd spring-boot:run
```

Wait for:

`Started BackendApplication`

Backend URL:

`http://localhost:8080`

Keep this terminal running.

### Start Frontend

Open another VS Code terminal:

```powershell
cd "F:\CSE PROJECTS\build_right\frontend"
npm run dev
```

Open:

`http://localhost:5173/`

Keep this terminal running too.

### Important JWT Note

The JWT secret is generated again whenever the backend is restarted.

Previously generated tokens will no longer work after a restart.

Log out and log in again to obtain a fresh token.

## 9. Git and GitHub Progress

Git branch: `main`

Latest completed development commit:

`abf4100` — Complete Day 8 test case management feature

Day 8 changes were committed and pushed successfully.

The repository was up to date with origin/main before Day 8 changes were committed.

### Git Commands

Check status:

```powershell
git status
```

Stage changes:

```powershell
git add .
```

Commit changes:

```powershell
git commit -m "Your commit message"
```

Push changes:

```powershell
git push origin main
```

Before using `git add .`, check for unnecessary files, backups, and secrets.

## 10. Current Project Status

**Completed:** Day 1–8

**Current milestone:** Core project, requirements, and test case management.

Verified:
- User authentication.
- Project creation and listing.
- Requirement creation and listing.
- Test case creation and listing.
- Test case status updates.
- PostgreSQL persistence.
- JWT-protected API requests.
- Frontend and backend integration.

## 11. Pending Improvements

Potential improvements for future development:

- Clean API responses using DTOs.
- Better exception handling and validation responses.
- User-specific project access and authorization checks.
- Automated backend tests.
- Automated frontend tests.
- Better dashboard statistics.
- Bug management.
- Reports and analytics.
- AI-assisted functionality.
- UI and UX improvements.

These are future possibilities, not features already implemented.

## 12. Next Development Session

**Next: Day 9**

Start by reviewing the current code and project state before implementing the next feature.

Do not recreate existing functionality.

Continue with beginner-friendly, step-by-step instructions.

For every coding task:
1. Specify the exact file path.
2. Explain whether code must be inserted, replaced, or modified.
3. Provide complete code where necessary.
4. Explain which terminal to use.
5. Wait for confirmation after important steps.
6. Test the feature before committing.
7. Commit and push completed work to GitHub.

## 13. Development Guidelines

- Follow the existing project architecture.
- Maintain consistency in naming conventions and coding style.
- Use environment variables for sensitive configuration.
- Test all new features before committing.
- Keep backend APIs and frontend integration synchronized.
- Document significant changes and update this progress file regularly.
- Maintain clear Git commit history.