/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { Box, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { ReactComponent as EyeIcon } from 'assets/img/icons/eye.svg';

import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';
import StyledIconButtonMui from 'components/StyledWrappers/StyledIconButtonMui';

import strings from 'constants/strings';

const OverlayBox = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: 0,
	left: 0,
	height: '100%',
	width: '100%',
	padding: '10px',
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'flex-start',
	backgroundColor: theme.palette.background.backgroundOverlay,
}));

const { removeImage } = strings;

type Props = {
	handleOnClickDelete: Function;
	handleOnClickSwitchImages: Function;
	showToggleBtn: boolean;
	switchBtnTooltip: string;
};

const DrawerSourceImageOverlay: React.FC<Props> = ({
	handleOnClickDelete,
	handleOnClickSwitchImages,
	showToggleBtn,
	switchBtnTooltip,
}) => {
	return (
		<OverlayBox>
			{showToggleBtn && (
				<Tooltip title={switchBtnTooltip} placement="top" arrow>
					<StyledIconButtonAsset
						disableRipple
						onClick={() => handleOnClickSwitchImages()}
						sx={{ padding: '5px' }}
					>
						<EyeIcon />
					</StyledIconButtonAsset>
				</Tooltip>
			)}
			<Tooltip title={removeImage} placement="top" arrow>
				<StyledIconButtonMui
					disableRipple
					onClick={() => handleOnClickDelete()}
					sx={{ padding: '0' }}
				>
					<DeleteIcon />
				</StyledIconButtonMui>
			</Tooltip>
		</OverlayBox>
	);
};

export default DrawerSourceImageOverlay;
