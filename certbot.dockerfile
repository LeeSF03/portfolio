FROM alpine:3.21.2
RUN apk update
RUN apk add certbot
COPY ./deployment/crontab /var/spool/cron/crontabs/root
RUN sed -i 's/\r$//' /var/spool/cron/crontabs/root
CMD ["crond", "-f"]
