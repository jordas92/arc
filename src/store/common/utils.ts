/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { generationToolsKeys, generationTypes } from 'store/common/keys';
import { Product } from 'store/types/typesProducts';
import {
	GenerationData,
	TextToImageGenerationData,
	ImageToImageGenerationData,
	EnhanceGenerationData,
	ResponsePaginationData,
} from 'store/types/typesCommon';
import { ResponseTutorialsTag, TutorialsTag } from 'store/types/typesTutorials';

import {
	DEFAULT_MODEL_TEXT_TO_IMAGE,
	DEFAULT_MODEL_IMAGE_TO_IMAGE,
	DEFAULT_TRANSFORMATION_VALUE,
	DEFAULT_CREATIVITY_VALUE,
	DEFAULT_SHARPNESS_VALUE,
	ASPECT_RATIO_LOCKED,
	CGF_DEFAULT_VALUE,
	CLIP_SKIP_DEFAULT_VALUE,
	DEFAULT_ASPECT_RATIO_IMAGE_DIMENSION_TEXT_TO_IMAGE,
} from 'constants/default';
import strings from './strings';

type generationTypesKeys = keyof typeof generationTypes;

const { lastEdited } = strings;
const { TEXT_TO_IMAGE, IMAGE_TO_IMAGE, TOOL_ENHANCE } = generationToolsKeys;
const { CONJURE, TRANSFORM, INPAINT, UPSCALE, ENHANCE } = generationTypes;

/**
 * Returns current page number increased with 1 if there are more pages for fetching.
 *
 * OR
 *
 * Returns an empty string if there are no more pages for fetching.
 */
const handleNextPageValue = (responseMeta: ResponsePaginationData): string => {
	const currentPage = responseMeta?.current_page ? responseMeta.current_page : 0;
	const lastPage = responseMeta?.last_page ? responseMeta.last_page : 0;

	if (+lastPage - +currentPage >= 1) {
		return `${currentPage + 1}`;
	}

	return '';
};

/**
 * Returns a short human-readable message of the time of the last edit.
 */
const handleLastEditedValue = (eventDate: string): string => {
	const timezoneOffset = new Date().getTimezoneOffset() / 60; // in hours
	const eventTime = new Date(eventDate).getTime(); // in milliseconds
	const nowTime = new Date().setHours(new Date().getHours() + timezoneOffset); // in milliseconds

	const timeDiff = nowTime - eventTime; // in milliseconds

	const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // in days
	const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60)); // in hours
	const minutesDiff = Math.floor(timeDiff / (1000 * 60)); // in minutes
	const secondsDiff = Math.floor(timeDiff / 1000); // in seconds

	if (daysDiff > 1) {
		return `${lastEdited} ${daysDiff} days ago`;
	}

	if (daysDiff === 1) {
		return `${lastEdited} ${daysDiff} day ago`;
	}

	if (hoursDiff > 1) {
		return `${lastEdited} ${hoursDiff} hours ago`;
	}

	if (hoursDiff === 1) {
		return `${lastEdited} ${hoursDiff} hour ago`;
	}

	if (minutesDiff > 1) {
		return `${lastEdited} ${minutesDiff} minutes ago`;
	}

	if (minutesDiff === 1) {
		return `${lastEdited} ${minutesDiff} minute ago`;
	}

	return `${lastEdited} ${secondsDiff} seconds ago`;
};

/**
 * Returns the value converted to a string.
 *
 * If no meaningful value, returns an empty string OR the provided defaultValue (string).
 */
const valueToString = (value: unknown, defaultValue?: string): string => {
	const defaultVal = defaultValue || '';

	if (typeof value === 'string') {
		return value.trim() ? value.trim() : defaultVal;
	}

	if (typeof value === 'number') {
		return value.toString();
	}

	return defaultVal;
};

/**
 * Returns the value converted to a number.
 *
 * If no meaningful value, returns 0 (number zero) OR the provided defaultValue (number).
 */
const valueToNumber = (value: unknown, defaultValue?: number): number => {
	const defaultVal = defaultValue || defaultValue === 0 ? defaultValue : 0;

	if (typeof value === 'number') {
		return value;
	}

	if (
		value === null ||
		value === undefined ||
		typeof value === 'symbol' ||
		typeof value === 'bigint'
	) {
		return defaultVal;
	}

	if (isNaN(+value)) {
		return defaultVal;
	}

	if (typeof +value === 'number') {
		return +value;
	}

	return defaultVal;
};

/**
 * Returns the value converted to a boolean.
 *
 * If no meaningful value, returns false OR the provided defaultValue (boolean).
 */
