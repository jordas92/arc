/** Copyright (c) 2023-present Kristiyan Dimitrov */
/* eslint-disable camelcase */

import React from 'react';

import { generationToolsCases } from 'store/common/keys';
import useCurrentGenerationToolAndMode from '../../../hooks/useCurrentGenerationToolAndMode';

import ButtonSurpriseMe from '../Inputs/ButtonSurpriseMe';
import FooterSettingsTransform from '../Inputs/FooterSettingsTransform';
import FooterSettingsEnhance from './FooterSettingsEnhance';

const {
	TEXT_TO_IMAGE_and_ADVANCED,
	IMAGE_TO_IMAGE_and_SIMPLE,
	IMAGE_TO_IMAGE_and_ADVANCED,
	ENHANCE_and_SIMPLE,
	ENHANCE_and_ADVANCED,
} = generationToolsCases;

const SettingsFooter: React.FC = () => {
	const getCurrentState = useCurrentGenerationToolAndMode();

	const conditionalContent = () => {
		switch (getCurrentState) {
			case TEXT_TO_IMAGE_and_ADVANCED:
				return <ButtonSurpriseMe />;

			case IMAGE_TO_IMAGE_and_SIMPLE:
			case IMAGE_TO_IMAGE_and_ADVANCED:
				return <FooterSettingsTransform />;

			case ENHANCE_and_SIMPLE:
			case ENHANCE_and_ADVANCED:
				return <FooterSettingsEnhance />;

			default:
				return null;
		}
	};

	return <>{conditionalContent()}</>;
};

export default SettingsFooter;
