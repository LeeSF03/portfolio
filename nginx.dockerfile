FROM nginx:1.27.3-alpine
COPY .next/static /var/www/portfolio/_next/static
EXPOSE 80
STOPSIGNAL SIGTERM
CMD ["nginx", "-g", "daemon off;"]
