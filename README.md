# user-verification-service

REST API for managing user identity verification records. Supports creating, retrieving, updating and deleting verification entries, uploading ID proof documents to S3, and browsing the API via Swagger UI.

## Tech Stack

Node.js · Express · MongoDB (Mongoose) · AWS S3 · Multer · Swagger UI

## Features

- CRUD operations on user verification records
- ID proof document upload to AWS S3 (memory storage via Multer)
- Layered architecture: routes → controller → service → repository
- Swagger UI at `/api-docs`

## Getting Started

### Prerequisites

Node.js 18+ · MongoDB instance · AWS S3 bucket with credentials

### Setup

```bash
git clone https://github.com/arcadia-man/user-verification-service.git
cd user-verification-service
cp .env.example .env   # fill in your values
npm install
node src/app.js
```

Server starts on port `3000` (or `PORT` from env).
Swagger docs: `http://localhost:3000/api-docs`

## API Routes — `/user-verification`

| Method | Route | Description |
|---|---|---|
| GET | `/:userId` | Get verification record by user ID |
| POST | `/list` | List all verification records |
| POST | `/` | Create a new verification record |
| POST | `/update` | Update a verification record |
| POST | `/delete` | Delete a verification record |
| POST | `/:userId/upload` | Upload ID proof document to S3 |

## Project Structure

```
user-verification-service/
├── src/
│   ├── app.js                          # Express server entry point
│   ├── config/db.js                    # MongoDB connection
│   ├── routes/userVerificationRoutes.js
│   ├── controllers/                    # Request/response handling
│   ├── services/                       # Business logic
│   ├── repositories/                   # MongoDB queries
│   ├── models/                         # Mongoose schema
│   ├── webservices/s3Services/         # S3 upload helper
│   └── constants/                      # AWS and other constants
└── swagger.json                        # OpenAPI spec
```

## Environment Variables

See `.env.example` for all required variables (`MONGO_URI`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_BUCKET_NAME`).
