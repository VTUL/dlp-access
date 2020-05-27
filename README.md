# VTDLP - Amplify

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

## Amplify Environment variables
```
REACT_APP_REP_TYPE=IAWA (e.g. IAWA, SWVA, etc)
REACT_APP_CONFIG_PATH="https://vtdlp-dev-site-data.s3.amazonaws.com"
```

## Environments
| Environment | Development | Pre-Production | Production |
|:-----------:|:-----------:|:--------------:|------------|
| GitHub      |     dev     |      pprd      |    master  |
| Amplify     |     dev(devupdate)     |      pprd      |    master  |

## Amplify CLI
* Version: 4.13.1 as 02/04/2020

## Running the tests
* End-to-end testing framework [Cypress.io](https://www.cypress.io/)
  * Start local server using ```REACT_APP_REP_TYPE=IAWA REACT_APP_CONFIG_PATH="https://vtdlp-dev-site-data.s3.amazonaws.com" npm start```
  * Launch the Cypress app ```yarn run cypress open```

## Documents
* [Development workflow](https://aws-amplify.github.io/docs/cli-toolchain/quickstart#concepts-1)
* [Design documents](docs/)