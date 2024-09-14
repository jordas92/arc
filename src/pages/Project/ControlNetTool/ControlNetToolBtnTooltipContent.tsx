/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { openModal } from 'store/storeSlices/sliceApp';

import { modalsKeys } from 'store/common/keys';

type VideoWrapperProps = {
	image: string;
};
const VideoWrapper = styled(Box)<VideoWrapperProps>(({ image }) => ({
	position: 'relative',
	width: 'calc(50% - 10px)',
	marginLeft: '10px',
	cursor: 'pointer',
	backgroundImage: `url(${image})`,
	backgroundSize: 'cover',
	backgroundPosition: 'center',
}));

const VideoPlayBtnHolder = styled(Box)(({ theme }) => ({
	position: 'absolute',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	backgroundColor: theme.palette.background.surfaceHighest,
	transition: 'background-color 0.3s',

	'&:hover': {
		backgroundColor: theme.palette.background.surfaceLow,
	},
}));

const StyledPlayArrowIcon = styled(PlayArrowIcon)(({ theme }) => ({
	color: theme.palette.text.textLowest,
	transform: 'scale(1.5)',
	// opacity: 1,
	// transition: 'color 0.3s',
	// '&:hover': {
	// 	color: theme.palette.background.iconHover,
	// },
}));

type Props = {
	title: string;
	description: string;
	thumbUrl?: string;
	videoUrl?: string;
};

const { VIDEO } = modalsKeys;

const ControlNetToolBtnTooltipContent: React.FC<Props> = (props) => {
	const { title, description, thumbUrl, videoUrl } = props;

	const dispatch = useStoreDispatch();

	const handleOnClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		dispatch(
			openModal({
				type: VIDEO,
				data: {
					videoUrl,
				},
			}),
		);
	};

	const conditionalHeight = () => {
		if (thumbUrl) {
			return '110px';
		}
		return 'auto';
	};

	const conditionalContent = () => {
		if (title || description || thumbUrl || videoUrl) {
			return (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						width: '280px',
						maxHeight: '110px',
						height: conditionalHeight(),
					}}
				>
					<Box sx={{ width: videoUrl ? '50%' : '100%', padding: '10px' }}>
						<Typography variant="h6" sx={{ fontWeight: '600' }}>
							{title}
						</Typography>
						{description && (
							<Typography variant="body3" component="p" sx={{ margintop: '6px' }}>
								{description}
							</Typography>
						)}
					</Box>
					{thumbUrl && (
						<VideoWrapper onClick={handleOnClick} image={thumbUrl}>
							<VideoPlayBtnHolder>
								<StyledPlayArrowIcon />
							</VideoPlayBtnHolder>
						</VideoWrapper>
					)}
				</Box>
			);
		}

		return null;
	};

	return conditionalContent();
};

export default ControlNetToolBtnTooltipContent;
