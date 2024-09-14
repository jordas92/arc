/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { DragEvent } from 'react';
import { CardActionArea, CardMedia } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceUser from 'store/hooks/useSliceUser';
import {
	setSourceImageUrl,
	setSourceImageBase64,
	setPreProcessedImageUrl,
	setIsSourceImageShown,
	setIsImagePreprocessed,
	setIsImagesContainerExpanded,
} from 'store/storeSlices/sliceControlNet';
import { ImageItem } from 'store/types/typesImages';

import nfswImage from 'assets/img/icons/HandEye.svg';
import strings from 'constants/strings';
import StyledCard from 'components/StyledWrappers/StyledCard';

type Props = {
	item: ImageItem;
	itemHeight: number;
};

const { altImage } = strings;

const GridItemImage: React.FC<Props> = ({ item, itemHeight }) => {
	const dispatch = useStoreDispatch();
	const { isNsfwEnabled } = useSliceUser();

	const isNsfwImage = item.isImageNsfw && isNsfwEnabled;

	const handleOnClick = () => {
		if (!isNsfwImage) {
			dispatch(setSourceImageUrl(item.imageUrl));
			dispatch(setSourceImageBase64(''));
			dispatch(setPreProcessedImageUrl(''));
			dispatch(setIsSourceImageShown(false));
			dispatch(setIsImagePreprocessed(false));
			dispatch(setIsImagesContainerExpanded(false));
		}
	};

	// prevent an image from drag & drop due task requirements #WEBUI-1545
	const preventDragHandler = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const imageSource = () => {
		if (isNsfwImage) {
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
		<StyledCard hasHoverBorder={!isNsfwImage}>
			<CardActionArea disabled={isNsfwImage}>
				<CardMedia
					component="img"
					height={itemHeight}
					src={imageSource()}
					alt={altImage}
					onClick={handleOnClick}
					onDragStart={preventDragHandler}
					sx={style()}
				/>
			</CardActionArea>
		</StyledCard>
	);
};

export default GridItemImage;
