/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Tooltip, Box, Button } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { revertToSourceImageSize } from 'store/storeSlices/sliceOpenedProjects';

import { ReactComponent as RevertIcon } from 'assets/img/icons/revert_icon.svg';
import strings from 'constants/strings';

const { revertToSource } = strings;

const BtnRevertToSourceSize: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { currentOriginalSourceImageWidth, currentOriginalSourceImageHeight } =
		useSliceOpenedProjects();

	const handleOnClick = () => {
		dispatch(revertToSourceImageSize());
	};

	const isDisabled = !currentOriginalSourceImageWidth || !currentOriginalSourceImageHeight;

	return (
		<Tooltip title={revertToSource} placement="bottom" arrow>
			<Box>
				<Button
					variant="flat"
					onClick={handleOnClick}
					sx={{ padding: '11px', minWidth: 'unset' }}
					disabled={isDisabled}
				>
					<RevertIcon />
				</Button>
			</Box>
		</Tooltip>
	);
};

export default BtnRevertToSourceSize;
