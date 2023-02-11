# API Planner

REST API developed for CompassUOL's Node JS internship, its objective is to provide routes for managing and controlling events, login and user registration.

## 💻 Installing the Api Planner

### Requirements

Para instalar a projeto e rodar a API, you must have installed on your device:

- [Node.js](https://nodejs.org)
- [Postman](https://www.postman.com)
- [VSCode](https://code.visualstudio.com) (Optional)

### Installation

Clone the project to a folder on your device or download a zipped copy and then unzip it to your device folder.

```
git clone https://github.com/EduardoSLuz/api-planner.git
```

In the project folder, open a terminal and run the following command:

```
npm install
```

The above command will download all necessary project dependencies.

## 🚀 Starting the Api Planner

Once you've installed all the dependencies, it's time to start the API server, so make sure your terminal is accessing your project folder, then start the server with the following command:

```
npm start
```

This command will automatically compile the TypeScript code to JavaScript (in the `/dist` directory) and then run the API

If the terminal does not show any errors, then the API is ready to be used .

## ☕ Using the Api Planner

It is recommended to use [POSTMAN](https://www.postman.com) to perform the requests.

Now in POSTMAN, use "[http://localhost:8000](http://localhost:8000) + route" para realizar as requisições, to perform the requests, see the available routes below.

## Event Routes

### `GET` All events

_This route will return all registered event_

```
localhost:8000/api/v1/events
```

Example response:

```json
[
  {
    "_id": "1",
    "description": "Example description",
    "dateTime": "2023-02-10T14:47:32.962Z",
    "createdAt": "2023-02-10T14:47:32.962Z"
  }
]
```

### `GET` Event by id

_This route will return an event of the given id_

```
localhost:8000/api/v1/events/{id}
```

_The `id` parameter must be a number_

Example response:

```json
{
  "_id": "1",
  "description": "Example Description",
  "dateTime": "2023-02-10T14:47:32.962Z",
  "createdAt": "2023-02-10T14:47:32.962Z"
}
```

### `GET` Events by weekday

_This route will return all registered events on the informed weekday_

```
localhost:8000/api/v1/events/{weekday}
```

_Accepted values ​​for weekday:_ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"

Example response:

```json
[
  {
    "_id": "2",
    "description": "Example Description2",
    "dateTime": "2023-02-11T14:47:32.962Z",
    "createdAt": "2023-02-11T14:47:32.962Z"
  }
]
```

### `POST` Create event

_This route will create an event_

```
localhost:8000/api/v1/events
```

Example request body:

```json
{
  "description": "Example Request Description",
  "dateTime": "2023-02-06T14:47:32.962Z",
  "createdAt": "2023-02-06T14:47:32.962Z"
}
```

Example response:

```json
{
  "status": "OK",
  "message": "The event has been successfully registered!",
  "data": {
    "event": [
      {
        "_id": "3",
        "description": "Example Request Description",
        "dateTime": "2023-02-06T14:47:32.962Z",
        "createdAt": "2023-02-06T14:47:32.962Z"
      }
    ]
  }
}
```

### `DELETE` Event by id

_This route will delete an event by id_

```
localhost:8000/api/v1/events/{id}
```

_The `id` parameter must be a number_

Example response:

```json
{
  "status": "OK",
  "message": "The event(s) has been successfully deleted!",
  "data": {
    "event": {
      "_id": "3",
      "description": "Example Request Description",
      "dateTime": "2023-02-06T14:47:32.962Z",
      "createdAt": "2023-02-06T14:47:32.962Z"
    }
  }
}
```

### `DELETE` Events by weekday

_This route will delete all registered events on the informed weekday_

```
localhost:8000/api/v1/events/{weekday}
```

_Accepted values ​​for weekday:_ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"

Example response:

```json
{
  "status": "OK",
  "message": "The event(s) has been successfully deleted!",
  "data": {
    "event": {
      "_id": "4",
      "description": "Example Request Description2",
      "dateTime": "2023-02-06T14:47:32.962Z",
      "createdAt": "2023-02-06T14:47:32.962Z"
    }
  }
}
```

## User Routes

### `POST` SignUp user

_This route will register a user_

```
localhost:8000/api/v1/users/signUp
```

Example request body:

```json
{
  "firstName": "string",
  "lastName": "string",
  "birthDate": "2023-02-06",
  "city": "string",
  "country": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string"
}
```

Example response:

```json
{
  "status": "OK",
  "message": "The user has been successfully registered!",
  "data": {
    "user": {
      "_id": "1",
      "firstName": "username",
      "lastName": "lastname",
      "birthDate": "2023-02-10",
      "city": "Cirt",
      "country": "Country",
      "email": "email@email.com",
      "password": "******",
      "confirmPassword": "******"
    }
  }
}
```

### `POST` SignIn user

_This route will log a user_

```
localhost:8000/api/v1/users/signIn
```

Example request body:

```json
{
  "email": "email@email.com",
  "password": "123456"
}
```

Example response:

```json
{
  "status": "OK",
  "message": "The user has been successfully logged in!",
  "data": {
    "user": {
      "_id": "2",
      "firstName": "username",
      "lastName": "lastname",
      "email": "email@email.com"
    }
  }
}
```

### Example Errors or Fails

In case of errors in the processing of data or in searches, the response will always be in this format:

```json
{
  "status": "error or fail",
  "message": "description..."
}
```

## 📁 Swagger Documetation

This API also has a Swagger documentation, follow the link to access it

[Swagger Documentation](https://app.swaggerhub.com/apis-docs/EduardoSLuz/Api-Planner/1.0.0);

## 🛠️ Testing API

To test all routes in the development environment itself, just start the API via terminal in the project folder with the command:

```
npm start
```

Then run the test command:

```
npm test
```

Example Success Response:

```
Events
    /GET Events
      ✔ Testing GET All Events (51ms)
      ✔ Testing GET Events By Id
      ✔ Testing GET Events By Weekday
    /POST Events
      ✔ Testing POST Create Event
    /DELETE Events
      ✔ Testing DELETE Events By Id
      ✔ Testing DELETE Events By Weekday

  Users
    /POST Users
      ✔ Testing POST SignUp
      ✔ Testing POST SignIn
```
