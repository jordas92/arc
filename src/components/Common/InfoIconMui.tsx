/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { ReactNode } from 'react';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

import StyledIconButtonMui from 'components/StyledWrappers/StyledIconButtonMui';

type Props = {
	content: string | ReactNode;
	placement?: TooltipProps['placement'];
	hasArrow?: boolean;
	boxSize?: string;
};

const InfoIconMui: React.FC<Props> = ({
	content,
	placement = 'top',
	hasArrow = false,
	boxSize = '12px',
}) => {
	return (
		<StyledIconButtonMui sx={{ padding: '0', margin: '0 0 0 6px' }} colorLow disableRipple>
			<Tooltip title={content} placement={placement} arrow={hasArrow}>
				<InfoIcon sx={{ width: boxSize, height: boxSize }} />
			</Tooltip>
		</StyledIconButtonMui>
	);
};

export default InfoIconMui;
