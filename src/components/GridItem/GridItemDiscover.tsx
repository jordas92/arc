/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import styled from '@emotion/styled';
import { CardActionArea, CardContent, Avatar, Typography } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceUser from 'store/hooks/useSliceUser';
import { openModal } from 'store/storeSlices/sliceApp';
import { DiscoverImageItem } from 'store/types/typesDiscover';
import { modalsKeys, previewModalOriginKeys } from 'store/common/keys';

import strings from 'constants/strings';
import nfswImage from 'assets/img/icons/HandEye.svg';
import StyledCard from 'components/StyledWrappers/StyledCard';

const cardFooterHeight = 45;

const StyledCardContent = styled(CardContent)({
	display: 'flex',
	alignItems: 'center',
	padding: '12px',
	height: `${cardFooterHeight}px`,
	width: '100%',
});

const Image = styled('img')({
	height: `calc(100% - ${cardFooterHeight}px)`,
	width: '100%',
	objectFit: 'cover',
});

type Props = {
	item: DiscoverImageItem;
	items: Array<DiscoverImageItem>;
	itemHeight: number;
};

const { altImage } = strings;
const { IMAGE_PREVIEW } = modalsKeys;
const { ORIGIN_HOMEPAGE_TAB_DISCOVER } = previewModalOriginKeys;

const GridItemDiscover: React.FC<Props> = ({ item, items, itemHeight }) => {
	const dispatch = useStoreDispatch();
	const { isNsfwEnabled } = useSliceUser();

	const handleOnClick = () => {
		dispatch(
			openModal({
				type: IMAGE_PREVIEW,
				data: {
					origin: ORIGIN_HOMEPAGE_TAB_DISCOVER,
					imageId: item.imageId,
					items,
				},
			}),
		);
	};

	const imageSource = () => {
		if (item.isImageNsfw && isNsfwEnabled) {
			return nfswImage;
		}

		return item.thumbUrl;
	};

	return (
		<StyledCard
			hasHoverBorder
			sx={{ height: itemHeight, cursor: 'pointer' }}
			onClick={handleOnClick}
		>
			<CardActionArea
				sx={{
					height: '100%',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					alignItems: 'flex-start',
				}}
			>
				<Image alt={altImage} src={imageSource()} />
				<StyledCardContent>
					<Avatar
						alt="username avatar"
						src={item.user.avatar}
						sx={{ width: 24, height: 24, marginRight: '8px' }}
					/>
					<Typography noWrap variant="h5" color="text.primary" sx={{ lineHeight: 1 }}>
						{item.user.name}
					</Typography>
				</StyledCardContent>
			</CardActionArea>
		</StyledCard>
	);
};

export default GridItemDiscover;
