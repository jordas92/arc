/** Copyright (c) 2024-present Kristiyan Dimitrov */

import React, { useEffect, useState } from 'react';
import { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { closeModal } from 'store/storeSlices/sliceApp';

import { Box } from '@mui/material';
import GenericResponsiveDialog from '../GenericResponsiveDialog';
import IAIInPaintTools from '../../InPaint/IAIInPaintTools';
import IAIDenoiserSlider from '../../InPaint/IAIDenoiserSlider';
import IAICanvas from '../../InPaint/IAICanvas';

type Props = {
	data?: any;
};

const DialogExpandInPaint: React.FC<Props> = () => {
	const dispatch = useStoreDispatch();

	const [isBrushSizeSliderOpen, setBrushSizeSliderOpen] = useState<boolean>(false);

	const [open, setOpen] = React.useState(false);
	const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

	useEffect(() => {
		handleClickOpen();
	}, [open]);

	const handleClickOpen = () => {
		setOpen(true);
		setScroll('paper');
	};

	const descriptionElementRef = React.useRef<HTMLElement>(null);
	React.useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [open]);

	const handleOnClickClose = () => {
		dispatch(closeModal());
	};

	const onChangeClose = () => {
		setBrushSizeSliderOpen(false);
	};

	const closeSizeSlider = () => {
		setBrushSizeSliderOpen(false);
	};

	function renderTitle() {
		return null;
	}

	function renderContent() {
		return (
			<DialogContent dividers={scroll === 'paper'}>
				<IAICanvas closeSizeSlider={closeSizeSlider} isModal />
			</DialogContent>
		);
	}

	function renderAction() {
		return (
			<DialogActions sx={{ justifyContent: 'center', alignItems: 'center' }}>
				<Box sx={{ textAlign: 'center' }}>
					<IAIInPaintTools
						setBrushSizeSliderOpen={setBrushSizeSliderOpen}
						onChangeClose={onChangeClose}
						isBrushSizeSliderOpen={isBrushSizeSliderOpen}
						isModal
					/>
					<IAIDenoiserSlider onChangeClose={onChangeClose} />
				</Box>
			</DialogActions>
		);
	}

	return (
		<GenericResponsiveDialog
			open={open}
			onClose={handleOnClickClose}
			ariaLabelledBy="inpaint-dialog-title"
			ariaDescribedBy="inpaint-dialog-description"
			fullWidth={false}
			maxWidth="xl"
			padding="0px"
			height="90%"
			isInPaint
			renderTitle={renderTitle}
			renderContent={renderContent}
			renderActions={renderAction}
		/>
	);
};

export default DialogExpandInPaint;
