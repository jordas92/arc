/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Button, Tooltip, useTheme } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import useSliceUser from 'store/hooks/useSliceUser';
import { openModal } from 'store/storeSlices/sliceApp';
import {
	setIsRequestingGeneration,
	setIsGenerationContainerHidden,
} from 'store/storeSlices/sliceOpenedProjects';
import { useGenerateEnhanceMutation } from 'store/apis/apiGeneration';
import { modalsKeys, generationToolsKeys } from 'store/common/keys';

import { ReactComponent as IconEnhance } from 'assets/img/icons/enhance.svg';
import strings from 'constants/strings';
import { CREDITS_COST_ENHANCE, BUY_CREDITS_THRESHOLD_ENHANCE } from 'constants/default';
import useArgsGenerateEnhance from 'hooks/useArgsGenerateEnhance';
import useImageDimensions from '../../../../hooks/useImageDimensions';
import { validateImageSource } from '../../../../utils/commonUtils';
import { showNotification } from '../../../../store/storeSlices/sliceNotification';

const { enhance, enhanceTooltip } = strings;
const { CREDITS } = modalsKeys;
const { TOOL_ENHANCE } = generationToolsKeys;

const BtnEnhance: React.FC = () => {
	const dispatch = useStoreDispatch();
	const theme = useTheme();
	const argsGenerateEnhance = useArgsGenerateEnhance();
	const [generateEnhance] = useGenerateEnhanceMutation();
	const { creditsBalance } = useSliceUser();
	const {
		currentProjectId: projectId,
		currentIsRequestingGeneration: isRequestingGeneration,
		currentEnhanceSourceImage: sourceImage,
	} = useSliceOpenedProjects();

	const hasSourceImage = sourceImage.imageBase64 || sourceImage.imageUrl;
	const { width, height } = useImageDimensions(sourceImage.imageUrl || sourceImage.imageBase64);

	const handleOnClick = async () => {
		const { isLimitExceeded, message } = validateImageSource(width, height);
		if (isLimitExceeded) {
			dispatch(
				showNotification({
					message,
					severity: 'warning',
				}),
			);
		}

		if (creditsBalance <= BUY_CREDITS_THRESHOLD_ENHANCE) {
			dispatch(openModal({ type: CREDITS }));
		}

		if (creditsBalance >= CREDITS_COST_ENHANCE) {
			dispatch(
				setIsRequestingGeneration({
					projectId,
					generationTool: TOOL_ENHANCE,
					isRequestingGeneration: true,
				}),
			);

			const args = await argsGenerateEnhance();

			generateEnhance(args);
			dispatch(setIsGenerationContainerHidden(true));
		}
	};

	const isButtonDisabled = isRequestingGeneration || !hasSourceImage;

	return (
		<Tooltip title={enhanceTooltip} placement="top" arrow>
			<Box>
				<Button
					variant="arcanaMagic"
					onClick={handleOnClick}
					disabled={isButtonDisabled}
					fullWidth
					sx={{
						svg: {
							path: {
								fill: theme.palette.text.hover,
							},
						},
					}}
				>
					<IconEnhance />
					<Box sx={{ marginLeft: '6px' }}>{enhance}</Box>
				</Button>
			</Box>
		</Tooltip>
	);
};

export default BtnEnhance;
