/**
 * CustomerDetail component
 * Displays the full details of a single customer in a read-only card.
 * Props:
 *   - customer {Customer}
 *   - onEdit {Function}
 *   - onBack {Function}
 */

import React from "react";

function CustomerDetail({ customer, onEdit, onBack }) {
  if (!customer) return null;

  const rows = [
    { label: "First Name", value: customer.firstName },
    { label: "Last Name", value: customer.lastName },
    { label: "Email", value: customer.email },
    { label: "Phone", value: customer.phone },
    { label: "Address", value: customer.address },
    { label: "City", value: customer.city },
    { label: "State", value: customer.state },
    { label: "ZIP Code", value: customer.zipCode },
    { label: "Country", value: customer.country },
    { label: "Created", value: customer.createdAt ? new Date(customer.createdAt).toLocaleString() : "—" },
    { label: "Updated", value: customer.updatedAt ? new Date(customer.updatedAt).toLocaleString() : "—" }
  ];

  return (
    <div className="detail-card">
      <h2>
        {customer.firstName} {customer.lastName}
      </h2>
      <dl className="detail-list">
        {rows.map(({ label, value }) => (
          <React.Fragment key={label}>
            <dt>{label}</dt>
            <dd>{value || "—"}</dd>
          </React.Fragment>
        ))}
      </dl>
      <div className="detail-actions">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back to List
        </button>
        <button className="btn btn-primary" onClick={() => onEdit(customer)}>
          Edit
        </button>
      </div>
    </div>
  );
}

export default CustomerDetail;
