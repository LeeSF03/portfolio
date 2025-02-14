FROM nginx:1.27.3-alpine
RUN touch /var/log/nginx/json_access.log
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
STOPSIGNAL SIGTERM
CMD ["nginx", "-g", "daemon off;"]
