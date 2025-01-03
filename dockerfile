FROM node:22-alpine
WORKDIR /app
COPY . /app
COPY package.json /app
COPY yarn.lock /app
RUN if [ "$NODE_ENV" = "production" ]; \
    then yarn install --production && yarn build; \
    else yarn install; \
    fi
EXPOSE $PORT
CMD ["yarn", "start"]
