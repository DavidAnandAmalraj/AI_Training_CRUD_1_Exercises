/**
 * Unit tests for ConfirmDialog component
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmDialog from './ConfirmDialog';

test('renders the confirmation message', () => {
  render(
    <ConfirmDialog
      message="Are you sure?"
      onConfirm={jest.fn()}
      onCancel={jest.fn()}
    />
  );
  expect(screen.getByText(/Are you sure\?/i)).toBeInTheDocument();
});

test('calls onConfirm when Delete button is clicked', () => {
  const onConfirm = jest.fn();
  render(
    <ConfirmDialog message="Delete?" onConfirm={onConfirm} onCancel={jest.fn()} />
  );
  fireEvent.click(screen.getByRole('button', { name: /Delete/i }));
  expect(onConfirm).toHaveBeenCalled();
});

test('calls onCancel when Cancel button is clicked', () => {
  const onCancel = jest.fn();
  render(
    <ConfirmDialog message="Delete?" onConfirm={jest.fn()} onCancel={onCancel} />
  );
  fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
  expect(onCancel).toHaveBeenCalled();
});
