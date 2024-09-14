/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import styled from '@emotion/styled';
import { Box, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { openModal } from 'store/storeSlices/sliceApp';
import { TutorialItem } from 'store/types/typesTutorials';
import { modalsKeys } from 'store/common/keys';

import strings from 'constants/strings';
import StyledCard from 'components/StyledWrappers/StyledCard';
import { formatDuration } from 'utils/commonUtils';

const StyledCardContent = styled(CardContent)({
	padding: '8px 12px 12px',
});

const NoThumbMediaContent = styled(Box)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

type Props = {
	item: TutorialItem;
	itemHeight: number;
	itemThumbHeight: number;
};

const { altTutorialThumb } = strings;
const { VIDEO } = modalsKeys;

const GridItemTutorial: React.FC<Props> = ({ item, itemHeight, itemThumbHeight }) => {
	const dispatch = useStoreDispatch();

	const returnFormattedDuration = () => {
		return formatDuration(item.duration);
	};

	const handleOnClick = () => {
		dispatch(
			openModal({
				type: VIDEO,
				data: {
					videoUrl: item.tutorialUrl,
				},
			}),
		);
	};

	const imageConditionalContent = () => {
		if (item.thumbUrl) {
			return (
				<CardMedia
					component="img"
					height={itemThumbHeight}
					src={item.thumbUrl}
					alt={altTutorialThumb}
				/>
			);
		}

		return (
			<NoThumbMediaContent sx={{ height: itemThumbHeight }}>
				<YouTubeIcon style={{ fontSize: '50px' }} />
			</NoThumbMediaContent>
		);
	};

	const tagsAndDurationConditionalContent = () => {
		const tagsToString = item.tags.map((item) => item.name).join(', ');

		if (tagsToString.length > 0 && item.duration > 0) {
			return (
				<Typography variant="h6">
					{tagsToString} &middot; {returnFormattedDuration()}
				</Typography>
			);
		}

		if (tagsToString.length > 0) {
			return <Typography variant="h6">{tagsToString}</Typography>;
		}

		if (item.duration > 0) {
			return <Typography variant="h6">{returnFormattedDuration()}</Typography>;
		}

		return null;
	};

	return (
		<StyledCard
			hasHoverBorder
			sx={{ height: itemHeight, cursor: 'pointer' }}
			onClick={handleOnClick}
		>
			<CardActionArea>
				{imageConditionalContent()}
				<StyledCardContent>
					<Typography
						gutterBottom
						noWrap
						variant="h5"
						color="text.primary"
						lineHeight="1"
					>
						{item.title}
					</Typography>
					{tagsAndDurationConditionalContent()}
				</StyledCardContent>
			</CardActionArea>
		</StyledCard>
	);
};

export default GridItemTutorial;
