FROM node:alpine
WORKDIR /app

ENV DOCKERIZE_VERSION v0.7.0

RUN apk update --no-cache \
    && apk add --no-cache wget openssl \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apk del wget

COPY ./src/package.json ./src/package-lock.json ./
RUN npm install
COPY ./src/index.js .

EXPOSE 3000
ENTRYPOINT [ "node", "index.js" ]
