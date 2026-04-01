import { Search } from "lucide-react";

function SearchBar({ value, onChange }) {
  return (
    <label className="search-bar" aria-label="Search activities">
      <Search size={18} />
      <input
        type="text"
        placeholder="Search by title or location"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export default SearchBar;
