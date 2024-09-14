/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { ResponseModels, ResponseModel, Models } from 'store/types/typesModels';
import commonUtils from 'store/common/utils';

import DEFAULT_IMAGE from 'assets/img/default_image.png';
import dalle3Image from 'assets/img/dalle3.png';

const { valueToString } = commonUtils;

const handleFetchModelsData = (response: ResponseModels | any): Models => {
	const items: Models = [];

	if (Array.isArray(response)) {
		response.forEach((item: ResponseModel) => {
			items.push({
				key: valueToString(item?.key),
				name: valueToString(item?.name),
				image: valueToString(item?.image, DEFAULT_IMAGE),
				processor: valueToString(item?.processor).toLowerCase(), // must correspond to sliceAspectRatios first level keys
			});
		});
	}

	// TODO
	// Remove the hardcoded model when it is implemented and available via the admin panel
	// Sync with BE and POs
	const dalle3 = {
		key: 'dalle3',
		name: 'DALLE-3 (Coming Soon)',
		image: dalle3Image,
		processor: '',
		disabled: true,
	};

	items.push(dalle3);

	return items;
};

export default handleFetchModelsData;
