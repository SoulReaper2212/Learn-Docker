# Step 1: Specify the base image
FROM node:14 AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Serve the app using a lightweight web server
FROM nginx:alpine

# Step 8: Copy the build files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose the port the app runs on
EXPOSE 80

# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
