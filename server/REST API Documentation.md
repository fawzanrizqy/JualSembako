# Daily Journey REST API Documentation

The end points of this challenge are described in this documentation.

## API Reference

List of Available Endpoints:

- `POST /register`
- `POST /login`
- `POST /glogin`
- `GET /groceries`
- `GET /sales`
- `POST /sales`
- `GET /sales/${id}`
- `PATCH /sales/${id}`
- `POST /sendemail`
- `GET /groceries`
- `POST /midtrans`
- `GET /exports/:id`
- `GET /items`
- `POST /items`
- `GET /items/:id`
- `DELETE /items/:id`
- `PUT /items/:id`
- `GET /transactions`
- `POST /transactions/`
- `GET /transactions/`
- `PATCH /transactions/:id`
- `GET /purchases`
- `POST /purchases`
- `GET /purchases/:id`

## Admin and Staff End Points

### Register

```http
  POST /register
```

#### Description

- Register new user

#### Request

- Headers

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

- Body

```json
    {
      "email": String (Required),
      "password": String (Required, min. length 5),
      "username": String,
      "role": String (Required),
      "phoneNumber": Integer,
      "address": String
    }
```

#### Response :

_201 - Created_

- Body

```json
{
  "statusCode": 201,
  "data": {
    "id": 11,
    "email": "fawzan@gmail.com"
  }
}
```

_400 - Validation Error_

- Body

```json
{
  "statusCode": 400,
  "error": ["Password should be more than 5 characters"]
}
```

### Login

```http
  POST /login
```

#### Description

- Login to system

#### Request

- Body

```json
    {
      "email": String (Required),
      "password": String (Required),
    }
```

#### Response :

_200 - Success_

- Body

```json
{
  "statusCode": 200,
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJvamFuc3RhZmZAZ21haWwuY29tIiwiaWF0IjoxNjgxMjIyMjQwfQ.cOkO_gSGPxHgzvK9WGBR7M1iejRyDzLvL5EwRzRFhHo",
  "id": 1,
  "username": "ojanstaff",
  "email": "ojanstaff@gmail.com",
  "role": "staff"
}
```

_401 - Unauthorized_

- Body

```json
{
  "statusCode": 401,
  "error": "Invalid Email or Password"
}
```

### Google Login

```http
  POST /glogin
```

#### Description

- Login to system using Google account

#### Request

- Body

```json
    {
      "google_token": String (Required),
    }
```

#### Response :

_200 - Success_

- Body

```json
{
  "statusCode": 200,
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJvamFuc3RhZmZAZ21haWwuY29tIiwiaWF0IjoxNjgxMjIyMjQwfQ.cOkO_gSGPxHgzvK9WGBR7M1iejRyDzLvL5EwRzRFhHo",
  "id": 1,
  "username": "ojanstaff",
  "email": "ojanstaff@gmail.com",
  "role": "staff"
}
```

_201 - Created_

- Body

```json
{
  "statusCode": 201,
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJvamFuc3RhZmZAZ21haWwuY29tIiwiaWF0IjoxNjgxMjIyMjQwfQ.cOkO_gSGPxHgzvK9WGBR7M1iejRyDzLvL5EwRzRFhHo",
  "id": 1,
  "username": "ojanstaff",
  "email": "ojanstaff@gmail.com",
  "role": "staff"
}
```

_401 - Unauthorized_

- Body

```json
{
  "statusCode": 401,
  "error": "Invalid Credential"
}
```

### Get Dashboard Data

```http
  GET /dashboard
```

#### Description

- Get the total of items and companies data

#### Request :

- Headers

```json
{
  "access_token": "token"
}
```

#### Response :

_200 - Success_

- Body

```json
{
  "statusCode": 200,
  "itemCount": 10,
  "companyCount": 10
}
```

### Get All items

```http
  GET /items
```

#### Description

- Get all the items data

#### Request :

- Headers

