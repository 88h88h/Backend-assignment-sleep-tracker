# Sleep Tracker API

This repository contains the code for the Sleep Tracker API, which is designed to manage sleep records for users.

## Setup

To set up the project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/88h88h/Backend-assignment-sleep-tracker.git
```

2. Navigate to the root directory:

```bash
cd Backend-assignment-sleep-tracker
```

3. Install dependencies:

```bash
npm install
```

4. Run the server:

```bash
node server.js
```

The server should now be running on 

```bash 
http://localhost:5000. 
```
and the APIs can be accessed through 

```bash 
http://localhost:5000/api. 
```

## Testing

The test file 'api.test.js' is provided in the 'test' folder of the root directory.

To run the tests, use the following command:

```bash
npm run test
```

## API Endpoints

The Sleep Tracker API provides the following endpoints:

### 1. Add a Sleep Record

```bash
- URL: /api/sleep
- Method: POST
- Request Body:
  - userId: String (required) - The ID of the user.
  - hours: Number (required) - The number of hours slept.
- Success Response:
  - Code: 201
  - Content:
    {
      "success": true,
      "newRecord": {
        "_id": "61057c0572f1180012345678",
        "userId": "user123",
        "hours": 8,
        "timestamp": "2022-07-31T08:00:00.000Z"
      }
    }
- Error Response:

  If body has missing field(s)  
  - Code: 400
  - Content: Missing required fields

  If body contains an invalid input
  - Code: 400
  - Content: Invalid hours value, it must be a positive number
  ```

### 2. Retrieve Sleep Records

```bash
- URL: /api/sleep/:userId
- Method: GET
- Path Parameters:
  - userId: String - The ID of the user.
- Success Response:
  - Code: 200
  - Content: Array of sleep records for the specified user.
- Error Response:
  - Code: 404
  ```

### 3. Delete a Sleep Record

```bash
- URL: /api/sleep/:recordId
- Method: DELETE
- Path Parameters:
  - recordId: String (required) - The ID of the sleep record.
- Success Response:
  - Code: 200
  - Content: Record deleted
- Error Response:
  - Code: 404
  - Content: Record not found

  -Code: 500
  - Content: {Error Message, Suggestion : "Use a valid MongoDB id"}
  ```

## Live API

The API is also hosted on https://backend-assignment-sleep-tracker.onrender.com/api/. You can use this URL to interact with the API endpoints directly.
Note: The API might take around 1 minute to load, only for the first time.

### POST Endpoint

```bash
https://backend-assignment-sleep-tracker.onrender.com/api/sleep
```

### GET Endpoint

```bash
https://backend-assignment-sleep-tracker.onrender.com/api/sleep/:userId
```

### DELETE Endpoint

```bash
https://backend-assignment-sleep-tracker.onrender.com/api/sleep/:recordId
```


