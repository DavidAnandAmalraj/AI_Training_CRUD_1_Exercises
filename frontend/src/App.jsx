import CustomerForm from "./components/CustomerForm";
import CustomerTable from "./components/CustomerTable";
import { useCustomers } from "./hooks/useCustomers";

const App = () => {
  const {
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
  } = useCustomers();

  return (
    <main className="layout">
      <header>
        <h1>Customer CRUD Dashboard</h1>
        <p>React UI + Node.js API with mock in-memory data</p>
      </header>

      {error && <p className="error">{error}</p>}

      <CustomerForm
        form={form}
        editingId={editingId}
        onChange={handleChange}
        onSubmit={submitForm}
        onCancel={resetForm}
      />

      {loading ? (
        <p className="card">Loading customers...</p>
      ) : (
        <CustomerTable customers={customers} onEdit={startEdit} onDelete={deleteOne} />
      )}
    </main>
  );
};

export default App;