```json
{
  "access_token": "token"
}
```

#### Response :

_200 - Success_

- Body

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "title": "Assistant Professor",
      "description": "Choledochohepat intubat",
      "imgUrl": "http://dummyimage.com/127x100.png/ff4444/ffffff",
      "companyId": 1,
      "authorId": 1,
      "itemType": "full time",
      "createdAt": "2023-04-10T08:09:21.667Z",
      "updatedAt": "2023-04-10T08:09:21.667Z"
    },
    {
      "id": 2,
      "title": "Financial Analyst",
      "description": "Exc pituit les-transphen",
      "imgUrl": "http://dummyimage.com/155x100.png/ff4444/ffffff",
      "companyId": 2,
      "authorId": 2,
      "itemType": "part time",
      "createdAt": "2023-04-10T08:09:21.667Z",
      "updatedAt": "2023-04-10T08:09:21.667Z"
    }
  ]
}
```

### Create New item

```http
  POST /items/
```

#### Description

- Insert new item to database

#### Request

- Headers

```json
{
  "access_token": "token",
  "Content-Type": "application/x-www-form-urlencoded"
}
```

- Body

```json
    {
      "title": String (Required),
      "description": String (Required),
      "imgUrl": String (Required),
      "companyId": Integer (Required),
      "authorId": Integer (Required),
      "itemType": String (Required) ("full time" or "part time")
    }
```

#### Response :

_201 - Created_

- Body

```json
{
  "statusCode": 201,
  "data": {
    "id": 13,
    "title": "Cleaner",
    "description": "Cleaning",
    "imgUrl": "https://media.gq-magazine.co.uk/photos/63468efef4f48bee2acb7062/16:9/pass/Tom-Holland-Spiderman-what-we-know-so-far.jpg",
    "companyId": 1,
    "authorId": 1,
    "itemType": "part time",
    "updatedAt": "2023-04-10T12:26:41.466Z",
    "createdAt": "2023-04-10T12:26:41.466Z"
  }
}
```

_400 - Bad Request_

- Body

```json
    {
      "statusCode": 400,
      "error": {
      "message": String
      }
    }

```

### Get item Detail

```http
  GET /items/${id}
```

#### Description

- Get items detail by item Id

| Parameter | Type      | Description                             |
| :-------- | :-------- | :-------------------------------------- |
| `id`      | `integer` | **Required**. Id of item to be selected |

#### Request :

- Headers

```json
{
  "access_token": "token"
}
```

#### Response :

_200 - Success_

- Body

```json
{
  "statusCode": 200,
  "data": {
    "id": 10,
    "title": "Web Developer II",
    "description": "Leg artery resect/anast",
    "imgUrl": "http://dummyimage.com/187x100.png/ff4444/ffffff",
    "companyId": 10,
    "authorId": 10,
    "itemType": "part time",
    "createdAt": "2023-04-10T08:09:21.667Z",
    "updatedAt": "2023-04-10T08:09:21.667Z",
    "Company": {
      "id": 10,
      "name": "Myworks",
      "companyLogo": "http://dummyimage.com/153x100.png/5fa2dd/ffffff",
      "location": "Saint-Jouan-des-Guérets",
      "email": "bbeamiss9@theguardian.com",
      "description": "Common cold vaccination",
      "createdAt": "2023-04-10T08:09:21.636Z",
      "updatedAt": "2023-04-10T08:09:21.636Z"
    }
  }
}
```

_404 - Not Found_

- Body

```json
{
  "statusCode": 404,
  "error": "Error item ID Not Found"
}
```

### UPDATE item DATA

```http
  PUT /items/${id}
```

#### Description

- Update item by item Id

| Parameter | Type      | Description                            |
| :-------- | :-------- | :------------------------------------- |
| `id`      | `integer` | **Required**. Id of item to be updated |

#### Request :

- Headers

````json
{
  "access_token": "token"
}

- Body

```json
{

  "title": "String",
  "companyId": Integer,
  "description": "String",
  "itemType": "String",
  "imgUrl": "String",

}
````

