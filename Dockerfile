FROM nginx:alpine

COPY index.html /usr/share/nginx/html/
COPY style/ /usr/share/nginx/html/style/
COPY script/ /usr/share/nginx/html/script/

EXPOSE 80