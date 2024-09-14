/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box } from '@mui/material';

import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { generationToolsKeys } from 'store/common/keys';

import { APP_HEADER_HEIGHT } from 'constants/default';
import ProjectToolSelector from 'pages/Project/GenerationMain/ProjectToolSelector';
import GenerationContainer from './GenerationContainer';
import PromptInputContainer from './PromptInputContainer/PromptInputContainer';

// TODO_ControlNet
// import DrawerControlNetTool from 'components/Sidebars/DrawerControlNetTool/DrawerControlNetTool';
// import ControlNetTool from '../ControlNetTool/ControlNetTool';

const { IMAGE_TO_IMAGE, TEXT_TO_IMAGE, TOOL_ENHANCE } = generationToolsKeys;

const GenerationMain: React.FC = () => {
	const {
		currentGeneration,
		currentIsRequestingGeneration,
		currentInPaintImageUrl,
		currentInPaintImageBase64,
		currentIsGenerationContainerHidden,
		currentGenerationTool,
	} = useSliceOpenedProjects();

	const inPaintImage = currentInPaintImageUrl || currentInPaintImageBase64;

	const conditionalContent = () => {
		if (
			(currentGenerationTool === IMAGE_TO_IMAGE || currentGenerationTool === TEXT_TO_IMAGE) &&
			((currentGeneration && !currentIsGenerationContainerHidden) ||
				inPaintImage ||
				currentIsRequestingGeneration)
		) {
			return <PromptInputContainer />;
		}

		return null;
	};

	const containerPadding = currentGenerationTool === TOOL_ENHANCE ? '16px 0' : '16px 24px';
	// TODO_ControlNet
	// const containerPadding = currentGenerationTool === TOOL_ENHANCE ? '16px 0' : '16px 88px 16px 0';

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				padding: containerPadding,
				height: `calc(100vh - ${APP_HEADER_HEIGHT})`,
				minWidth: '950px', // check CANVAS_WIDTH
				margin: 'auto',
			}}
		>
			<Box sx={{ height: `calc(100vh - 90px)` }}>
				<ProjectToolSelector />
				<GenerationContainer />
			</Box>
			{conditionalContent()}
		</Box>
	);

	// TODO_ControlNet
	// return (
	// 	<Box
	// 		sx={{
	// 			display: 'flex',
	// 			width: '100%',
	// 			padding: containerPadding,
	// 			height: `calc(100vh - ${APP_HEADER_HEIGHT})`,
	// 		}}
	// 	>
	// 		{currentGenerationTool !== TOOL_ENHANCE && <ControlNetTool />}
	// 		<Box
	// 			sx={{
	// 				display: 'flex',
	// 				flexDirection: 'column',
	// 				justifyContent: 'space-between',
	// 				minWidth: '950px', // check CANVAS_WIDTH
	// 				width: '100%',
	// 			}}
	// 		>
	// 			<Box sx={{ height: `calc(100vh - 200px)` }}>
	// 				<ProjectToolSelector />
	// 				<GenerationContainer />
	// 			</Box>
	// 			{conditionalContent()}
	// 		</Box>
	// 		<DrawerControlNetTool />
	// 	</Box>
	// );
};

export default GenerationMain;
