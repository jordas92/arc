/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

import { generationToolsKeys } from 'store/common/keys';
import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { setGenerationTool } from 'store/storeSlices/sliceOpenedProjects';

import { ReactComponent as Text2ImgIcon } from 'assets/img/icons/txt2imgIcon_new.svg';
import { ReactComponent as Img2ImgIcon } from 'assets/img/icons/img2imgIcon_new.svg';
import { ReactComponent as EnhanceIcon } from 'assets/img/icons/enhance_new.svg';
import strings from 'constants/strings';
import { TabsApple } from '../../../components/Navigation/TabsApple';

const { TEXT_TO_IMAGE, IMAGE_TO_IMAGE, TOOL_ENHANCE } = generationToolsKeys;
const { conjure, transform, enhance } = strings;

const StyledBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	margin: '0 0 14px',
}));

const ProjectToolSelector: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { currentGenerationTool } = useSliceOpenedProjects();

	const handleOnChange = (value: keyof typeof generationToolsKeys | null) => {
		if (value !== null) {
			dispatch(setGenerationTool(value));
		}
	};

	// TODO move to constants
	const projectToolsData = [
		{
			name: conjure,
			value: TEXT_TO_IMAGE,
			label: conjure,
			icon: <Text2ImgIcon />,
			isVisible: true,
			disabled: false,
		},
		{
			name: transform,
			value: IMAGE_TO_IMAGE,
			label: transform,
			icon: <Img2ImgIcon />,
			isVisible: true,
			disabled: false,
		},
		{
			name: enhance,
			value: TOOL_ENHANCE,
			label: enhance,
			icon: <EnhanceIcon />,
			isVisible: true,
			disabled: false,
		},
	];

	return (
		<StyledBox>
			<TabsApple
				tabsData={projectToolsData}
				onChange={handleOnChange}
				initialValue={currentGenerationTool}
			/>
		</StyledBox>
	);
};

export default ProjectToolSelector;
