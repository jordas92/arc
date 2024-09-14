/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useRef } from 'react';
import { Box, Card, CardMedia, Tooltip, useTheme } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { GenerationImage } from 'store/types/typesPrompts';
import useSliceUser from 'store/hooks/useSliceUser';

import nfswImage from 'assets/img/icons/HandEye.svg';
import strings from 'constants/strings';
import { GENERATION_CONTAINER_IMAGES_LIST_ITEM_SIZE } from 'constants/default';
import StyledIconButtonMui from 'components/StyledWrappers/StyledIconButtonMui';
import DraggableItem from 'components/Common/DND/DraggableItem';

type Props = {
	images: GenerationImage[];
	currentImageIndex: number;
	onClickPrevious: Function;
	onClickNext: Function;
	onClickImage: Function;
};

const { altGenerationImage } = strings;

const ImagesList: React.FC<Props> = ({
	images,
	currentImageIndex,
	onClickPrevious,
	onClickNext,
	onClickImage,
}) => {
	const theme = useTheme();
	const imagesContainerRef = useRef<HTMLElement>(null);
	const { isNsfwEnabled } = useSliceUser();

	const handleOnClickPrevious = () => {
		onClickPrevious();

		// Note: with the assumption images.length = 4
		if (currentImageIndex === 2 && imagesContainerRef.current) {
			// If horizontal scroller => will scroll to the left
			imagesContainerRef.current.scrollLeft = 0;
		}

		// Note: with the assumption images.length = 4
		if (currentImageIndex === 0 && imagesContainerRef.current) {
			// If horizontal scroller => will scroll to the right
			imagesContainerRef.current.scrollLeft = imagesContainerRef.current.scrollWidth;
		}
	};

	const handleOnClickNext = () => {
		onClickNext();

		// Note: with the assumption images.length = 4
		if (currentImageIndex === 1 && imagesContainerRef.current) {
			// If horizontal scroller => will scroll to the right
			imagesContainerRef.current.scrollLeft = imagesContainerRef.current.scrollWidth;
		}

		// Note: with the assumption images.length = 4
		if (currentImageIndex === 3 && imagesContainerRef.current) {
			// If horizontal scroller => will scroll to the left
			imagesContainerRef.current.scrollLeft = 0;
		}
	};

	const handleOnClickImage = (index: number) => {
		onClickImage(index);

		// Note: with the assumption images.length = 4
		if (index === 2 && imagesContainerRef.current) {
			// If horizontal scroller => will scroll to the right
			imagesContainerRef.current.scrollLeft = imagesContainerRef.current.scrollWidth;
		}

		// Note: with the assumption images.length = 4
		if (index === 1 && imagesContainerRef.current) {
			// If horizontal scroller => will scroll to the left
			imagesContainerRef.current.scrollLeft = 0;
		}
	};

	return (
		<>
			{images.length > 2 && (
				<StyledIconButtonMui
					onClick={handleOnClickPrevious}
					disableRipple
					sx={{ margin: '0 5px' }}
				>
					<Tooltip title="Previous" placement="left" arrow>
						<ArrowBackIosNewIcon />
					</Tooltip>
				</StyledIconButtonMui>
			)}
			{/* TODO_NEXT use 'ul' and 'li' html elements */}
			<Box
				sx={{ display: 'flex', width: '100%', overflowX: 'auto' }}
				ref={imagesContainerRef}
			>
				{images.map((image: GenerationImage, index) => {
					const imageSource = () => {
						if (image.isImageNsfw && isNsfwEnabled) {
							return nfswImage;
						}

						return image.thumbUrl;
					};

					return (
						<DraggableItem
							key={image.imageId}
							item={image}
							dragStyle={{
								boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.5)',
								border: '2px solid #DE04A4',
							}}
						>
							<Box
								key={image.imageId}
								sx={{
									padding: '2px',
									// THEME_NEXT
									borderRadius: '8px',
									backgroundColor: `${
										currentImageIndex === index
											? theme?.palette?.accent?.primary
											: 'unset'
									}`,
								}}
							>
								<Card sx={{ borderRadius: '8px', height: '100%' }}>
									<CardMedia
										component="img"
										sx={{
											width: `${GENERATION_CONTAINER_IMAGES_LIST_ITEM_SIZE}px`,
											height: `${GENERATION_CONTAINER_IMAGES_LIST_ITEM_SIZE}px`,
											objectFit: `${
												image.isImageNsfw && isNsfwEnabled
													? ''
													: 'scale-down'
											} `,
											backgroundColor:
												theme?.palette?.background?.surfaceLowest,
										}}
										src={imageSource()}
										alt={altGenerationImage}
										onClick={() => handleOnClickImage(index)}
									/>
								</Card>
							</Box>
						</DraggableItem>
					);
				})}
			</Box>
			{images.length > 2 && (
				<StyledIconButtonMui
					onClick={handleOnClickNext}
					disableRipple
					sx={{ margin: '0 5px' }}
				>
					<Tooltip title="Next" placement="right" arrow>
						<ArrowForwardIosIcon />
					</Tooltip>
				</StyledIconButtonMui>
			)}
		</>
	);
};

export default ImagesList;
