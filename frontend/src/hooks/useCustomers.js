import { useEffect, useState } from "react";
import { addCustomer, editCustomer, fetchCustomers, removeCustomer } from "../api/customerApi";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  city: ""
};

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCustomers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchCustomers();
      setCustomers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const startEdit = (customer) => {
    setEditingId(customer.id);
    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      city: customer.city
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setError("");

    try {
      if (editingId) {
        const updated = await editCustomer(editingId, form);
        setCustomers((prev) => prev.map((item) => (item.id === editingId ? updated : item)));
      } else {
        const created = await addCustomer(form);
        setCustomers((prev) => [...prev, created]);
      }
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteOne = async (id) => {
    setError("");
    try {
      await removeCustomer(id);
      setCustomers((prev) => prev.filter((item) => item.id !== id));
      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    customers,
    form,
    editingId,
    loading,
    error,
    handleChange,
    submitForm,
    deleteOne,
    startEdit,
    resetForm
  };
};
