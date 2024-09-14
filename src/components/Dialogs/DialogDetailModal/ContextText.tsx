/** Copyright (c) 2024-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { Box, Skeleton, Typography } from '@mui/material';

const StyledContext = styled(Box)({
	marginTop: '20px',
});

// TODO CREATE skeleton wrappers for components in common folders
const SkeletonGrid = () => {
	return (
		<StyledContext>
			{[...Array(2)].map((item, index) => (
				<Box key={`desc_${index}`}>
					<Typography variant="h4" key={`tdesc_${index}`}>
						<Skeleton variant="text" width="80%" />
					</Typography>
					<br />
				</Box>
			))}
		</StyledContext>
	);
};

const ContextText = ({ isSuccess, descriptions }) => {
	if (!isSuccess) {
		return <SkeletonGrid />;
	}

	if (typeof descriptions === 'undefined') {
		return (
			<StyledContext>
				{[...new Array(2)].map((_, index) => (
					<Box key={`desc_${index}`}>
						<Typography variant="h4" key={`tdesc_${index}`}>
							Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
							dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
							consectetur ac, vestibulum at eros.
						</Typography>
						<br />
					</Box>
				))}
			</StyledContext>
		);
	}

	if (Array.isArray(descriptions)) {
		return (
			<StyledContext>
				{descriptions.map((item, index) => (
					<Box key={`desc_${index}`}>
						<Typography variant="h4" key={`tdesc_${index}`}>
							{item}
						</Typography>
						<br />
					</Box>
				))}
			</StyledContext>
		);
	}

	return (
		<StyledContext>
			<Typography variant="h4">{descriptions}</Typography>
		</StyledContext>
	);
};

export default ContextText;
