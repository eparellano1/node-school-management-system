
# Project Title

A brief description of what this project does and who it's for

## node-school-management-system
Backend service for a school management system written in NodeJS and Express

## Local installation
Open a terminal and clone the repo to your local device

```
git clone https://github.com/eparellano1/node-school-management-system.git
```

Cd into the cloned repo then install necessary node packages
```
cd node-school-management-system
npm install
```

Once the packages are installed, using the terminal, run the following command to run the server
```
npm run server
```

## API Testing
Open Postman and import the collection
```
node-sms.postman_collection.json
```

Different CRUD operations for each model are present in the collection, with specific endpoints and data needed found in the /controller folder.

Create an environment in postman and add the variable

```
baseURL: http://localhost:3000/api/v1
```

Alternatively, the backend service can be run without local installation by setting the baseURL variable to:

```
baseURL: https://node-school-management-system.onrender.com/api/v1
```

### Admin Registration
To access the different endpoints, you should register first as an admin. Under the Academics folder in Postman, using the 'Register Admin' request, send the following data in the body as a JSON format:
```
{
    "name": {Name of Admin}
    "email": {Email of Admin}
    "password": {Password of Admin}
}
```
For example,

```
{
    "name": "Test Admin1",
    "email": "testadmin1@gmail.com",
    "password": "testadmin1"
}
```
### Admin Login
Once the admin is registered, go to the 'Admin Login' request and login using the email and password you have registered. For example, in the body:
```
{
    "email": "testadmin1@gmail.com",
    "password": "testadmin1"
}
```
Wait for the response data, and in the data field, an authorization token is provided. For example:
```
{
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmQ4ZWUxMmQyMzBkOGM5OTQwZTg0YyIsImlhdCI6MTcxMTExNjAzMSwiZXhwIjoxNzExNTQ4MDMxfQ.RVPuyL_2KypihnU-duumEMUXWCIyTG4kn7TTcDMhk0E",
    "message": "Admin logged in successfully"
}

```
### Authorization Token
Use this "data" token as an Authorization header for all other api endpoints with the following format:
```
Authorization: Bearer {data}
```
