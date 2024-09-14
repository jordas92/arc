import React, { useState } from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import { MoreVert } from '@mui/icons-material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { generationToolsKeys, sourceImageOriginKeys } from 'store/common/keys';
import {
	setIsInPaintMode,
	setTransformSourceImageData,
	setGenerationTool,
	setIsGenerationContainerHidden,
	clearInPaintDrawingLines,
} from 'store/storeSlices/sliceOpenedProjects';

import strings from 'constants/strings';
import StyledIconButtonMui from 'components/StyledWrappers/StyledIconButtonMui';

const { sendTo, transform } = strings;
const { IMAGE_TO_IMAGE } = generationToolsKeys;
const { ORIGIN_SOURCE_IMAGE_TOOL_ENHANCE, ORIGIN_SOURCE_IMAGE_UPLOAD } = sourceImageOriginKeys;

type Props = {
	hasBackground?: boolean;
	tooltipPlacement?: TooltipProps['placement'];
	generatedImage?: {
		imageId: string;
		imageUrl: string;
		width: number;
		height: number;
	};
};

const styles = {
	menu: {
		'& .MuiMenu-paper': {
			borderRadius: '8px',
			padding: 0,
			backgroundColor: 'background.surfaceDarkLowest',
		},

		'& .MuiList-root': {
			padding: 0,
		},
	},

	menuItem: {
		padding: '10px 16px',
		color: 'text.active',

		'&:hover': {
			backgroundColor: 'transparent',
			color: 'text.hover',
		},
	},
};

const BtnMore: React.FC<Props> = ({
	hasBackground = false,
	tooltipPlacement = 'top',
	generatedImage = {
		imageId: '',
		imageUrl: '',
		width: 0,
		height: 0,
	},
}) => {
	const dispatch = useStoreDispatch();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const { currentEnhanceSourceImage, currentIsGenerationContainerHidden } =
		useSliceOpenedProjects();

	const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
		setIsMenuOpen(true);
	};

	const handleOnClose = () => {
		setAnchorEl(null);
		setIsMenuOpen(false);
	};

	// TODO_ENHANCE  - refactor!!!
	const handleOnClickTransform = () => {
		handleOnClose();

		const {
			imageId: generatedImageId,
			imageUrl: generatedImageUrl,
			width: generatedImageWidth,
			height: generatedImageHeight,
		} = generatedImage;

		const {
			imageId: sourceImageId,
			imageBase64: sourceImageBase64,
			imageUrl: sourceImageUrl,
			imageWidth: sourceImageWidth,
			imageHeight: sourceImageHeight,
		} = currentEnhanceSourceImage;

		dispatch(setIsInPaintMode(false));
		dispatch(clearInPaintDrawingLines());

		if (currentIsGenerationContainerHidden) {
			dispatch(setGenerationTool(IMAGE_TO_IMAGE));
			dispatch(setIsGenerationContainerHidden(true));

			dispatch(
				setTransformSourceImageData({
					imageId: sourceImageId,
					imageUrl: sourceImageUrl,
					base64Image: sourceImageBase64,
					isImageNsfw: false,
					imageWidth: sourceImageWidth,
					imageHeight: sourceImageHeight,
					sourceImageOrigin: ORIGIN_SOURCE_IMAGE_UPLOAD,
				}),
			);
		} else {
			// TODO  - wire up with generated (enhanced) image
			if (generatedImageUrl) {
				dispatch(
					setTransformSourceImageData({
						imageId: generatedImageId,
						imageUrl: generatedImageUrl,
						base64Image: '',
						isImageNsfw: false,
						imageWidth: generatedImageWidth,
						imageHeight: generatedImageHeight,
						sourceImageOrigin: ORIGIN_SOURCE_IMAGE_TOOL_ENHANCE,
					}),
				);
			} else {
				dispatch(
					setTransformSourceImageData({
						imageId: sourceImageId,
						imageUrl: sourceImageUrl,
						base64Image: sourceImageBase64,
						isImageNsfw: false,
						imageWidth: sourceImageWidth,
						imageHeight: sourceImageHeight,
						sourceImageOrigin: ORIGIN_SOURCE_IMAGE_TOOL_ENHANCE,
					}),
				);
			}

			dispatch(setGenerationTool(IMAGE_TO_IMAGE));
			dispatch(setIsGenerationContainerHidden(true));
		}
	};

	return (
		<>
			<Tooltip title={sendTo} placement={tooltipPlacement} arrow>
				<StyledIconButtonMui
					onClick={handleOnClick}
					disableRipple
					hasBackground={hasBackground}
				>
					<MoreVert fontSize="small" />
				</StyledIconButtonMui>
			</Tooltip>

			{isMenuOpen && (
				<Menu
					id="profileMenuBtn"
					open={isMenuOpen}
					anchorEl={anchorEl}
					onClose={handleOnClose}
					anchorOrigin={{
						vertical: 45,
						horizontal: -55,
					}}
					sx={{ ...styles.menu }}
				>
					<MenuItem onClick={handleOnClickTransform} sx={{ ...styles.menuItem }}>
						<Typography variant="navigationLink">{transform}</Typography>
					</MenuItem>
				</Menu>
			)}
		</>
	);
};

export default BtnMore;
