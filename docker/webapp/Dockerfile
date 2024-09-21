# Web App Dockerfile
# Created by Bryce Bacon on 21/09/2024

# Use Node.js as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY ../../package*.json ./

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
