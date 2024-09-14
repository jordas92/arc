/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { ChangeEvent } from 'react';

import {
	uploadImageStatus,
	uploadImageAllowedTypes,
	UPLOAD_MAX_SIZE_MB,
	UPLOAD_MAX_SIZE_PX,
} from 'constants/default';
import { getOriginFromUrl } from './commonUtils';

const fetchImageErrorMsg = 'Error fetching image:';
const { ERROR_UPLOAD_FAILED, ERROR_UPLOAD_FILE_TYPE, ERROR_UPLOAD_IMAGE_SIZE, SUCCESS_UPLOAD } =
	uploadImageStatus;

export const fetchConvertImageUrlToBase64 = async (img: string) => {
	if (!img || img.length === 0) {
		return '';
	}
	try {
		return !!img && img.length > 0
			? await fetch(img)
					.then((response) => response.blob())
					.then((blob) => {
						const reader = new FileReader();
						reader.readAsDataURL(blob);
						return new Promise<string>((res) => {
							reader.onloadend = () => {
								res(reader.result as string);
							};
						});
					})
			: '';
	} catch (error) {
		console.error(fetchImageErrorMsg, error);
		return '';
	}
};

export const toBase64 = (file: File | Blob): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file as Blob);
		reader.onload = () => resolve(reader.result ? reader.result.toString() : '');
		reader.onerror = reject;
	});

export const calculateNewImageDimensions = (
	width: number,
	height: number,
	maxDimension: number,
) => {
	let newWidth: number;
	let newHeight: number;
	if (width > height) {
		newWidth = Math.min(maxDimension, width);
		newHeight = (newWidth / width) * height;
	} else {
		newHeight = Math.min(maxDimension, height);
		newWidth = (newHeight / height) * width;
	}

	return { newWidth, newHeight };
};

/**
 * Downloads an image to the user’s machine
 * (Note: where and how - depends on browser settings)
 * @param url The image source (URL).
 * @param imageName The name will be used for the file name when downloading, if it is not provided a default name will be provided.
 */
export const downloadImage = async (url: string, imageName?: string) => {
	const defaultImageName = 'arcana_image';

	const headers = {
		'Access-Control-Allow-Origin': getOriginFromUrl(),
	};

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers,
		});

		if (!response.ok) {
			console.error(`Failed to fetch image, status: ${response.status}`);
		}

		const blob = await response.blob();

		// Creating a temporary anchor element
		const anchorEl = document.createElement('a');
		const href = window.URL.createObjectURL(blob);

		anchorEl.href = href;
		anchorEl.download = imageName || defaultImageName;

		document.body.appendChild(anchorEl);
		anchorEl.click();

		// Cleaning up the temporary anchor element
		document.body.removeChild(anchorEl);
		window.URL.revokeObjectURL(href);
	} catch (error) {
		console.error(fetchImageErrorMsg, error);
	}
};

export async function getImageProperties(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			console.error(`Failed to fetch image. Status: ${response.status}`);
		}

		const arrayBuffer = await response.arrayBuffer();
		const base64 = btoa(
			new Uint8Array(arrayBuffer).reduce(
				(data, byte) => data + String.fromCharCode(byte),
				'',
			),
		);

		return new Promise((resolve, reject) => {
			const img = new Image();

			img.onload = () => {
				const { width, height } = img;
				const aspectRatio = width / height;
				resolve({ width, height, aspectRatio });
			};

			img.onerror = (error) => {
				reject(error);
			};

			img.src = `data:image/jpeg;base64,${base64}`;
		});
	} catch (error) {
		return Promise.reject(error);
	}
}

export function validateImage(
	files: FileList | null,
	maxSizeMB,
): {
	uploadStatus: keyof typeof uploadImageStatus;
} {
	// Validates successful file upload
	if (!files || files.length === 0) {
		return { uploadStatus: ERROR_UPLOAD_FAILED };
	}

	const file = files[0];

	// Validates file type
	if (!uploadImageAllowedTypes.includes(file.type)) {
		return { uploadStatus: ERROR_UPLOAD_FILE_TYPE };
	}

	// Validates file size
	const maxFileSize = maxSizeMB * 1024 * 1024; // 5 megabytes in bytes

	if (file.size > maxFileSize) {
		return { uploadStatus: ERROR_UPLOAD_IMAGE_SIZE };
	}

	return { uploadStatus: SUCCESS_UPLOAD };
}

export function isValidImage(files: FileList | null, maxSizeMB): boolean {
	// Validates successful file upload
	if (!files || files.length === 0) {
		return false;
	}

	const file = files[0];

	// Validates file type
	if (!uploadImageAllowedTypes.includes(file.type)) {
		return false;
	}

	// Validates file size
	const maxFileSize = maxSizeMB * 1024 * 1024; // 5 megabytes in bytes

	return file.size <= maxFileSize;
}

/**
 * Retrieves an image width and height
 * @param image image URL or image base64
 */
export const retrieveImageDimensions = async (image: string) => {
	let imageWidth = 0;
	let imageHeight = 0;

	const img = new Image();
	img.src = image;

	try {
		await img.decode();
		const { width, height } = img;

		imageWidth = width;
		imageHeight = height;
	} catch (e) {
		console.error(e);
	}

	return { imageWidth, imageHeight };
};

export const handleUploadedImage = async (
	handleImageData: Function,
	e: ChangeEvent<HTMLInputElement> | any,
) => {
	let files: FileList | null = null;
	if (e.target) {
		const { files: selectedFiles } = e.target as HTMLInputElement;
		files = selectedFiles;
	}

	if (e.dataTransfer) {
		const { files: droppedFiles } = e.dataTransfer as HTMLInputElement;
		files = droppedFiles;
	}

	const { uploadStatus } = validateImage(files, UPLOAD_MAX_SIZE_MB);

	if (files && uploadStatus === SUCCESS_UPLOAD) {
		const imageBase64 = await toBase64(files[0]);
		const { imageWidth, imageHeight } = await retrieveImageDimensions(imageBase64);

		if (imageWidth && imageHeight) {
			if (imageWidth + imageHeight > UPLOAD_MAX_SIZE_PX) {
				handleImageData({
					imageBase64: '',
					imageWidth: 0,
					imageHeight: 0,
					uploadStatus: ERROR_UPLOAD_IMAGE_SIZE,
					eventType: e.type,
				});
			} else {
				handleImageData({
					imageBase64,
					imageWidth,
					imageHeight,
					uploadStatus,
					eventType: e.type,
				});
			}
		}
	} else {
		handleImageData({
			imageBase64: '',
			imageWidth: 0,
			imageHeight: 0,
			uploadStatus,
			eventType: e.type,
		});
	}

	// Will allow if validation fails, the same 'invalid' image to be loaded and verified again
	// for event type 'change' (select + open within the browser file selector)
	e.target.value = '';

	// Will clear the transfer data when drag and drop (event type 'drop')
	if (e.dataTransfer) {
		e.dataTransfer.clearData();
	}
};
