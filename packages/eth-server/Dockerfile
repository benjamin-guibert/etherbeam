FROM node:latest

WORKDIR /app

COPY . .

EXPOSE 3000

RUN yarn install --non-interactive

CMD SERVER_API_HOST=http://server:3000/ yarn start
