/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { ReactElement } from 'react';
import { styled } from '@mui/system';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import ControlNetToolBtnTooltipContent from './ControlNetToolBtnTooltipContent';

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))({
	[`& .${tooltipClasses.tooltip}`]: {
		padding: '0',
	},
});

type Props = {
	title: string;
	description: string;
	thumbUrl?: string;
	videoUrl?: string;
	children: ReactElement;
};

const ControlNetToolBtnTooltip: React.FC<Props> = (props) => {
	const { title, description, thumbUrl, videoUrl, children } = props;

	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const conditionalContent = () => {
		if (title || description || thumbUrl || videoUrl) {
			return (
				<StyledTooltip
					open={open}
					onClose={handleClose}
					onOpen={handleOpen}
					title={
						<ControlNetToolBtnTooltipContent
							title={title}
							description={description}
							thumbUrl={thumbUrl}
							videoUrl={videoUrl}
						/>
					}
					placement="right"
				>
					{children}
				</StyledTooltip>
			);
		}

		return children;
	};

	return conditionalContent();
};

export default ControlNetToolBtnTooltip;
