FROM node:22-alpine
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn
RUN if [ "$NODE_ENV" = "production" ]; \
    then yarn install --production; \
    else yarn install; \
    fi
COPY . /app
EXPOSE $PORT
CMD ["yarn", "dev"]
