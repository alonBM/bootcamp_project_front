# Bootcamp Project

Demo app is available at:

This project was built with Angular 10 and Angular Material. Is an hospital information system application.

The backend, built with NestJS and MongoDB can be found at my other repo:

The project documentation is located at:

## Instructions to run locally with your own MongoDB

1. Install Node and Angular CLI.
2. Create a MongoDB Atlas account and a database.
3. Clone or download the frontend repo and run `npm install`.
4. Clone or download the backend repo and run `npm install`
5. In the frontend's `index.html`, change `<base href="/HIS-app/" />` to `<base href="/" />`
6. In the backend's root, create an `.env` file and add your own MongoDB credentials.
7. In the frontend, change the services' `BASE_API_URL` variable to `http://localhost`.
8. Run `npm start` on both terminals. Now the app will be running at http://localhost:4200/

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ ng serve

# build
$ ng build
```
