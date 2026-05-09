import { customers } from "../data/dashboardData";

export default function CustomersTable() {
  return (
    <article className="card panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Top Customers</h2>
          <p className="section-subtitle">Highest value customers this month.</p>
        </div>
        <span className="panel-tag">CRM</span>
      </div>
      <div className="customers-list">
        {customers.map((customer) => (
          <div className="customer-card" key={customer.email}>
            <span className="avatar">{customer.name.split(" ").map((part) => part[0]).join("")}</span>
            <span>
              <strong>{customer.name}</strong>
              <small>{customer.email} - {customer.orders} orders</small>
            </span>
            <strong className="customer-total">{customer.spent}</strong>
          </div>
        ))}
      </div>
    </article>
  );
}
