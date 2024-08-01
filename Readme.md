# Task Manger Application

### Task Overview Summary

**Objective:** Develop a RESTful API for a task management system using Express, TypeScript, and MongoDB, including user authentication and basic task management functionality.

**Project Requirements:**

1. **Core Technologies:**
   - **Express:** Web framework
   - **TypeScript:** Type safety
   - **MongoDB:** Database

2. **Functional Requirements:**
   - **User Authentication:** Implement user registration and login, using JWT or another method.
   - **Task Management:** Allow users to create, read, update, and delete tasks, with each task belonging to a user.

3. **Data Models:**
   - **User:** Fields: username, email, password
   - **Task:** Fields: title, description, status, user reference

4. **Security Considerations:**
   - Secure endpoints requiring authentication
   - Store passwords securely

5. **Additional Considerations:**
   - Error handling and validation
   - RESTful API design

**Optional Enhancements:**
- Role-Based Access Control: Different roles with different permissions (e.g., admin, user)
- Task Filtering and Sorting: Filter and sort tasks by criteria (e.g., status, due date)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Endpoints](#endpoints)

## Prerequisites

- [Node.js](https://nodejs.org/) (v20.x)
- [npm](https://www.npmjs.com/) (v10.x or higher)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/damber-technology.git
   cd damber-technology
   ```
2. **Installing APplication**

```
npm install
```

3. **Environmental Variable**

The environment variables are attached in a file sent with this mail

4. **API Documentation**

[text](https://documenter.getpostman.com/view/13823032/2sA3kdBdR5)