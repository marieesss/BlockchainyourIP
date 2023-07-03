
## Description

Application pour l'entreprise BlockchainYourIp, cette application permet en tant qu'utilisateur de voir les guides numériques, de s'inscrire à des formations (conférences, séminaires) liés à des guides. L'administrateur peut créer des guides et créer des formations en les liant à des guides. 

## Prérequis
- Docker Desktop
- Node js 
- Postgresql

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Env File

Fichier .env à la racine du dossier api est très important 

```
POSTGRES_HOST= lien vers la db
POSTGRES_PORT= port de la db
POSTGRES_USER= utilisateur de la db
POSTGRES_PASSWORD= mot de passe pour la db
POSTGRES_DB= nom de la db
PORT= port de l'application
JWT_SECRET= secret pour création des token 
PGADMIN_DEFAULT_EMAIL= email admin db pour db de docker 
PGADMIN_DEFAULT_PASSWORD= mot de passe admin pour db de docker
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - Marie Espinosa



