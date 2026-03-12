### STEP 3 — Select ALL content
Press **Ctrl + A** to select everything

### STEP 4 — Delete everything
Press **Delete** key

### STEP 5 — Type this manually (don't copy paste!):
```
# Build Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve Stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]