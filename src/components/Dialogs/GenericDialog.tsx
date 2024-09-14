/**
 *  Copyright (c) 2023-present ORBIS DS authors.
 */

import React from 'react';
import { StyledDialog } from './index';

interface Props {
	disableEscapeKeyDown?: boolean;
	fullWidth?: boolean;
	fullScreen?: boolean;
	open: boolean;
	ariaLabelledBy?: string;
	maxWidth?: any;
	onEnterKey: (e: any, callback: () => void) => void;
	onClose: () => void;
	renderTitle: () => any;
	renderContent: () => any;
	renderActions: () => any;
}

export function onEnterKeyHandler(event: any, confirmFunction: () => void) {
	if (event.key === 'Enter' || event.keyCode === 13) {
		confirmFunction();
	}
}

function GenericDialog(props: Props) {
	const {
		disableEscapeKeyDown,
		fullWidth,
		fullScreen,
		open,
		ariaLabelledBy,
		maxWidth,
		onClose,
		renderTitle,
		renderContent,
		renderActions,
	} = props;

	return (
		<StyledDialog
			aria-labelledby={ariaLabelledBy}
			disableEscapeKeyDown={disableEscapeKeyDown}
			fullWidth={fullWidth}
			fullScreen={fullScreen}
			open={open}
			maxWidth={maxWidth}
			// TransitionComponent={DialogTransition}
			keepMounted
			scroll="paper"
			onClose={onClose}
			onKeyDown={(event) => onEnterKeyHandler(event, onClose)}
		>
			{renderTitle && renderTitle()}
			{renderContent && renderContent()}
			{renderActions && renderActions()}
		</StyledDialog>
	);
}

export default GenericDialog;
