/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';

import useStoreDispatch from '../../store/hooks/useStoreDispatch';
import { closeModal } from '../../store/storeSlices/sliceApp';
import { useDeleteProjectMutation } from '../../store/apis/apiProjects';

import strings from '../../constants/strings';
import ConfirmDialog from './ConfirmDialog';

type Props = {
	projectId: string;
};

const { confirmDeleteProject, yes, no, deleteProjectTitle } = strings;

const DialogDeleteProject: React.FC<Props> = ({ projectId }) => {
	const dispatch = useStoreDispatch();
	const [deleteProject, { isLoading, isSuccess }] = useDeleteProjectMutation();

	useEffect(() => {
		if (isSuccess) {
			dispatch(closeModal());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess]);

	const handleOnClose = () => {
		dispatch(closeModal());
	};

	const handleConfirmDelete = () => {
		deleteProject(projectId);
	};

	return (
		<ConfirmDialog
			open
			onCloseIcon={handleOnClose}
			onClose={handleOnClose}
			contentFontSize="16px"
			title={deleteProjectTitle}
			content={confirmDeleteProject}
			confirmCallback={handleConfirmDelete}
			// TODO_NEXT rename confirmButtonLabel and cancelButtonLabel
			yesButtonText={yes}
			noButtonText={no}
			isYesButtonLoading={isLoading}
		/>
	);
};

export default DialogDeleteProject;
