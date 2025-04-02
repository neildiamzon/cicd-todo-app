# CICD To-Do App

## This app is built mainly for the CICD - Assignment#1 - Task 2
- **My student ID** 20241360
- Auckland Institute of Studies - T1 2025 CICD - Submitted to Lei Song

## Overview
The **CICD To-Do App** is a full-stack to-do application designed to demonstrate Continuous Integration and Continuous Deployment (CI/CD) best practices. It consists of a Django backend with a REST API and a React frontend, utilizing JWT authentication for secure access.

## Features
- **User Authentication**: Secure login and registration using JWT.
- **Task Management**: Add, update, delete, and mark tasks as complete.
- **REST API**: A Django-based backend providing API endpoints.
- **CI/CD Pipeline**: Automated build, test, and deployment workflows.

## Technologies Used
### Backend:
- **Django** (Python)
- **Django REST Framework (DRF)**
- **PostgreSQL** (or SQLite for development)
- **JWT Authentication**

### Frontend:
- **React** (JavaScript/TypeScript)
- **Material UI** (for styling)

### DevOps:
- **GitHub Actions** (CI/CD pipeline)
- **Vercel**

## Getting Started
### Prerequisites
Ensure you have the following installed:
- Python 3.x
- Node.js & npm/yarn

### Setup Instructions
#### 1. Clone the Repository
```sh
git clone https://github.com/neildiamzon/cicd-todo-app.git
cd cicd-todo-app
```

#### 2. Backend Setup
```sh
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### 3. Frontend Setup
```sh
cd frontend
npm install 
npm start
```


## CI/CD Workflow
The repository includes a GitHub Actions workflow for:
- Running backend and frontend tests on each commit.
- Building and deploying the application automatically.

