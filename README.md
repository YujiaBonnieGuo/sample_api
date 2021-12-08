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

### What did you not include in your solution that you want us to know about?

When I tried the solution 'Allow sign up using OAuth', I learned from some tutorials and I am pretty interested in it.
Since I had the experience to embed the SSO for internal, I would like to learn more about how build up the service.

### Other

Postman collection is submitted and hopes it has some help for the test.
There are pre scripts create for each postman collection for the JWT token got from Login endpoint.

### Your feedback on this technical challenge

```
Really appreciate this opportunity to get more information about Thinkific. I love the approach of testing people, instead of several online assignments in one or two hours, this assignment is more focused on the how the process for the product development, from the business acceptance criteria to the app structure, from the database to the front-end application.

According to the first interview and the assignment, I believe Thinkific is a company that take care of the overall situation and full of humanity.

Hope I can move further and get a chance to work with amazing teams in Thinkific
```
