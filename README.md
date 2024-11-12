from pathlib import Path

# Define the content of the README.md file
readme_content = """
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

