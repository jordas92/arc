/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box } from '@mui/material';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

import useSliceUser from 'store/hooks/useSliceUser';

import { ReactComponent as DownloadIcon } from 'assets/img/icons/download.svg';
import strings from 'constants/strings';
import { downloadImage } from 'utils/imageUtils';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';

type Props = {
	imageUrl: string;
	currentProjectTitle: string;
	isImageNsfw?: boolean;
	hasBackground?: boolean;
	tooltipPlacement?: TooltipProps['placement'];
};

const { downloadImageLabel, disabledNSFW } = strings;

const BtnDownloadImageIcon: React.FC<Props> = ({
	imageUrl,
	currentProjectTitle,
	isImageNsfw = false,
	hasBackground = false,
	tooltipPlacement = 'top',
}) => {
	const { isNsfwEnabled } = useSliceUser();

	const handleOnClick = async (e: React.MouseEvent) => {
		e.stopPropagation();
		await downloadImage(imageUrl, currentProjectTitle);
	};

	const isDisabled = isImageNsfw && isNsfwEnabled;

	const conditionalTooltip = () => {
		if (isImageNsfw && isNsfwEnabled) {
			return disabledNSFW;
		}

		return downloadImageLabel;
	};

	return (
		<Tooltip title={conditionalTooltip()} placement={tooltipPlacement} arrow>
			<Box>
				<StyledIconButtonAsset
					onClick={(e) => handleOnClick(e)}
					aria-label="Download Image Button"
					disableRipple
					hasBackground={hasBackground}
					disabled={isDisabled}
				>
					<DownloadIcon />
				</StyledIconButtonAsset>
			</Box>
		</Tooltip>
	);
};

export default BtnDownloadImageIcon;
