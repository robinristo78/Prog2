# Todo API (TDD)

## Prerequisites

* [Node.js](https://nodejs.org/) (Latest LTS recommended)
* [MongoDB Community Server](https://www.mongodb.com/try/download/community)



## MongoDB Installation & Setup (Windows)

To run this project locally, you need a local instance of MongoDB running. Follow these specific steps to ensure permissions work correctly without complex authentication configurations.

1.  Download the **MongoDB Community Server** installer (MSI).
2.  Run the installer.
3.  **Crucial Step:** When prompted for "Service Configuration":
    * Select **Run service as Network Service user**.
4.  Include MongoDB Compass installation.
5.  Finish the installation.
6.  Your MongoDB should now be running at `mongodb://localhost:27017`.
7. Open MongoDB Compass.
9. Add new connection ```tests``` and then Save & Connect.
10. Done.



## Installation

1. Create a directory for the repo and go into it
```
mkdir todo-tdd-repo
cd todo-tdd-repo
```

2. Initialize a new empty git repository
```
git init
```

3. Add the remote origin
```
git remote add origin https://github.com/robinristo78/Prog2.git
```

4. Enable sparse-checkout
```
git sparse-checkout init --cone
```

5. Tell Git exactly which folder you want
```
git sparse-checkout set todo-tdd
```

6. Pull the code (this downloads ONLY that folder)
```
git pull origin main
```

7. Install dependencies:
```
cd todo-tdd
npm install
```



## Running the Application
1. Start the server:
```
npm start
```
2. The server will run on http://localhost:3015/ by default.



## Running Tests
This project relies on Jest for testing.
<br />
- **Run all tests (Unit + Integration):**
```
npm test
```



## API Documentation
| CRUD | Method | API Endpoint | Request Body Example | Success Status | Error Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Create Todo** | `POST` | `/todos/` | `{ "title": "Prepare manual test", "done": false }` | `201 Created` | `500 Server Error` |
| **Get Todos** | `GET` | `/todos/` |  | `200 OK` | `500 Server Error` |
| **Get Todo by ID** | `GET` | `/todos/:todoId` |  | `200 OK` | `404 Not Found` |
| **Update Todo** | `PUT` | `/todos/:todoId` | `{ "title": "Make integration test for PUT", "done": true }` | `200 OK` | `404 Not Found` |
| **Delete Todo** | `DELETE` | `/todos/:todoId` |  | `200 OK` | `404 Not Found` |