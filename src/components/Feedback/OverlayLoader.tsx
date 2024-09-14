/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

import useSliceApp from '../../store/hooks/useSliceApp';

const OverlayLoader: React.FC = () => {
	const { isOverlayLoaderOn } = useSliceApp();

	const conditionalContent = () => {
		if (isOverlayLoaderOn) {
			return (
				<Backdrop
					sx={{
						zIndex: (theme) => theme.zIndex.modal + 1,
					}}
					open={isOverlayLoaderOn}
				>
					<CircularProgress />
				</Backdrop>
			);
		}

		return null;
	};

	return conditionalContent();
};

export default OverlayLoader;
