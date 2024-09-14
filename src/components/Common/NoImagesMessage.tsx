/** Copyright (c) 2023-present Kristiyan Dimitrov */
import React from 'react';
import Typography from '@mui/material/Typography';

type Props = {
	message: string;
};

const NoImagesMessage: React.FC<Props> = ({ message }) => {
	return (
		<Typography variant="body1" sx={{ textAlign: 'center', marginTop: '24px' }}>
			{message}
		</Typography>
	);
};

export default NoImagesMessage;
