# Testing Strategy

## Backend Unit Tests
- `backend/tests/unit/customer.service.test.js`
  - Verifies service-level CRUD operations and validation.
- `backend/tests/unit/customer.api.test.js`
  - Verifies HTTP contracts using `supertest` against Express app.

## Frontend Unit Tests
- `frontend/src/__tests__/App.test.jsx`
  - Verifies rendering, create flow, and delete flow with mocked API module.

## Run Tests
From repository root:

```bash
npm test
```

Or separately:

```bash
npm run test:backend
npm run test:frontend
```
