/**
 * CustomerList component
 * Displays a table of all customers with actions to view, edit, or delete each one.
 * Props:
 *   - customers {Customer[]}
 *   - onEdit {Function}   - called with customer object
 *   - onDelete {Function} - called with customer id
 *   - onView {Function}   - called with customer object
 */

import React from "react";

function CustomerList({ customers, onEdit, onDelete, onView }) {
  if (!customers || customers.length === 0) {
    return <p className="empty-state">No customers found. Add your first customer above.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="customer-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.id}>
              <td>{index + 1}</td>
              <td>
                <button
                  className="link-btn"
                  onClick={() => onView(customer)}
                  title="View details"
                >
                  {customer.firstName} {customer.lastName}
                </button>
              </td>
              <td>{customer.email}</td>
              <td>{customer.phone || "—"}</td>
              <td>{customer.city || "—"}</td>
              <td>{customer.country || "—"}</td>
              <td className="action-cell">
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => onEdit(customer)}
                  title="Edit"
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(customer.id)}
                  title="Delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
