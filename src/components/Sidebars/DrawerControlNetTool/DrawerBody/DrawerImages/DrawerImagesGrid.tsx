/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Skeleton } from '@mui/material';

import { useLazyFetchImagesQuery } from 'store/apis/apiImages';
import { useLazyFetchProjectImagesQuery } from 'store/apis/apiProjects';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { ImageItem } from 'store/types/typesImages';
import { previewModalOriginKeys } from 'store/common/keys';

import {
	DRAWER_GRID_ITEM_HEIGHT,
	DRAWER_PAGE_ITEMS_CONTAINER_HEIGHT,
	DRAWER_GRID_ITEM_XS,
	DRAWER_GRID_SPACING,
} from 'constants/default';
import InfinityScrollContainer from 'components/InfinityScrollContainer/InfinityScrollContainer';
import MuiStandardGrid from 'components/InfinityScrollContainer/GridItemsContainerPerPage/MuiStandardGrid';
import GridItemImage from './GridItemImage';

type Props = {
	origin: keyof typeof previewModalOriginKeys;
	itemsPerPage: number;
	fetchedPages: {
		[page: number]: ImageItem[];
	};
	pagesTotal: number;
	searchValue: string;
};

const {
	ORIGIN_PROJECT_DRAWER_LIBRARY_ALL,
	ORIGIN_PROJECT_DRAWER_HISTORY,
	ORIGIN_PROJECT_DRAWER_FAVORITES_ALL,
} = previewModalOriginKeys;

const DrawerImagesGrid: React.FC<Props> = ({
	origin,
	itemsPerPage,
	fetchedPages,
	pagesTotal,
	searchValue,
}) => {
	const { currentProjectId } = useSliceOpenedProjects();

	const [fetchImages] = useLazyFetchImagesQuery();
	const [fetchProjectImages] = useLazyFetchProjectImagesQuery();

	const fetchPage = (page: number) => {
		switch (origin) {
			case ORIGIN_PROJECT_DRAWER_LIBRARY_ALL:
				fetchImages({
					origin: ORIGIN_PROJECT_DRAWER_LIBRARY_ALL,
					page,
					itemsPerPage,
					searchValue,
				});
				break;

			case ORIGIN_PROJECT_DRAWER_FAVORITES_ALL:
				fetchImages({
					origin: ORIGIN_PROJECT_DRAWER_FAVORITES_ALL,
					page,
					itemsPerPage,
					searchValue,
				});
				break;

			case ORIGIN_PROJECT_DRAWER_HISTORY:
				fetchProjectImages({
					page,
					itemsPerPage,
					searchValue,
					projectId: currentProjectId,
				});
				break;

			default:
				break;
		}
	};

	const gridItem = (item: ImageItem) => {
		return <GridItemImage item={item} itemHeight={DRAWER_GRID_ITEM_HEIGHT} />;
	};

	const gridItemPlaceholder = () => {
		return (
			// TODO_NEXT create reusable Component for the drawers
			<Skeleton
				variant="rectangular"
				height={DRAWER_GRID_ITEM_HEIGHT}
				// TODO_NEXT the border is multiplied by the app theme,
				// which is why there is a gap between the placeholders chunks
				// Fix it!
				sx={{ border: '1px solid transparent', borderRadius: '8px' }}
			/>
		);
	};

	/**
	 * Container for the items that one page of pagination contains
	 */
	const pageItemsContainer = (pageItems: ImageItem[] | undefined) => {
		return (
			<MuiStandardGrid
				pageItems={pageItems}
				itemsPerPage={itemsPerPage}
				gridItemXs={DRAWER_GRID_ITEM_XS}
				gridItemPlaceholder={gridItemPlaceholder}
				gridItem={gridItem}
				gridContainerSpacing={DRAWER_GRID_SPACING}
			/>
		);
	};

	return (
		<Box sx={{ height: '100%' }}>
			<InfinityScrollContainer
				fetchPage={fetchPage}
				fetchedPages={fetchedPages}
				pagesTotal={pagesTotal}
				// Must be aligned with the container "items' height" and "itemsPerPage"
				pageItemsContainerHeight={DRAWER_PAGE_ITEMS_CONTAINER_HEIGHT} // 'px'
				pageItemsContainer={pageItemsContainer}
			/>
		</Box>
	);
};

export default DrawerImagesGrid;
