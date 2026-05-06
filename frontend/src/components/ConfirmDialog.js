/**
 * ConfirmDialog component
 * A simple modal confirmation dialog used before deleting a customer.
 * Props:
 *   - message {string}    - confirmation message to display
 *   - onConfirm {Function}
 *   - onCancel {Function}
 */

import React from "react";

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
