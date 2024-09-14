/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Tooltip } from '@mui/material';

import useSliceUser from 'store/hooks/useSliceUser';
import { generationToolsKeys } from 'store/common/keys';
import { ReactComponent as Enhance } from 'assets/img/icons/enhance-icon.svg';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';
import commonUtils from '../../../store/common/utils';
import { EnhanceGenerationData, GenerationData } from '../../../store/types/typesCommon';
import { closeModal } from '../../../store/storeSlices/sliceApp';
import {
	setEnhanceSourceImageData,
	setGenerationTool,
	setGenerationToolEnhanceSettings,
	setIsGenerationContainerHidden,
} from '../../../store/storeSlices/sliceOpenedProjects';
import useStoreDispatch from '../../../store/hooks/useStoreDispatch';
import strings from '../../../constants/strings';
import useImageDimensions from '../../../hooks/useImageDimensions';
import { validateImageSource } from '../../../utils/commonUtils';
import { showNotification } from '../../../store/storeSlices/sliceNotification';

type Props = {
	imageId: string;
	imageUrl: string;
	isImageNsfw: boolean;
	generationData: GenerationData;
	hasBackground?: boolean;
	isImageExternal?: boolean;
	projectId: string;
};

const { handleDataForGenerationToolStore } = commonUtils;
const { TOOL_ENHANCE } = generationToolsKeys;
const { enhance, disabledNSFW } = strings;

const BtnEnhanceIcon: React.FC<Props> = ({
	imageId,
	imageUrl,
	isImageNsfw,
	generationData,
	hasBackground = false,
}) => {
	const dispatch = useStoreDispatch();
	const { width, height } = useImageDimensions(imageUrl);

	const { isNsfwEnabled } = useSliceUser();

	const handledData = handleDataForGenerationToolStore(TOOL_ENHANCE, generationData);

	const enhanceSourceImage = {
		imageBase64: '',
		imageId,
		imageUrl,
		imageWidth: width,
		imageHeight: height,
	};

	const isDisabled = isImageNsfw && isNsfwEnabled;

	const conditionalTooltip = () => {
		if (isImageNsfw && isNsfwEnabled) {
			return disabledNSFW;
		}

		return enhance;
	};

	const handleOnClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		const { isLimitExceeded, message } = validateImageSource(width, height);
		if (isLimitExceeded) {
			dispatch(
				showNotification({
					message,
					severity: 'warning',
				}),
			);
		} else {
			dispatch(closeModal());
			dispatch(setGenerationTool(TOOL_ENHANCE));
			dispatch(setIsGenerationContainerHidden(true));
			dispatch(setGenerationToolEnhanceSettings(handledData as EnhanceGenerationData));
			dispatch(setEnhanceSourceImageData(enhanceSourceImage));
		}
	};

	return (
		<Tooltip title={conditionalTooltip()} placement="top" arrow>
			<Box>
				<StyledIconButtonAsset
					onClick={(e) => handleOnClick(e)}
					aria-label="Enhance Button"
					disableRipple
					hasBackground={hasBackground}
					isFiledIcon
					disabled={isDisabled}
					sx={{
						'&.Mui-disabled': {
							pointerEvents: 'auto',
						},
					}}
				>
					<Enhance />
				</StyledIconButtonAsset>
			</Box>
		</Tooltip>
	);
};

export default BtnEnhanceIcon;
