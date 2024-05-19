# Use nginx latest image
FROM nginx

# Copy sources files
COPY ./app/ /usr/share/nginx/html

# Open port 80
EXPOSE 80

# Start server
CMD ["nginx", "-g", "daemon off;"]