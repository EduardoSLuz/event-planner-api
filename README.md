# Event Planner API

REST API developed for CompassUOL's Node JS Challenge 2, aims to provide routes for managing and controlling events, login and user registration, using MongoDB as a database.

## 📁 Swagger Documetation

This API also has a Swagger documentation, follow the link to access it

[Swagger Documentation](https://app.swaggerhub.com/apis-docs/EduardoSLuz/event-planner_api_challenge_two/1.0.0#/);

## 💻 Installing the Event Planner API

### Requirements

Para instalar a projeto e rodar a API, you must have installed on your device:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org)
- [Postman](https://www.postman.com)
- [VSCode](https://code.visualstudio.com) (Optional)

### Installation

Clone the project to a folder on your device or download a zipped copy and then unzip it to your device folder.

```
git clone https://github.com/EduardoSLuz/event-planner-api.git
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

## User Routes

### `POST` SignUp user

_This route will register a user_

```
localhost:8000/api/v1/users/signUp
```

Example request body:

```json
{
  "firstName": "Name",
  "lastName": "Last Name",
  "birthDate": "2000-03-12",
  "city": "City Name",
  "country": "Country Name",
  "email": "example@email.com",
  "password": "examplepass123",
  "confirmPassword": "examplepass123"
}
```

Example response:

```json
{
  "status": "success",
  "message": "User created and successfully logged in!",
  "data": {
    "user": {
      "firstName": "Name",
      "lastName": "Last Name",
      "birthDate": "2000-03-12",
      "city": "City Name",
      "country": "Country Name",
      "email": "example@email.com",
      "active": true
    }
  },
  "token": "EXAMPLETOKEN@123"
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
  "email": "example@email.com",
  "password": "12345678"
}
```

Example response:

```json
{
  "status": "success",
  "message": "User logged in successfully!",
  "token": "EXAMPLETOKEN@123"
}
```

### `PATCH` Update current user

** IMPORTANT !!! **
You must login via /signIn route to access route below!

_This route will update the curent user connected_

```
localhost:8000/api/v1/users
```

Example request body:

```json
{
  "firstName": "Name2",
  "lastName": "Last Name2",
  "birthDate": "2000-03-12",
  "city": "City Name2",
  "country": "Country Name2",
  "email": "example2@email.com"
}
```

Example response:

```json
{
  "status": "success",
  "message": "User successfully updated!",
  "data": {
    "user": {
      "active": true,
      "firstName": "Name2",
      "lastName": "Last Name2",
      "birthDate": "2003-01-26T00:00:00.000Z",
      "city": "City Name2",
      "country": "Country Name2",
      "email": "example2@email.com"
    }
  }
}
```

### `DELETE` Delete current user

** IMPORTANT !!! **
You must login via /signIn route to access route below!

_This route will delete the curent user connected_

```
localhost:8000/api/v1/users
```

Example response: _Just returns status 204_

## Event Routes (Authentication Required)

** IMPORTANT **
You must login via /signIn route to access all event routes below!

### `POST` Create event

_This route will create an event_

```
localhost:8000/api/v1/events
```

Example request body:

```json
{
  "description": "To Do Everything",
  "dayOfWeek": "monday",
  "dateTime": "2023-03-13"
}
```

Example response:

```json
{
  "status": "success",
  "message": "The event has been successfully registered!",
  "data": {
    "event": {
      "description": "To Do Everything",
      "dayOfWeek": "monday",
      "dateTime": "2023-03-13T00:00:00.000Z",
      "createdAt": "2023-03-13T00:02:31.576Z",
      "_id": "exampleID123"
    }
  }
}
```

### `GET` All events

_This route will return all registered event_

```
localhost:8000/api/v1/events
```

Example response:

```json
{
  "events": [
    {
      "_id": "exampleID123",
      "description": "To Do Everything",
      "dayOfWeek": "monday",
      "dateTime": "2023-03-13T00:00:00.000Z",
      "createdAt": "2023-03-13T00:02:31.576Z"
    }
  ]
}
```

### `GET` Event by id

_This route will return an event of the given id_

```
localhost:8000/api/v1/events/{id}
```

Example response:

```json
{
  "event": [
    {
      "_id": "exampleID123",
      "description": "To Do Everything",
      "dayOfWeek": "monday",
      "dateTime": "2023-03-13T00:00:00.000Z",
      "createdAt": "2023-03-13T00:02:31.576Z"
    }
  ]
}
```

### `GET` Events by dayOfWeek

_This route will return all registered events on the informed dayOfWeek_

```
localhost:8000/api/v1/events?dayOfWeek=monday
```

_Accepted values ​​for dayOfWeek:_ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"

Example response:

```json
{
  "events": [
    {
      "_id": "exampleID123",
      "description": "To Do Everything",
      "dayOfWeek": "monday",
      "dateTime": "2023-03-13T00:00:00.000Z",
      "createdAt": "2023-03-13T00:02:31.576Z"
    }
  ]
}
```

### `DELETE` Event by id

_This route will delete an event by id_

```
localhost:8000/api/v1/events/{id}
```

Example response:

```json
{
  "status": "success",
  "message": "Event deleted!",
  "event": {
    "_id": "exampleID123",
    "description": "To Do Everything",
    "dayOfWeek": "monday",
    "dateTime": "2023-03-13T00:00:00.000Z",
    "createdAt": "2023-03-13T00:02:31.576Z"
  }
}
```

### `DELETE` Events by dayOfWeek

_This route will delete all registered events on the informed weekday_

```
localhost:8000/api/v1/events?dayOfWeek=monday
```

_Accepted values ​​for weekday:_ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"

Example response:

```json
{
  "status": "success",
  "message": "Events deleted!",
  "eventsDeleted": 2
}
```

### Example Errors or Fails

In case of errors in the processing of data or in searches, the response will always be in this format:

# Production Mode

```json
{
  "status": "fail",
  "message": "description..."
}
```

# Development Mode

```json
{
  "status": "fail",
  "error": {
    "statusCode": 404,
    "status": "fail",
    "isOperational": true
  },
  "message": "description...",
  "stack": "Fail Origin..."
}
```

## 🛠️ Testing API

To test all routes in the development environment itself, just start the API via terminal in the project folder with the command:

```
npm start
```

Then open another terminal in the project and run test command:

```
npm test
```

Example Success Response:

```
Users Authentication
    /POST Users
      ✔ Testing POST SignUp (1568ms)
      ✔ Testing POST SignIn (1444ms)

  Events
    /POST Events
      ✔ Testing POST Create Event (129ms)
    /GET Events
      ✔ Testing GET All Events (136ms)
      ✔ Testing GET Events By Id (128ms)
      ✔ Testing GET Events By Weekday (139ms)
    /DELETE Events
      ✔ Testing DELETE Events By Id (146ms)
      ✔ Testing DELETE Events By Weekday (139ms)

  Users
    /PATCH Users
      ✔ Testing PATCH Update Current User (155ms)
    /DELETE Users
      ✔ Testing DELETE Delete Current User (128ms)
```
