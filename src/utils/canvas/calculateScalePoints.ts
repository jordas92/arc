/** Copyright (c) 2024-present Kristiyan Dimitrov */

const calculateScalePoints = (
	lines,
	originalWidth: number,
	originalHeight: number,
	initialWidth: number,
	initialHeight: number,
	modalState = false,
) => {
	const widthRatio = originalWidth / initialWidth;
	const heightRatio = originalHeight / initialHeight;

	return lines.map((line) => {
		const scaledPoints = line.points.map((point, index) => {
			// Scale X and Y coordinates based on modal state
			const ratio = modalState ? widthRatio : heightRatio;
			return index % 2 === 0 ? point * ratio : point * ratio;
		});

		return { ...line, points: scaledPoints };
	});
};

export default calculateScalePoints;
