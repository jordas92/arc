/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

import useSliceUser from 'store/hooks/useSliceUser';

import strings from 'constants/strings';
import ImageIsNSFW from 'components/Common/ImageIsNSFW';

const { altGenerationImage } = strings;

const style = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: 'calc(90vh - 200px)',
	width: '100%',
};

const Image = styled('img')({
	maxHeight: '100%',
	maxWidth: '98%',
	cursor: 'zoom-in',
});

type Props = {
	imageUrl: string;
	isImageNsfw: boolean;
	handleOnClickImage: Function;
};

const BodyImagePreview: React.FC<Props> = ({ imageUrl, isImageNsfw, handleOnClickImage }) => {
	const { isNsfwEnabled } = useSliceUser();
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		setImageError(true);
	};

	const conditionalContent = () => {
		if (imageError) {
			return <span>Image failed to load</span>;
		}

		if (isImageNsfw && isNsfwEnabled) {
			return <ImageIsNSFW />;
		}

		return (
			<Image
				alt={altGenerationImage}
				src={imageUrl}
				onError={handleImageError}
				onClick={() => handleOnClickImage()}
			/>
		);
	};

	return <Box sx={style}>{conditionalContent()}</Box>;
};

export default BodyImagePreview;
