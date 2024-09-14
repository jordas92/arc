/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect, useState } from 'react';

/**
 * Provides the element width and height on the element resize
 * @param elementRef
 * @returns object
 */
const useElementSize = (elementRef: React.RefObject<HTMLElement>) => {
	const [width, setWidth] = useState<number | null>(null);
	const [height, setHeight] = useState<number | null>(null);

	useEffect(() => {
		const element = elementRef.current;

		if (!element) return;

		const handleResize = () => {
			// Do something when the element is resized
			const { offsetWidth, offsetHeight } = element;
			setWidth(offsetWidth);
			setHeight(offsetHeight);
		};

		const observer = new ResizeObserver(handleResize);

		observer.observe(element);

		// Cleanup the observer by unobserving all elements
		return () => {
			observer.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { width, height };
};

export default useElementSize;
