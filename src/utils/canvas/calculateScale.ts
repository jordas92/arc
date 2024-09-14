/** Copyright (c) 2024-present Kristiyan Dimitrov */

const calculateScale = (
	containerWidth: number,
	containerHeight: number,
	contentWidth: number,
	contentHeight: number,
	padding = 0.95,
): number => {
	const scaleX = (containerWidth * padding) / contentWidth;
	const scaleY = (containerHeight * padding) / contentHeight;
	return Math.min(1, Math.min(scaleX, scaleY));
};

export default calculateScale;
