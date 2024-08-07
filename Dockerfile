# Use an official Node.js image as the base image, based on Ubuntu
FROM node:18-bullseye

# Install dependencies needed by @next/swc
# Update apt package list and install libc6-compat equivalent
RUN apt-get update && \
    apt-get install -y --no-install-recommends libstdc++6 && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /opt/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev"]