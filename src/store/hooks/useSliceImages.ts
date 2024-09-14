/** Copyright (c) 2023-present Kristiyan Dimitrov */

import useStoreSelector from './useStoreSelector';

import { keysSliceImages } from '../common/keys';

import { ImageItem } from '../types/typesImages';

const { ALL_IMAGES, DISCORD_IMAGES, FAVORITE_ALL_IMAGES, FAVORITE_PROJECT_IMAGES } =
	keysSliceImages;

/**
 * Provides data from the global state store for `slice Images`
 */
function useSliceImages() {
	const sliceImages = useStoreSelector((state) => state.sliceImages);

	const { fetchedPages: fetchedPagesAllImages, pagesTotal: pagesTotalAllImages } =
		sliceImages[ALL_IMAGES];

	const { fetchedPages: fetchedPagesDiscordImages, pagesTotal: pagesTotalDiscordImages } =
		sliceImages[DISCORD_IMAGES];

	const { fetchedPages: fetchedPagesFavoriteAllImages, pagesTotal: pagesTotalFavoriteAllImages } =
		sliceImages[FAVORITE_ALL_IMAGES];

	const {
		fetchedPages: fetchedPagesFavoriteProjectImages,
		pagesTotal: pagesTotalFavoriteProjectImages,
	} = sliceImages[FAVORITE_PROJECT_IMAGES];

	const getFetchedItems = (fetchedPages: { [page: number]: ImageItem[] }): Array<ImageItem> => {
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
		allImages: {
			fetchedPages: fetchedPagesAllImages,
			pagesTotal: pagesTotalAllImages,
			items: getFetchedItems(fetchedPagesAllImages),
		},
		discordImages: {
			fetchedPages: fetchedPagesDiscordImages,
			pagesTotal: pagesTotalDiscordImages,
			items: getFetchedItems(fetchedPagesDiscordImages),
		},
		favoriteAllImages: {
			fetchedPages: fetchedPagesFavoriteAllImages,
			pagesTotal: pagesTotalFavoriteAllImages,
			items: getFetchedItems(fetchedPagesFavoriteAllImages),
		},
		favoriteProjectImages: {
			fetchedPages: fetchedPagesFavoriteProjectImages,
			pagesTotal: pagesTotalFavoriteProjectImages,
			items: getFetchedItems(fetchedPagesFavoriteProjectImages),
		},
	};
}

export default useSliceImages;
