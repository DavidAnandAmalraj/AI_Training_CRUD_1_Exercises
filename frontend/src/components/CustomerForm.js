/**
 * CustomerForm component
 * Used for both creating a new customer and editing an existing one.
 * Props:
 *   - initialData {Object|null} - customer data to pre-fill (null for new)
 *   - onSubmit {Function}       - called with form data on submit
 *   - onCancel {Function}       - called when Cancel is clicked
 *   - loading {boolean}         - disables form while saving
 */

import React, { useState, useEffect } from "react";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: ""
};

function CustomerForm({ initialData, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  // Pre-fill form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        address: initialData.address || "",
        city: initialData.city || "",
        state: initialData.state || "",
        zipCode: initialData.zipCode || "",
        country: initialData.country || ""
      });
    } else {
      setFormData(EMPTY_FORM);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
  };

  const fields = [
    { name: "firstName", label: "First Name *", type: "text", col: 6 },
    { name: "lastName", label: "Last Name *", type: "text", col: 6 },
    { name: "email", label: "Email *", type: "email", col: 6 },
    { name: "phone", label: "Phone", type: "tel", col: 6 },
    { name: "address", label: "Address", type: "text", col: 12 },
    { name: "city", label: "City", type: "text", col: 6 },
    { name: "state", label: "State", type: "text", col: 3 },
    { name: "zipCode", label: "ZIP Code", type: "text", col: 3 },
    { name: "country", label: "Country", type: "text", col: 6 }
  ];

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        {fields.map(({ name, label, type, col }) => (
          <div key={name} className={`form-group col-${col}`}>
            <label htmlFor={name}>{label}</label>
            <input
              id={name}
              name={name}
              type={type}
              value={formData[name]}
              onChange={handleChange}
              className={errors[name] ? "input-error" : ""}
              disabled={loading}
            />
            {errors[name] && <span className="error-msg">{errors[name]}</span>}
          </div>
        ))}
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving…" : initialData ? "Update Customer" : "Create Customer"}
        </button>
      </div>
    </form>
  );
}

export default CustomerForm;
