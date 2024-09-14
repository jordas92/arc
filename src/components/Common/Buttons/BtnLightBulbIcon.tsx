/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState } from 'react';
import { Tooltip, Box } from '@mui/material';
import { modalsKeys } from 'store/common/keys';
import useStoreDispatch from '../../../store/hooks/useStoreDispatch';
import { openModal } from '../../../store/storeSlices/sliceApp';
import { ReactComponent as LightBulbOnIcon } from '../../../assets/img/icons/lightbulb_on.svg';
import { ReactComponent as LightBulbOffIcon } from '../../../assets/img/icons/lightbulb_off.svg';
import strings from '../../../constants/strings';

const { DETAIL_MODAL } = modalsKeys;
const { getInspiredTooltip } = strings;

interface PropsButton {
	iconSize: number;
	keyProp: string;
	disabled?: boolean;
	data?: {
		model: string;
		modelKey: string | any;
	};
}

const BtnLightBulbIcon: React.FC<PropsButton> = ({ iconSize, keyProp, disabled, data }) => {
	const dispatch = useStoreDispatch();
	const [isHovered, setIsHovered] = useState(false);

	const onClick = () => {
		// TODO remove Disabled Coming Soon Models or develop disabled models to be inactive
		if (data?.modelKey !== 'dalle3') {
			dispatch(openModal({ type: DETAIL_MODAL, data }));
		}
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<Box
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			sx={{ cursor: 'pointer' }}
		>
			{isHovered && !disabled ? (
				<Tooltip
					key={`${keyProp}-bulb-icon`}
					title={getInspiredTooltip}
					placement="top"
					arrow
				>
					<LightBulbOnIcon
						onClick={() => onClick()}
						style={{
							width: iconSize + 10,
							height: iconSize + 10,
						}}
					/>
				</Tooltip>
			) : (
				<Tooltip
					key={`${keyProp}bulb-icon`}
					title={getInspiredTooltip}
					placement="top"
					arrow
				>
					<LightBulbOffIcon
						style={{ margin: '5px', width: iconSize, height: iconSize }}
					/>
				</Tooltip>
			)}
		</Box>
	);
};

export default BtnLightBulbIcon;
