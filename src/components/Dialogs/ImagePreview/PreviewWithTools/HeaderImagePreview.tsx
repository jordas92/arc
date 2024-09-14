/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState } from 'react';
import { Box, Tooltip } from '@mui/material';

import { previewModalOriginKeys } from 'store/common/keys';
import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { closeModal } from 'store/storeSlices/sliceApp';
import { ArgsImageMutation } from 'store/types/typesImages';

import { ReactComponent as DeleteIcon } from 'assets/img/icons/deleteIcon.svg';
import { ReactComponent as CloseIcon } from 'assets/img/icons/close.svg';
import strings from 'constants/strings';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';
import BtnDownloadImageIcon from 'components/Common/Buttons/BtnDownloadImageIcon';
import BtnShareIcon from 'components/Common/Buttons/BtnShareIcon';
import BtnToggleIsFavoriteIcon from 'components/Common/Buttons/BtnToggleIsFavoriteIcon';
import DialogDeleteImageFromModal from 'components/Dialogs/DialogDeleteImageFromModal';

const { deleteImage } = strings;
const { ORIGIN_HOMEPAGE_TAB_DISCOVER } = previewModalOriginKeys;

type Props = {
	imageUrl: string;
	isImageFavorite: boolean;
	isImageNsfw: boolean;
	argsImageMutation: ArgsImageMutation;
	origin: keyof typeof previewModalOriginKeys;
};

const HeaderImagePreview: React.FC<Props> = ({
	imageUrl,
	isImageFavorite,
	isImageNsfw,
	argsImageMutation,
	origin,
}) => {
	const dispatch = useStoreDispatch();
	const { currentProjectTitle } = useSliceOpenedProjects();

	const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] = useState<boolean>(false);

	const handleOnClickDelete = () => {
		setIsConfirmDeleteDialogOpen(true);
	};

	const closeConfirmDialog = () => {
		setIsConfirmDeleteDialogOpen(false);
	};

	const handleOnClose = () => {
		dispatch(closeModal());
	};

	const conditionalDeleteBtn = () => {
		if (origin !== ORIGIN_HOMEPAGE_TAB_DISCOVER) {
			return (
				<Tooltip title={deleteImage} placement="top" arrow>
					<StyledIconButtonAsset
						onClick={handleOnClickDelete}
						aria-label="Delete button"
						disableRipple
					>
						<DeleteIcon />
					</StyledIconButtonAsset>
				</Tooltip>
			);
		}

		return null;
	};

	return (
		<>
			<Box display="flex" justifyContent="space-between">
				<Box>
					<BtnToggleIsFavoriteIcon
						isFavorite={isImageFavorite}
						argsImageMutation={argsImageMutation}
						isImageNsfw={isImageNsfw}
					/>
				</Box>
				<Box display="flex" alignItems="center">
					<BtnDownloadImageIcon
						imageUrl={imageUrl}
						currentProjectTitle={currentProjectTitle}
						isImageNsfw={isImageNsfw}
					/>
					{conditionalDeleteBtn()}
					<BtnShareIcon imageUrl={imageUrl} isImageNsfw={isImageNsfw} />
				</Box>
				<StyledIconButtonAsset
					onClick={handleOnClose}
					disableRipple
					sx={{ paddingTop: '0', svg: { scale: '1.1' } }}
				>
					<CloseIcon />
				</StyledIconButtonAsset>
			</Box>
			<DialogDeleteImageFromModal
				open={isConfirmDeleteDialogOpen}
				closeConfirmDialog={closeConfirmDialog}
				argsDeleteMutation={argsImageMutation}
			/>
		</>
	);
};

export default HeaderImagePreview;
