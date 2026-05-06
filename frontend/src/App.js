/**
 * App.js – Root component
 *
 * Manages application state and view routing:
 *   "list"   – CustomerList
 *   "form"   – CustomerForm (create / edit)
 *   "detail" – CustomerDetail
 */

import React, { useState, useEffect, useCallback } from "react";
import CustomerList from "./components/CustomerList";
import CustomerForm from "./components/CustomerForm";
import CustomerDetail from "./components/CustomerDetail";
import ConfirmDialog from "./components/ConfirmDialog";
import * as api from "./services/customerApi";
import "./App.css";

function App() {
  // ── State ───────────────────────────────────────────────────────────────────
  const [view, setView] = useState("list"); // "list" | "form" | "detail"
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [deleteId, setDeleteId] = useState(null); // id awaiting delete confirmation

  // ── Data fetching ───────────────────────────────────────────────────────────
  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getAllCustomers();
      setCustomers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // ── Helper ──────────────────────────────────────────────────────────────────
  const flash = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleCreate = () => {
    setSelectedCustomer(null);
    setView("form");
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setView("form");
  };

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    setView("detail");
  };

  const handleDeleteRequest = (id) => {
    setDeleteId(id);
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      await api.deleteCustomer(deleteId);
      await fetchCustomers();
      flash("Customer deleted successfully.");
      if (view === "detail") setView("list");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setDeleteId(null);
    }
  };

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      if (selectedCustomer) {
        await api.updateCustomer(selectedCustomer.id, formData);
        flash("Customer updated successfully.");
      } else {
        await api.createCustomer(formData);
        flash("Customer created successfully.");
      }
      await fetchCustomers();
      setView("list");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => setView("list");

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1
          className="app-title"
          onClick={() => setView("list")}
          style={{ cursor: "pointer" }}
        >
          Customer Manager
        </h1>
        {view === "list" && (
          <button className="btn btn-primary" onClick={handleCreate}>
            + New Customer
          </button>
        )}
      </header>

      <main className="app-main">
        {/* Feedback messages */}
        {error && (
          <div className="alert alert-error" role="alert">
            {error}
            <button className="alert-close" onClick={() => setError(null)}>✕</button>
          </div>
        )}
        {successMsg && (
          <div className="alert alert-success" role="status">
            {successMsg}
          </div>
        )}

        {/* Views */}
        {view === "list" && (
          <>
            <div className="section-header">
              <h2>Customers ({customers.length})</h2>
            </div>
            {loading ? (
              <p className="loading">Loading customers…</p>
            ) : (
              <CustomerList
                customers={customers}
                onEdit={handleEdit}
                onDelete={handleDeleteRequest}
                onView={handleView}
              />
            )}
          </>
        )}

        {view === "form" && (
          <>
            <h2>{selectedCustomer ? "Edit Customer" : "New Customer"}</h2>
            <CustomerForm
              initialData={selectedCustomer}
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
              loading={loading}
            />
          </>
        )}

        {view === "detail" && (
          <CustomerDetail
            customer={selectedCustomer}
            onEdit={handleEdit}
            onBack={() => setView("list")}
          />
        )}
      </main>

      {/* Delete confirmation dialog */}
      {deleteId && (
        <ConfirmDialog
          message="Are you sure you want to delete this customer? This action cannot be undone."
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

export default App;

