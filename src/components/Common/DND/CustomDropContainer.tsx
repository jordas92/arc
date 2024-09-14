/** Copyright (c) 2024-present Kristiyan Dimitrov */

import React, { useRef } from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import CustomDropFileInput from './CustomDropFileInput';

type Props = {
	references?: any;
	key?: string;
	isFileInput?: boolean;
	isNoStyle?: boolean;
	isDisabled?: boolean;
	handleDroppedFile: (files: FileList) => void;
	renderContainer?: () => React.ReactNode;
	children?: React.ReactNode;
	isOverDropzone?: boolean;
};

type CustomProps = {
	isOverDropzone: any;
	isDisabled?: boolean;
};

const StyledContainer = styled(Box, {
	shouldForwardProp: (prop: string) => !['isOverDropzone', 'isDisabled'].includes(prop),
})<CustomProps>(({ theme, isOverDropzone = false, isDisabled }) => ({
	display: 'inline-flex',
	width: '100%',
	textAlign: 'center',
	padding: '10px 0',
	borderRadius: '16px',
	cursor: isDisabled ? '' : 'pointer',
	transition: '0.3s',
	backgroundColor: isOverDropzone ? theme.palette.background.surfaceHighest : 'unset',
	border: isOverDropzone
		? `1px dashed ${theme.palette.accent.primary}`
		: `1px dashed ${theme.palette.text.disabled}`,
	// '&:hover': {
	// 	borderColor: theme.palette.accent.primary,
	// },
}));

const CustomDropContainer: React.FC<Props> = ({
	references,
	key,
	isDisabled,
	isFileInput,
	isNoStyle,
	handleDroppedFile,
	renderContainer,
	children,
	isOverDropzone,
}) => {
	const dropzoneId = 'dropzone';
	const inputFileRef = useRef<HTMLInputElement>(null);
	// Not using the state just setting it ?!?
	// const [isHoverOverDropzone, setIsHoverOverDropzone] = useState(false);

	const handleOnClick = () => {
		if (!isDisabled && inputFileRef && inputFileRef.current) {
			inputFileRef.current.click();
		}
	};

	const handleOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (!isDisabled) {
			// Not using the state just setting it ?!?
			// setIsHoverOverDropzone(false);
			handleDroppedFile(event.dataTransfer.files);
		}
	};

	const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target;
		if (!isDisabled) {
			if (files) {
				handleDroppedFile(files);
			}
		}
	};

	const handleOnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const handleOnDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		// Not using the state just setting it ?!?
		// setIsHoverOverDropzone(false);
	};

	const handleOnDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (event.dataTransfer.items && event.dataTransfer.items[0].kind === 'file') {
			// Not using the state just setting it ?!?
			// setIsHoverOverDropzone(true);
		}
	};

	if (isNoStyle) {
		return (
			<Box
				ref={references}
				id={dropzoneId}
				key={key}
				onClick={handleOnClick}
				onDrop={handleOnDrop}
				onDragEnter={handleOnDragEnter}
				onDragOver={handleOnDragOver}
				onDragLeave={handleOnDragLeave}
			>
				{children}
				{renderContainer && renderContainer()}
				{isFileInput && (
					<CustomDropFileInput
						handleFileInputChange={handleFileInputChange}
						ref={inputFileRef}
					/>
				)}
			</Box>
		);
	}

	return (
		<StyledContainer
			ref={references}
			id={dropzoneId}
			key={key}
			onClick={handleOnClick}
			onDrop={handleOnDrop}
			onDragEnter={handleOnDragEnter}
			onDragOver={handleOnDragOver}
			onDragLeave={handleOnDragLeave}
			isOverDropzone={isOverDropzone}
			isDisabled={isDisabled}
		>
			{children}
			{renderContainer && renderContainer()}
			{isFileInput && (
				<CustomDropFileInput
					handleFileInputChange={handleFileInputChange}
					ref={inputFileRef}
				/>
			)}
		</StyledContainer>
	);
};

export default CustomDropContainer;
