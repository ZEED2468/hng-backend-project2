HNG BACKEND STAGE TWO TASK

Backend Application using Node.js and Express with a PostgreSQL Database using Sequelize as the ORM to interact with the database

User Authentication & Organisation
Create a User model using the properties below
 NB: user id and email must be unique
 {
     "userId": "string" // must be unique
     "firstName": "string", // must not be null
     "lastName": "string" // must not be null
     "email": "string" // must be unique and must not be null
     "password": "string" // must not be null
     "phone": "string"
 }
 Provide validation for all fields. When there’s a validation error, return status code 422 with payload:
 {
   "errors": [
     {
       "field": "string",
       "message": "string"
     },
   ]
 }
 Using the schema above, implement user authentication
 

User Registration:
 Implement an endpoint for user registration
 Hash the user’s password before storing them in the database.
 successful response: Return the payload with a 201 success status code.
 User Login
 Implement an endpoint for user Login.
 Use the JWT token returned to access PROTECTED endpoints.


Organisation
 A user can belong to one or more organisations
 An organisation can contain one or more users.
 On every registration, an organisation must be created.
 The name property of the organisation takes the user’s firstName and appends “Organisation” to it. For example: user’s first name is John , organisation name becomes "John's Organisation" because firstName = "John" .
 Logged in users can access organisations they belong to and organisations they created.
 Create an organisation model with the properties below.
Organisation Model:
 {
     "orgId": "string", // Unique
     "name": "string", // Required and cannot be null
     "description": "string",
 }
Endpoints:
 [POST] /auth/register Registers a user and creates a default organisation Register request body:
 {
     "firstName": "string",
     "lastName": "string",
     "email": "string",
     "password": "string",
     "phone": "string",
 }

Unit Testing
Write appropriate unit tests to cover
 Token generation - Ensure token expires at the correct time and correct user details is found in token.
 Organisation - Ensure users can’t see data from organisations they don’t have access to.


End-to-End Test Requirements for the Register Endpoint
The goal is to ensure the POST /auth/register endpoint works correctly by performing end-to-end tests. The tests should cover successful user registration, validation errors, and database constraints.


Directory Structure:
 The test file should be named auth.spec.ext (ext is the file extension of your chosen language) inside a folder named tests . For example tests/auth.spec.ts assuming I’m using Typescript


Test Scenarios:
 It Should Register User Successfully with Default Organisation:Ensure a user is registered successfully when no organisation details are provided.
 Verify the default organisation name is correctly generated (e.g., "John's Organisation" for a user with the first name "John").
 Check that the response contains the expected user details and access token.
 It Should Log the user in successfully:Ensure a user is logged in successfully when a valid credential is provided and fails otherwise.
 Check that the response contains the expected user details and access token.
 It Should Fail If Required Fields Are Missing:Test cases for each required field (firstName, lastName, email, password) missing.
 Verify the response contains a status code of 422 and appropriate error messages.
 It Should Fail if there’s Duplicate Email or UserID:Attempt to register two users with the same email.
 Verify the response contains a status code of 422 and appropriate error messages.
