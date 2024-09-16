# TAMK DEMO APP 

This is a simple full-stack web application built with **Node.js**, **Express**, **MongoDB**, and **Materialize CSS** for the front-end. The back-end is built using Node.js and Express, and MongoDB is used as the database to store tasks. The application is containerized using **Docker** and managed with **Docker Compose**.

## Features

- Add tasks to the to-do list
- View all tasks
- Delete tasks
- Persistent storage of tasks using MongoDB

## Technologies Used

- **Frontend**: HTML, Materialize CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MongoDB (using Mongoose for ODM)
- **Containerization**: Docker, Docker Compose

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker**: [Download and install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Download and install Docker Compose](https://docs.docker.com/compose/install/)

## Local Development

### Step 1: Clone the repository

Clone this repository

### Step 2: Project Structure
Here is the folder structure of the project:

```
project-folder/
├── public/               # Frontend files (HTML, JS)
│   ├── index.html        # Main HTML file
│   ├── script.js         # Frontend logic
├── server.js             # Backend server (Node.js, Express)
├── package.json          # Node.js dependencies and scripts
├── package-lock.json     # Dependency lockfile
├── Dockerfile            # Dockerfile for Node.js app
├── docker-compose.yml    # Docker Compose for multi-container setup
└── README.md             # Project documentation (this file)
```

### Step 3: Build and run the application using Docker Compose
The application is containerized, and both the Node.js app and MongoDB database will be managed by Docker Compose.

To start the application, run the following command:

```bash
docker-compose up --build
```

This will:

Build the Node.js app and start it on port 3000.
Start a MongoDB container on port 27017 and persist data using Docker volumes.
Once the containers are up and running, you can access the application in your browser at: [http://localhost:3000](http://localhost:3000)

### Step 4: Stopping the application
To stop the application and bring down the containers, use:

```bash
docker-compose down
```

If you want to remove the containers and the MongoDB data, run:

```bash
docker-compose down -v
```

### Step 5: Environment Variables
By default, the application connects to the MongoDB instance using the URL mongodb://mongo:27017/todolist (defined in the Docker Compose file). In local development (outside of Docker), you can modify the connection string inside server.js:

```javascript
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/todolist';
```

## Docker Configuration
### Dockerfile
Here is the Dockerfile for the Node.js app:
```dockerfile
# Dockerfile for Node.js To-Do App

# Use an official Node.js runtime as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire project into the working directory
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
```

### Docker Compose
Here is the docker-compose.yml file:

```docker-compose.yml
services:
  # Node.js Application
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - mongo
    environment:
      - MONGO_URL=mongodb://mongo:27017/todolist
    volumes:
      - .:/app
    networks:
      - todonet

  # MongoDB Service
  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    networks:
      - todonet

# Create a shared network for communication
networks:
  todonet:

# Persistent volume for MongoDB data
volumes:
  mongo-data:

```

### MongoDB Data Persistence
The MongoDB container uses a Docker volume to persist data. Even if the MongoDB container is stopped or removed, the data will be retained in the mongo-data volume. If you want to clear the data, you can remove the volume using:

```bash
docker-compose down -v
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.
