
# 📚 Library Management API

Welcome to the Library Management API project! This Node.js-based REST API is designed to manage library operations, such as listing users, accessing user information, creating new users, listing books, accessing book information, creating new books, borrowing books, returning books, and rating books.

## 🚀 Getting Started

Follow the instructions below to set up and run the project locally:

1. **Clone the repository:** 
   ```shell
   git clone https://github.com/muzeyr/InventAnalyticsCaseInterview
   ```

2. **Install Dependencies:**
   ```shell
   npm install
   ```

3. **Set Up the Database:**
   - Use your preferred relational database management system.
   - Run the provided DDL script to create the necessary tables.

4. **Configure Environment Variables:**
   - Create a `.env` file and set the required environment variables for database connection.

5. **Start the Server:**
   ```shell
   npm start
   ```

## 🔧 Technologies Used

- **Express.js:** The API is developed using Express.js, a popular Node.js web framework.
- **TypeScript:** We used TypeScript for type safety and a better development experience.
- **Database:**  Mysql
- **ORM/Query Builder:** TypeORM
- **Data Validation:** We implemented data validation using a validator library ( express-validator).
- **Error Handling:** The API handles errors gracefully and returns appropriate error responses.

## 📝 API Documentation

You can find detailed API documentation, including request/response examples, in the [Postman Collection](postman.json).

## 🛠️ Git API Services
#### List Users
- **Endpoint:** `/users`
- **Method:** `GET`
- **Sample Response:**
  ```json
  {
      "success": true,
      "message": "Successfully retrieved users",
      "data": [
          {
              "id": "02cd63f7-95cc-4226-9cd9-169cb2fc4813",
              "name": "Ali ÖZCAN",
              "createdAt": "2023-10-08T03:08:01.640Z",
              "updatedAt": "2023-10-08T03:08:01.640Z"
          },
          {
              "id": "3019f6f0-2980-4a08-9184-4cd0b9fec1b4",
              "name": "Üzeyr ÖZCAN",
              "createdAt": "2023-10-08T04:07:22.356Z",
              "updatedAt": "2023-10-08T04:07:22.356Z"
          },
          // ...more users
      ],
      "paginationInfo": null
  }
  ```

#### Get User by ID
- **Endpoint:** `/users/{userId}`
- **Method:** `GET`
- **Sample Response:**
  ```json
  {
      "success": true,
      "message": "Successfully retrieved user",
      "data": {
          "id": "5e95c018-3634-4b6a-9d7c-3a8f8e8ff3d2",
          "name": "Üzeyr ÖZCAN",
          "currentBorrows": [
              {
                  "book": {
                      "name": "Book -4",
                      "id": "f1d77589-5f4c-49a3-aaf5-11d5c6eebdab"
                  },
                  "borrowDate": "2023-10-08T04:20:42.719Z"
              }
          ],
          "pastBorrows": [
              {
                  "book": {
                      "name": "Book -3",
                      "id": "af8cb870-b4c0-4e83-b8b2-daf658ef0e25"
                  },
                  "borrowDate": "2023-10-08T04:14:53.668Z",
                  "returnDate": "2023-10-08T07:21:05.000Z"
              },
              // ...more past borrows
          ]
      },
      "paginationInfo": null
  }
  ```

#### Create User
- **Endpoint:** `/users`
- **Method:** `POST`
- **Sample Request Body:**
  ```json
  {
      "name": "Üzeyr ÖZCAN"
  }
  ```

### Book Services

#### List Books
- **Endpoint:** `/books`
- **Method:** `GET`
- **Sample Response:**
  ```json
  {
      "success": true,
      "message": "Successfully retrieved books",
      "data": [
          {
              "id": "205d78dd-09b7-4769-87c5-1ee5923c1d1b",
              "name": "Book -2",
              "createdAt": "2023-10-08T04:14:42.

311Z",
              "updatedAt": "2023-10-08T04:14:42.311Z"
          },
          {
              "id": "3cf61d01-b210-415a-9eec-5e03b333c6c6",
              "name": "Book -1",
              "createdAt": "2023-10-08T04:14:40.116Z",
              "updatedAt": "2023-10-08T04:14:40.116Z"
          },
          // ...more books
      ],
      "paginationInfo": null
  }
  ```

#### Get Book by ID
- **Endpoint:** `/books/{bookId}`
- **Method:** `GET`
- **Sample Response:**
  ```json
  {
      "success": true,
      "message": "Fetch book successfully",
      "data": {
          "book": {
              "id": "205d78dd-09b7-4769-87c5-1ee5923c1d1b",
              "name": "Book -2"
          },
          "avarageScore": 0,
          "available": false
      },
      "paginationInfo": null
  }
  ```

### Borrow Services

#### Borrow Book
- **Endpoint:** `/users/{userId}/borrow/{bookId}`
- **Method:** `POST`
- **Sample Response:**
  ```json
  {
      "success": true,
      "message": "Successfully reserved",
      "data": {
          "borrowedBy": {
              "id": "5e95c018-3634-4b6a-9d7c-3a8f8e8ff3d2",
              "name": "Üzeyr ÖZCAN",
              "createdAt": "2023-10-08T04:14:22.789Z",
              "updatedAt": "2023-10-08T04:14:22.789Z"
          },
          "book": {
              "id": "205d78dd-09b7-4769-87c5-1ee5923c1d1b",
              "name": "Book -2",
              "createdAt": "2023-10-08T04:14:42.311Z",
              "updatedAt": "2023-10-08T04:14:42.311Z"
          },
          "score": 0,
          "returnDate": null,
          "id": "8728c6d2-2af1-48cb-8706-127bc175dedf",
          "createdAt": "2023-10-08T05:14:38.238Z",
          "updatedAt": "2023-10-08T05:14:38.238Z"
      },
      "paginationInfo": null
  }
  ```

#### Return Book
- **Endpoint:** `/users/{userId}/return/{bookId}`
- **Method:** `POST`
- **Request:**
 ```json
 {
	"score": 5
}
   ```

- **Sample Response:**
  ```json
  {
      "success": true,
      "message": "Successfully returned",
      "data": {
          "borrowedBy": {
              "id": "5e95c018-3634-4b6a-9d7c-3a8f8e8ff3d2",
              "name": "Üzeyr ÖZCAN",
              "createdAt": "2023-10-08T04:14:22.789Z",
              "updatedAt": "2023-10-08T04:14:22.789Z"
          },
          "book": {
              "id": "205d78dd-09b7-4769-87c5-1ee5923c1d1b",
              "name": "Book -2",
              "createdAt": "2023-10-08T04:14:42.311Z",
              "updatedAt": "2023-10-08T04:14:42.311Z"
          },
          "score": 4,
          "returnDate": "2023-10-08T05:15:00.000Z",
          "id": "8728c6d2-2af1-48cb-8706-127bc175dedf",
          "createdAt": "2023-10-08T05:14:38.238Z",
          "updatedAt": "2023-10-08T05:14:38.238Z"
      },
      "paginationInfo": null
  }
  ```
