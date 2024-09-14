/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, useTheme } from '@mui/material';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

import useSliceUser from 'store/hooks/useSliceUser';
import { useUpdateIsImageFavoriteMutation } from 'store/apis/apiImages';
import { ArgsImageMutation } from 'store/types/typesImages';

import { ReactComponent as LikeIcon } from 'assets/img/icons/like.svg';
import strings from 'constants/strings';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';

type Props = {
	isFavorite: boolean;
	argsImageMutation: ArgsImageMutation;
	isImageNsfw?: boolean;
	hasBackground?: boolean;
	tooltipPlacement?: TooltipProps['placement'];
};

const { likeImage, dislikeImage, disabledNSFW } = strings;

const BtnToggleIsFavoriteIcon: React.FC<Props> = ({
	isFavorite,
	argsImageMutation,
	isImageNsfw = false,
	hasBackground = false,
	tooltipPlacement = 'top',
}) => {
	const theme = useTheme();
	const { isNsfwEnabled } = useSliceUser();
	const [updateIsImageFavorite, { isLoading: isUpdating }] = useUpdateIsImageFavoriteMutation();

	const handleOnClick = (e: React.MouseEvent) => {
		e.stopPropagation();

		if (!isUpdating) {
			updateIsImageFavorite({ ...argsImageMutation, isFavorite: !isFavorite });
		}
	};

	const isDisabled = (isImageNsfw && isNsfwEnabled) || isUpdating;

	const conditionalTooltip = () => {
		if (isImageNsfw && isNsfwEnabled) {
			return disabledNSFW;
		}

		return isFavorite ? dislikeImage : likeImage;
	};

	return (
		<Tooltip title={conditionalTooltip()} placement={tooltipPlacement} arrow>
			<Box>
				<StyledIconButtonAsset
					onClick={(e) => handleOnClick(e)}
					aria-label="Toggle Add/Remove From Favorites Button"
					disableRipple
					hasBackground={hasBackground}
					isFiledIcon={isFavorite}
					disabled={isDisabled}
					sx={{
						svg: {
							path: {
								stroke: `${
									isFavorite
										? theme.palette.primary.light
										: theme.palette.text.active
								}`,
								fill: `${isFavorite ? theme.palette.primary.light : 'none'}`,
							},
						},
					}}
				>
					<LikeIcon />
				</StyledIconButtonAsset>
			</Box>
		</Tooltip>
	);
};

export default BtnToggleIsFavoriteIcon;
