FROM node:19-alpine3.16 As development

WORKDIR /usr/src/app

COPY package*.json ./

ARG NPM_AUTH_TOKEN
RUN /bin/echo "//registry.npmjs.org/:_authToken=$NPM_AUTH_TOKEN" > .npmrc

RUN npm install

COPY . .

RUN npm run build
RUN npm install -g serve
EXPOSE 8000

CMD ["serve -l 8000 -s dist"]