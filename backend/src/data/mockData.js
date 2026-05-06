/**
 * Mock customer data used as the in-memory data store.
 * In a production application this would be replaced by a database.
 */

const customers = [
  {
    id: "c001",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    phone: "555-101-0001",
    address: "100 Maple Street",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
    country: "USA",
    createdAt: "2024-01-10T08:00:00.000Z",
    updatedAt: "2024-01-10T08:00:00.000Z"
  },
  {
    id: "c002",
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.smith@example.com",
    phone: "555-101-0002",
    address: "200 Oak Avenue",
    city: "Shelbyville",
    state: "IL",
    zipCode: "62565",
    country: "USA",
    createdAt: "2024-02-14T09:30:00.000Z",
    updatedAt: "2024-02-14T09:30:00.000Z"
  },
  {
    id: "c003",
    firstName: "Carol",
    lastName: "Williams",
    email: "carol.williams@example.com",
    phone: "555-101-0003",
    address: "300 Pine Road",
    city: "Capital City",
    state: "IL",
    zipCode: "62702",
    country: "USA",
    createdAt: "2024-03-05T11:00:00.000Z",
    updatedAt: "2024-03-05T11:00:00.000Z"
  },
  {
    id: "c004",
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@example.com",
    phone: "555-101-0004",
    address: "400 Elm Street",
    city: "Ogdenville",
    state: "IL",
    zipCode: "62703",
    country: "USA",
    createdAt: "2024-04-20T14:15:00.000Z",
    updatedAt: "2024-04-20T14:15:00.000Z"
  },
  {
    id: "c005",
    firstName: "Eva",
    lastName: "Martinez",
    email: "eva.martinez@example.com",
    phone: "555-101-0005",
    address: "500 Birch Lane",
    city: "North Haverbrook",
    state: "IL",
    zipCode: "62704",
    country: "USA",
    createdAt: "2024-05-01T16:45:00.000Z",
    updatedAt: "2024-05-01T16:45:00.000Z"
  }
];

module.exports = customers;
