# Real time comments section Project
This is a real-time commenting application built using React, Node.js, and Socket.io, with a backend that stores comments in a MySQL database. Users can log in, post comments, and see live updates as new comments are added by others.

<br>

# Project Highlights 
1. Node.js
3. Typescript
4. MySQL
5. Nextjs 
6. Zod
7. Material UI
8. Socket.io
9. Express
10. Axios

<br>


# Features
* Real-time comment updates using Socket.io.
* Simple login system with username-based authentication.
* Comments stored in a MySQL database.
* User-friendly interface built with Material-UI.

<br>


# Prerequisites
* Node.js (v16 or above recommended)
* MySQL server
* Git
* Typescript should be installed

<br>


# Assumptions
* A MySQL database is available and accessible for storing comments.
* The server is running locally at http://localhost:4000 and frontend on http://localhost:3000.
* The user has Node.js and MySQL configured on their system.

<br>


# Getting Started 
Follow these steps to set up and run the project locally.

1. Clone the Repository
    git clone https://github.com/sKush-1/real_time_comments.git

2. Set up the Backend
Navigate to the backend directory, install dependencies, 
* cd backend
* npm install

3. Navigate to backend/config/db.config.js to setup your database configurations.
*  configure your user,db name and password.

4. Ensure your MySQL server is running, and then run the following command in MySQL CLI to create the comments table:
  * CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  comment TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

5. Start backend server
    * npm start
    * Your backend should now be running on http://localhost:4000.

6. Now navigate to frontend directory and install depedencies and run frontend server.
    * cd frontend
    * npm install 
    * npm run dev
    * Your frontend should now be running on http://localhost:3000.


8. Open the Application
Visit http://localhost:3000 in your browser. You can now log in with a username and start posting comments in real time.

<br>

# Usage
* Login: Enter a username and click "Login" to start commenting.
* Post a Comment: Type a comment and hit "Post Comment" to see it appear instantly.
* Real-time Updates: Comments from other users appear in real time without needing a page refresh.
* Repeat this in other tab or in some other browser browser to have atleast to user to see real time chats.

<br>

# Troubleshooting
* Socket Connection Errors: Ensure the backend server is running on http://localhost:4000.
* Database Errors: Verify MySQL credentials and ensure the comments table exists.
    








     
 
