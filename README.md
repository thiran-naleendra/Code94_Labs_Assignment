# Jokes Microservices Application

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Requirements](#requirements)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Author](#author)

---

## Project Overview
The **Jokes Microservices Application** is designed to manage jokes using a microservices architecture. The application provides functionality for:
- Submitting new jokes.
- Moderating submitted jokes (approve, edit, or delete).
- Displaying random approved jokes to users.

The application uses MongoDB as the primary database for storing jokes.

## Features
- **Submit New Jokes**: Allows users to submit jokes that are initially unmoderated.
- **Moderate Jokes**: Admin functionality to approve, edit, or delete jokes.
- **Random Joke Delivery**: Displays random approved jokes to users.

## Project Structure
The project is divided into multiple microservices, each with specific functionalities:

app/ ├── api/ │ ├── deliverJokes/ # Handles delivering random approved jokes │ ├── submitJokes/ # Handles joke submissions │ ├── moderateJokes/ # Contains services for moderating jokes │ │ ├── deleteJokes/ │ │ ├── editJokes/ │ │ └── viewJokes/ ├── dashboard/ # Dashboard for moderation and joke management ├── login/ # User login page └── User/ # User-specific pages lib/ ├── authMiddleware.js # Middleware for authentication └── connect-db.js # Database connection file models/ └── joke.js # Mongoose schema for jokes


## Technologies Used
- **Frontend**: Next.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (hosted on MongoDB Atlas)

## Requirements
- [Node.js](https://nodejs.org/) (v16 or later)
- MongoDB Atlas (or a local MongoDB instance)

## Installation and Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/thiran-naleendra/Code94_Labs_Assignment.git
cd Code94_Labs_Assignment

Step 2: Install Dependencies
Navigate to each microservice folder (e.g., app/api/submitJokes, app/api/deliverJokes, etc.) and run:

npm install

Step 3: Configure Environment Variables
Create a .env file in the root directory and add the following configuration:

# MongoDB Connection String
MONGODB_URI='mongodb+srv://<username>:<password>@cluster0.lrwgu.mongodb.net/jokes'

eplace <username> and <password> with your MongoDB credentials.

Step 4: Start the Application
Start each microservice by navigating to its folder and running:

node route.js

Each service will run on a different port as specified in your project structure.

Environment Variables
For MongoDB connection, ensure the following environment variable is set in the .env file:

MONGODB_URI='your-mongodb-connection-string'

Usage
Submit a Joke: Users can submit jokes through the submit jokes page.
View Random Approved Jokes: Users can view a random approved joke.
Moderate Jokes: Admins can approve, edit, or delete jokes from the moderation dashboard.
API Endpoints
Each microservice has specific endpoints:

Submit Jokes Microservice
POST /api/submitJokes: Submit a new joke
Deliver Jokes Microservice
GET /api/deliverJokes: Get a random approved joke
Moderate Jokes Microservice
DELETE /api/moderateJokes/deleteJokes: Delete a joke by ID
PUT /api/moderateJokes/editJokes: Edit a joke by ID
GET /api/moderateJokes/viewJokes: View all jokes
Troubleshooting
Error: Failed to fetch jokes: Check if the MongoDB URI is correct in .env and that the database is accessible.
Server Issues: Ensure each microservice is started individually by navigating to its folder and running node route.js.
MongoDB Connection Issues: Verify MongoDB credentials and check network settings if using MongoDB Atlas.
License
This project is licensed under the MIT License.

Author
Thiran Naleendra
GitHub Profile