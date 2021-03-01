FROM node:latest

WORKDIR /app

COPY . .

EXPOSE 3000

RUN yarn install --non-interactive

RUN yarn lerna run build --scope @cryptotentanz/api-client

CMD yarn start
