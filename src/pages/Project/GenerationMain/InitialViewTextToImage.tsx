/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useRef } from 'react';
import { Box } from '@mui/material';

import { INITIAL_CONTAINERS_WIDTH } from 'constants/default';
import InputStyles from 'components/Common/InputStyles';
import StyledInitialViewWrapper from 'components/StyledWrappers/StyledInitialViewWrapper';
import StyledContainerTools from 'components/StyledWrappers/StyledContainerTools';
import InputPrompt from 'components/Common/InputPrompt';
import BtnGenerate from './PromptInputContainer/BtnGenerate';
import BtnLightBulbIcon from '../../../components/Common/Buttons/BtnLightBulbIcon';
import useSliceOpenedProjects from '../../../store/hooks/useSliceOpenedProjects';

const InitialViewTextToImage: React.FC = () => {
	const inputRef = useRef<HTMLElement>(null);
	const { currentModel } = useSliceOpenedProjects();

	const handleOnClick = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	return (
		<StyledInitialViewWrapper>
			<Box sx={{ width: `${INITIAL_CONTAINERS_WIDTH}px` }}>
				<Box onClick={handleOnClick}>
					<StyledContainerTools
						hasBorder
						sx={{ minHeight: '135px', marginBottom: '16px', cursor: 'text' }}
					>
						<InputPrompt maxRows={15} hasAutoFocus inputRef={inputRef} />
					</StyledContainerTools>
				</Box>

				<Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
					<Box sx={{ marginTop: '6px', marginRight: '10px' }}>
						<BtnLightBulbIcon
							data={{ model: currentModel, modelKey: currentModel }}
							keyProp="promptKey"
							iconSize={20}
						/>
					</Box>
					<Box sx={{ width: '200px', marginRight: '16px' }}>
						<InputStyles />
					</Box>
					<BtnGenerate />
				</Box>
			</Box>
		</StyledInitialViewWrapper>
	);
};

export default InitialViewTextToImage;