const valueToBoolean = (value: unknown, defaultValue?: boolean): boolean => {
	const defaultVal = defaultValue || defaultValue === false ? defaultValue : false;

	if (typeof value === 'boolean') {
		return value;
	}

	// strings can be truthy or falsy ('', '   ', 'a')
	if (typeof value === 'string') {
		return !!value.trim();
	}

	// numbers can be truthy or falsy (0, 1)
	if (typeof value === 'number' || typeof value === 'bigint') {
		return !!value;
	}

	if (value === null || value === undefined || typeof value === 'symbol') {
		return defaultVal;
	}

	return defaultVal;
};

/**
 * If a thumb URL is not provided will use the original image URL
 * @param thumbUrl
 * @param imageUrl
 * @returns string
 */
const handleThumbValue = (thumbUrl: unknown, imageUrl: unknown): string => {
	return valueToString(thumbUrl) ? valueToString(thumbUrl) : valueToString(imageUrl);
};

/**
 * The goal of this function is to limit the stored pages within the Store slice
 * It receives the current store "page object" and conditionally
 * deletes items from the top and bottom on each successful 'onCacheEntryAdded'
 * @returns mutated object
 */
const removeItemsFromObjectByKeyOffset = (
	obj: {
		[page: number]: any[];
	},
	key: number,
) => {
	const fetchedPagesMap = new Map(Object.entries(obj));

	// The value has been chosen based on testing and experience
	// If you changing it, please consider aligning the 'threshold' and 'minimumBatchSize' values
	// within the InfiniteLoader Component
	const offsetValue = 10;

	const objectKeys = Object.keys(obj);
	const keyIndex = objectKeys.findIndex((item) => `${key}` === item);

	if (keyIndex > 0) {
		const offsetKeyAbove = keyIndex - offsetValue;
		const offsetKeyBellow = keyIndex + offsetValue;

		if (offsetKeyAbove > 0) {
			const key = objectKeys.at(offsetKeyAbove);

			if (key) {
				fetchedPagesMap.delete(key);
			}
		}

		if (offsetKeyBellow) {
			const key = objectKeys.at(offsetKeyBellow);

			if (key) {
				fetchedPagesMap.delete(key);
			}
		}
	}

	// Returns plain JS object
	return Object.fromEntries(fetchedPagesMap);
};

const handleStyles = (selectedStyles: unknown): Array<string> => {
	const styles: Array<string> = [];

	if (Array.isArray(selectedStyles)) {
		selectedStyles.forEach((item: unknown) => {
			const style = valueToString(item);

			if (style) {
				styles.push(style);
			}
		});
	}

	return styles;
};

/**
 * Returns Arcana credits Products in ascending order
 * @returns array
 */
const sortProductsAscendingly = (products: Array<Product>): Array<Product> => {
	return products.sort((a, b) => a.credits - b.credits);
};

/**
 * Toggles the 'isFavorite' value of the image object
 * @param imageObj image object, contains more props
 * @param imageId the image ID
 * @returns image object
 */
const toggleIsImageFavorite = (imageObj: any, imageId: string) => {
	if (imageObj.imageId === imageId) {
		return {
			...imageObj,
			isFavorite: !imageObj.isFavorite,
		};
	}

	return imageObj;
};

/**
 * Returns tutorials tags or empty array if no tags provided
 * @returns array
 * @param tags
 */
const handleTutorialsTags = (tags: ResponseTutorialsTag | unknown): TutorialsTag[] => {
	const items: TutorialsTag[] = [];
	const defaultTags = [] as TutorialsTag[];

	if (tags && Array.isArray(tags) && tags.length > 0) {
		tags.map((item: ResponseTutorialsTag) => {
			return items.push({
				id: valueToNumber(item?.id),
				name: valueToString(item?.name),
			});
		});
		return items;
	}

	return defaultTags;
};

/**
 * Maps the received "generation type" to the store "generation tool"
 * @returns string
 */
const generationToolFromGenerationType = (
	type: (typeof generationTypes)[generationTypesKeys] | string | null,
): keyof typeof generationToolsKeys => {
	switch (type) {
		case CONJURE:
			return TEXT_TO_IMAGE;

		case TRANSFORM:
		case INPAINT:
		case UPSCALE:
			return IMAGE_TO_IMAGE;

		case ENHANCE:
			return TOOL_ENHANCE;

		default:
			return TEXT_TO_IMAGE;
	}
};

/**
 * Maps the received "generation type" to the store "generation tool"
 * @returns string
 */
