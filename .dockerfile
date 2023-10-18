# Use the official Node.js 16 image as the base image
FROM node:16

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your Nest.js application will run on (default is 3000)
EXPOSE 3000

# Start the Nest.js application
CMD ["npm", "start"]
