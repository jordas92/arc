/**
 *  Copyright (c) 2023-present ORBIS DS authors.
 */

import React, { memo } from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';
import { ReactComponent as CloseIcon } from 'assets/img/icons/close.svg';
import GenericDialog, { onEnterKeyHandler } from './GenericDialog';

// THEME_NEXT
const getStyleSchema = (contentAlign?: string, contentFontSize?: string) => ({
	button: {
		margin: '5px',
		fontSize: '14px',
		lineHeight: 1.75,
		padding: '6px 16px',
	},
	rootContent: {
		textAlign: contentAlign || 'center',
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'center',
	},
	contentStyle: {
		color: 'text.primary',
		marginTop: '15px',
		fontSize: contentFontSize || '24px',
	},
	dialogActions: {
		justifyContent: 'center',
	},
});

interface Props {
	open: boolean;
	title: string;
	noButtonText: string;
	yesButtonText: string;
	isDestructive?: boolean;
	isYesButtonLoading?: boolean;
	content?: string;
	contentAlign?: string;
	contentFontSize?: string;
	cancelDialogTID?: string;
	confirmDialogTID?: string;
	confirmDialogContentTID?: string;
	confirmCallback: () => void;
	onClose: () => void;
	onCloseIcon: () => void;
}

const ConfirmDialog = memo((props: Props) => {
	const {
		open,
		title,
		content,
		onClose,
		onCloseIcon,
		confirmCallback,
		confirmDialogContentTID,
		cancelDialogTID,
		noButtonText,
		yesButtonText,
		isDestructive,
		contentAlign,
		contentFontSize,
		isYesButtonLoading,
	} = props;

	function onConfirm() {
		confirmCallback();
	}

	const styleSchema = getStyleSchema(contentAlign, contentFontSize);

	function renderTitle() {
		return (
			<DialogTitle sx={{ m: 0, p: 0, fontSize: '14px' }}>
				{title}
				{onCloseIcon ? (
					<StyledIconButtonAsset
						aria-label="close"
						onClick={onCloseIcon}
						sx={{
							position: 'absolute',
							right: 8,
							top: 8,
						}}
					>
						<CloseIcon />
					</StyledIconButtonAsset>
				) : null}
			</DialogTitle>
		);
	}

	function renderContent() {
		return (
			<DialogContent sx={styleSchema.rootContent}>
				<DialogContentText sx={styleSchema.contentStyle} data-tid={confirmDialogContentTID}>
					{content}
				</DialogContentText>
			</DialogContent>
		);
	}

	function renderActions() {
		return (
			<DialogActions sx={styleSchema.dialogActions}>
				<Button
					variant="flat"
					onClick={() => onClose()}
					data-tid={cancelDialogTID}
					sx={styleSchema.button}
				>
					{noButtonText}
				</Button>

				<Button
					onClick={() => onConfirm()}
					variant="primary"
					color={isDestructive ? 'error' : 'primary'}
					sx={styleSchema.button}
				>
					{isYesButtonLoading ? <CircularProgress size={24} /> : yesButtonText}
				</Button>
			</DialogActions>
		);
	}

	return (
		<GenericDialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth="xs"
			onEnterKey={(event: React.ChangeEvent<HTMLInputElement>) =>
				onEnterKeyHandler(event, () => onConfirm())
			}
			renderTitle={renderTitle}
			renderContent={renderContent}
			renderActions={renderActions}
		/>
	);
});

export default ConfirmDialog;
