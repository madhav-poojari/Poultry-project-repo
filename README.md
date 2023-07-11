<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Poultry project, backend server application to maintain  a poultry farm.
<br> Created and maintained by Madhava Poojari

You can find the swagger for the application (when run locally) at http://localhost:3000/api


Features:<br>
Role based access to endpoints:<br>
The access to the endpoints is restricted based on the roles that a person uses/loggs in with.
the role is stored in the JWT Token. only a admin can give the roles.
Roles:<br>
-Admin<br>
-Accountant<br>
-Region Manager<br>
-Site Manager<br>
-Shed Manager<br>
<br>

CRUD Operations for various functionalty like - Users, inventory , transactions, sheds ,tasks for the admin role <br>
other roles only have read access as per their hierarchy , and post roles. 
<br>
<br> checkout documentation folder , has a detailed description for the project folder structure.

## Installation

```bash
$ npm install
```

## Running the app
make sure to configure the Environment variables in the constants.ts file for things such as the DB URL,JWT-Secret etc 
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
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



