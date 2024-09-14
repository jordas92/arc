/** Copyright (c) 2024-present Kristiyan Dimitrov */

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const useFileUpload = (acceptedFileTypes) => {
	const [uploadedFiles, setUploadedFiles] = useState([]);

	const onDrop = (acceptedFiles) => {
		setUploadedFiles(acceptedFiles);
	};

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: acceptedFileTypes,
	});

	return {
		uploadedFiles,
		getRootProps,
		getInputProps,
	};
};

export default useFileUpload;
