FROM node:latest

WORKDIR /app

COPY . .

EXPOSE 3000

RUN yarn lerna run build --scope @cryptotentanz/api-client
RUN yarn install --non-interactive

CMD yarn start
