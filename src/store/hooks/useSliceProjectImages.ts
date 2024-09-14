/** Copyright (c) 2023-present Kristiyan Dimitrov */

import useStoreSelector from './useStoreSelector';

import { ImageItem } from '../types/typesImages';

/**
 * Provides data from the global state store for `slice Project Images`
 */
function useSliceProjectImages() {
	const sliceProjectImages = useStoreSelector((state) => state.sliceProjectImages);

	const { fetchedPages, pagesTotal } = sliceProjectImages;

	const getFetchedItems = (): Array<ImageItem> => {
		const keys = Object.keys(fetchedPages);
		const items: ImageItem[] = [];

		if (keys.length > 0) {
			keys.forEach((key) => {
				const pageItems = fetchedPages[key];

				pageItems.forEach((item: ImageItem) => {
					items.push(item);
				});
			});
		}

		return items;
	};

	return {
		fetchedPages,
		pagesTotal,
		items: getFetchedItems(),
	};
}

export default useSliceProjectImages;
