/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { useLazyFetchPromptQuery } from 'store/apis/apiPrompts';
import { closeModal } from 'store/storeSlices/sliceApp';
import { setActiveImageIndex } from 'store/storeSlices/sliceOpenedProjects';
import { previewModalOriginKeys } from 'store/common/keys';
import { DataModalImagePreview, ImagePreviewItem } from 'store/types/typesModals';

import PreviewWithTools from './PreviewWithTools/PreviewWithTools';
import PreviewExpand from './PreviewExpand';

const { ORIGIN_PROJECT_CONTAINER_GENERATION } = previewModalOriginKeys;

type Props = {
	data: DataModalImagePreview;
};

const DialogImagePreview: React.FC<Props> = ({ data }) => {
	const dispatch = useStoreDispatch();

	const [fetchPrompt, { data: generationData }] = useLazyFetchPromptQuery();

	const [isPreviewExpand, setIsPreviewExpand] = useState<boolean>(false);

	const { imageId, items: images, origin } = data;

	const initIndex = images.findIndex((item: ImagePreviewItem) => item.imageId === imageId);
	const [imageIndex, setImageIndex] = useState(initIndex);
	const currentImage = imageIndex >= 0 ? images[imageIndex] : null;

	useEffect(() => {
		setImageIndex(initIndex);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initIndex]);

	useEffect(() => {
		if (origin === ORIGIN_PROJECT_CONTAINER_GENERATION) {
			dispatch(setActiveImageIndex(imageIndex));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imageIndex]);

	useEffect(() => {
		if (currentImage) {
			fetchPrompt(currentImage.promptId);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentImage?.promptId]);

	const isPrevBtnDisabled = images.length <= 1 || imageIndex === 0;
	const isNextBtnDisabled = images.length <= 1 || imageIndex === images.length - 1;

	const [isModalHovered, setIsModalHovered] = useState<boolean>(false);

	const handleOnClose = () => {
		dispatch(closeModal());
	};

	const showNextImage = () => {
		setImageIndex((nextIndex) => (nextIndex + 1) % images.length);
	};

	const showPrevImage = () => {
		setImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
	};

	const handleOnMouseEnter = () => {
		setIsModalHovered(true);
	};

	const handleOnMouseLeave = () => {
		setIsModalHovered(false);
	};

	const handleKeyboardEvent = (e: React.KeyboardEvent<HTMLElement>) => {
		// Left arrow key
		if (e.key === 'ArrowLeft' && !isPrevBtnDisabled) {
			showPrevImage();
		}
		// Right arrow key
		if (e.key === 'ArrowRight' && !isNextBtnDisabled) {
			showNextImage();
		}
		// Escape key
		if (e.key === 'Escape') {
			if (isPreviewExpand) {
				setIsPreviewExpand(false);
			} else {
				dispatch(closeModal());
			}
		}
	};

	const handleOnClosePreviewExpand = (e: any) => {
		if (e.target.nodeName !== 'IMG') {
			setIsPreviewExpand(false);
		}
	};

	const handleOnClickPrevious = () => {
		showPrevImage();
	};

	const handleOnClickNext = () => {
		showNextImage();
	};

	const handleOnClickImage = () => {
		setIsPreviewExpand(true);
	};

	const conditionalModalContent = () => {
		if (currentImage) {
			if (isPreviewExpand) {
				return (
					<PreviewExpand
						imageUrl={currentImage.imageUrl}
						handleOnClosePreviewExpand={handleOnClosePreviewExpand}
						isPrevBtnDisabled={isPrevBtnDisabled}
						isNextBtnDisabled={isNextBtnDisabled}
						handleOnClickPrevious={handleOnClickPrevious}
						handleOnClickNext={handleOnClickNext}
					/>
				);
			}

			return (
				<PreviewWithTools
					isModalHovered={isModalHovered}
					currentImage={currentImage}
					generationData={generationData}
					origin={origin}
					isPrevBtnDisabled={isPrevBtnDisabled}
					isNextBtnDisabled={isNextBtnDisabled}
					handleOnClickPrevious={handleOnClickPrevious}
					handleOnClickNext={handleOnClickNext}
					handleOnClickImage={handleOnClickImage}
				/>
			);
		}

		return <Box sx={{ position: 'absolute' as 'absolute' }} />;
	};

	return (
		<Modal
			open
			onClose={handleOnClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			disableEscapeKeyDown
			sx={{
				'.MuiBackdrop-root': {
					backgroundColor: 'rgba(0, 0, 0, 0.9)',
				},
			}}
		>
			<Box
				sx={{ bgcolor: 'red' }}
				onMouseEnter={handleOnMouseEnter}
				onMouseLeave={handleOnMouseLeave}
				onKeyDown={handleKeyboardEvent}
			>
				{conditionalModalContent()}
			</Box>
		</Modal>
	);
};

export default DialogImagePreview;
