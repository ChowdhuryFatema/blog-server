# Bike Store Backend

The **Bike Store Backend** is a server-side application built using **Node.js**, **Express.js**, **Mongoose**, and **TypeScript**. It provides a comprehensive API for managing bikes and orders, ensuring seamless data handling and efficient CRUD operations with MongoDB.

---

## Features

- **Bike Management**: Add, update, retrieve, and delete bikes from the inventory.
- **Order Management**: Place, retrieve, update, and cancel orders for bikes, with each order linked to a specific bike via a reference ID.
- **Relationships**: Ensures data integrity with MongoDB references between bikes and orders.
- **TypeScript**: Implements type-safe development for improved maintainability and scalability.
- **Error Handling**: Centralized middleware for error validation and responses.
- **Authentication (Optional)**: Supports token-based authentication for protected endpoints.

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
   git clone https://github.com/ChowdhuryFatema/bike-store-server.git
   cd bike-store-server
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

   SP_ENDPOINT=
   SP_USERNAME=
   SP_PASSWORD=
   SP_PREFIX=
   SP_RETURN_URL=
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


