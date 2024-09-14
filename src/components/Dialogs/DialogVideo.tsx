/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Typography } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { closeModal } from 'store/storeSlices/sliceApp';

import strings from 'constants/strings';
import GenericResponsiveDialog from './GenericResponsiveDialog';

const { noVideo } = strings;

type Props = {
	videoUrl: string;
};

const DialogVideo: React.FC<Props> = ({ videoUrl }) => {
	const dispatch = useStoreDispatch();

	const handleOnClickClose = () => {
		dispatch(closeModal());
	};

	const conditionalContent = () => {
		if (videoUrl) {
			return (
				<iframe
					style={{ borderRadius: '8px' }}
					frameBorder="0"
					className="video"
					title="Video tutorial"
					width="100%"
					height="100%"
					src={videoUrl}
				/>
			);
		}

		return (
			<>
				<Box />
				<Typography variant="body1" sx={{ textAlign: 'center' }}>
					{noVideo}
				</Typography>
				<Box />
			</>
		);
	};

	return (
		<GenericResponsiveDialog
			open
			onClose={handleOnClickClose}
			renderContent={conditionalContent}
			padding="0"
			height="55%"
			ariaLabelledBy="video-dialog-title"
			ariaDescribedBy="video-dialog-description"
		/>
	);
};

export default DialogVideo;
