/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState, useEffect, useRef, DragEvent } from 'react';
import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { closeModal } from 'store/storeSlices/sliceApp';

import { ReactComponent as UploadIcon } from 'assets/img/icons/upload-icon.svg';
import strings from 'constants/strings';
import { handleUploadedImage } from 'utils/imageUtils';
import FileInput from './FileInput';

type Props = {
	isDroppable?: boolean;
	handleImageData: Function;
};

type CustomProps = {
	isHoverOverDropzone: boolean;
};

const { uploadImageContainerMsg, uploadImageLimitation } = strings;

const StyledContainer = styled(Box, {
	shouldForwardProp: (prop: string) => !['isHoverOverDropzone'].includes(prop),
})<CustomProps>(({ theme, isHoverOverDropzone }) => ({
	textAlign: 'center',
	padding: '70px 0',
	borderRadius: '16px',
	cursor: 'pointer',
	transition: '0.3s',
	backgroundColor: isHoverOverDropzone ? theme.palette.background.surfaceHighest : 'unset',
	border: isHoverOverDropzone
		? `1px dashed ${theme.palette.accent.primary}`
		: `1px dashed ${theme.palette.text.disabled}`,

	'&:hover': {
		borderColor: theme.palette.accent.primary,
	},
}));

const UploadImageContainer: React.FC<Props> = ({ handleImageData, isDroppable = false }) => {
	const dropzoneId = 'dropzone';
	const inputFileRef = useRef<HTMLInputElement>(null);
	const dispatch = useStoreDispatch();

	const [isHoverOverDropzone, setIsHoverOverDropzone] = useState(false);

	useEffect(() => {
		const handleDropOutside = (e) => {
			if (e.target.id !== dropzoneId) {
				e.preventDefault();
				e.dataTransfer.effectAllowed = 'none';
				e.dataTransfer.dropEffect = 'none';
				e.dataTransfer.clearData();
			}
		};

		window.addEventListener('dragover', handleDropOutside);

		return () => {
			window.removeEventListener('dragover', handleDropOutside);
			dispatch(closeModal());
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleOnClick = () => {
		if (inputFileRef && inputFileRef.current) {
			inputFileRef.current.click();
		}
	};

	const handleOnDrop = async (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (!isDroppable) {
			setIsHoverOverDropzone(false);
			await handleUploadedImage(handleImageData, e);
		}
	};

	const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		// Set the drag effect to 'copy' to indicate copy operation
		e.dataTransfer.effectAllowed = 'copy';
	};

	const handleOnDragLeave = () => {
		setIsHoverOverDropzone(false);
	};

	const handleOnDragEnter = () => {
		setIsHoverOverDropzone(true);
	};

	return (
		<StyledContainer
			id={dropzoneId}
			onClick={handleOnClick}
			onDrop={handleOnDrop}
			onDragEnter={handleOnDragEnter}
			onDragOver={handleOnDragOver}
			onDragLeave={handleOnDragLeave}
			isHoverOverDropzone={isHoverOverDropzone}
		>
			<FileInput handleImageData={handleImageData} ref={inputFileRef} />
			<Box sx={{ pointerEvents: 'none' }}>
				<UploadIcon
					style={{
						width: '85px',
						height: '85px',
					}}
				/>
				<Typography variant="h3" sx={{ margin: '24px 0 8px' }}>
					{uploadImageContainerMsg}
				</Typography>
				<Typography variant="h5" color="text.active">
					{uploadImageLimitation}
				</Typography>
			</Box>
		</StyledContainer>
	);
};

export default UploadImageContainer;
