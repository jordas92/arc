/** Copyright (c) 2024-present Kristiyan Dimitrov */

import React, { useEffect, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { closeModal } from 'store/storeSlices/sliceApp';

import ImageGrid from './ImageGrid';
import ContextText from './ContextText';
import LoadMoreModels from './LoadMoreModels';
import GenericResponsiveDialog from '../GenericResponsiveDialog';

import { setModel } from '../../../store/storeSlices/sliceOpenedProjects';
import { useGetModelMetaQuery, useLazyFetchModelMetaQuery } from '../../../store/apis/apiModels';
import useSliceModels from '../../../store/hooks/useSliceModels';
import useSliceOpenedProjects from '../../../store/hooks/useSliceOpenedProjects';
import StyledDropDown from '../../Common/StyledDropDown';

type Props = {
	data?: any;
};

const DialogDetailModal: React.FC<Props> = ({ data }) => {
	const dispatch = useStoreDispatch();
	const modalContentRef = useRef(null);

	const { modelDetail } = useSliceModels();
	const { models, nextMetaModelsPage } = useSliceModels();
	const { currentModel } = useSliceOpenedProjects();

	const [open, setOpen] = React.useState(false);
	const [filteredModels, setFilteredModels] = React.useState<any>([]);
	const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

	const { isSuccess } = useGetModelMetaQuery({ modelKey: data.modelKey ?? '' });
	const [fetchModelMeta, { isSuccess: isSuccessLazy }] = useLazyFetchModelMetaQuery();

	const { key, name } = modelDetail;

	useEffect(() => {
		// TODO remove when dalle3 will be implemented, ugly...
		const filteredArray = models.filter((obj) => obj.key !== 'dalle3');
		setFilteredModels([{ key: 'all_models', name: 'All Models' }, ...filteredArray]);
	}, [models]);

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

	const handleClick = () => {
		dispatch(setModel(key));
		dispatch(closeModal());
	};

	const selectModel = (obj) => {
		fetchModelMeta({ modelKey: obj.key === 'all_models' ? 'images' : obj.key });
	};

	function renderTitle() {
		return (
			<>
				<DialogTitle
					id="scroll-dialog-title"
					textAlign="center"
					sx={{
						fontSize: '1.5rem',
						position: 'relative',
						top: '-12px',
						alignItems: 'center',
						justifyContent: 'center',
						padding: 0,
						margin: 'auto',
					}}
				>
					<Box sx={{ width: '200px', paddingTop: '22px' }}>
						<StyledDropDown
							id="models-dropdown"
							name="name"
							value={currentModel}
							options={filteredModels || []}
							isObjToReturn
							onChange={selectModel}
							hasBackground={false}
							MenuPropsStyle={{
								PaperProps: {
									style: {
										width: '200px',
										height: 'auto',
										maxHeight: '260px',
										background: '',
										backgroundColor: '',
									},
								},
							}}
						/>
					</Box>
				</DialogTitle>
				<IconButton
					aria-label="close"
					onClick={handleOnClickClose}
					sx={{
						position: 'absolute',
						right: '12px',
						top: '12px',
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			</>
		);
	}

	function renderContent() {
		return (
			<DialogContent dividers={scroll === 'paper'} ref={modalContentRef}>
				<DialogContentText
					id="scroll-dialog-description"
					ref={descriptionElementRef}
					tabIndex={-1}
				>
					<ContextText
						isSuccess={isSuccess || isSuccessLazy}
						descriptions={modelDetail.modalDescription}
					/>
				</DialogContentText>
				<ImageGrid isSuccess={isSuccess || isSuccessLazy} modelDetail={modelDetail} />
				{modalContentRef && (
					<LoadMoreModels
						nextModels={nextMetaModelsPage}
						modelKey={key}
						modalRef={modalContentRef}
					/>
				)}
			</DialogContent>
		);
	}

	function renderAction() {
		return (
			<DialogActions sx={{ justifyContent: 'flex-start' }}>
				<Button type="button" variant="flat" onClick={handleOnClickClose}>
					Cancel
				</Button>
				{(isSuccess || isSuccessLazy) && (
					<Button type="button" variant="primary" onClick={handleClick}>
						{`Use ${name} model`}
					</Button>
				)}
			</DialogActions>
		);
	}

	return (
		<GenericResponsiveDialog
			open={open}
			onClose={handleOnClickClose}
			scroll={scroll}
			ariaLabelledBy="scroll-dialog-title"
			ariaDescribedBy="scroll-dialog-description"
			padding="0px"
			renderTitle={renderTitle}
			renderContent={renderContent}
			renderActions={renderAction}
		/>
	);
};

export default DialogDetailModal;
