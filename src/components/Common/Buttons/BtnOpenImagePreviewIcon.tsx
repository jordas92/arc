/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box } from '@mui/material';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceUser from 'store/hooks/useSliceUser';
import { openModal } from 'store/storeSlices/sliceApp';
import { previewModalOriginKeys, modalsKeys } from 'store/common/keys';

import { ReactComponent as NewTab } from 'assets/img/icons/newTab.svg';
import strings from 'constants/strings';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';

type Props = {
	imageId: string;
	isImageNsfw?: boolean;
	images: any;
	hasBackground?: boolean;
	tooltipPlacement?: TooltipProps['placement'];
};

const { openImagePreviewModal, disabledNSFW } = strings;
const { IMAGE_PREVIEW } = modalsKeys;
const { ORIGIN_PROJECT_CONTAINER_GENERATION } = previewModalOriginKeys;

const BtnOpenImagePreviewIcon: React.FC<Props> = ({
	imageId,
	isImageNsfw = false,
	images,
	hasBackground = false,
	tooltipPlacement = 'top',
}) => {
	const dispatch = useStoreDispatch();
	const { isNsfwEnabled } = useSliceUser();

	const handleOnClick = () => {
		dispatch(
			openModal({
				type: IMAGE_PREVIEW,
				data: {
					origin: ORIGIN_PROJECT_CONTAINER_GENERATION,
					imageId,
					items: images,
				},
			}),
		);
	};

	const isDisabled = isImageNsfw && isNsfwEnabled;

	const conditionalTooltip = () => {
		if (isImageNsfw && isNsfwEnabled) {
			return disabledNSFW;
		}

		return openImagePreviewModal;
	};

	return (
		<Tooltip title={conditionalTooltip()} placement={tooltipPlacement} arrow>
			<Box>
				<StyledIconButtonAsset
					onClick={handleOnClick}
					aria-label="Button - Open image in image preview"
					disableRipple
					isFiledIcon
					hasBackground={hasBackground}
					disabled={isDisabled}
				>
					<NewTab />
				</StyledIconButtonAsset>
			</Box>
		</Tooltip>
	);
};

export default BtnOpenImagePreviewIcon;
