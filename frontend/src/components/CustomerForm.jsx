const CustomerForm = ({ form, editingId, onChange, onSubmit, onCancel }) => {
  return (
    <form className="card form-card" onSubmit={onSubmit}>
      <h2>{editingId ? "Edit Customer" : "Create Customer"}</h2>
      <div className="grid">
        <label>
          Name
          <input name="name" value={form.name} onChange={onChange} />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={onChange} />
        </label>
        <label>
          Phone
          <input name="phone" value={form.phone} onChange={onChange} />
        </label>
        <label>
          City
          <input name="city" value={form.city} onChange={onChange} />
        </label>
      </div>
      <div className="actions">
        <button type="submit">{editingId ? "Update" : "Add"}</button>
        {editingId && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CustomerForm;
