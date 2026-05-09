import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { salesData } from "../data/dashboardData";

export default function SalesChart({ theme }) {
  const axisColor = theme === "dark" ? "#a1a1aa" : "#64748b";

  return (
    <article className="card panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Revenue Performance</h2>
          <p className="section-subtitle">Monthly sales trend for the current year.</p>
        </div>
        <span className="panel-tag">Area Chart</span>
      </div>
      <div className="chart-box">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesData} margin={{ top: 12, right: 10, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.34} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === "dark" ? "#27272a" : "#e5e7eb"} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 12 }} tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
            <Tooltip />
            <Area type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} fill="url(#salesGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
