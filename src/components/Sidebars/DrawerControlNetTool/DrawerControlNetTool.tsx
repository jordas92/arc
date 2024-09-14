/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect, useState } from 'react';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceControlNet from 'store/hooks/useSliceControlNet';
import { closeControlNetDrawer, setCurrentControlNetTool } from 'store/storeSlices/sliceControlNet';

import StyledDrawer from 'components/StyledWrappers/StyledDrawer';
import DrawerControlNetHeader from './DrawerControlNetHeader';
import DrawerSourceImage from './DrawerBody/DrawerSourceImage/DrawerSourceImage';
import DrawerImagesContainer from './DrawerBody/DrawerImages/DrawerImagesContainer';

export const DrawerControlNetTool: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { openedControlNetDrawer, currentControlNetTool, controlNetTools } = useSliceControlNet();

	const [checked, setChecked] = useState<boolean>(false);

	useEffect(() => {
		if (openedControlNetDrawer) {
			if (!currentControlNetTool || currentControlNetTool !== openedControlNetDrawer) {
				setChecked(false);
			} else if (currentControlNetTool === openedControlNetDrawer) {
				setChecked(true);
			}
		}
	}, [currentControlNetTool, openedControlNetDrawer]);

	const handleOnSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// no tool is selected, select the selected one
		// OR if another tool is already selected, select selected one
		if (!currentControlNetTool || currentControlNetTool !== openedControlNetDrawer) {
			dispatch(setCurrentControlNetTool(openedControlNetDrawer));
		} else if (currentControlNetTool === openedControlNetDrawer) {
			// if selected tool is already selected, deselect selected one
			dispatch(setCurrentControlNetTool(''));
		}
	};

	const handleOnClose = () => {
		dispatch(closeControlNetDrawer());
	};

	const conditionalContent = () => {
		if (openedControlNetDrawer && controlNetTools[openedControlNetDrawer]) {
			const { drawer } = controlNetTools[openedControlNetDrawer];

			return (
				<>
					<DrawerControlNetHeader
						title={drawer.title}
						tooltip={drawer.tooltip}
						description={drawer.description}
						checked={checked}
						handleOnChange={handleOnSwitchChange}
						handleOnClose={handleOnClose}
					/>
					<DrawerSourceImage />
					<DrawerImagesContainer />
				</>
			);
		}

		return null;
	};

	return (
		<StyledDrawer
			anchor="left"
			open={!!openedControlNetDrawer}
			onClose={handleOnClose}
			sx={{
				'.MuiDrawer-paper': { margin: '70px 88px', maxHeight: '700px', overflow: 'hidden' },
			}}
		>
			{conditionalContent()}
		</StyledDrawer>
	);
};

export default DrawerControlNetTool;
