/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

import { previewModalOriginKeys } from 'store/common/keys';
import { ImagePreviewItem } from 'store/types/typesModals';
import { GenerationData } from 'store/types/typesCommon';

import { VARIATION_DISPLAYED } from 'constants/default';
import BtnGenerateUpscaleIcon from 'components/Common/Buttons/BtnGenerateUpscaleIcon';
import BtnVariationsImage from 'components/Common/Buttons/BtnVariationsImage';
import BtnConjure from 'components/Common/Buttons/BtnConjure';
import BtnEnhance from 'components/Common/Buttons/BtnEnhance';
import BtnTransform from 'components/Common/Buttons/BtnTransform';
import PromptContainer from './PromptContainer';

type Props = {
	currentImage: ImagePreviewItem;
	generationData: GenerationData;
	origin: keyof typeof previewModalOriginKeys;
};

const FooterWrapper = styled(Box)({
	padding: '0 12px',
	marginTop: '12px',
});

const StyledBox = styled(Box)({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
});

const FooterImagePreview: React.FC<Props> = ({ currentImage, generationData, origin }) => {
	const { imageId, imageUrl, isImageNsfw } = currentImage;

	const { prompt, model, styles, transformation, type, imageHeight, imageWidth, sharpness } =
		generationData;

	return (
		<FooterWrapper>
			<StyledBox>
				<PromptContainer
					prompt={prompt}
					model={model}
					styles={styles}
					transformation={transformation}
					type={type}
					height={imageHeight}
					width={imageWidth}
					sharpness={sharpness}
					imageUrl={imageUrl}
				/>
			</StyledBox>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					alignItems: 'center',
					marginTop: '12px',
				}}
			>
				{VARIATION_DISPLAYED && <BtnVariationsImage imageId={imageId} type={type} />}
				<BtnGenerateUpscaleIcon
					imageId={imageId}
					imageUrl={imageUrl}
					isImageNsfw={isImageNsfw}
					generationData={generationData}
					origin={origin}
				/>
				<BtnConjure
					isImageNsfw={isImageNsfw}
					generationData={generationData}
					origin={origin}
				/>
				<BtnTransform
					hasIcon
					imageId={imageId}
					imageUrl={imageUrl}
					isImageNsfw={isImageNsfw}
					generationData={generationData}
					origin={origin}
				/>
				<BtnEnhance
					imageId={imageId}
					imageUrl={imageUrl}
					isImageNsfw={isImageNsfw}
					generationData={generationData}
					origin={origin}
				/>
			</Box>
		</FooterWrapper>
	);
};

export default FooterImagePreview;
