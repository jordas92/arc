/** Copyright (c) 2024-present Kristiyan Dimitrov */

const calculateDimension = (
	maxWidth: number,
	maxHeight: number,
	imageWidth: number,
	imageHeight: number,
) => {
	// Check if the original dimensions are within the maximum dimensions
	if (imageWidth <= maxWidth && imageHeight <= maxHeight) {
		return {
			width: imageWidth,
			height: imageHeight,
		};
	}
	// Calculate the aspect ratio of the original image
	const aspectRatio = imageWidth / imageHeight;
	// Calculate the new dimensions while maintaining aspect ratio
	let newWidth = maxWidth;
	let newHeight = newWidth / aspectRatio;
	// Check if the calculated height exceeds the maximum height
	if (newHeight > maxHeight) {
		newHeight = maxHeight;
		newWidth = newHeight * aspectRatio;
	}
	return {
		width: Math.round(newWidth),
		height: Math.round(newHeight),
	};
};

export default calculateDimension;
