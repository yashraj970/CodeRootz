# Role Management Assignment

This project is a Role Management system built with the MERN stack (MongoDB, Express, React, Node.js). It allows for the creation, updating, and deletion of user roles and menus, as well as user registration and login with role-based access control.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Seeder](#running-the-seeder)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed. You can download them from [Node.js](https://nodejs.org/).
- MongoDB installed and running locally or a cloud MongoDB instance.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/role-management.git
   cd role-management
   ```

2. Install the server dependencies:

   ```bash
   cd server
   npm install
   ```

3. Install the client dependencies:
   ```bash
   cd ../client
   npm install
   ```

## Running the Seeder

Before testing the Role Management system, you need to seed the database with initial roles and a superadmin user. This step ensures that you have the necessary roles and a superadmin user to start with.

1. Update your MongoDB connection string in `config/db.js`:

   ```javascript
   const localDB = `mongodb://0.0.0.0:27017/coderootz`;
   ```

2. Run the seeder script:
   ```bash
   cd seeder/seed.js
   node seed.js
   ```

This will populate your database with the following data:

- Roles: `Superadmin`, `User`
- A `Superadmin` user with the following credentials:
  - Username: `superadmin`
  - Password: `superadminpassword`

## Running the Application

### Running the Server

1. Start the server:
   ```bash
   cd backend
   npm start
   ```

### Running the Client

1. Start the client:

   ```bash
   cd ../client
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

The project is divided into two main parts: the server and the client.

### Server

- `models/`: Contains the Mongoose models for `User` and `Role`.
- `routes/`: Contains the Express routes for user authentication and role management.
- `controllers/`: Contains the logic for handling requests.
- `config/`: Contains configuration files for the database connection.
- `seeder.js`: Script to seed the database with initial data.
- `server.js`: Entry point for the server.

### Client

- `src/components/`: Contains the React components for the UI.
- `src/pages/`: Contains the main pages for user and role management.
- `src/utils/`: Contains utility functions.
- `src/App.js`: Main entry point for the React application.
- `src/index.js`: Main entry point for rendering the React application.

## API Endpoints

### User Authentication

- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/login`: Login a user and return a JWT token.

### Role Management

- `GET /api/roles`: Get all roles.
- `POST /api/roles`: Create a new role.
- `PUT /api/roles/:id`: Update an existing role.
- `DELETE /api/roles/:id`: Delete a role.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
