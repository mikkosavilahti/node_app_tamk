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
