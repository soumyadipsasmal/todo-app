# ---- Base image ----
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for Docker layer caching)
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 4000

# Start the server
CMD ["node", "src/index.js"]
