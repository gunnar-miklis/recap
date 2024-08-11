## INTRODUCE AXIOS

> **axios + external api**

## Description

- make API call with axios
- add event listener on button click
- post response to DOM

### external API

- call: https://restcountries.com/v3.1/name/{country}
- select "capital" and "cca2" (country code) from response

## Run

1. just open index.html in browser
2. type a country name in the input field (poland, france, germany, etc.)

## Example

- Input field: `germany` > _fetch api..._ > Result: `DE: Berlin`
- Input field: `spain` > _fetch api..._ > Result: `ES: Madrid`

## Endpoints

| endpoints       | method | uri                                         |
| --------------- | ------ | ------------------------------------------- |
| country by name | GET    | https://restcountries.com/v3.1/name/country |