#### Response :

_200 - Success_

- Body

```json
{
  {
    "statusCode": 200,
    "message": "item with id 1 updated"
  }
}
```

_404 - Not Found_

- Body

```json
{
  "statusCode": 404,
  "error": "Error item ID Not Found"
}
```

### UPDATE item STATUS

```http
  PATCH /items/${id}
```

#### Description

- Update item by item Id

| Parameter | Type      | Description                            |
| :-------- | :-------- | :------------------------------------- |
| `id`      | `integer` | **Required**. Id of item to be updated |

#### Request :

- Headers

````json
{
  "access_token": "token"
}

- Body

```json
{

  "status": "active" || "inactive" || "archived",

}
````

#### Response :

_200 - Success_

- Body

```json
{
  {
    "statusCode": 200,
    "message": "item status with id 1 has been updated from archived into archived"
  }
}
```

_404 - Not Found_

- Body

```json
{
  "statusCode": 404,
  "error": "Error item ID Not Found"
}
```

### Delete item

```http
  DELETE /items/${id}
```

#### Description

- Delete items by item Id

| Parameter | Type      | Description                            |
| :-------- | :-------- | :------------------------------------- |
| `id`      | `integer` | **Required**. Id of item to be deleted |

#### Request :

- Headers

```json
{
  "access_token": "token"
}
```

#### Response :

_200 - Success_

- Body

```json
{
  "statusCode": 200,
  "message": "{item title} success to delete",
  "data": {
    "id": 13,
    "title": "Cleaner",
    "description": "Cleaning",
    "imgUrl": "https://media.gq-magazine.co.uk/photos/63468efef4f48bee2acb7062/16:9/pass/Tom-Holland-Spiderman-what-we-know-so-far.jpg",
    "companyId": 1,
    "authorId": 1,
    "itemType": "part time",
    "createdAt": "2023-04-10T12:26:41.466Z",
    "updatedAt": "2023-04-10T12:26:41.466Z"
  }
}
```

_404 - Not Found_

- Body

```json
{
  "statusCode": 404,
  "error": "Error item ID Not Found"
}
```

### Get All Companies

```http
  GET /companies
```

#### Description

- Get all the companies data

#### Request :

- Headers

```json
{
  "access_token": "token"
}
```

#### Response :

_200 - Success_

- Body

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "name": "Gigashots",
      "companyLogo": "http://dummyimage.com/190x100.png/cc0000/ffffff",
      "location": "Frederico Westphalen",
      "email": "kboom0@clickbank.net",
      "description": "Lumb/lmbsac fus ant/post",
      "createdAt": "2023-04-10T08:09:21.636Z",
      "updatedAt": "2023-04-10T08:09:21.636Z"
    },
    {
      "id": 2,
      "name": "Skippad",
      "companyLogo": "http://dummyimage.com/218x100.png/cc0000/ffffff",
      "location": "Leskovac",
      "email": "sburnand1@omniture.com",
      "description": "Scrotal les destruction",
      "createdAt": "2023-04-10T08:09:21.636Z",
      "updatedAt": "2023-04-10T08:09:21.636Z"
    },
    {
      "id": 3,
      "name": "Tagtune",
      "companyLogo": "http://dummyimage.com/110x100.png/cc0000/ffffff",
      "location": "Cortes",
      "email": "rstandishbrooks2@flavors.me",
      "description": "Pancreatic repair NEC",
      "createdAt": "2023-04-10T08:09:21.636Z",
      "updatedAt": "2023-04-10T08:09:21.636Z"
    }
  ]
}
```

### Create New Company

```http
  POST /companies/
```

#### Description

- Insert new company to database

#### Request

- Headers

```json
{
  "access_token": "token",
  "Content-Type": "application/x-www-form-urlencoded"
}
```

