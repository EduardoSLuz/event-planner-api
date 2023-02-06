# API Planner

REST API developed for CompassUOL's Node JS internship, its objective is to provide routes for managing and controlling events, login and user registration.

## 💻 Installing the Api Planner

Clone the project to a folder on your device or download a zipped copy and then unzip it to your device folder.

```
git clone "url"
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

If the terminal does not show any errors, then the API is ready to be used .

## ☕ Using the Api Planner

It is recommended to use [POSTSMAN](https://www.postman.com) to perform the requests.

Agora no POSTMAN, utilize "[http://localhost:8000](http://localhost:8000) + /api/v1 + url" para realizar as requisições, URLs disponiveis para o acesso:

## Events URLs

### Get all events

```
GET localhost:8000/api/v1/events
```

### Get events by weekday or id

_example: 1 for id or "saturday" for weekday - no quotes and no braces_

```
GET localhost:8000/api/v1/events/{id or weekday}
```

### Post create event

```
POST localhost:8000/api/v1/events
```

Example request body:

```json
{
  "description": "string",
  "dateTime": "2023-02-06T14:47:32.962Z",
  "createdAt": "2023-02-06T14:47:32.962Z"
}
```

### Delete event by id

```
DELETE localhost:8000/api/v1/event/{id}
```

### Delete events by weekday

```
DELETE localhost:8000/api/v1/events/{weekday}
```

## Users URLs

### SignUp user

```
POST localhost:8000/api/v1/users/signUp
```

Example request body:

```json
{
  "email": "string",
  "password": "string"
}
```

### SignIn user

```
POST localhost:8000/api/v1/users/signIn
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

## BONUS [TO DO]
