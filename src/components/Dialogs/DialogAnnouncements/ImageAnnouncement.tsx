/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

const StyledBoxContainer = styled(Box)({
	width: '40%',
	height: '100%',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	backgroundColor: 'background.surfaceDarkLowest',
});

type Props = {
	imageUrl: string;
};

const ImageAnnouncement: React.FC<Props> = ({ imageUrl }) => {
	return (
		<StyledBoxContainer
			sx={{
				backgroundImage: `url(${imageUrl})`,
			}}
		/>
	);
};

export default ImageAnnouncement;
