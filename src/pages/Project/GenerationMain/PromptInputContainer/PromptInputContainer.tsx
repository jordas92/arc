/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';

import StyledContainerTools from 'components/StyledWrappers/StyledContainerTools';
import InputStyles from 'components/Common/InputStyles';
import BtnSavePrompt from 'components/Common/Buttons/BtnSavePrompt';
import BtnLightBulbIcon from 'components/Common/Buttons/BtnLightBulbIcon';
import InputPrompt from 'components/Common/InputPrompt';
import BtnGenerate from './BtnGenerate';

const ContentWrapper = styled(Box)({
	alignItems: 'center',
	marginTop: '20px',
});

const ToolsWrapper = styled(Box)({
	display: 'flex',
	justifyContent: 'end',
	alignItems: 'center',
});

const InputStylesWrapper = styled(Box)({
	width: '200px',
	marginRight: '16px',
});

const PromptInputContainer: React.FC = () => {
	const { currentPrompt, currentModel } = useSliceOpenedProjects();

	return (
		<ContentWrapper>
			<StyledContainerTools
				hasBorder
				sx={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '12px',
				}}
			>
				<InputPrompt maxRows={3} />
				<ToolsWrapper>
					<Box sx={{ marginTop: '6px' }}>
						<BtnLightBulbIcon
							data={{ model: currentModel, modelKey: currentModel }}
							keyProp="promptKey"
							iconSize={20}
						/>
					</Box>

					<BtnSavePrompt prompt={currentPrompt} />
					<InputStylesWrapper>
						<InputStyles />
					</InputStylesWrapper>
					<BtnGenerate />
				</ToolsWrapper>
			</StyledContainerTools>
		</ContentWrapper>
	);
};

export default PromptInputContainer;
