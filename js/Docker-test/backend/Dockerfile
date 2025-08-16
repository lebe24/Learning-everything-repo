# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install nodemon globally first
RUN npm install -g nodemon

# Copy package.json and package-lock.json (if available)
COPY package*.json  ./

# Install dependencies
RUN npm install

# Copy nodemon configuration
COPY nodemon.json ./

# Copy the rest of the application code
COPY ./ ./

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application with nodemon
CMD ["npm", "run", "dev"]