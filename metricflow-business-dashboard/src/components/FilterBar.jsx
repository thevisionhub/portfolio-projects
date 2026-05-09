import { Search } from "lucide-react";

export default function FilterBar({ search, setSearch, status, setStatus, category, setCategory }) {
  return (
    <div className="filter-bar">
      <label className="search-wrap filter-search">
        <Search size={18} />
        <span className="sr-only">Search recent orders</span>
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search recent orders..." />
      </label>
      <select className="filter-select" value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Status filter">
        {["All", "Completed", "Pending", "Cancelled"].map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <select className="filter-select" value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Category filter">
        {["All", "Sneakers", "Clothing", "Accessories", "Watches", "Bags"].map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
