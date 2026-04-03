export default function Button() {
	function handleClick() {
		alert('You clicked me!');
	}

	return (
		<button onClick={handleClick}>
			Click me
		</button>
	);
}
import { Link } from "react-router-dom";  