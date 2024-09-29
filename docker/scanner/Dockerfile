# Scanner Dockerfile
# Created by Bryce Bacon on 21/09/2024

# Use Node.js as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/scanner

# Copy package.json and package-lock.json files
COPY ../../package*.json ./

# Install all dependencies (both prod and dev)
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port (optional)
EXPOSE 3001


# Define the command to run the scanner service
CMD ["npm", "run", "scanner"]
