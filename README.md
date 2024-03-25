
## 🚀 First Clone (Recomendation use Docker)

## With docker
  - Run command on terminal ubsernap-backend-test

    ```bash
    npm i 
    ```
  - Run comand on terminal directory 

    ```bash
    docker-compose -f docker-composer.yml up -d
    ```

## Without docker
- **Project** ubersnap-backend-test
  - **Update .env.local:** example 
    ```bash
    APP_PORT=3030
    RABBIT_HOST=amqp://userexample:passexample@hostexample:portexample
    ```
  - **Run command** on terminal ubersnap-backend-test for install package
    ```bash
    npm i
    ```
  - **Run command** for running project ubersnap-backend-test
    ```bash
    npm run dev:local
    ```

## Package 

**- Ubersnap Test Backend:** @types/amqplib, @types/cors, @types/express, @types/http-errors, @types/node, amqplib, nodemon, ts-node, typescript, env-cmd, axios, express-validator


## Tech Stack

**Server:** Node, Express, Typescript

**Message Queue:** RabbitMq



