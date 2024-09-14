/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { ChangeEvent, useEffect, forwardRef } from 'react';

import { uploadImageAllowedTypes } from 'constants/default';
import { handleUploadedImage } from 'utils/imageUtils';

type Props = {
	handleImageData: Function;
	handleOnFileInputCancel?: Function;
};

const FileInput = forwardRef<any, Props>((props, ref) => {
	const { handleImageData, handleOnFileInputCancel = () => {} } = props;

	useEffect(() => {
		// @ts-ignore
		const fileInput = ref && ref.current ? ref.current : null;

		if (!fileInput) return;

		const handleOnCancel = () => handleOnFileInputCancel();

		// Usage: Closing the "hidden" Upload Image Error Modal,
		// when the File Upload is canceled
		fileInput.addEventListener('cancel', handleOnCancel);

		// Cleaning up the EventListener
		return () => {
			if (!fileInput) return;

			fileInput.removeEventListener('cancel', handleOnCancel);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleOnChange = async (e: ChangeEvent<HTMLInputElement> | any) => {
		await handleUploadedImage(handleImageData, e);
	};

	return (
		<input
			type="file"
			onChange={handleOnChange}
			accept={uploadImageAllowedTypes.join(', ')}
			ref={ref}
			style={{ display: 'none' }}
		/>
	);
});

export default FileInput;
