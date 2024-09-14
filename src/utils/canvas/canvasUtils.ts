/* eslint-disable func-names */
/** Copyright (c) 2023-present Kristiyan Dimitrov */

export const resizeImage = async (
	image: string,
	width: number,
	height: number,
): Promise<string> => {
	return new Promise((resolve, reject) => {
		// create an off-screen canvas
		// We create an image to receive the Data URI
		const imageElement = document.createElement('img');
		// When the event "onload" is triggered we can resize the image.
		imageElement.onload = async function () {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			if (ctx) {
				// set its dimension to target size
				canvas.width = width;
				canvas.height = height;

				// draw source image into the off-screen canvas:
				// @ts-ignore
				ctx.drawImage(this, 0, 0, width, height);
				// encode image to data-uri with base64 version of compressed image
				const URL = canvas.toDataURL('image/png');
				resolve(URL);
			}
		};
		// We put the Data URI in the image's src attribute
		imageElement.src = image;
	});
};

export function invertMask(dataURL, callback) {
	const img = new Image();
	img.src = dataURL;
	// eslint-disable-next-line no-return-assign
	return (img.onload = async function () {
		const canvas = document.createElement('canvas');
		canvas.width = img.width;
		canvas.height = img.height;
		const context: any = canvas.getContext('2d');
		context.drawImage(img, 0, 0);

		const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		const { data } = imageData;

		// Invert the colors by swapping black (0) and white (255)
		for (let i = 0; i < data.length; i += 4) {
			const red = data[i];
			const green = data[i + 1];
			const blue = data[i + 2];
			const alpha = data[i + 3];

			// Check if the pixel is not fully transparent
			if (alpha > 0) {
				if (red !== 0 || green !== 0 || blue !== 0) {
					// If the color is not black, invert to white
					data[i] = 255; // Red
					data[i + 1] = 255; // Green
					data[i + 2] = 255; // Blue
				} else {
					// Otherwise, invert to black
					data[i] = 255 - red; // Invert the red channel
					data[i + 1] = 255 - green; // Invert the green channel
					data[i + 2] = 255 - blue; // Invert the blue channel
				}
			}
		}
		context.putImageData(imageData, 0, 0);
		const invertedDataURL = canvas.toDataURL('image/jpeg');
		await convertJPEGtoPNG(invertedDataURL)
			.then((base64PNG) => {
				// You can use the Base64 PNG data as needed.
				callback(base64PNG);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	});
}

export function convertJPEGtoPNG(base64JPEG) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		// Set up a callback when the image is loaded
		img.onload = function () {
			// Create a canvas element
			const canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx: any = canvas.getContext('2d');
			// Draw the JPEG image onto the canvas
			ctx.drawImage(img, 0, 0);
			// Convert the canvas content to a Base64 encoded PNG image
			const base64PNG = canvas.toDataURL('image/png');
			// Resolve the promise with the PNG data
			resolve(base64PNG);
		};
		// Set the source of the image to the Base64 encoded JPEG
		img.src = base64JPEG;
		// Handle image loading errors
		img.onerror = function () {
			reject(new Error('Failed to load the image.'));
		};
	});
}
