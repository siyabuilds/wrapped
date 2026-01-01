# Build React Frontend
FROM node:24 AS client-build

WORKDIR /app/client

# Install dependencies
COPY client/package*.json ./
RUN npm install

# Copy source and public assets
COPY client/tsconfig*.json client/vite.config.ts client/index.html client/components.json ./
COPY client/public ./public
COPY client/src ./src

# Build React for production
RUN npm run build


# Run Express Backend
FROM node:24

WORKDIR /app/backend

# Install backend dependencies
COPY backend/package*.json ./
RUN npm install --production

# Copy backend source
COPY backend .

# Copy React build from previous stage
COPY --from=client-build /app/client/dist ./public

# Expose the backend port
EXPOSE 3001

# Start the backend server
CMD ["npm", "start"]

ENV NODE_ENV=production