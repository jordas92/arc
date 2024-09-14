/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { Box, Slider, Grow } from '@mui/material';

type Props = {
	size: number;
	handleOnSizeChange: Function;
};

const StyledContainer = styled(Box)(({ theme }) => ({
	// TODO_NEXT refactor: Do not rely on the left to align center!
	position: 'absolute',
	width: '200px',
	marginTop: '-35px',
	padding: '2px 16px 8px',
	'.MuiSlider-root': { padding: '0' },
	backgroundColor: theme.palette.background.surfaceSolidLight,
	borderRadius: '8px',
}));

const IAISizeSlider: React.FC<Props> = ({ size, handleOnSizeChange }) => {
	return (
		<Grow in style={{ transformOrigin: '0 0 0' }} {...{ timeout: 150 }}>
			<StyledContainer>
				<Slider
					value={size}
					step={5}
					min={1}
					max={110}
					title="Brush and Erase Size"
					aria-label="Default"
					valueLabelDisplay="off"
					onChange={(e: any) => handleOnSizeChange(Number(e.target.value))}
				/>
			</StyledContainer>
		</Grow>
	);
};

export default IAISizeSlider;
