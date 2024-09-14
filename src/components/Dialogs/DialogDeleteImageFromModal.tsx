/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';

import { useDeleteImageMutation } from 'store/apis/apiImages';
import { ArgsImageMutation } from 'store/types/typesImages';

import strings from '../../constants/strings';
import ConfirmDialog from './ConfirmDialog';

type Props = {
	open: boolean;
	closeConfirmDialog: Function;
	argsDeleteMutation: ArgsImageMutation;
};

const { confirmDeleteImage, yes, no, deleteImageTitle } = strings;

const DialogDeleteImageFromModal: React.FC<Props> = ({
	open,
	closeConfirmDialog,
	argsDeleteMutation,
}) => {
	const [deleteImage, { isLoading, isSuccess }] = useDeleteImageMutation();

	useEffect(() => {
		if (isSuccess) {
			closeConfirmDialog();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess]);

	const handleOnClose = () => {
		closeConfirmDialog();
	};

	const handleConfirmDelete = () => {
		deleteImage(argsDeleteMutation);
	};

	return (
		<ConfirmDialog
			open={open}
			onCloseIcon={handleOnClose}
			onClose={handleOnClose}
			contentFontSize="16px"
			title={deleteImageTitle}
			content={confirmDeleteImage}
			confirmCallback={handleConfirmDelete}
			// TODO_NEXT rename confirmButtonLabel and cancelButtonLabel
			yesButtonText={yes}
			noButtonText={no}
			isYesButtonLoading={isLoading}
		/>
	);
};

export default DialogDeleteImageFromModal;
