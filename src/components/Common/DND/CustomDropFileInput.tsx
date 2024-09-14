/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { ChangeEvent, useEffect, forwardRef } from 'react';

import { uploadImageAllowedTypes } from 'constants/default';

type Props = {
	ref?: any;
	handleFileInputChange: Function;
	handleOnFileInputCancel?: Function;
};

const CustomDropFileInput = forwardRef<any, Props>((props, ref) => {
	const { handleFileInputChange, handleOnFileInputCancel = () => {} } = props;

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

	const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (handleFileInputChange) {
			handleFileInputChange(event);
		}
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

export default CustomDropFileInput;
