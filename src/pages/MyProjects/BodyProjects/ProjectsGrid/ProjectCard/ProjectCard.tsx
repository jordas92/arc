/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { Box, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceUser from 'store/hooks/useSliceUser';
import useSliceSamplers from 'store/hooks/useSliceSamplers';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import {
	setOpenedProject,
	setDefaultSamplers,
	setCurrentProjectId,
} from 'store/storeSlices/sliceOpenedProjects';
import { setLastOpenedProject } from 'store/storeSlices/sliceApp';
import commonUtils from 'store/common/utils';
import { Project } from 'store/types/typesProjects';

import defaultImage from 'assets/img/icons/empty-project.svg';
import nfswImage from 'assets/img/icons/HandEye.svg';
import strings from 'constants/strings';
import routesPaths from 'routes/paths';
import StyledCard from 'components/StyledWrappers/StyledCard';
import BtnDeleteProject from './BtnDeleteProject';

type Props = {
	item: Project;
};

const { generationToolFromGenerationType } = commonUtils;
const { altProjectImage } = strings;
const { PROJECT } = routesPaths;

const ProjectCard: React.FC<Props> = ({ item }) => {
	const navigate = useNavigate();
	const dispatch = useStoreDispatch();
	const { isNsfwEnabled } = useSliceUser();
	const { openedProjects, currentProjectId } = useSliceOpenedProjects();
	const sliceSamplers = useSliceSamplers();

	const [isCardHovered, setIsCardHovered] = useState<boolean>(false);

	const handleOnMouseEnter = () => {
		setIsCardHovered(true);
	};

	const handleOnMouseLeave = () => {
		setIsCardHovered(false);
	};

	const handleOnClick = () => {
		const path = generatePath(PROJECT, { id: item.projectId });

		if (openedProjects[item.projectId]) {
			dispatch(setCurrentProjectId(item.projectId));
			dispatch(setLastOpenedProject({ projectId: currentProjectId, isOpened: true }));
		} else {
			dispatch(
				setOpenedProject({
					projectId: item.projectId,
					projectTitle: item.projectTitle,
					isDiscord: item.isDiscord,
					currentGenerationTool: generationToolFromGenerationType(item.generationType),
				}),
			);
		}

		navigate(path);
		dispatch(setDefaultSamplers(sliceSamplers));
		dispatch(setLastOpenedProject({ projectId: currentProjectId, isOpened: true }));
	};

	const imageSource = () => {
		if (item.thumbUrl && item.isNsfw && isNsfwEnabled) {
			return nfswImage;
		}

		if (item.thumbUrl) {
			return item.thumbUrl;
		}

		// TODO_NEXT move in conditionalContent in order to control the SVG
		return defaultImage;
	};

	return (
		<StyledCard
			onMouseEnter={handleOnMouseEnter}
			onMouseLeave={handleOnMouseLeave}
			hasHoverBorder
		>
			<CardActionArea>
				<CardMedia
					component="img"
					height="290"
					src={imageSource()}
					alt={altProjectImage}
					onClick={handleOnClick}
					sx={{ padding: '4px', borderRadius: '8px' }}
				/>
			</CardActionArea>
			<CardContent
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'flex-end',
				}}
			>
				{/* TODO_NEXT fix responsiveness without % */}
				<Box onClick={handleOnClick} sx={{ width: '80%', marginRight: '15px' }}>
					<CardActionArea disableRipple>
						<Typography gutterBottom noWrap variant="h3">
							{item.projectTitle}
						</Typography>
						<Typography variant="h6">{item.projectLastEdited}</Typography>
					</CardActionArea>
				</Box>
				{isCardHovered && (
					<BtnDeleteProject
						projectId={item.projectId}
						isDiscordProject={item.isDiscord}
					/>
				)}
			</CardContent>
		</StyledCard>
	);
};

export default ProjectCard;
