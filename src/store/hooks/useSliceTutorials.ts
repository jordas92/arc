/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { TutorialItem } from 'store/types/typesTutorials';
import useStoreSelector from './useStoreSelector';

/**
 * Provides data from the global state store for `slice Tutorials`
 */
function useSliceTutorials() {
	const sliceTutorials = useStoreSelector((state) => state.sliceTutorials);
	const { fetchedPages } = sliceTutorials;

	const getFetchedItems = (fetchedPages: {
		[page: number]: TutorialItem[];
	}): Array<TutorialItem> => {
		const keys = Object.keys(fetchedPages);
		const items: TutorialItem[] = [];

		if (keys.length > 0) {
			keys.forEach((key) => {
				const pageItems = fetchedPages[key];

				pageItems.forEach((item: TutorialItem) => {
					items.push(item);
				});
			});
		}

		return items;
	};

	return {
		...sliceTutorials,
		items: getFetchedItems(fetchedPages),
	};
}

export default useSliceTutorials;
