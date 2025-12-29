FROM node:24

# Set working directory
WORKDIR /usr/src/app/backend

# Copy package files and install dependencies
COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["npm", "start"]