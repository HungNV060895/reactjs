import { useState } from "react";

const SearchBar = ({onSearch}) =>{

	const [value, setValue] = useState("");

	const handleSearch = () => {
		if (value.trim()) onSearch(value);
	};

	return (
		<div className="weather__search">
			<input
				className="weather__search-input"
				placeholder="Tìm thành phố..."
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={(e) => e.key === "Enter" && handleSearch()}
			/>
			<button className="weather__search-btn" onClick={handleSearch}>Tìm</button>
		</div>
	)
}

export default SearchBar;