/**
 * Unit tests for CustomerDetail component
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomerDetail from './CustomerDetail';

const mockCustomer = {
  id: 'c001',
  firstName: 'Alice',
  lastName: 'Johnson',
  email: 'alice@example.com',
  phone: '555-101-0001',
  address: '100 Maple St',
  city: 'Springfield',
  state: 'IL',
  zipCode: '62701',
  country: 'USA',
  createdAt: '2024-01-10T08:00:00.000Z',
  updatedAt: '2024-01-10T08:00:00.000Z'
};

test('renders customer name as heading', () => {
  render(<CustomerDetail customer={mockCustomer} onEdit={jest.fn()} onBack={jest.fn()} />);
  expect(screen.getByText(/Alice Johnson/i)).toBeInTheDocument();
});

test('renders customer email', () => {
  render(<CustomerDetail customer={mockCustomer} onEdit={jest.fn()} onBack={jest.fn()} />);
  expect(screen.getByText(/alice@example.com/i)).toBeInTheDocument();
});

test('calls onEdit when Edit button is clicked', () => {
  const onEdit = jest.fn();
  render(<CustomerDetail customer={mockCustomer} onEdit={onEdit} onBack={jest.fn()} />);
  fireEvent.click(screen.getByRole('button', { name: /Edit/i }));
  expect(onEdit).toHaveBeenCalledWith(mockCustomer);
});

test('calls onBack when Back button is clicked', () => {
  const onBack = jest.fn();
  render(<CustomerDetail customer={mockCustomer} onEdit={jest.fn()} onBack={onBack} />);
  fireEvent.click(screen.getByRole('button', { name: /Back to List/i }));
  expect(onBack).toHaveBeenCalled();
});

test('renders nothing when customer is null', () => {
  const { container } = render(
    <CustomerDetail customer={null} onEdit={jest.fn()} onBack={jest.fn()} />
  );
  expect(container.firstChild).toBeNull();
});
