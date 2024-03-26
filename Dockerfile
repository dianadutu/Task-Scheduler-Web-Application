# Use an official Node.js image as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose port 5000, which is the default for serve
EXPOSE 3000

# Start the app using serve
CMD ["serve", "-s", "build"]
