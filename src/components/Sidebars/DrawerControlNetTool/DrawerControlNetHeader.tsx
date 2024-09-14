/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { Box, FormControlLabel, Switch, Tooltip, Typography } from '@mui/material';

import { ReactComponent as CloseIcon } from 'assets/img/icons/close.svg';
import { ReactComponent as IconInfo } from 'assets/img/icons/info.svg';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';

const StyledBox = styled(Box)({
	display: 'flex',
	justifyContent: 'space-between',
	marginBottom: '4px',
});

const StyledWrapper = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	cursor: 'default',
});

const StyledSwitch = styled(Switch)({
	'& .MuiSwitch-switchBase': {
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	'& .MuiSwitch-switchBase.Mui-checked': {
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
});

type Props = {
	title: string;
	tooltip: string;
	description: string;
	checked: boolean;
	handleOnChange: Function;
	handleOnClose: Function;
};

const DrawerControlNetHeader: React.FC<Props> = ({
	title,
	tooltip,
	description,
	handleOnChange,
	checked,
	handleOnClose,
}) => {
	return (
		<Box sx={{ marginBottom: '16px' }}>
			<StyledBox>
				<FormControlLabel
					control={
						<StyledSwitch
							checked={checked}
							onChange={(e) => handleOnChange(e)}
							inputProps={{ 'aria-label': 'controlled' }}
						/>
					}
					label={
						<StyledWrapper>
							<Typography variant="h4">{title}</Typography>
							<Tooltip title={tooltip} placement="top" arrow>
								<StyledIconButtonAsset
									boxSize="20px"
									disableRipple
									sx={{ padding: '4px' }}
								>
									<IconInfo />
								</StyledIconButtonAsset>
							</Tooltip>
						</StyledWrapper>
					}
					labelPlacement="start"
					sx={{ margin: 0 }}
				/>

				<StyledIconButtonAsset
					onClick={() => handleOnClose()}
					sx={{ padding: '0', alignItems: 'flex-start' }}
				>
					<CloseIcon />
				</StyledIconButtonAsset>
			</StyledBox>
			<Typography variant="h6" color="text.textLowest">
				{description}
			</Typography>
		</Box>
	);
};

export default DrawerControlNetHeader;
