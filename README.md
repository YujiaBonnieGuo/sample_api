## Notes

_Please do not supply your name or email address in this document. We're doing our best to remain unbiased._

### Date

2020 December 7

### Location of deployed application

Please feel free to import the Postman collection with all endpoints and auto scripts to fill the token as header

#### login

```
curl -X POST http://localhost:8080/api/v1/login\
  -H 'content-type: application/json'\
  -H 'Authorization: JWTtoken(get from login)'\
  -d '{\
  "username": "username",\
  "emailAddress": "username@gmail.com",\
  "password": "password"\
}'
```

return

```
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsIw"
}
```

#### current

```
curl -X POST http://localhost:8080/api/v1/current\
  -H 'content-type: application/json'\
  -H 'Authorization: JWTtoken(get from login)'\
  -d '{
  "username": "username",
  "emailAddress": "username@gmail.com",
  "password": "password"
}'
```

return

```
0
```

#### next

```
curl -X POST http://localhost:8080/api/v1/next\
  -H 'content-type: application/json'\
  -H 'Authorization: JWTtoken(get from login)'\
  -d '{
  "username": "username",
  "emailAddress": "username@gmail.com",
  "password": "password"
}'
```

return

```
1
```

#### reset

```
curl -X POST http://localhost:8080/api/v1/next\
  -H 'content-type: application/json'\
  -H 'Authorization: JWTtoken(get from login)'\
  -d '{
  "username": "username",
  "emailAddress": "username@gmail.com",
  "password": "password",
  "resetnumber": 10
}'
```

return

```
"Your have reset your integer from: 10 to a new integer: 10"
```

#### register

```
curl -X POST http://localhost:8080/api/v1/next\
  -H 'content-type: application/json'\
  -H 'Authorization: JWTtoken(get from login)'\
  -d '{
  "username": "username",
  "emailAddress": "username@gmail.com",
  "password": "password",
  "int": "0"
}'
```

return

```
"Successfully registered for username: username with integer initialized as 0, please login"
```

#### healthcheck

```
curl -X GET http://localhost:8080/healthcheck
```

return

```
{"message":"healthCheck status as: OK"}
```

### Time spent

database: 4h (compare, install, implement)
backend: 10h
frontend: 7h

### Assumptions made

1. user may put the wrong user name/ email address/ password as input
2. user name, email address and password are case sensitive
3. database makes integers fire-and-forget which have no record for previous numbers
4. user may want the password asked for the security purpose

### Shortcuts/Compromises made

1. error handling could be better. For example, once received the wrong password, should redirect to login page.
2. add SSO and push to cloud
3. more validation for input and exception handling

### Stretch goals attempted

1. UI created for login page and main function page
2. manifest.yml file created and ready to push to PCF

### Instructions to run assignment locally

open VS code

#### back-end start guid:

under path: incrementing-integers-service (main path)
run:

```
npm i
npm start
```

REST app will running on prot:8080

#### front-end start guid:

under path: incrementing-integers-service
run:

```
cd .\client
npm i
npm start
```

REACT app will running on page http://localhost:3000/

### Other

Postman collection is submitted and hopes it has some help for the test.
There are pre scripts create for each postman collection for the JWT token got from Login endpoint.

you can also get the postman collection under main path './Integers_api.postman_collection.json'

please let me know if you have any questions about the project and collection.
