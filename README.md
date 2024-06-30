*A simple Node JS server application to handle CRUD operations in a local json object.*

**Getting Started**
  - clone the repo
  - cd to flowers-backend
  - `npm i`
  - `npm run dev`

**Endpoints**

  ***PUBLIC***
  - GET /api/flowers
  - GET /api/flowers/id
  - REGISTER /api/register
  - LOGIN /api/login
    
   ***PROTECTED***
  - POST /api/flowers
  - PUT /api/flowers/id
  - DELETE /api/flowers

PROTECTED APIs requrie authentication, you need to register a user and login, then use the token.
