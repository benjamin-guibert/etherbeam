# Etherbeam Server

> Etherbeam's server side.

## Table Of Contents

- [Built With](#built-with)
- [Usage](#usage)
- [Deployment](#deployment)

## Built With

[Ruby on Rails](https://rubyonrails.org) | [PostgreSQL](https://www.postgresql.org) | [Docker](https://www.docker.com) | [RSpec](https://rspec.info) | [Factory Bot](https://github.com/thoughtbot/factory_bot) | [Shoulda Matchers](https://matchers.shoulda.io) | [Rubocop](https://rubocop.org) | [Pagy](https://github.com/ddnexus/pagy)

## Usage

- Install the dependencies:

```bash
bundle install
```

- Run the database:

```bash
docker-compose up database
```

- Initilize the database:

```bash
rails db:setup
```

- Run the server in a Docker container:

```bash
docker-compose up server
```

- Or run the server locally:

```bash
yarn dev
```

- The API will be available from `http://localhost:3001` by default.

See [docker-compose](../../docker-compose.yml) configuration & the [Dockerfile](Dockerfile).

- Display the routes:

```bash
rails routes
```

## Deployment

The server can be deployed in a Docker container:

```bash
docker-compose up --build server
```
