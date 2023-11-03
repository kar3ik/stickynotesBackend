# StickyNotes Backend

This is the backend server for a StickyNotes application. It provides API endpoints for creating, reading, updating, archiving, unarchiving, and deleting sticky notes. Each sticky note is associated with a specific user.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)


## Technologies Used

- **Node.js:** The server is built using Node.js, a JavaScript runtime.
- **Express.js:** An Express.js server framework is used for creating API endpoints.
- **MongoDB:** The MongoDB database is used for storing sticky notes and user data.
- **Mongoose:** Mongoose is an ODM (Object Data Modeling) library for MongoDB.
- **JSON Web Tokens (JWT):** JWT is used for user authentication.
- **bcrypt:** For hashing and salting user passwords.
- **CORS:** Enables cross-origin requests for the frontend.

## API Endpoints

- **POST /api/auth/register:** Register a new user.
- **POST /api/auth/login:** Log in with a registered user.
- **GET /api/read/:userId:** Fetch all notes of a specific user.
- **POST /api/create/:userId:** Create a new note for a specific user.
- **GET /api/:userId/note/:noteId:** Fetch a specific note by ID.
- **PUT /api/update/:userId/:noteId:** Update a specific note.
- **DELETE /api/delete/:userId/:noteId:** Delete a specific note.
- **PUT /api/archive/:userId/:noteId:** Archive a specific note.
- **PUT /api/unarchive/:userId/:noteId:** Unarchive a specific note.

## Authentication

This backend server uses JSON Web Tokens (JWT) for user authentication. When a user registers or logs in, they receive a JWT token that they must include in the headers of their requests to access protected routes.

## Error Handling

The server is equipped with error handling to provide informative error responses. If an error occurs, the server will respond with a status code and a message describing the error.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request with your changes. Your contributions are highly appreciated!

