/**
 *  Copyright (c) 2023-present ORBIS DS authors.
 */

import React, { useEffect } from 'react';
import { useMediaQuery } from '@mui/system';
import StyledDialog from '../StyledWrappers/StyledDialog';

interface Props {
	reference?: any;
	disableEscapeKeyDown?: boolean;
	fullWidth?: boolean;
	fullScreen?: boolean;
	open: boolean;
	isInPaint?: boolean;
	scroll?: any;
	padding?: string;
	ariaLabelledBy?: string;
	ariaDescribedBy?: string;
	height?: string;
	maxWidth?: any;
	onEnterKey?: (e: any, callback: () => void) => void;
	onClose: () => void;
	renderTitle?: () => any;
	renderContent: () => any;
	renderActions?: () => any;
}

export function onEnterKeyHandler(event: any, confirmFunction: () => void) {
	if (event.key === 'Enter' || event.keyCode === 13) {
		confirmFunction();
	}
}

function GenericResponsiveDialog(props: Props) {
	const {
		reference,
		disableEscapeKeyDown,
		fullWidth,
		fullScreen,
		open,
		scroll,
		ariaLabelledBy,
		ariaDescribedBy,
		maxWidth,
		padding,
		isInPaint,
		height,
		onClose,
		renderTitle,
		renderContent,
		renderActions,
	} = props;

	const [dialogWidth, setDialogWidth] = React.useState('100%');
	const isLargeScreen = useMediaQuery('(min-width: 1064px)'); // Original 1024px
	const isXLargeScreen = useMediaQuery('(min-width: 1440px)');
	const isXXLargeScreen = useMediaQuery('(min-width: 1920px)');

	useEffect(() => {
		if (isInPaint) {
			setDialogWidth('90%');
		} else {
			setDialogWidth('800px');
		}
	}, [isLargeScreen, isInPaint]);

	useEffect(() => {
		if (isInPaint) {
			setDialogWidth('90%');
		} else {
			setDialogWidth('920px');
		}
	}, [isXLargeScreen, isInPaint]);

	useEffect(() => {
		if (isInPaint) {
			setDialogWidth('90%');
		} else {
			setDialogWidth('1180px');
		}
	}, [isXXLargeScreen, isInPaint]);

	return (
		<StyledDialog
			ref={reference}
			aria-labelledby={ariaLabelledBy}
			aria-describedby={ariaDescribedBy}
			disableEscapeKeyDown={disableEscapeKeyDown}
			fullWidth={fullWidth}
			fullScreen={fullScreen}
			open={open}
			maxWidth={maxWidth}
			width={dialogWidth}
			height={height}
			keepMounted
			scroll={scroll || 'paper'}
			onClose={onClose}
			onKeyDown={(event) => onEnterKeyHandler(event, onClose)}
			padding={padding}
		>
			{renderTitle && renderTitle()}
			{renderContent && renderContent()}
			{renderActions && renderActions()}
		</StyledDialog>
	);
}

export default GenericResponsiveDialog;
