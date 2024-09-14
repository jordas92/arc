/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { ResponseModelMeta, ModelMeta } from 'store/types/typesModels';

import handleImages from './utils/handleImages';
import commonUtils from '../common/utils';

const { valueToString } = commonUtils;

const handleFetchModelMetaData = (response: ResponseModelMeta | any): ModelMeta => {
	return {
		key: valueToString(response?.key),
		name: valueToString(response?.name),
		modalTitle: valueToString(response?.modal_title),
		modalDescription: valueToString(response?.modal_description),
		processor: valueToString(response?.processor).toLowerCase(), // must correspond to sliceAspectRatios first level keys
		images: handleImages(response?.images),
	};
};

export default handleFetchModelMetaData;
