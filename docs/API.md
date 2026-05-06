# Customer CRUD API Documentation

Base URL: `http://localhost:5000/api`

## Endpoints

### 1) Get all customers
- Method: `GET`
- URL: `/customers`
- Success: `200 OK`

### 2) Get customer by ID
- Method: `GET`
- URL: `/customers/:id`
- Success: `200 OK`
- Not Found: `404 Not Found`

### 3) Create customer
- Method: `POST`
- URL: `/customers`
- Body:
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "phone": "1234567890",
  "city": "Chennai"
}
```
- Success: `201 Created`
- Validation Error: `400 Bad Request`

### 4) Update customer
- Method: `PUT`
- URL: `/customers/:id`
- Body: same shape as create
- Success: `200 OK`
- Not Found: `404 Not Found`
- Validation Error: `400 Bad Request`

### 5) Delete customer
- Method: `DELETE`
- URL: `/customers/:id`
- Success: `200 OK`
- Not Found: `404 Not Found`

## Notes
- This project intentionally uses in-memory mock data (`backend/src/data/customers.mock.js`).
- Data resets when backend restarts.
