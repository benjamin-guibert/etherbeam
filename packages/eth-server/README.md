# Etherbeam Ethereum Server

> Etherbeam's server dedicated to communication with the Ethereum blockchain.

## Table Of Contents

- [Built With](#built-with)
- [Usage](#usage)
- [Deployment](#deployment)

## Built With

[Node.js](https://nodejs.org) | [TypeScript](https://www.typescriptlang.org) | [Jest](https://jestjs.io) | [Eslint](https://eslint.org) | [Prettier](https://prettier.io) | [axios](https://github.com/axios/axios) | [Pino](https://getpino.io/#/) | [Web3](https://web3js.readthedocs.io) | [Uniswap SDK](https://github.com/Uniswap/uniswap-sdk)

## Usage

- Install the dependencies:

```bash
yarn install
```

- Create the `.env` file from [.sample.env](.sample.env) and modify its values (see [Ethers provider](#ethers-provider))):

```bash
cp ./.sample.env .env
```

- Run the server in a Docker container:

```bash
docker-compose up eth-server
```

- Or run the server locally:

```bash
yarn dev
```

See [docker-compose](../../docker-compose.yml) configuration & the [Dockerfile](Dockerfile).

## Deployment

The server can be deployed in a Docker container:

```bash
docker-compose up --build eth-server
```

## Ethers provider

This server uses [Ethers](https://docs.ethers.io/) to fetch the blockchain data. It looks for the three following ways to create a provider (in this order):

1. Geth IPC file located at `./geth/geth.ipc`

1. URL `ETH_HOST` in [.env](.sample.env)

1. Infura with `ETH_INFURA_API_KEY` in [.env](.sample.env)
