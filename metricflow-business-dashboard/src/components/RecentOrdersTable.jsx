import FilterBar from "./FilterBar";

export default function RecentOrdersTable({ orders, search, setSearch, status, setStatus, category, setCategory }) {
  return (
    <article className="card panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Recent Orders</h2>
          <p className="section-subtitle">Latest customer orders and payment status.</p>
        </div>
        <span className="panel-tag">{orders.length} visible</span>
      </div>
      <FilterBar search={search} setSearch={setSearch} status={status} setStatus={setStatus} category={category} setCategory={setCategory} />
      {orders.length ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>{["Order ID", "Customer", "Product", "Status", "Amount", "Date"].map((heading) => <th key={heading}>{heading}</th>)}</tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>
                    {order.product}
                    <div className="muted">{order.category}</div>
                  </td>
                  <td>
                    <span className={`badge ${order.status.toLowerCase()}`}>{order.status}</span>
                  </td>
                  <td>{order.amount}</td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">No orders match the current search and filters.</div>
      )}
    </article>
  );
}
