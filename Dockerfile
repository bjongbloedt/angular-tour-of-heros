FROM nginx:alpine

# Copy src
COPY dist/ /usr/share/nginx/html

# Copy server directive for nginx
COPY nginx/nginx.default.conf /etc/nginx/conf.d/default.conf

# Copy config for nginx
COPY nginx.conf /etc/nginx/nginx.conf

