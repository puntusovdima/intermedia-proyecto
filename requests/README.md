# API Testing with REST Client

This directory contains `.http` files for testing the API using the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension for VS Code.

## How to use

1.  Install the **REST Client** extension in VS Code.
2.  Open any of the `.http` files in this directory.
3.  Click the "Send Request" button above any of the requests.

## Files

-   `auth.http`: Contains user registration, login, and email verification.
-   `health.http`: Basic health checks and error handling tests.

## Variables

Variables like `@baseUrl`, `@email`, and `@password` are defined at the top of the files. You can change them directly there.
The `auth.http` file uses a feature where the `accessToken` from the login response is automatically saved for subsequent requests.

```http
@authToken = {{login.response.body.accessToken}}
```

_Note: The server must be running (npm run dev) for these tests to work._
