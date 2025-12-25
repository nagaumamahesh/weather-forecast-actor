# Use official Apify SDK image
FROM apify/actor-node:20

# Copy package files
COPY package*.json ./

# Install ALL dependencies including devDependencies
RUN npm ci --include=dev

# Copy source code
COPY . ./

# Build TypeScript
RUN npm run build

# Remove devDependencies to reduce image size
RUN npm prune --production

# Run the Actor
CMD npm start
