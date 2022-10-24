import { useState } from "react";

// this hook manages the visual mode of any component

export default function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);

	// this function takes in a new mode, updates the mode state with the new value, and adds the new mode to our history array

	const transition = (newMode, replace = false) => {
		setMode(newMode);
		if (replace === true) {
			setHistory((prev) => {
				prev.splice(-1, 1, newMode);
				return history;
			});
		} else {
			setHistory((prev) => {
				const newHistory = [...prev, newMode];
				return newHistory;
			});
		}
	};

	// this function sets the mode to the previous item in our history array

	const back = () => {
		if (history.length <= 1) {
			return;
		}
		setHistory((prev) => [...prev.slice(0, -1)]);
		setMode(history[history.length - 2]);
	};

	return { mode, transition, back };
}
