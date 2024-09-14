/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/system';
import { Box, Divider, Typography } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import { generationTypes } from 'store/common/keys';
import useSliceModels from 'store/hooks/useSliceModels';
import useSliceEnhanceModels from 'store/hooks/useSliceEnhanceModels';

import { SHARPNESS_DATA } from 'constants/default';
import strings from 'constants/strings';
import useSelectedStylesNames from 'hooks/useSelectedStylesNames';
import useIsContentOverflowing from 'hooks/useIsContentOverflowing';
import useImageDimensions from 'hooks/useImageDimensions';
import StyledContainerTools from 'components/StyledWrappers/StyledContainerTools';
import BtnCopyPrompt from 'components/Common/Buttons/BtnCopyPrompt';
import InfoIcon from 'components/Common/InfoIcon';
import BtnSavePrompt from 'components/Common/Buttons/BtnSavePrompt';

import InfoTooltipRowContent from './InfoTooltipRowContent';

type generationTypesKeys = keyof typeof generationTypes;

type Props = {
	prompt: string;
	model: string;
	styles: Array<string>;
	transformation: number;
	sharpness: string;
	type: (typeof generationTypes)[generationTypesKeys];
	height: number;
	width: number;
	imageUrl: string;
};

const {
	modelInfo,
	stylesInfo,
	none,
	dimensions,
	optimizedForLabel,
	creativityStrength,
	transformationStrength,
	sharpnessLabel,
} = strings;
const { CONJURE, TRANSFORM, INPAINT, UPSCALE, ENHANCE } = generationTypes;

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))({
	[`& .${tooltipClasses.tooltip}`]: {
		maxWidth: 800,
	},
});

const PromptContainer: React.FC<Props> = ({
	prompt,
	model,
	styles,
	transformation,
	sharpness,
	type,
	height,
	width,
	imageUrl,
}) => {
	const targetRef = useRef<HTMLElement>(null);
	const { isWidthOverflowing } = useIsContentOverflowing(targetRef);
	const [hasTooltip, setHasTooltip] = useState<boolean | null>(null);

	const { models } = useSliceModels();
	const [modelName, setModelName] = useState<string>('');

	const enhanceModels = useSliceEnhanceModels();
	const [enhanceModelName, setEnhanceModelName] = useState<string>('');
	const originalImageDimension = useImageDimensions(imageUrl);
	const selectedStylesNames = useSelectedStylesNames(styles);
	const selectedStyles = selectedStylesNames || none;

	useEffect(() => {
		setHasTooltip(isWidthOverflowing);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isWidthOverflowing]);

	useEffect(() => {
		if (model) {
			const currentModel = models.find((element) => element.key === model);

			if (currentModel) {
				setModelName(currentModel.name);
			}
		}
	}, [models, model]);

	useEffect(() => {
		const currentEnhanceModel = enhanceModels.find((element) => element.key === model);

		if (currentEnhanceModel) {
			setEnhanceModelName(currentEnhanceModel.value);
		}
	}, [enhanceModels, model]);

	const handleDimensions = () => {
		return `${width} x ${height}`;
	};

	const handleSourceDimensions = () => {
		return `${originalImageDimension.width} x ${originalImageDimension.height}`;
	};

	const handleTransformationValue = () => {
		return `${Math.floor(transformation * 100)}%`;
	};

	const handleSharpness = () => {
		const sharpnessItem = SHARPNESS_DATA.find((item) => item.value === sharpness);
		return sharpnessItem ? sharpnessItem.name : '';
	};

	const infoIconConditionalContent = () => {
		switch (type) {
			case CONJURE:
				return (
					<>
						<InfoTooltipRowContent label={modelInfo} value={modelName} />
						<InfoTooltipRowContent label={stylesInfo} value={selectedStyles} />
						<InfoTooltipRowContent label={dimensions} value={handleDimensions()} />
					</>
				);

			case UPSCALE:
				return (
					<>
						<InfoTooltipRowContent label={modelInfo} value={modelName} />
						<InfoTooltipRowContent label={stylesInfo} value={selectedStyles} />
						<InfoTooltipRowContent
							label={dimensions}
							value={handleSourceDimensions()}
						/>
					</>
				);

			case TRANSFORM:
			case INPAINT:
				return (
					<>
						<InfoTooltipRowContent label={modelInfo} value={modelName} />
						<InfoTooltipRowContent label={stylesInfo} value={selectedStyles} />
						<InfoTooltipRowContent
							label={transformationStrength}
							value={handleTransformationValue()}
						/>
						<InfoTooltipRowContent label={dimensions} value={handleDimensions()} />
					</>
				);

			case ENHANCE:
				return (
					<>
						<InfoTooltipRowContent label={optimizedForLabel} value={enhanceModelName} />
						<InfoTooltipRowContent label={stylesInfo} value={selectedStyles} />
						<InfoTooltipRowContent label={creativityStrength} value={transformation} />
						<InfoTooltipRowContent label={sharpnessLabel} value={handleSharpness()} />
						<InfoTooltipRowContent
							label={dimensions}
							value={handleSourceDimensions()}
						/>
					</>
				);

			default:
				return null;
		}
	};

	return (
		<StyledContainerTools
			hasBorder
			sx={{
				padding: '6px',
				width: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<CustomWidthTooltip title={hasTooltip ? prompt : ''} placement="top" arrow>
				<Typography
					ref={targetRef}
					variant="h5"
					noWrap
					sx={{ padding: '0 12px', maxWidth: '1000px' }}
				>
					{prompt}
				</Typography>
			</CustomWidthTooltip>
			<Box display="flex" alignItems="center">
				<InfoIcon content={infoIconConditionalContent()} hasArrow />
				<Divider orientation="vertical" variant="middle" flexItem />
				<BtnSavePrompt prompt={prompt} />
				<BtnCopyPrompt prompt={prompt} />
			</Box>
		</StyledContainerTools>
	);
};

export default PromptContainer;