- Body

```json
    {
      "name": String (Required),
      "companyLogo": String (Required),
      "location": String (Required),
      "email": String (Required),
      "description": String (Required)
    }
```

#### Response :

_201 - Created_

- Body

```json
{
  "statusCode": 201,
  "data": {
    "id": 13,
    "name": "Ojan Corp",
    "description": "The wealthiest company in the world",
    "companyLogo": "https://media.gq-magazine.co.uk/photos/63468efef4f48bee2acb7062/16:9/pass/Tom-Holland-Spiderman-what-we-know-so-far.jpg",
    "location": "Malang",
    "updatedAt": "2023-04-10T12:26:41.466Z",
    "createdAt": "2023-04-10T12:26:41.466Z"
  }
}
```

_400 - Bad Request_

- Body

```json
    {
      "statusCode": 400,
      "error": {
      "message": String
      }
    }

```

### UPDATE COMPANY DATA

```http
  PUT /companies/${id}
```

#### Description

- Update Company by company Id

| Parameter | Type      | Description                               |
| :-------- | :-------- | :---------------------------------------- |
| `id`      | `integer` | **Required**. Id of company to be updated |

#### Request :

- Headers

````json
{
  "access_token": "token"
}

- Body

```json
{

  "name": "String",
  "description": "String",
  "location": "String",
  "email": "String",
  "companyLogo": "String",

}
````

#### Response :

_200 - Success_

- Body

```json
{
  {
    "statusCode": 200,
    "message": "Company with id 1 updated"
  }
}
```

_404 - Not Found_

- Body

```json
{
  "statusCode": 404,
  "error": "Error Company ID Not Found"
}
```

### Delete item

```http
  DELETE /companies/${id}
```

#### Description

- Delete company by company Id

| Parameter | Type      | Description                               |
| :-------- | :-------- | :---------------------------------------- |
| `id`      | `integer` | **Required**. Id of company to be deleted |

#### Request :

- Headers

```json
{
  "access_token": "token"
}
```

#### Response :

_200 - Success_

- Body

```json
{
  "statusCode": 200,
  "message": "{company title} success to delete",
  "data": {
    "id": 2,
    "name": "Skippad",
    "companyLogo": "http://dummyimage.com/218x100.png/cc0000/ffffff",
    "location": "Leskovac",
    "email": "sburnand1@omniture.com",
    "description": "Scrotal les destruction",
    "createdAt": "2023-04-10T08:09:21.636Z",
    "updatedAt": "2023-04-10T08:09:21.636Z"
  }
}
```

_404 - Not Found_

- Body

```json
{
  "statusCode": 404,
  "error": "Error Company ID Not Found"
}
```

### Get All Logs

```http
  GET /logs
```

#### Description

- Get all the logs data

#### Request :

- Headers

```json
{
  "access_token": "token"
}
```

#### Response :

_200 - Success_

- Body

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": 20,
      "title": "Assistant Professor",
      "description": "item status with id 1 has been updated from archived into archived",
      "updatedBy": "ojanadmin@gmail.com",
      "createdAt": "2023-04-23T07:28:41.815Z",
      "updatedAt": "2023-04-23T07:28:41.815Z"
    },
    {
      "id": 19,
      "title": "Assistant Professor",
      "description": "item with id 1 updated",
      "updatedBy": "ojanadmin@gmail.com",
      "createdAt": "2023-04-23T07:22:39.129Z",
      "updatedAt": "2023-04-23T07:22:39.129Z"
    }
  ]
}
```

### Global Error

#### Response

_401 - Token missmatch_

```json
{
  "statusCode": 401,
  "error": "Error token mismatch"
}
```

_403 - Forbidden Access_

```json
{
  "statusCode": 403,
  "error": "Forbidden Access"
}
```

_500 - Internal Server Error_

```json
{
  "statusCode": 500,
  "error": {
    "message": "Internal Server Error"
  }
}
```
