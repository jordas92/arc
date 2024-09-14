/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { generationToolsKeys } from 'store/common/keys';

import { ASPECT_RATIO_OFF, ASPECT_RATIO_LOCKED, ASPECT_RATIO_ONE_TO_ONE } from 'constants/default';
import strings from 'constants/strings';
import { retrieveAspectRatioNumber } from 'utils/aspectRatioUtils';
import LabelSettingInput from 'components/Common/LabelSettingInput';
import StyledSettingsToolWrapper from 'components/StyledWrappers/StyledSettingsToolWrapper';
import InputImageWidth from './InputImageWidth';
import InputImageHeight from './InputImageHeight';
import BtnSwapRatioAdvanced from './BtnSwapRatioAdvanced';
import InputRatioAdvanced from './InputRatioAdvanced';
import BtnRevertToSourceSize from './BtnRevertToSourceSize';

const { imageAdjustment } = strings;
const { TEXT_TO_IMAGE, IMAGE_TO_IMAGE } = generationToolsKeys;

const ImageSize: React.FC = () => {
	const { currentGenerationTool, currentImageWidth, currentImageHeight, currentRatio } =
		useSliceOpenedProjects();

	const [ratioNumber, setRatioNumber] = useState<number>(1);

	useEffect(() => {
		switch (currentRatio) {
			case ASPECT_RATIO_OFF:
				break;

			case ASPECT_RATIO_ONE_TO_ONE:
				setRatioNumber(1);
				break;

			case ASPECT_RATIO_LOCKED: {
				const ratio = currentImageWidth / currentImageHeight;
				setRatioNumber(ratio);
				break;
			}

			default: {
				const ratio = retrieveAspectRatioNumber(currentRatio);
				setRatioNumber(ratio);
				break;
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentRatio]);

	const handleSwapRatioChange = () => {
		const ratio = 1 / ratioNumber;
		setRatioNumber(ratio);
	};

	const conditionalContent = () => {
		switch (currentGenerationTool) {
			case TEXT_TO_IMAGE:
				return (
					<>
						<Box />
						<Box>
							<InputRatioAdvanced />
							<BtnSwapRatioAdvanced handleSwapRatioChange={handleSwapRatioChange} />
						</Box>
					</>
				);

			case IMAGE_TO_IMAGE:
				return (
					<>
						<BtnRevertToSourceSize />
						<Box />
					</>
				);

			default:
				return null;
		}
	};

	return (
		<StyledSettingsToolWrapper>
			<LabelSettingInput label={imageAdjustment} margin="24px 0 10px" />

			<InputImageWidth ratioNumber={ratioNumber} />
			<InputImageHeight ratioNumber={ratioNumber} />

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					width: '100%',
					minHeight: '50px',
				}}
			>
				{conditionalContent()}
			</Box>
		</StyledSettingsToolWrapper>
	);
};

export default ImageSize;
