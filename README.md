<img width="150" src="https://i.cloudup.com/zfY6lL7eFa-3000x3000.png" />
<img width="50" src="https://angular.io/resources/images/logos/angular2/angular.svg" />
<img width="200" src="https://www.rabbitmq.com/img/rabbitmq_logo_strap.png" />

## Angular2 Express IoT management project

- Forked from [Angular2 Express Starter](https://github.com/vladotesanovic/angular2-express-starter)
- MySQL
- RabbitMQ
- Angular 2
- ExpressJS
- Webpack
- Redux


## Install / Development

Expectations:

- There is an MQTT and MySQL server running on localhost
  - MQTT Server listens on /info/temp and reports back on /info/reporting channels
  - Connection configuration for both can be found in server/config.ts

```bash
git clone https://github.com/dsmiller95/IoTServer
cd IoTServer

# Install dependencies
npm install

# start server
npm run start

# Client url: http://localhost:4200
# Application ( epxress ) API: http://localhost:4300
```

## Build / Production

```bash

npm run build

## Deploy dist folder to app server

Structure of dist folder:

/dist/server <-- expressjs
/dist/client <-- angular2

```


