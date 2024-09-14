/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StyledIconButtonMui from 'components/StyledWrappers/StyledIconButtonMui';

const styles = {
	navigationBtnsWrapper: {
		position: 'absolute',
		bottom: '-45px',
		left: '0',
	},
	navBtn: { borderRadius: '8px', width: '32px', height: '32px' },
};

type Props = {
	handleOnClickPrevious: Function;
	handleOnClickNext: Function;
	disableNextBtn: boolean;
};

const NavigationAnnouncements: React.FC<Props> = ({
	handleOnClickPrevious,
	handleOnClickNext,
	disableNextBtn,
}) => {
	return (
		<Box sx={styles.navigationBtnsWrapper}>
			<StyledIconButtonMui
				onClick={() => handleOnClickPrevious()}
				disableRipple
				hasBackground
				sx={styles.navBtn}
			>
				<KeyboardArrowLeftIcon fontSize="small" />
			</StyledIconButtonMui>
			<StyledIconButtonMui
				onClick={() => handleOnClickNext()}
				disabled={disableNextBtn}
				disableRipple
				hasBackground
				sx={styles.navBtn}
			>
				<KeyboardArrowRightIcon fontSize="small" />
			</StyledIconButtonMui>
		</Box>
	);
};

export default NavigationAnnouncements;
