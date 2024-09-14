/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Box, Link, Typography } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { closeModal } from 'store/storeSlices/sliceApp';
import { closeDrawer } from 'store/storeSlices/sliceOpenedProjects';
import { closeControlNetDrawer } from 'store/storeSlices/sliceControlNet';

import nfswImage from 'assets/img/icons/HandEye.svg';
import routesPaths from 'routes/paths';
import strings from 'constants/strings';

const style = {
	rootContainer: {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '24px',
	},
};

const Image = styled('img')({
	height: '100px',
	objectFit: 'cover',
});

const { PROFILE_SETTINGS } = routesPaths;
const { nsfwImage, nsfwTextPart1, nsfwTextPart2, nsfwTextPart3 } = strings;

const ImageIsNSFW: React.FC = () => {
	const dispatch = useStoreDispatch();
	const navigate = useNavigate();

	function handleOpenSettingsLink(e: any) {
		e.preventDefault();
		navigate(PROFILE_SETTINGS);

		dispatch(closeModal());
		dispatch(closeDrawer());
		dispatch(closeControlNetDrawer());
	}

	return (
		<Box sx={style.rootContainer}>
			<Image src={nfswImage} alt="NSFW" />
			<Typography variant="h4">{nsfwImage}</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center', margin: '8px 0' }}>
				<Typography variant="h5">{nsfwTextPart1}</Typography>
				<Link
					color="secondary"
					sx={{ margin: ' 0 6px' }}
					component="button"
					underline="none"
					onClick={handleOpenSettingsLink}
				>
					<Typography variant="h4">{nsfwTextPart2}</Typography>
				</Link>
				<Typography variant="h5">{nsfwTextPart3}</Typography>
			</Box>
		</Box>
	);
};

export default ImageIsNSFW;
