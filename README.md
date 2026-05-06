# Customer CRUD Application

A full-stack Customer Management application built with **Node.js + Express** (backend REST API) and **React.js** (frontend UI). The project uses in-memory mock data and includes comprehensive unit & integration tests.

---

## 📁 Project Structure

```
.
├── backend/                     # Node.js REST API
│   ├── src/
│   │   ├── app.js               # Express app (middleware & routes)
│   │   ├── server.js            # HTTP server entry point
│   │   ├── controllers/
│   │   │   └── customerController.js   # Request/response handlers
│   │   ├── services/
│   │   │   └── customerService.js      # Business logic & in-memory store
│   │   ├── routes/
│   │   │   └── customerRoutes.js       # Route definitions
│   │   ├── models/
│   │   │   └── customer.js             # Customer model factory
│   │   ├── middleware/
│   │   │   ├── validation.js           # express-validator rules
│   │   │   └── errorHandler.js         # Global error & 404 handlers
│   │   └── data/
│   │       └── mockData.js             # Seed data (5 customers)
│   ├── tests/
│   │   ├── customerService.test.js     # Service unit tests (Jest)
│   │   └── customerRoutes.test.js      # API integration tests (Supertest)
│   └── package.json
│
└── frontend/                    # React.js UI
    ├── src/
    │   ├── App.js               # Root component (view router & state)
    │   ├── App.css              # Application styles
    │   ├── App.test.js          # App-level tests
    │   ├── components/
    │   │   ├── CustomerList.js          # Table of all customers
    │   │   ├── CustomerList.test.js
    │   │   ├── CustomerForm.js          # Create / Edit form
    │   │   ├── CustomerForm.test.js
    │   │   ├── CustomerDetail.js        # Read-only customer card
    │   │   ├── CustomerDetail.test.js
    │   │   ├── ConfirmDialog.js         # Delete confirmation modal
    │   │   └── ConfirmDialog.test.js
    │   └── services/
    │       └── customerApi.js           # Fetch-based API client
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### 1. Start the backend

```bash
cd backend
npm install
npm start
# API is available at http://localhost:5000
```

### 2. Start the frontend (separate terminal)

```bash
cd frontend
npm install
npm start
# App opens at http://localhost:3000
```

---

## 🗄️ Customer Data Model

| Field       | Type   | Required | Description              |
|-------------|--------|----------|--------------------------|
| id          | string | auto     | UUID (generated)         |
| firstName   | string | ✅        | Customer first name      |
| lastName    | string | ✅        | Customer last name       |
| email       | string | ✅        | Unique email address     |
| phone       | string |          | Phone number             |
| address     | string |          | Street address           |
| city        | string |          | City                     |
| state       | string |          | State / Province         |
| zipCode     | string |          | ZIP / Postal code        |
| country     | string |          | Country                  |
| createdAt   | string | auto     | ISO timestamp            |
| updatedAt   | string | auto     | ISO timestamp            |

---

## 🔌 API Endpoints

All routes are prefixed with `/api`.

| Method | Endpoint              | Description             |
|--------|-----------------------|-------------------------|
| GET    | /api/customers        | List all customers      |
| GET    | /api/customers/:id    | Get customer by ID      |
| POST   | /api/customers        | Create a new customer   |
| PUT    | /api/customers/:id    | Update a customer       |
| DELETE | /api/customers/:id    | Delete a customer       |
| GET    | /health               | Health check            |

### Response format

**Success**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error**
```json
{
  "success": false,
  "message": "Customer not found"
}
```

---

## 🧪 Running Tests

### Backend (Jest + Supertest)

```bash
cd backend
npm test            # run all tests with coverage
npm run test:watch  # watch mode
```

Coverage target: >90% on all source files.

### Frontend (React Testing Library)

```bash
cd frontend
npm run test:ci     # run all tests once (CI-friendly)
npm test            # interactive watch mode
```

---

## 🏗️ Architecture Notes

- **Mock data**: The backend uses a JavaScript array as the data store (`src/data/mockData.js`). No external database is required. The `resetStore()` function in `customerService.js` allows tests to restore the original seed data between test runs.
- **Validation**: All write operations (POST / PUT) are validated by `express-validator` before reaching the controller.
- **Error handling**: A global error-handler middleware converts unhandled errors into consistent JSON responses.
- **CORS**: The backend allows cross-origin requests so the React dev server (port 3000) can talk to the API (port 5000).
- **Frontend state**: The React app manages all views (`list`, `form`, `detail`) in a single root component without a router library, keeping the dependency footprint small.
