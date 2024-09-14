/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, IconButton, Tooltip, useTheme } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import strings from 'constants/strings';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { ReactComponent as HideMaskCustomIcon } from 'assets/img/icons/hide_mask.svg';
import { ReactComponent as ShowMaskCustomIcon } from 'assets/img/icons/show_mask.svg';
import { ReactComponent as CreditInfo } from 'assets/img/icons/creditInfo.svg';

import StyledToggleDivider from 'components/StyledWrappers/StyledToggleDivider';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import {
	toggleInPaintMaskInvert,
	toggleInPaintMaskVisible,
	setInPaintType,
} from 'store/storeSlices/sliceOpenedProjects';
import StyledDropDown from '../Common/StyledDropDown';

const { invertMaskTextToolTip, showMask, hideMask, invert, refine, fill } = strings;

type Props = {
	onChangeClose: Function;
};

const IAIBtnInvertMask: React.FC<Props> = ({ onChangeClose }) => {
	const theme = useTheme();
	const dispatch = useStoreDispatch();
	const { currentInPaintMaskVisible, currentInPaintMaskInvert, currentInPaintType } =
		useSliceOpenedProjects();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target;
		dispatch(toggleInPaintMaskInvert(checked));
		onChangeClose();
	};

	const toggleMaskVisibilityButton = () => {
		dispatch(toggleInPaintMaskVisible(!currentInPaintMaskVisible));
		onChangeClose();
	};

	const handleInPaintChange = (obj) => {
		dispatch(setInPaintType(obj.name));
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<FormControl component="fieldset">
					<FormControlLabel
						value="end"
						control={
							<Checkbox
								checked={currentInPaintMaskInvert}
								onChange={handleChange}
								inputProps={{ 'aria-label': 'controlled' }}
							/>
						}
						sx={{
							marginRight: '0',
							color: '#8c8c8d', // theme.palette.background.surfaceSolid,
						}}
						label={invert}
						labelPlacement="end"
					/>
				</FormControl>

				<Box
					sx={{
						svg: {
							fill: '#8c8c8d',
						},
					}}
				>
					<Tooltip title={invertMaskTextToolTip} placement="top" arrow>
						<IconButton aria-label="inverMaskText" color="secondary">
							<CreditInfo />
						</IconButton>
					</Tooltip>
				</Box>
			</Box>

			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<StyledDropDown
					id="inpaint-type-dropdown"
					name="inPaintType"
					value={currentInPaintType}
					options={[
						{ name: refine, key: 'refine' },
						{ name: fill, key: 'fill' },
					]}
					isObjToReturn
					hasBackground={false}
					onChange={handleInPaintChange}
					MenuPropsStyle={{
						PaperProps: {
							style: {
								width: '100px',
								height: 'auto',
								maxHeight: '260px',
								background: '',
								backgroundColor: '',
							},
						},
					}}
				/>
			</Box>
			<StyledToggleDivider
				orientation="vertical"
				flexItem
				sx={{ margin: '4px 2px 4px 6px' }}
			/>

			<Tooltip title={currentInPaintMaskVisible ? showMask : hideMask} placement="top" arrow>
				<StyledIconButtonAsset
					onClick={toggleMaskVisibilityButton}
					aria-label="Toggle Mask"
					disableRipple
					isFiledIcon
				>
					<Box
						sx={{
							svg: {
								paddingTop: '5px',
								width: '100%',
								height: '100%',
								path: {
									stroke: !currentInPaintMaskVisible
										? ''
										: theme.palette.background.iconInActive,
								},
							},
						}}
					>
						{currentInPaintMaskVisible ? (
							<ShowMaskCustomIcon />
						) : (
							<HideMaskCustomIcon />
						)}
					</Box>
				</StyledIconButtonAsset>
			</Tooltip>
		</Box>
	);
};

export default IAIBtnInvertMask;
