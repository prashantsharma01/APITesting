# API Testing using Javascript

In this, I used the Supertest NPM Package, Cucumber BDD Framework & cucumber-html-reporter as a Reporting Tool


## NOTE
* Before running the project Please add your API Key in features/info.js

```bash
Scenario: Successfully register two stations
Then I try to register a weather station With API Key EnterYourApiKeyHere

Scenario: Using GET/stations verify that stations were successfully stored in DB
Then I try to register a weather station With API Key EnterYourApiKeyHere
```

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Dependencies.

```bash
$ npm install
```

## To run the project

type 
```bash
$ npm run test
```
this will run the project and create a JSON File in the report folder

## to view HTML report

type 
```bash
$ node index.js
```

this will generate an HTML report and open the report in a browser
