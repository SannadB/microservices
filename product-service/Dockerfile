# Use the official Node.js image as the base
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install Strapi and other dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that Strapi will run on
EXPOSE 1337

# Start the Strapi server
CMD ["npm", "run", "develop"]
