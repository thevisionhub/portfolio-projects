import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { categoryData } from "../data/dashboardData";

export default function CategoryChart() {
  const total = categoryData.reduce((sum, item) => sum + item.value, 0);

  return (
    <article className="card panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Sales by Category</h2>
          <p className="section-subtitle">Revenue distribution across product categories.</p>
        </div>
        <span className="panel-tag">$110.3k</span>
      </div>
      <div className="chart-box small">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip />
            <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={68} outerRadius={98} paddingAngle={4} stroke="transparent">
              {categoryData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="category-list">
        {categoryData.map((item) => (
          <div className="category-row" key={item.name}>
            <span>{item.name}</span>
            <span className="progress-track">
              <span className="progress-fill" style={{ width: `${(item.value / total) * 100}%`, background: item.color }} />
            </span>
            <strong>${(item.value / 1000).toFixed(1)}k</strong>
          </div>
        ))}
      </div>
    </article>
  );
}
