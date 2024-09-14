/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box } from '@mui/material';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { openModal } from 'store/storeSlices/sliceApp';
import { modalsKeys } from 'store/common/keys';

import { ReactComponent as ShareIcon } from 'assets/img/icons/share.svg';
import strings from 'constants/strings';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';

import useSliceUser from 'store/hooks/useSliceUser';

type Props = {
	imageUrl: string;
	isImageNsfw?: boolean;
	hasBackground?: boolean;
	tooltipPlacement?: TooltipProps['placement'];
};

const { shareImage, disabledNSFW } = strings;
const { SHARE } = modalsKeys;

const BtnShareIcon: React.FC<Props> = ({
	imageUrl,
	isImageNsfw = false,
	hasBackground = false,
	tooltipPlacement = 'top',
}) => {
	const dispatch = useStoreDispatch();
	const { isNsfwEnabled } = useSliceUser();

	const handleOnClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		dispatch(openModal({ type: SHARE, data: { imageUrl } }));
	};

	const isDisabled = isImageNsfw && isNsfwEnabled;

	const conditionalTooltip = () => {
		if (isImageNsfw && isNsfwEnabled) {
			return disabledNSFW;
		}

		return shareImage;
	};

	return (
		<Tooltip title={conditionalTooltip()} placement={tooltipPlacement} arrow>
			<Box>
				<StyledIconButtonAsset
					onClick={(e) => handleOnClick(e)}
					aria-label="Share Image Button"
					disableRipple
					isFiledIcon
					hasBackground={hasBackground}
					disabled={isDisabled}
				>
					<ShareIcon />
				</StyledIconButtonAsset>
			</Box>
		</Tooltip>
	);
};

export default BtnShareIcon;
