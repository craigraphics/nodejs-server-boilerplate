# TypeScript MongoDB REST API

A robust, production-ready REST API built with TypeScript, Express, and MongoDB. This project provides a solid foundation for building scalable backend services with modern JavaScript.

## Features

- **TypeScript** - Strong typing for better code quality and developer experience
- **MongoDB & Mongoose** - NoSQL database with elegant ODM (Object Data Modeling)
- **Express.js** - Fast, unopinionated web framework for Node.js
- **RESTful API** - Standard CRUD operations with proper error handling
- **Security Features** - Helmet, rate limiting, and MongoDB sanitization
- **Modular Structure** - Well-organized code for maintainability and scalability

## Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (local instance or MongoDB Atlas)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/typescript-mongodb-api.git
cd typescript-mongodb-api
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/api_database?retryWrites=true&w=majority
```

Replace `<username>`, `<password>`, and `<cluster>` with your MongoDB Atlas credentials.

### 4. Build and run the project

#### For development:

```bash
npm run dev
# or
yarn dev
```

#### For production:

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## API Endpoints

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| GET    | /api/items     | Get all items       |
| GET    | /api/items/:id | Get a specific item |
| POST   | /api/items     | Create a new item   |
| PUT    | /api/items/:id | Update an item      |
| DELETE | /api/items/:id | Delete an item      |
| GET    | /health        | API health check    |

## Project Structure

```
node-typescript-mongodb-api/
├── .env                 # Environment variables
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── src/
│   ├── server.ts        # Server entry point
│   ├── app.ts           # Express application setup
│   ├── config/
│   │   └── db.ts        # Database connection
│   ├── models/
│   │   └── Item.ts      # MongoDB models
│   ├── controllers/
│   │   └── itemController.ts  # Request handlers
│   ├── routes/
│   │   └── itemRoutes.ts      # API routes
│   ├── middleware/
│   │   ├── errorHandler.ts    # Error handling middleware
│   │   └── asyncHandler.ts    # Async error wrapper
│   └── types/
│       └── index.ts     # TypeScript type definitions
└── dist/                # Compiled JavaScript (generated)
```

## Development Commands

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run lint` - Run ESLint for code quality

## Connection Issues

If you encounter port conflicts (EADDRINUSE), try:

1. Change the port in the `.env` file
2. Or run with a different port: `PORT=3001 npm run dev`
3. Kill the process using the port:
   ```
   lsof -i :PORT
   kill -9 PID
   ```

## MongoDB Connection

To connect to MongoDB Atlas:

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add your IP to the whitelist in Network Access
4. Create a database user in Database Access
5. Get your connection string from the Connect dialog
6. Replace placeholders with your actual credentials in the `.env` file

## Notes on Production Use

- Set `NODE_ENV=production` for optimized settings
- Consider using a process manager like PM2
- Set up proper logging for production
- Implement authentication for API endpoints
- Deploy behind a reverse proxy like Nginx

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

[MIT](LICENSE)
