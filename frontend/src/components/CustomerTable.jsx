const CustomerTable = ({ customers, onEdit, onDelete }) => {
  if (!customers.length) {
    return <p className="card empty">No customers available.</p>;
  }

  return (
    <div className="card table-card">
      <h2>Customer List</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.city}</td>
                <td className="actions">
                  <button className="secondary" onClick={() => onEdit(customer)}>
                    Edit
                  </button>
                  <button className="danger" onClick={() => onDelete(customer.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
