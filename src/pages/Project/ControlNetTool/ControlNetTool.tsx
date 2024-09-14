/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { Box, ToggleButton } from '@mui/material';

import { controlNetKeys } from 'store/common/keys';
import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceControlNet from 'store/hooks/useSliceControlNet';
import { setOpenControlNetDrawer } from 'store/storeSlices/sliceControlNet';

import { ReactComponent as PoseIcon } from 'assets/img/icons/pose.svg';
import { ReactComponent as ScribbleIcon } from 'assets/img/icons/scribble.svg';
import { ReactComponent as ReferenceIcon } from 'assets/img/icons/reference.svg';
import { ReactComponent as XRayIcon } from 'assets/img/icons/xray.svg';

import StyledToggleButtonGroupControlNet from 'pages/Project/ControlNetTool/StyledToggleButtonGroupControlNet';
import ControlNetToolBtnTooltip from './ControlNetToolBtnTooltip';

type CustomProps = {
	currentControlNetTool: keyof typeof controlNetKeys | string;
	controlNetToolKey: keyof typeof controlNetKeys | string;
};

const StyledToggleButton = styled(ToggleButton, {
	shouldForwardProp: (prop: string) =>
		!['currentControlNetTool', 'controlNetToolKey'].includes(prop),
})<CustomProps>(({ theme, currentControlNetTool, controlNetToolKey }) => ({
	backgroundColor:
		currentControlNetTool === controlNetToolKey
			? theme.palette.background.iconActiveMainColor
			: 'transparent',
	svg: {
		path: {
			stroke:
				currentControlNetTool === controlNetToolKey
					? theme.palette.primary.main
					: theme.palette.text.secondary,
		},
	},
	'&:hover': {
		backgroundColor:
			currentControlNetTool === controlNetToolKey
				? theme.palette.background.iconActiveMainColor
				: theme.palette.background.surfaceLowest,
	},
}));

const { POSE, SCRIBBLE, REFERENCE, XRAY } = controlNetKeys;

const ControlNetTool: React.FC = () => {
	const dispatch = useStoreDispatch();

	const { currentControlNetTool, controlNetTools } = useSliceControlNet();

	const handleOnChange = (
		e: React.MouseEvent<HTMLElement>,
		value: keyof typeof controlNetKeys,
	) => {
		dispatch(setOpenControlNetDrawer(value));
	};

	const conditionalIcon = (tool: keyof typeof controlNetKeys | string) => {
		switch (tool) {
			case POSE:
				return <PoseIcon />;
			case SCRIBBLE:
				return <ScribbleIcon />;
			case REFERENCE:
				return <ReferenceIcon />;
			case XRAY:
				return <XRayIcon />;
			default:
				return <Box />;
		}
	};

	return (
		<Box sx={{ padding: '0 24px' }}>
			<StyledToggleButtonGroupControlNet
				value=""
				onChange={handleOnChange}
				aria-label="ControlNet Tools"
				exclusive
			>
				{Object.keys(controlNetTools).map((key, index) => (
					<StyledToggleButton
						key={index}
						value={key}
						currentControlNetTool={currentControlNetTool}
						controlNetToolKey={key}
					>
						<ControlNetToolBtnTooltip
							title={controlNetTools[key].buttonTooltip.title}
							description={controlNetTools[key].buttonTooltip.description}
							thumbUrl={controlNetTools[key].buttonTooltip.thumbUrl}
							videoUrl={controlNetTools[key].buttonTooltip.videoUrl}
						>
							{conditionalIcon(key)}
						</ControlNetToolBtnTooltip>
					</StyledToggleButton>
				))}
			</StyledToggleButtonGroupControlNet>
		</Box>
	);
};

export default ControlNetTool;
