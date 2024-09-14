/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Tooltip } from '@mui/material';
import WestIcon from '@mui/icons-material/West';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { setTransformSourceImageData } from 'store/storeSlices/sliceOpenedProjects';
import { previewModalOriginKeys } from 'store/common/keys';
import { GenerationImage } from 'store/types/typesPrompts';

import strings from 'constants/strings';
import StyledIconButtonMui from 'components/StyledWrappers/StyledIconButtonMui';

type Props = {
	currentImage: GenerationImage;
	imageWidth: number;
	imageHeight: number;
};

const { sourceImage } = strings;
const { ORIGIN_PROJECT_CONTAINER_GENERATION } = previewModalOriginKeys;

const BtnUseAsSource: React.FC<Props> = ({ currentImage, imageWidth, imageHeight }) => {
	const dispatch = useStoreDispatch();

	const { imageId, imageUrl, isImageNsfw } = currentImage;

	const handleOnClick = (e: React.MouseEvent) => {
		e.stopPropagation();

		dispatch(
			setTransformSourceImageData({
				imageId,
				imageUrl,
				base64Image: '',
				isImageNsfw,
				imageWidth,
				imageHeight,
				sourceImageOrigin: ORIGIN_PROJECT_CONTAINER_GENERATION,
			}),
		);
	};

	return (
		<Tooltip title={sourceImage} placement="top" arrow>
			<StyledIconButtonMui
				onClick={(e) => handleOnClick(e)}
				aria-label="Use Image As Source Button"
				disableRipple
				hasBackground
			>
				<WestIcon fontSize="small" />
			</StyledIconButtonMui>
		</Tooltip>
	);
};

export default BtnUseAsSource;
