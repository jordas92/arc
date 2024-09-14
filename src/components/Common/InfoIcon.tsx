/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { ReactNode } from 'react';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

import { ReactComponent as IconInfo } from 'assets/img/icons/info.svg';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';

type Props = {
	content: string | ReactNode;
	placement?: TooltipProps['placement'];
	hasArrow?: boolean;
};

const InfoIcon: React.FC<Props> = ({ content, placement = 'top', hasArrow = false }) => {
	return (
		<Tooltip title={content} placement={placement} arrow={hasArrow}>
			<StyledIconButtonAsset boxSize="35px" disableRipple>
				<IconInfo />
			</StyledIconButtonAsset>
		</Tooltip>
	);
};

export default InfoIcon;
