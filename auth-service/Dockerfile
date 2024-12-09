# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies, including building native modules
RUN npm install --build-from-source

# Copy the rest of your application files
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Command to run your Node.js application
CMD ["node", "src/server.js"]
