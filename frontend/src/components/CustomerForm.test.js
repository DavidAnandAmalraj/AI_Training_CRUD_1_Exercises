/**
 * Unit tests for CustomerForm component
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CustomerForm from './CustomerForm';

const onSubmit = jest.fn();
const onCancel = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders all form fields', () => {
  render(<CustomerForm initialData={null} onSubmit={onSubmit} onCancel={onCancel} loading={false} />);
  expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
});

test('shows Create Customer button for new form', () => {
  render(<CustomerForm initialData={null} onSubmit={onSubmit} onCancel={onCancel} loading={false} />);
  expect(screen.getByRole('button', { name: /Create Customer/i })).toBeInTheDocument();
});

test('shows Update Customer button when editing', () => {
  const customer = {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com'
  };
  render(<CustomerForm initialData={customer} onSubmit={onSubmit} onCancel={onCancel} loading={false} />);
  expect(screen.getByRole('button', { name: /Update Customer/i })).toBeInTheDocument();
});

test('shows validation errors when submitting empty form', async () => {
  render(<CustomerForm initialData={null} onSubmit={onSubmit} onCancel={onCancel} loading={false} />);
  fireEvent.click(screen.getByRole('button', { name: /Create Customer/i }));
  await waitFor(() => {
    expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
  });
  expect(onSubmit).not.toHaveBeenCalled();
});

test('calls onSubmit with form data when form is valid', async () => {
  render(<CustomerForm initialData={null} onSubmit={onSubmit} onCancel={onCancel} loading={false} />);

  fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Jane' } });
  fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'jane@example.com' } });

  fireEvent.click(screen.getByRole('button', { name: /Create Customer/i }));

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com'
      })
    );
  });
});

test('calls onCancel when Cancel button is clicked', () => {
  render(<CustomerForm initialData={null} onSubmit={onSubmit} onCancel={onCancel} loading={false} />);
  fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
  expect(onCancel).toHaveBeenCalled();
});

test('pre-fills form with initialData when editing', () => {
  const customer = {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    phone: '555-0001',
    city: 'Springfield'
  };
  render(<CustomerForm initialData={customer} onSubmit={onSubmit} onCancel={onCancel} loading={false} />);
  expect(screen.getByLabelText(/First Name/i)).toHaveValue('Alice');
  expect(screen.getByLabelText(/Last Name/i)).toHaveValue('Johnson');
  expect(screen.getByLabelText(/Email/i)).toHaveValue('alice@example.com');
});
