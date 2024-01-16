# express-typeorm-boilerplate

This is a boilerplate project for building a RESTful API using Express.js and TypeORM. It includes user authentication, CRUD operations, and JWT-based authorization.

## Project Structure

- `src`: Contains the source code for the application.
  - `controllers`: Handles HTTP request handling and interacts with the services.
  - `data-source`: Configures and initializes the data source (TypeORM).
  - `entities`: Defines database entities (TypeORM entities).
  - `libs`: Contains utility functions and validation logic.
  - `middleware`: Includes middleware functions (e.g., authentication).
  - `route`: Defines API routes using Express Router.
  - `service`: Implements business logic and communicates with the database.
- `dotenv`: Configuration files for environment variables.
- `tsconfig.json`: TypeScript configuration file.
- `package.json`: Project metadata and dependencies.
- `README.md`: Project documentation.

## Dependencies

- **bcrypt**: Password hashing library.
- **cors**: Middleware for handling Cross-Origin Resource Sharing.
- **express**: Web framework for handling HTTP requests.
- **joi**: Schema validation library.
- **jsonwebtoken**: Library for generating and verifying JWTs.
- **mysql**: MySQL database driver for Node.js.
- **reflect-metadata**: Library for reflection metadata.
- **typeorm**: ORM for TypeScript and JavaScript.

## Development Dependencies

- **@types/bcrypt**, **@types/cors**, **@types/express**, **@types/jsonwebtoken**, **@types/node**: TypeScript type definitions for development.
- **dotenv**: Loads environment variables from a .env file.
- **nodemon**: Monitors changes in the source code and automatically restarts the server.
- **ts-node**, **typescript**: TypeScript execution environment and compiler.

## Scripts

- `start`: Starts the server using `ts-node`.
- `start:dev`: Starts the server in development mode using `nodemon`.

## Getting Started

1. Install dependencies: `npm install`
2. Create a `.env` file and configure environment variables.
3. Run the application: `npm start`

## API Endpoints

- **GET /api/users**: Get all users.
- **GET /api/users/:id**: Get a specific user by ID.
- **POST /api/users**: Create a new user.
- **PUT /api/users/:id**: Update an existing user.
- **DELETE /api/users/:id**: Delete a user.
- **POST /api/login**: User login.

## Authentication

This boilerplate includes a simple JWT-based authentication middleware (`auth`). To secure routes, include the middleware before the route handler.

Example:

```typescript
import auth from "./middleware/auth";

// Secure route
router.get("/secure-route", auth, (req, res) => {
  // Handle secure route logic
});
```

## Configuration

Update the `.env` file with your specific configuration, including database connection details, JWT secret key, and other environment variables.

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=testdb
JWT_SECRET=your-secret-key-here
```

## Contributing

Feel free to contribute to this project by submitting issues or pull requests. Report any bugs or suggest improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
