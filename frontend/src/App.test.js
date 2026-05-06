/**
 * App component tests
 */
import { render, screen, waitFor, act } from '@testing-library/react';
import App from './App';
import * as api from './services/customerApi';

// Mock the API service
jest.mock('./services/customerApi');

const mockCustomers = [
  {
    id: 'c001',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    phone: '555-101-0001',
    city: 'Springfield',
    country: 'USA'
  }
];

beforeEach(() => {
  api.getAllCustomers.mockResolvedValue(mockCustomers);
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders the app header', async () => {
  await act(async () => {
    render(<App />);
  });
  expect(screen.getByText(/Customer Manager/i)).toBeInTheDocument();
});

test('shows customer list after loading', async () => {
  await act(async () => {
    render(<App />);
  });
  await waitFor(() => {
    expect(screen.getByText(/Alice Johnson/i)).toBeInTheDocument();
  });
});

test('shows New Customer button on list view', async () => {
  await act(async () => {
    render(<App />);
  });
  await waitFor(() => {
    expect(screen.getByRole('button', { name: /New Customer/i })).toBeInTheDocument();
  });
});


