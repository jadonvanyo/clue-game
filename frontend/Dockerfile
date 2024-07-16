# Use the official Node.js image as a base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /frontend

# Copy the package.json and package-lock.json files
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install a simple static file server
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist"]