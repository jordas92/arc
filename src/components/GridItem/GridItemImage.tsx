/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { CardActionArea, CardMedia } from '@mui/material';

import useSliceUser from 'store/hooks/useSliceUser';
import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { openModal } from 'store/storeSlices/sliceApp';
import { previewModalOriginKeys, modalsKeys } from 'store/common/keys';
import { ImageItem } from 'store/types/typesImages';

import nfswImage from 'assets/img/icons/HandEye.svg';
import strings from 'constants/strings';
import StyledCard from 'components/StyledWrappers/StyledCard';

type Props = {
	item: ImageItem;
	itemHeight: number;
	items: Array<ImageItem>;
	origin: keyof typeof previewModalOriginKeys;
};

const { altImage } = strings;
const { IMAGE_PREVIEW } = modalsKeys;

const GridItemImage: React.FC<Props> = ({ item, itemHeight, items, origin }) => {
	const dispatch = useStoreDispatch();
	const { isNsfwEnabled } = useSliceUser();

	const handleOnClick = () => {
		dispatch(
			openModal({
				type: IMAGE_PREVIEW,
				data: {
					origin,
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

	const style = () => {
		if (item.thumbUrl && item.isImageNsfw && isNsfwEnabled) {
			return {};
		}

		if (item.thumbUrl) {
			return {
				objectFit: 'scale-down',
			};
		}

		return {};
	};

	return (
		<StyledCard hasHoverBorder>
			<CardActionArea>
				<CardMedia
					component="img"
					height={itemHeight}
					src={imageSource()}
					alt={altImage}
					onClick={handleOnClick}
					sx={style()}
				/>
			</CardActionArea>
		</StyledCard>
	);
};

export default GridItemImage;
