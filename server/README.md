# Etherbeam Server

> Etherbeam's server side.

## Table Of Contents

- [Built With](#built-with)
- [Setup](#setup)
- [Usage](#usage)
- [Deployment](#deployment)
- [Scripts](#scripts)

## Built With

[Ruby on Rails](https://rubyonrails.org) |
[PostgreSQL](https://www.postgresql.org) |
[Docker](https://www.docker.com) |
[Rubocop](https://rubocop.org) |
[RSpec](https://rspec.info) |
[Factory Bot](https://github.com/thoughtbot/factory_bot) |
[Shoulda Matchers](https://matchers.shoulda.io) |
[dotenv](https://github.com/bkeepers/dotenv) |
[whenever](https://github.com/javan/whenever) |
[Devise](https://github.com/heartcombo/devise) |
[Devise Token Auth](https://github.com/lynndylanhurley/devise_token_auth) |
[Pagy](https://github.com/ddnexus/pagy)

## Setup

- Install the dependencies:

```bash
bundle install
```

- Run the database (see [Usage](#usage))

- Initilize the database:

```bash
rails db:setup
```

See [docker-compose](../../docker-compose.yml) configuration & the [Dockerfile](Dockerfile).

## Usage

- Run the database:

```bash
docker-compose up database
```

- Run the server locally in development mode:

```bash
yarn dev
```

- Or run the server in a Docker container:

```bash
docker-compose up --build server
```

- The API will be available from `http://localhost:3001` by default.

## Deployment

- Create the `.env` file from [.env.sample](.env.sample) and modify its values

```bash
cp .env.sample .env
```

- Deploy the server in a Docker container:

```bash
docker-compose -f docker-compose.production.yml up --build server
```

## Scripts

- `yarn dev`: Run the server in development mode.
- `yarn format`: Format the code, apply needed modifications.
- `yarn lint`: Check the code quality.
- `yarn test`: Test the code.
- `yarn routes`: Display the routes.
