/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Tooltip, Box } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceUser from 'store/hooks/useSliceUser';
import { closeModal } from 'store/storeSlices/sliceApp';
import {
	setGenerationTool,
	setGenerationToolImageToImageSettings,
	setTransformSourceImageData,
	setIsGenerationContainerHidden,
	setIsInPaintMode,
	clearInPaintDrawingLines,
} from 'store/storeSlices/sliceOpenedProjects';
import commonUtils from 'store/common/utils';
import { generationToolsKeys } from 'store/common/keys';
import { GenerationData, ImageToImageGenerationData } from 'store/types/typesCommon';

import { ReactComponent as EditPencil } from 'assets/edit-pencil.svg';
import strings from 'constants/strings';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';

type Props = {
	imageId: string;
	imageUrl: string;
	isImageNsfw: boolean;
	generationData: GenerationData;
	hasBackground?: boolean;
};

const { handleDataForGenerationToolStore } = commonUtils;

const { transform, disabledNSFW } = strings;
const { IMAGE_TO_IMAGE, TEXT_TO_IMAGE } = generationToolsKeys;

const BtnEditImage: React.FC<Props> = ({
	imageId,
	imageUrl,
	isImageNsfw,
	generationData,
	hasBackground = false,
}) => {
	const dispatch = useStoreDispatch();
	const { isNsfwEnabled } = useSliceUser();

	const { imageWidth, imageHeight } = generationData;
	const handledData = handleDataForGenerationToolStore(IMAGE_TO_IMAGE, generationData);

	const handleOnClick = (e: React.MouseEvent) => {
		e.stopPropagation();

		dispatch(closeModal());
		dispatch(setGenerationTool(IMAGE_TO_IMAGE));
		dispatch(setIsGenerationContainerHidden(true));
		dispatch(setGenerationToolImageToImageSettings(handledData as ImageToImageGenerationData));

		dispatch(setIsInPaintMode(false));
		dispatch(clearInPaintDrawingLines());
		dispatch(
			setTransformSourceImageData({
				imageId,
				imageUrl,
				base64Image: '',
				isImageNsfw,
				imageWidth,
				imageHeight,
				sourceImageOrigin: TEXT_TO_IMAGE,
			}),
		);
	};

	const isDisabled = isImageNsfw && isNsfwEnabled;

	const conditionalTooltip = () => {
		if (isImageNsfw && isNsfwEnabled) {
			return disabledNSFW;
		}

		return transform;
	};

	return (
		<Tooltip title={conditionalTooltip()} placement="top" arrow>
			<Box>
				<StyledIconButtonAsset
					onClick={(e) => handleOnClick(e)}
					aria-label="Edit Image Button"
					disableRipple
					hasBackground={hasBackground}
					disabled={isDisabled}
				>
					<EditPencil />
				</StyledIconButtonAsset>
			</Box>
		</Tooltip>
	);
};

export default BtnEditImage;
