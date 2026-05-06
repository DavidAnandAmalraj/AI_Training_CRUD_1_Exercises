# AI Training CRUD - Customer Details

Full-stack CRUD application using:
- React.js (frontend UI)
- Node.js + Express (backend API)
- Mock in-memory customer data for API operations
- Unit test coverage for backend and frontend

## Project Structure

```text
AI_Training_CRUD_1_Exercises/
	backend/
		src/
			app.js
			server.js
			controllers/
			routes/
			services/
			data/
		tests/unit/
	frontend/
		src/
			api/
			hooks/
			components/
			__tests__/
	docs/
		API.md
		TESTING.md
```

## Prerequisites
- Node.js 18+
- npm 9+

## Installation

```bash
npm install
```

## Run Application (Frontend + Backend)

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`.
Backend runs on `http://localhost:5000`.

## Run Tests

```bash
npm test
```

Backend only:

```bash
npm run test:backend
```

Frontend only:

```bash
npm run test:frontend
```

## API and Testing Docs
- API documentation: `docs/API.md`
- Testing strategy: `docs/TESTING.md`

## Mock Data Behavior
- API uses in-memory mock data from `backend/src/data/customers.mock.js`.
- Data resets whenever backend server restarts.