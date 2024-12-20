# level2api

## Overview
`level2api` is a Node.js application built with Express.js that provides API endpoints for managing cars and orders. This project offers a basic inventory management system.

## Getting Started

### Prerequisites
- Node.js (>= 14.x)
- npm (>= 6.x)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/level2api.git
    ```
2. **Navigate into the project directory:**
    ```bash
    cd level2api
    ```
3. **Install the dependencies:**
    ```bash
    npm install
    ```

### Running the Server

To start the server in development mode:

1. **Open the project in VS Code:**
    ```bash
    code .
    ```
2. **Open the terminal (Ctrl+J) and start the server:**
    ```bash
    npm run start:dev
    ```

The server will start and listen on port 5000. You can then access the API endpoints using a browser or a tool like Postman.

## API Endpoints

### cars

- **Get all cars:**
    ```http
    GET http://localhost:5000/api/cars
    ```
    This endpoint returns a list of all cars.

### Orders

- **Get all orders:**
    ```http
    GET http://localhost:5000/api/orders
    ```
    This endpoint returns a list of all orders.

