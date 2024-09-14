/** Copyright (c) 2023-present Kristiyan Dimitrov */

export type ResponsePreProcessImageData = {
	data: ResponsePreProcessImage;
};

export type ResponsePreProcessImage = {
	images: Array<string>;
};

export type RequestPreProcessImage = {
	key: string;
	controlnet_input_images: Array<string>;
};
