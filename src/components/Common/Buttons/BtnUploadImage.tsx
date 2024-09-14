/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useRef } from 'react';
import { Box, Button } from '@mui/material';

import strings from 'constants/strings';
import FileInput from 'components/Common/DND/FileInput';

const { upload } = strings;

type Props = {
	handleImageData: Function;
	buttonVariant?: 'primary' | 'flat' | 'basic' | 'basicWithBorder';
	buttonLabel?: string;
	handleOnUploadButtonClick?: Function;
	handleOnFileInputCancel?: Function;
	isDisabled?: boolean;
};

const BtnUploadImage: React.FC<Props> = ({
	handleImageData,
	buttonVariant = 'flat',
	buttonLabel = `${upload}`,
	handleOnUploadButtonClick = () => {},
	handleOnFileInputCancel = () => {},
	isDisabled,
}) => {
	const inputFileRef = useRef<HTMLInputElement>(null);

	const handleOnClickUpload = () => {
		if (inputFileRef && inputFileRef.current) {
			inputFileRef.current.click();
		}

		// Usage: Hiding the Upload Image Error Modal,
		// when the 'Upload Another' button is clicked
		handleOnUploadButtonClick();
	};

	return (
		<Box>
			<FileInput
				handleImageData={handleImageData}
				handleOnFileInputCancel={handleOnFileInputCancel}
				ref={inputFileRef}
			/>

			<Button
				variant={buttonVariant}
				onClick={handleOnClickUpload}
				fullWidth
				disabled={isDisabled}
			>
				{buttonLabel}
			</Button>
		</Box>
	);
};

export default BtnUploadImage;
