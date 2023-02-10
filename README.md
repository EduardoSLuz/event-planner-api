# API Planner

REST API developed for CompassUOL's Node JS internship, its objective is to provide routes for managing and controlling events, login and user registration.

## 💻 Installing the Api Planner

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

If the terminal does not show any errors, then the API is ready to be used .

## ☕ Using the Api Planner

It is recommended to use [POSTMAN](https://www.postman.com) to perform the requests.

Now in POSTMAN, use "[http://localhost:8000](http://localhost:8000) + route" para realizar as requisições, to perform the requests, see the available routes below.

## Event Routes

### GET All events

```
localhost:8000/api/v1/events
```

### GET Events by weekday or id

\_Example:

Any positive number >= "1" for id: "/events/1"

Or any weekday as "saturday" for weekday: "/events/saturday" - no quotes, no braces e and all in lowercase\_

```
localhost:8000/api/v1/events/{id or weekday}
```

### POST Create event

```
localhost:8000/api/v1/events
```

Example request body:

```json
{
  "description": "string",
  "dateTime": "2023-02-06T14:47:32.962Z",
  "createdAt": "2023-02-06T14:47:32.962Z"
}
```

### DELETE Event by id

```
localhost:8000/api/v1/events/{id}
```

### DELETE Events by weekday

```
localhost:8000/api/v1/events/{weekday}
```

## User Routes

### POST SignUp user

```
localhost:8000/api/v1/users/signUp
```

Example request body:

```json
{
  "email": "string",
  "password": "string"
}
```

### POST SignIn user

```
localhost:8000/api/v1/users/signIn
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

## BONUS 🛠️
