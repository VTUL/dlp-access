# IAWA version 2


## Design
* Data Model
  * [Collection & Archive data schema](docs/data_model.md)

* AppSync
  * GraphQL API: collectionarchives
  * [Query examples](docs/appsync.md)

## Deployment
* Prerequisites
```
npm install -g @aws-amplify/cli
brew install yarn
```

* Environments

| Environment | Development | Pre-Production | Production |
|:-----------:|:-----------:|:--------------:|------------|
| GitHub      |     dev     |      pprd      |    master  |
| Amplify     |     dev     |      pprd      |    master  |

## Running the tests
* End-to-end testing framework [Cypress.io](https://www.cypress.io/)
  * Start local server using ```npm start```
  * Launch the Cypress app ```node_modules/.bin/cypress open```

## Documents
* [Development workflow](https://aws-amplify.github.io/docs/cli-toolchain/quickstart#concepts-1)
* [Design documents](docs/)