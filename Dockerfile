### STAGE 1: Build ###
# FROM node:16.14.0-alpine3.15  AS builder
FROM nginx:1.22.0-alpine as base-nginx
RUN apk update && \
    apk upgrade --available && sync && \
    apk add --no-cache \
    bash \
    tzdata
ENV TZ=Asia/Bangkok \
    NODE_ENV=development

# Install app dependencies
FROM node:16.14.0-alpine3.15 as base-node
# RUN apt-get update \
#     && apt-get install -y --no-install-recommends \
#     && rm -rf /var/lib/apt/lists/*
WORKDIR /app

ARG NPM_TOKEN="${NPM_TOKEN}" 
COPY package.json ./
RUN npm config set registry http://registry.npmjs.org/
#RUN npm set registry=https://registry.npmjs.org/ 
RUN npm cache clean --force && rm -rf node_modules && npm install --force
# RUN yarn

# build stage
FROM base-node as build
ENV NODE_ENV=development
COPY . ./
# RUN yarn build
RUN npm run build


# production stage
FROM base-nginx as release
# COPY --from=build /app/public /usr/share/nginx/html/public
COPY --from=build /app/dist/bonwattana-web /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 4200:80

CMD ["nginx", "-g", "daemon off;"]