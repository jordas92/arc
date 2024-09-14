/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { openModal } from 'store/storeSlices/sliceApp';
import { modalsKeys } from 'store/common/keys';

import StyledIconButtonMui from 'components/StyledWrappers/StyledIconButtonMui';

type Props = {
	projectId: string;
	isDiscordProject: boolean;
};

const { PROJECT_DELETE } = modalsKeys;

const BtnDeleteProject: React.FC<Props> = ({ projectId, isDiscordProject }) => {
	const dispatch = useStoreDispatch();

	const handleOnClickDelete = () => {
		dispatch(
			openModal({
				type: PROJECT_DELETE,
				data: { projectId },
			}),
		);
	};

	const conditionalTooltip = () => {
		if (isDiscordProject) {
			return 'Cannot delete a Discord project';
		}

		return '';
	};

	return (
		<Tooltip title={conditionalTooltip()} placement="top" arrow>
			<Box>
				<StyledIconButtonMui
					disableRipple
					onClick={handleOnClickDelete}
					sx={{ padding: '0' }}
					disabled={isDiscordProject}
				>
					<DeleteIcon />
				</StyledIconButtonMui>
			</Box>
		</Tooltip>
	);
};

export default BtnDeleteProject;
