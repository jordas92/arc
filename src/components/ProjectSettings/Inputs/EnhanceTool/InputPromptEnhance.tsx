/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';

import StyledContainerTools from 'components/StyledWrappers/StyledContainerTools';
import InputPrompt from 'components/Common/InputPrompt';

const InputPromptEnhance: React.FC = () => {
	return (
		<StyledContainerTools hasBorder sx={{ height: '108px', padding: '12px 6px' }}>
			<InputPrompt maxRows={4} />
		</StyledContainerTools>
	);
};

export default InputPromptEnhance;
