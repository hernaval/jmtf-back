FROM node:14.15.4-alpine as development

LABEL maintainer="hernavalasco@gmail.com"

# create app directory
WORKDIR /usr/src/app

# Install fresh dependencies
COPY package.json yarn.lock ./

RUN yarn --pure-lockfile --only=development

# Copy important files. COPY .. if all file
COPY . .

# Build NestJs project
RUN yarn build

FROM node:14.15.4-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /user/src/app

COPY package.json yarn.lock ./

RUN yarn --pure-lockfile --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist
# as we are using microservice, first we start one with API endpoint,
# then the last one with RMQ transport
CMD ["node", "dist/apps/warehouse-back/main"]







