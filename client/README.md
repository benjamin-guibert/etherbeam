# Estherbeam Client

> Etherbeam's client side.

## Table Of Contents

- [Built With](#built-with)
- [Setup](#setup)
- [Usage](#usage)
- [Deployment](#deployment)
- [Storybook](#storybook)
- [Scripts](#scripts)

## Built With

[Node.js](https://nodejs.org) |
[TypeScript](https://www.typescriptlang.org) |
[React](https://reactjs.org) |
[React Router](https://reactrouter.com) |
[Sass](https://sass-lang.com) |
[webpack](https://webpack.js.org) |
[Babel](https://babeljs.io) |
[Eslint](https://eslint.org) |
[Prettier](https://prettier.io) |
[Jest](https://jestjs.io) |
[Enzyme](https://enzymejs.github.io) |
[Storybook](https://storybook.js.org) |
[Font Awesome](https://fontawesome.com) |
[Lodash](https://lodash.com) |
[Moment.js](https://momentjs.com) |
[Numeral.js](http://numeraljs.com) |
[Ethers](https://docs.ethers.io/) |
[Trading View](https://www.tradingview.com/)

## Setup

- Install the dependencies:

```bash
yarn lerna bootstrap
```

- Create the `.env` file from [.sample.env](.sample.env):

```bash
cp ./.sample.env ./.env
```

## Usage

- Run the client locally in development mode:

```bash
yarn dev
```

- The application will be available from `http://localhost:3000` by default.

## Deployment

- The application can be built: (deployed files are located in the `dist`
  repository):

```bash
yarn build
```

## Storybook

- Run the storybook locally in development mode:

```bash
yarn sb
```

- The storybook will be available from `http://localhost:6006` by default.

- The storybook can also be built:

```bash
yarn sb:build
```

## Scripts

- `yarn dev`: See [Usage](#usage).
- `yarn build`: See [Deployment](#deployment).
- `yarn sb`: See [Storybook](#storybook).
- `yarn sb:build`: See [Storybook](#storybook).
- `yarn format`: Format the code, apply needed modifications.
- `yarn lint`: Check the code quality.
- `yarn test`: Test the code and generate the test coverage.
- `yarn test:watch`: Watch for modifications to run the tests.
- `yarn test:update`: Test the code and update snapshots.
