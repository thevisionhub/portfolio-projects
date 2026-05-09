import { ArrowUpRight, DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";

const icons = { DollarSign, ShoppingCart, Users, TrendingUp };

export default function StatsCard({ item }) {
  const Icon = icons[item.icon] || TrendingUp;

  return (
    <article className="card metric-card">
      <div className="metric-top">
        <p className="metric-label">{item.label}</p>
        <span className="metric-icon">
          <Icon size={18} />
        </span>
      </div>
      <p className="metric-value">{item.value}</p>
      <p className="metric-trend">
        <ArrowUpRight size={18} />
        <span className="trend-up">{item.trend}</span>
      </p>
    </article>
  );
}
