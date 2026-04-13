import { Search } from "lucide-react";

function SearchBar({ value, onChange }) {
  return (
    // REVIEW: Visible label text is better than placeholder-only for a11y; consider a visually hidden <span> or external <label htmlFor>.
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
