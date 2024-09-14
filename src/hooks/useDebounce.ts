/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay: number) => {
	const [debouncedValue, setDebouncedValue] = useState<string>(value);

	useEffect(() => {
		// Setting up a timer
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		// Cleaning up the timer
		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
};

export default useDebounce;
