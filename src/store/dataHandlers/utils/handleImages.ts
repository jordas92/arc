/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { ResponseModelMetaImage, ModelMetaImage } from 'store/types/typesModels';

import { ASPECT_RATIO_LOCKED } from 'constants/default';
import commonUtils from '../../common/utils';
import { handleApectRatio, handleIsAspectRatioPortrait } from '../../../utils/aspectRatioUtils';

const { valueToString, handleStyles } = commonUtils;

const handleImages = (images: Array<ResponseModelMetaImage> | any): Array<ModelMetaImage> => {
	const items: Array<ModelMetaImage> = [];

	if (Array.isArray(images)) {
		images.forEach((item: ResponseModelMetaImage) => {
			const prompt = valueToString(item?.prompt);
			const promptNegative = valueToString(item?.negative_prompt);
			const ratio = handleApectRatio(valueToString(item?.aspect_ratio), ASPECT_RATIO_LOCKED);
			const isAspectRatioPortrait = handleIsAspectRatioPortrait(
				handleApectRatio(valueToString(item?.aspect_ratio)),
				false,
			);
			const styles = handleStyles(item?.styles);
			const url = valueToString(item?.url);

			if (prompt) {
				items.push({
					prompt,
					promptNegative,
					ratio,
					isAspectRatioPortrait,
					styles,
					url,
				});
			} else {
				console.error('handleFetchModelMetaData - invalid Model Meta Data item received');
			}
		});
	}

	return items;
};

export default handleImages;
