<div align="center">
   
# 📝 **Notes API**
### **Built a RESTful backend API using Node.js and Express.js with CRUD operations,**
#### **pagination, search, sorting, centralized error handling, and rate limiting.**

✨━━━━━━━━━━━━━━━━━━━ **❖** ━━━━━━━━━━━━━━━━━━━✨

</div>

A simple backend REST API built with Node.js, Express, and MongoDB
that supports CRUD operations with pagination, search, sorting,
error handling, and rate limiting.

---

# Notes API

A simple backend REST API built with Node.js, Express, and MongoDB
that supports CRUD operations with pagination, search, sorting,
error handling, and rate limiting.

---

## Features

- Create, read, update, and delete notes
- Pagination for large datasets
- Search notes by title or content
- Sorting by creation date
- Global error handling
- Rate limiting to prevent API abuse

---

## Folder Structure

project/
app.js
src/
config/
db.js
models/
noteModel.js
controllers/
noteController.js
routes/
noteRoutes.js
middleware/
errorMiddleware.js
rateLimiter.js

---

## Environment Variables

Create a `.env` file in the root directory and add:

PORT=5000  
MONGO_URI=your_mongodb_connection_string

---

## How to Run

1. Clone the repository
2. Install dependencies
   npm install
3. Start the server
   npm run dev
   or
   node app.js

---

## API Endpoints

POST /api/notes - Create a note  
GET /api/notes - Get all notes (pagination, search, sorting)  
GET /api/notes/:id - Get a note by ID  
PUT /api/notes/:id - Update a note  
DELETE /api/notes/:id - Delete a note

---

## Sample Query

GET /api/notes?page=1&limit=10&keyword=task&sort=-createdAt
