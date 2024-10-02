FROM node:18

# Set the working directory
WORKDIR /src/app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Install Playwright dependencies
RUN npx playwright install-deps

# Copy the rest of your application code
COPY . .

# Build the Next.js app
RUN npm run build

# Set the command to run your app
CMD ["npm", "start"]
