/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect, useState } from 'react';

import useElementSize from './useElementSize';

/**
 * Provides boolean values for both width and height
 * if the content of the element has overflowed in these directions,
 * in other words, would you have you have horizontal and vertical scrollbars.
 * @param targetRef
 * @returns object
 */
const useIsContentOverflowing = (targetRef: React.RefObject<HTMLElement>) => {
	const { width, height } = useElementSize(targetRef);

	const [isWidthOverflowing, setIsWidthOverflowing] = useState<boolean | null>(null);
	const [isHeightOverflowing, setIsHeightOverflowing] = useState<boolean | null>(null);

	const isOverflowing = (offset: number, scroll: number) => {
		return offset < scroll;
	};

	useEffect(() => {
		const element = targetRef.current;

		if (element) {
			const { offsetWidth, offsetHeight, scrollWidth, scrollHeight } = element;
			const isWidthOverflowing = isOverflowing(offsetWidth, scrollWidth);
			const isHeightOverflowing = isOverflowing(offsetHeight, scrollHeight);

			setIsWidthOverflowing(isWidthOverflowing);
			setIsHeightOverflowing(isHeightOverflowing);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [width, height]);

	return { isWidthOverflowing, isHeightOverflowing };
};

export default useIsContentOverflowing;
