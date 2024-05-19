# Use nginx latest image
FROM nginx

# Copy sources files
COPY . /usr/share/nginx/html

# Declaring the volume for data persistence
VOLUME /usr/share/nginx/html/images

# Open port 5000
EXPOSE 5000

# Start server
CMD ["nginx", "-g", "daemon off;"]