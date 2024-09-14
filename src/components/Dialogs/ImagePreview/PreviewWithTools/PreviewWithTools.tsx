/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { Box, Fade } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { previewModalOriginKeys, generationTypes } from 'store/common/keys';
import { ImagePreviewItem } from 'store/types/typesModals';
import { ArgsImageMutation } from 'store/types/typesImages';
import { GenerationData } from 'store/types/typesCommon';

import StyledIconButtonMui from 'components/StyledWrappers/StyledIconButtonMui';
import HeaderImagePreview from './HeaderImagePreview';
import BodyImagePreview from './BodyImagePreview';
import FooterImagePreview from './FooterImagePreview/FooterImagePreview';

const { CONJURE } = generationTypes;

const StyledBox = styled(Box)(({ theme }) => ({
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	maxWidth: '90vw',
	width: '1352px',
	maxHeight: '90vh',
	height: '100%',
	backgroundColor: theme.palette.background.surfaceSolid,
	border: `1px solid ${theme.palette.background.surfaceHighest}`,
	padding: '10px 8px 20px',
	borderRadius: '8px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	outline: 'none',
}));

type Props = {
	isModalHovered: boolean;
	currentImage: ImagePreviewItem;
	generationData: GenerationData | undefined;
	origin: keyof typeof previewModalOriginKeys;
	isPrevBtnDisabled: boolean;
	isNextBtnDisabled: boolean;
	handleOnClickPrevious: Function;
	handleOnClickNext: Function;
	handleOnClickImage: Function;
};

const PreviewWithTools: React.FC<Props> = ({
	isModalHovered,
	currentImage,
	generationData,
	origin,
	isPrevBtnDisabled,
	isNextBtnDisabled,
	handleOnClickPrevious,
	handleOnClickNext,
	handleOnClickImage,
}) => {
	const argsImageMutation: ArgsImageMutation = {
		imageId: currentImage.imageId,
		imagePage: currentImage.imagePage,
		projectId: generationData?.projectId || '',
		type: generationData?.type || CONJURE,
		origin,
	};

	return (
		<StyledBox>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					height: '100%',
				}}
			>
				{isModalHovered && !isPrevBtnDisabled && (
					<StyledIconButtonMui
						onClick={() => handleOnClickPrevious()}
						disableRipple
						hasBackground
						sx={{
							position: 'absolute',
							top: '45%',
							left: '24px',
						}}
					>
						<KeyboardArrowLeftIcon fontSize="medium" />
					</StyledIconButtonMui>
				)}

				<HeaderImagePreview
					imageUrl={currentImage.imageUrl}
					isImageFavorite={currentImage.isFavorite}
					isImageNsfw={currentImage.isImageNsfw}
					argsImageMutation={argsImageMutation}
					origin={origin}
				/>

				<BodyImagePreview
					imageUrl={currentImage.imageUrl}
					isImageNsfw={currentImage.isImageNsfw}
					handleOnClickImage={handleOnClickImage}
				/>
				<Fade in={!!generationData} timeout={500}>
					<Box sx={{ minHeight: '120px' }}>
						{generationData && (
							<FooterImagePreview
								currentImage={currentImage}
								generationData={generationData}
								origin={origin}
							/>
						)}
					</Box>
				</Fade>

				{isModalHovered && !isNextBtnDisabled && (
					<StyledIconButtonMui
						onClick={() => handleOnClickNext()}
						disableRipple
						hasBackground
						sx={{
							position: 'absolute',
							top: '45%',
							right: '24px',
						}}
					>
						<KeyboardArrowRightIcon fontSize="medium" />
					</StyledIconButtonMui>
				)}
			</Box>
		</StyledBox>
	);
};

export default PreviewWithTools;
