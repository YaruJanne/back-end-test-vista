# Vista Technical Test – Backend API

REST API for managing companies and their services.

**Tech stack:** Node.js, TypeScript, Express 5, Prisma ORM (v6), MySQL, express-validator

> **Quickest way to try it:** see [Quick start with Docker](#quick-start-with-docker-recommended-for-reviewers) — one command, no local MySQL needed.

## Requirements

- Node.js 20+ and npm
- MySQL 8+

## Setup

```bash
git clone https://github.com/YaruJanne/back-end-test-vista.git
cd back-end-test-vista
npm install
```

Create a MySQL database:

```sql
CREATE DATABASE vista_test;
```

Copy the environment file and fill in your MySQL credentials:

```bash
cp .env.example .env
```

| Variable | Example | Description |
|---|---|---|
| `DATABASE_URL` | `mysql://root:password@localhost:3306/vista_test` | MySQL connection string |
| `PORT` | `3000` | Port the API listens on |

Create the tables:

```bash
npx prisma migrate deploy
```

## Running

| Command | Description |
|---|---|
| `npm run dev` | Development mode with auto-reload |
| `npm run build` | Generate Prisma Client and compile TypeScript to `dist/` |
| `npm start` | Run the compiled build |

API runs at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint | Description | Success | Errors |
|---|---|---|---|---|
| GET | `/health` | Health check | 200 | – |
| POST | `/companies` | Create a company | 201 | 400, 409 |
| GET | `/companies` | List all companies with their services | 200 | – |
| POST | `/services` | Create a service under a company | 201 | 400, 404 |
| GET | `/services/:id` | Get service details (includes company) | 200 | 400, 404 |

### Example: Create company

```http
POST /companies
Content-Type: application/json

{ "name": "Vista Sdn Bhd", "registrationNumber": "202301000123" }
```

### Example: Create service

```http
POST /services
Content-Type: application/json

{ "companyId": 1, "name": "Web Design", "description": "Company website design", "price": 1500 }
```

### Error format

```json
{
  "message": "Validation failed",
  "errors": [{ "field": "name", "message": "Company name is required" }]
}
```

## API Documentation

A Postman collection with example requests and responses is in `postman/vista-api.postman_collection.json`.
Import it into Postman and set the `baseUrl` collection variable if your port differs.

## Database Schema

- **Company**: `id`, `name`, `registrationNumber` (unique)
- **Service**: `id`, `companyId` (FK → Company.id), `name`, `description`, `price` (Decimal 10,2)
- One company has many services; deleting a company deletes its services (cascade).

## Project Structure

```
src/
├── index.ts          # App setup, middleware, routes
├── prisma.ts         # Shared Prisma client
├── types/dto.ts      # Request/response DTO interfaces
├── utils/mappers.ts  # DB model → response DTO
├── routes/           # Route definitions
├── controllers/      # Request handlers
├── validators/       # express-validator rules
└── middleware/       # Logger, validation, error handler
```

## Quick start with Docker (recommended for reviewers)

The fastest way to run the API — no local MySQL or Node.js needed, only [Docker Desktop](https://www.docker.com/products/docker-desktop/):

```bash
git clone https://github.com/YaruJanne/back-end-test-vista.git
cd back-end-test-vista
docker compose up --build
```

This starts **MySQL 8.4** and the **API**, creates the tables automatically (`prisma migrate deploy` runs on startup), and serves the API at `http://localhost:3000`.

| Service | Address | Notes |
|---|---|---|
| API | `http://localhost:3000` | Try `GET /health` |
| MySQL | `localhost:3307` | user `root`, password `root`, database `vista_test` |

Stop with `Ctrl+C`, or `docker compose down` (add `-v` to also delete the database data).

### Docker image only

To run just the API container against your own MySQL:

```bash
docker build -t vista-backend .
docker run -p 3000:3000 -e DATABASE_URL="mysql://root:password@host.docker.internal:3306/vista_test" vista-backend
```

`host.docker.internal` lets the container reach MySQL running on your machine.
