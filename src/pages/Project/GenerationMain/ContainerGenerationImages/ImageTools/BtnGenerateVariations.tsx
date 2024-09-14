/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Tooltip } from '@mui/material';

import { ReactComponent as VCircle } from 'assets/v-circle.svg';
import strings from 'constants/strings';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';

type Props = {
	imageId: string;
	hasBackground?: boolean;
};

const { variationsImage } = strings;

// TODO_NEXT check BtnVariationsImage form DialogImagePreview Modal => merge them and move to Common Components!
const BtnGenerateVariations: React.FC<Props> = ({ imageId, hasBackground = false }) => {
	const handleOnClick = (e: React.MouseEvent) => {};

	return (
		<Tooltip title={variationsImage} placement="top" arrow>
			<StyledIconButtonAsset
				onClick={(e) => handleOnClick(e)}
				aria-label="Generate Image Variations Button"
				disableRipple
				hasBackground
				isFiledIcon
			>
				<VCircle />
			</StyledIconButtonAsset>
		</Tooltip>
	);
};

export default BtnGenerateVariations;
