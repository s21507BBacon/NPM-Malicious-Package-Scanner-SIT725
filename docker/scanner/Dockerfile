# Use an official Node runtime as the parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy project files into the docker image
COPY . .

# Make port 3000 available outside this container
EXPOSE 3000

# Define the command to run your scanner app
CMD [ "node", "src/scanner.js" ]