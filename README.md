Online Learning Platform (OLPT)

This project is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js). It provides features such as user authentication, course management, quizzes, progress tracking, and suggestions. The project also demonstrates CI/CD deployment using GitHub Actions and AWS EC2 with PM2.

🚀 Features

User Authentication (JWT-based login & registration)

Course Management (create, update, delete courses)

Module & Quiz Handling

Progress Tracking with logs

Certificate Generation

Deployment with GitHub Actions → AWS EC2 → PM2

🛠️ Tech Stack

Frontend: React (with Axios & React Router)

Backend: Node.js, Express.js

Database: MongoDB Atlas

Deployment: AWS EC2 + PM2

CI/CD: GitHub Actions

Testing: Mocha, Chai, Sinon

📂 Project Structure
sdlapps/
├── backend/
│   ├── controllers/      # Business logic
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   ├── server.js         # Express server
│   ├── package.json
│   └── .env              # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── api/          # API service files
│   │   ├── pages/        # React pages (Courses, Progress, etc.)
│   │   └── App.js
│   ├── package.json
│
└── .github/workflows/ci-cd.yml   # GitHub Actions pipeline

⚙️ Setup Instructions
1. Clone Repository
git clone https://github.com/sanjogpradhanau/IFN636-Assignment-1.git
cd IFN636-Assignment-1

2. Backend Setup
cd backend
npm install


Create a .env file in backend/:

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sdlapps
JWT_SECRET=your_secret_key
PORT=5001


Run locally:

node server.js

3. Frontend Setup
cd frontend
npm install
npm start


Access frontend at: http://localhost:3000

🧪 Running Tests

From the backend folder:

npm test


This runs Mocha + Chai + Sinon test suites (task CRUD, auth, etc.).

☁️ Deployment (AWS EC2)

SSH into EC2:

ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>


Pull latest code:

cd ~/apps/olpt
git pull origin main


Install dependencies & run:

cd backend
npm install
pm2 start server.js --name backend


Check status:

pm2 status


Frontend can be deployed with npm run build + Nginx or served via Node.

🔄 CI/CD with GitHub Actions

Workflow file: .github/workflows/ci-cd.yml

Runs automatically when code is pushed.

Jobs include:

Install dependencies

Run Tests

Deploy to EC2 via SSH
