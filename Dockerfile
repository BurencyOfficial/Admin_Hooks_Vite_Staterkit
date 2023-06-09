FROM node:16-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

ARG NPM_AUTH_TOKEN
RUN /bin/echo "//registry.npmjs.org/:_authToken=$NPM_AUTH_TOKEN" > .npmrc
RUN apk add --no-cache python3 py3-pip make g++
RUN npm install --force

COPY . .

RUN npm run build
RUN npm install -g serve
EXPOSE 8000

CMD ["serve -l 8000 -s dist"]