const generationTypeFromGenerationTool = (
	type: keyof typeof generationToolsKeys | string,
): (typeof generationTypes)[generationTypesKeys] => {
	switch (type) {
		case TEXT_TO_IMAGE:
			return CONJURE;

		case IMAGE_TO_IMAGE:
			return TRANSFORM;

		case TOOL_ENHANCE:
			return ENHANCE;

		default:
			return CONJURE;
	}
};

const handleDataForGenerationToolStore = (
	generationTool: keyof typeof generationToolsKeys,
	generationData: GenerationData,
) => {
	const {
		model,
		styles,
		type,
		prompt,
		promptNegative,
		imageWidth,
		imageHeight,
		ratio,
		cfg,
		clipSkip,
		sampler,
		transformation,
		sharpness,
	} = generationData;

	const usedGenerationTool = generationToolFromGenerationType(type);

	const handleGenerationModel = () => {
		if (usedGenerationTool === TOOL_ENHANCE) {
			switch (generationTool) {
				case TEXT_TO_IMAGE:
					return DEFAULT_MODEL_TEXT_TO_IMAGE;

				case IMAGE_TO_IMAGE:
					return DEFAULT_MODEL_IMAGE_TO_IMAGE;

				default:
					return model;
			}
		}

		switch (generationTool) {
			case TOOL_ENHANCE:
				return '';

			default:
				return model;
		}
	};

	const handleTransformation = () => {
		if (usedGenerationTool === TOOL_ENHANCE) {
			switch (generationTool) {
				case IMAGE_TO_IMAGE:
					return DEFAULT_TRANSFORMATION_VALUE;

				case TOOL_ENHANCE:
					return transformation;

				default:
					return transformation;
			}
		}

		if (usedGenerationTool === IMAGE_TO_IMAGE) {
			switch (generationTool) {
				case TOOL_ENHANCE:
					return DEFAULT_CREATIVITY_VALUE;

				case IMAGE_TO_IMAGE:
					return transformation;

				default:
					return transformation;
			}
		}

		return transformation;
	};

	const textToImageGenerationData: TextToImageGenerationData = {
		model: handleGenerationModel(),
		styles,
		imageWidth,
		imageHeight,
		ratio,
		cfg,
		clipSkip,
		promptNegative,
		prompt,
		sampler,
	};

	const imageToImageGenerationData: ImageToImageGenerationData = {
		model: handleGenerationModel(),
		styles,
		imageWidth,
		imageHeight,
		ratio,
		cfg,
		clipSkip,
		promptNegative,
		prompt,
		sampler,
		transformation: handleTransformation(),
	};

	const enhanceGenerationData: EnhanceGenerationData = {
		model: handleGenerationModel(),
		engine: 'engine_1', // TODO_NEXT create handleGenerationEngine if the default value comes from the BE (CMS)
		sampler,
		styles,
		prompt,
		transformation: handleTransformation(),
		sharpness,
	};

	switch (generationTool) {
		case TEXT_TO_IMAGE:
			return textToImageGenerationData;

		case IMAGE_TO_IMAGE:
			return imageToImageGenerationData;

		case TOOL_ENHANCE:
			return enhanceGenerationData;

		default:
			return textToImageGenerationData;
	}
};

// TODO_NEXT - feed with default constants
const emptyGenerationData: GenerationData = {
	promptId: '',
	projectId: '',
	model: '',
	styles: [],
	prompt: '',
	promptNegative: '',
	imageWidth: DEFAULT_ASPECT_RATIO_IMAGE_DIMENSION_TEXT_TO_IMAGE,
	imageHeight: DEFAULT_ASPECT_RATIO_IMAGE_DIMENSION_TEXT_TO_IMAGE,
	ratio: ASPECT_RATIO_LOCKED,
	cfg: CGF_DEFAULT_VALUE,
	clipSkip: CLIP_SKIP_DEFAULT_VALUE,
	sampler: '',
	transformation: 0,
	type: CONJURE,
	sourceImageUrl: '',
	sourceImageId: '',
	sharpness: DEFAULT_SHARPNESS_VALUE,
};

const commonUtils = {
	handleNextPageValue,
	handleLastEditedValue,
	valueToString,
	valueToNumber,
	valueToBoolean,
	handleThumbValue,
	handleStyles,
	removeItemsFromObjectByKeyOffset,
	sortProductsAscendingly,
	toggleIsImageFavorite,
	handleTutorialsTags,
	generationToolFromGenerationType,
	generationTypeFromGenerationTool,
	handleDataForGenerationToolStore,
	emptyGenerationData,
};

export default commonUtils;
