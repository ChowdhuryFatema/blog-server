# Blog Backend

The **Blog** is a server-side application built using **Node.js**, **Express.js**, **Mongoose**, and **TypeScript**. It provides a comprehensive API for managing blogs, users, and admins, ensuring seamless data handling and efficient CRUD operations with MongoDB. Authentication and authorization are implemented using **JWT Tokens**, along with **Zod validation**.

---

## Features

- **Blog Management**: Add, update, retrieve, and delete blog entries in the system.
- **user Management**: Manage users, including retrieving, updating, and deleting user information.
- **Relationships**:  Ensures data integrity with MongoDB references between users, blogs, and associated entities.
- **TypeScript**: Provides type-safe development for improved maintainability and scalability.
- **Error Handling**: Centralized middleware for error validation and responses.
- **Authentication and Authorization**: 
   - User Roles:
      - Users can update only their own blogs.
      - Admins can delete any blog but cannot update blogs.
      - Admins can block users for any inappropriate actions.
   - All actions require the user to be logged in first via token-based authentication.

---

## Tech Stack

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB (via Mongoose)
- **Language**: TypeScript

---

## Getting Started

### Prerequisites

1. Install **Node.js**.
2. Install **npm** or **yarn**.
3. Ensure **MongoDB** is running (either locally or via a cloud service).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ChowdhuryFatema/blog-server.git
   cd blog-server
   Install dependencies:
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the root directory and configure the following variables:

   ```bash
   NODE_ENV=
   PORT=
   DATABASE_URL=
   BCRYPT_SALT_ROUND=
   DEFAULT_PASS=
   JWT_ACCESS_SECRET=
   JWT_REFRESH_SECRET=
   JWT_ACCESS_EXPIRES_IN=
   JWT_REFRESH_EXPIRES_IN=
   ```

4. Build the project:

   ```bash
   npm run build
   ```

5. Start the development server:

   ```bash
   npm run start:dev
   ```

6. Start the production server:

   ```bash
   npm run start
   ```


