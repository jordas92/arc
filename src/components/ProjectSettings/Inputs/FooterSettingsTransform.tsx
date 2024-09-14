/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { generationToolsKeys } from 'store/common/keys';

import StyledUploadButtonContainer from '../../Common/DND/StyledUploadButtonContainer';

const { IMAGE_TO_IMAGE } = generationToolsKeys;

const FooterSettingsTransform: React.FC = () => {
	return <StyledUploadButtonContainer typeGenerationTool={IMAGE_TO_IMAGE} />;
};

export default FooterSettingsTransform;
