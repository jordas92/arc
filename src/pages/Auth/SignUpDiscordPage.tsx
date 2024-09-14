/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { useParams, generatePath, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import {
	setOpenedProject,
	setTransformSourceImageData,
} from 'store/storeSlices/sliceOpenedProjects';

import { useLazyFetchPublicImageQuery } from 'store/apis/apiImages';
import { useFetchPromptDetailsMutation } from 'store/apis/apiPrompts';

import useSliceUser from 'store/hooks/useSliceUser';
import { generationToolsKeys, sourceImageOriginKeys } from 'store/common/keys';

import routesPaths from 'routes/paths';
import strings from 'constants/strings';
import logo from 'assets/img/icons/logo.svg';
import Discord from 'components/Auth/Discord';

const { IMAGE_TO_IMAGE } = generationToolsKeys;
const { ORIGIN_SOURCE_IMAGE_UPLOAD } = sourceImageOriginKeys;

const CircularProgressWrapper = styled(Box)({
	height: '100vh',
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
});

const styleSchema = {
	mainGrid: {
		height: '100vh',
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	logo: {
		gridRow: '1',
		alignSelf: 'center',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	leftSide: {
		backgroundImage: '',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'space-evenly',
	},
	leftSideContainer: {
		width: '100%',
		height: '100%',
		backdropFilter: 'blur(90px)',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		'@media (max-width: 600px)': {
			display: 'none',
		},
	},
	leftSideImg: {
		maxWidth: '90%',
		maxHeight: '80vh',
		borderRadius: '7px',
	},
	rightSide: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	rightSideContainer: {
		display: 'none',
		'@media (max-width: 600px)': {
			display: 'flex',
			justifyContent: 'center',
		},
	},
	rightSideImg: {
		maxWidth: '70%',
		maxHeight: '60vh',
		borderRadius: '7px',
	},
};

const { welcomeText } = strings;
const { PROJECT } = routesPaths;

const SignUpDiscordPage: React.FC = () => {
	const dispatch = useStoreDispatch();
	const navigate = useNavigate();

	const { promptId } = useParams();

	const { id: userId } = useSliceUser();

	const [discordImage, setDiscordImage] = useState<string>('');

	const [fetchPublicImage, { isSuccess: isSuccessFetchPublicImage, data: publicImageData }] =
		useLazyFetchPublicImageQuery();

	const [
		fetchPromptDetails,
		{ isSuccess: isSuccessFetchPromptDetails, data: discordFetchPromptDetails },
	] = useFetchPromptDetailsMutation();

	const isPageLoading = isSuccessFetchPublicImage || isSuccessFetchPromptDetails;

	useEffect(() => {
		if (promptId) {
			fetchPublicImage({ promptId });

			// if there is already logged in user, fetch prompt details
			if (userId) {
				fetchPromptDetails({ prompt_id: promptId, user_id: userId });
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId, promptId]);

	useEffect(() => {
		if (isSuccessFetchPromptDetails && discordFetchPromptDetails) {
			const { projectId, imageUrl, imageWidth, imageHeight } = discordFetchPromptDetails;

			if (projectId) {
				dispatch(
					setOpenedProject({
						projectId,
						projectTitle: '',
						isDiscord: true,
						currentGenerationTool: IMAGE_TO_IMAGE,
					}),
				);

				dispatch(
					setTransformSourceImageData({
						imageId: '',
						imageUrl,
						base64Image: '',
						isImageNsfw: false,
						imageWidth,
						imageHeight,
						sourceImageOrigin: ORIGIN_SOURCE_IMAGE_UPLOAD,
					}),
				);
				const path = generatePath(PROJECT, {
					id: `${projectId}?skipFetchProjectPrompts`,
				});
				navigate(path);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccessFetchPromptDetails, discordFetchPromptDetails]);

	useEffect(() => {
		if (isSuccessFetchPublicImage && publicImageData) {
			setDiscordImage(publicImageData);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccessFetchPublicImage, publicImageData]);

	const conditionalContent = () => {
		if (!isPageLoading) {
			return (
				<CircularProgressWrapper>
					<CircularProgress disableShrink size={40} thickness={5} />
				</CircularProgressWrapper>
			);
		}

		return (
			<Grid container sx={styleSchema.mainGrid}>
				<Grid item xs={false} sm={7} md={8} sx={styleSchema.leftSide}>
					<Box sx={styleSchema.leftSideContainer}>
						<Typography component="h1" variant="h3" mb={1}>
							{welcomeText}
						</Typography>
						<img
							style={styleSchema.leftSideImg}
							src={discordImage}
							alt=""
							loading="lazy"
						/>
					</Box>
				</Grid>

				<Grid item xs={false} sm={5} md={4} sx={styleSchema.rightSide}>
					<Box sx={styleSchema.logo}>
						<img src={logo} alt="" loading="lazy" />
					</Box>
					<Box sx={styleSchema.rightSideContainer}>
						<img
							style={styleSchema.rightSideImg}
							src={discordImage}
							alt=""
							loading="lazy"
						/>
					</Box>
					<Discord />
				</Grid>
			</Grid>
		);
	};

	return conditionalContent();
};

export default SignUpDiscordPage;
