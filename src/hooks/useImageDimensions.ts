/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { useEffect, useState } from 'react';

import { retrieveImageDimensions } from 'utils/imageUtils';

type ImageSizeInfo = {
	width: number;
	height: number;
};

const useImageDimensions = (image: string) => {
	const [generatedImageSize, setGeneratedImageSize] = useState<ImageSizeInfo>({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		const handleGeneratedImageSize = async () => {
			const { imageWidth: width, imageHeight: height } = await retrieveImageDimensions(image);

			if (width && height) {
				setGeneratedImageSize({ width, height });
			}
		};

		handleGeneratedImageSize();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [image]);

	return generatedImageSize;
};

export default useImageDimensions;
