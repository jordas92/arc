/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';
import { IconButton, Link, Snackbar, Typography } from '@mui/material';
import { SnackbarCloseReason } from '@mui/base/useSnackbar';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceNotification from 'store/hooks/useSliceNotification';
import { clearNotification } from 'store/storeSlices/sliceNotification';
import { closeDrawer } from 'store/storeSlices/sliceOpenedProjects';
import { closeModal } from 'store/storeSlices/sliceApp';
import { closeControlNetDrawer } from 'store/storeSlices/sliceControlNet';

import routesPaths from 'routes/paths';

const { PROJECT } = routesPaths;

const StyledMuiAlert = styled(MuiAlert)({
	'& .MuiAlert-message': {
		padding: '0',
	},
	'& .MuiAlert-action': {
		padding: '0',
	},
});

// TODO_NEXT Find out why it is so complicated
// Find why React.forwardRef is used
// Check MUI Click-Away Listener
const Alert = React.forwardRef(function Alert(props: any, ref: any) {
	return <StyledMuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarPositioned: React.FC = () => {
	const dispatch = useStoreDispatch();
	const navigate = useNavigate();
	const { message, severity, autohide, visible, action, closeOnClickAway } =
		useSliceNotification();

	// TODO_NEXT Do we handle other links?
	// if not let's call it NavigateToProject !?
	const handleOnClickLink = (projectId: string) => {
		const path = generatePath(PROJECT, { id: projectId });
		navigate(path);
		dispatch(clearNotification());
		dispatch(closeModal());
		dispatch(closeDrawer());
		dispatch(closeControlNetDrawer());
	};

	const handleOnClickClose = (_: any, reason?: SnackbarCloseReason) => {
		if (!closeOnClickAway && reason === 'clickaway') {
			return;
		}

		dispatch(clearNotification());
	};

	const conditionalContent = () => {
		if (action) {
			return (
				<Alert
					id="message-id"
					severity={severity}
					sx={{ minWidth: '300px' }}
					action={
						<IconButton
							key="close"
							aria-label="Close"
							color="inherit"
							onClick={handleOnClickClose}
						>
							<CloseIcon />
						</IconButton>
					}
				>
					{message}
					<Link
						sx={{ padding: '11px' }}
						component="button"
						fontSize="inherit"
						underline="hover"
						onClick={() => handleOnClickLink(action.data.id)}
					>
						{action.label}
					</Link>
				</Alert>
			);
		}

		return (
			<Alert
				id="message-id"
				severity={severity}
				sx={{ minWidth: '300px' }}
				action={
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						onClick={handleOnClickClose}
					>
						<CloseIcon />
					</IconButton>
				}
			>
				<Typography variant="h6" sx={{ padding: '11px 0', fontWeight: '500' }}>
					{message}
				</Typography>
			</Alert>
		);
	};

	return (
		<Snackbar
			open={visible}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			message={message}
			action={message}
			onClose={handleOnClickClose}
			autoHideDuration={autohide ? 10000 : null}
			ContentProps={{
				'aria-describedby': 'message-id',
			}}
			// TODO_NEXT use this syntax
			// e.g. zIndex: (theme) => theme.zIndex.drawer + 1,
			sx={{ zIndex: 999999 }}
		>
			{conditionalContent()}
		</Snackbar>
	);
};

export default SnackbarPositioned;
