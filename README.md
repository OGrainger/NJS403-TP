# WIK-NJS-403
[![Build Status](https://travis-ci.org/OGrainger/NJS403-TP.svg?branch=master)](https://travis-ci.org/OGrainger/NJS403-TP)
[![codecov](https://codecov.io/gh/OGrainger/NJS403-TP/branch/master/graph/badge.svg)](https://codecov.io/gh/OGrainger/NJS403-TP)


![Image of Yaktocat](https://i.imgur.com/xLFhxqv.png)

- [x] GL-0
- [x] GL-1
- [x] GL-2
- [x] GL-3
- [x] GL-4
- [x] GL-5
- [x] GL-6

## Getting started

### Prerequisite

 - Mocha ( `npm install -g mocha` )

`npm install`

### Launch server

`npm start`

### Launch test

`npm test`

### Launch test with watch
`npm run test:watch`

### Code Coverage
`npm run cover`

## Interactions

- GET /courses-list => fetches all lists
- POST /courses-list (body example : {'name': 'list_test'}) => creates a list
- DELETE /courses-list/<LIST_UUID>  => deletes given list

- GET /courses-list/<LIST_UUID>/articles  => fetches all articles belonging to given list
- POST /courses-list/<LIST_UUID>/articles (body example : {'name':'article_test'}) => creates an article for given list
- PUT /courses-list/<LIST_UUID>/articles/<ARTICLE_UUID>/bought  => updates given article as bought

## Credits

- **Oscar Grainger** - _oscarvgrainger@gmail.com_
- **Clément Lambert** - _clement.lambert@ynov.com_
