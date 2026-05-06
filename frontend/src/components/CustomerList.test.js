/**
 * Unit tests for CustomerList component
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomerList from './CustomerList';

const mockCustomers = [
  {
    id: 'c001',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    phone: '555-101-0001',
    city: 'Springfield',
    country: 'USA'
  },
  {
    id: 'c002',
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob@example.com',
    phone: '',
    city: '',
    country: 'USA'
  }
];

test('renders empty state when no customers', () => {
  render(
    <CustomerList customers={[]} onEdit={jest.fn()} onDelete={jest.fn()} onView={jest.fn()} />
  );
  expect(screen.getByText(/No customers found/i)).toBeInTheDocument();
});

test('renders a row for each customer', () => {
  render(
    <CustomerList customers={mockCustomers} onEdit={jest.fn()} onDelete={jest.fn()} onView={jest.fn()} />
  );
  expect(screen.getByText(/Alice Johnson/i)).toBeInTheDocument();
  expect(screen.getByText(/Bob Smith/i)).toBeInTheDocument();
});

test('calls onView with the correct customer when name is clicked', () => {
  const onView = jest.fn();
  render(
    <CustomerList customers={mockCustomers} onEdit={jest.fn()} onDelete={jest.fn()} onView={onView} />
  );
  fireEvent.click(screen.getByText(/Alice Johnson/i));
  expect(onView).toHaveBeenCalledWith(mockCustomers[0]);
});

test('calls onEdit with the correct customer when Edit is clicked', () => {
  const onEdit = jest.fn();
  render(
    <CustomerList customers={mockCustomers} onEdit={onEdit} onDelete={jest.fn()} onView={jest.fn()} />
  );
  const editButtons = screen.getAllByText(/Edit/i);
  fireEvent.click(editButtons[0]);
  expect(onEdit).toHaveBeenCalledWith(mockCustomers[0]);
});

test('calls onDelete with the correct id when Delete is clicked', () => {
  const onDelete = jest.fn();
  render(
    <CustomerList customers={mockCustomers} onEdit={jest.fn()} onDelete={onDelete} onView={jest.fn()} />
  );
  const deleteButtons = screen.getAllByText(/Delete/i);
  fireEvent.click(deleteButtons[0]);
  expect(onDelete).toHaveBeenCalledWith(mockCustomers[0].id);
});

test('shows dash for missing phone and city', () => {
  render(
    <CustomerList customers={mockCustomers} onEdit={jest.fn()} onDelete={jest.fn()} onView={jest.fn()} />
  );
  // Bob has no phone or city – expect em-dashes
  const dashes = screen.getAllByText('—');
  expect(dashes.length).toBeGreaterThanOrEqual(2);
});
