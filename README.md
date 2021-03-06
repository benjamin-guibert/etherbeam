# Etherbeam

> Ethereum cryptocurrency tracker

![Test](https://github.com/benjamin-guibert/etherbeam/workflows/Test/badge.svg?branch=main)
![Deploy Server](https://github.com/benjamin-guibert/etherbeam/workflows/Deploy%20Server/badge.svg?branch=main)
![Deploy Client](https://github.com/benjamin-guibert/etherbeam/workflows/Deploy%20Client/badge.svg?branch=main)
[![license-shield]](LICENSE)

## Table of Contents

- [Stack](#stack)
- [Scripts](#scripts)
- [Release History](#release-history)
- [Versionning](#versionning)
- [Authors](#authors)
- [License](#license)

## Stack

- [Server](server/README.md): Server side.
- [Ethereum Server](eth-server/README.md): Server dedicated to communication with the Ethereum blockchain.
- [Client](client/README.md): Client side.

## Scripts

- `yarn dev`: Run the stack in development mode.
- `yarn dev:server`: Run the server in development mode.
- `yarn dev:eth-server`: Run the Ethereum server in development mode.
- `yarn dev:client`: Run the client in development mode.
- `yarn format`: Format the code, apply needed modifications.
- `yarn lint`: Check the code quality.
- `yarn test`: Test the code.

## Release History

Check the [`CHANGELOG.md`](CHANGELOG.md) file for the release history.

## Versionning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository][tags-link].

## Authors

- **[Benjamin Guibert](https://github.com/benjamin-guibert)**: Creator & main contributor

See also the list of [contributors][contributors-link] who participated in this project.

## License

[![license-shield]](LICENSE)

This project is licensed under the MIT License - see the [`LICENSE`](LICENSE) file for details

[contributors-link]: https://github.com/benjamin-guibert/etherbeam/contributors
[license-shield]: https://img.shields.io/github/license/benjamin-guibert/etherbeam.svg
