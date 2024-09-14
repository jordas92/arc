/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { DiscoverImageItem } from 'store/types/typesDiscover';
import useStoreSelector from './useStoreSelector';

/**
 * Provides data from the global state store for `slice Tutorials`
 */
function useSliceDiscover() {
	const sliceDiscover = useStoreSelector((state) => state.sliceDiscover);
	const { fetchedPages } = sliceDiscover;

	const getFetchedItems = (fetchedPages: {
		[page: number]: DiscoverImageItem[];
	}): Array<DiscoverImageItem> => {
		const keys = Object.keys(fetchedPages);
		const items: DiscoverImageItem[] = [];

		if (keys.length > 0) {
			keys.forEach((key) => {
				const pageItems = fetchedPages[key];

				pageItems.forEach((item: DiscoverImageItem) => {
					items.push(item);
				});
			});
		}

		return items;
	};

	return {
		...sliceDiscover,
		items: getFetchedItems(fetchedPages),
	};
}

export default useSliceDiscover;
