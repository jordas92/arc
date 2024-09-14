/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Skeleton } from '@mui/material';

import { useLazyFetchImagesQuery } from 'store/apis/apiImages';
import { ImageItem } from 'store/types/typesImages';
import { previewModalOriginKeys } from 'store/common/keys';

import {
	APP_HEADER_HEIGHT,
	PAGE_GRID_MY_LIBRARY_ITEM_HEIGHT,
	PAGE_GRID_MY_LIBRARY_ITEM_XS,
	PAGE_GRID_MY_LIBRARY_SPACING,
	PAGE_GRID_MY_LIBRARY_ITEMS_CONTAINER_HEIGHT,
} from 'constants/default';
import InfinityScrollContainer from 'components/InfinityScrollContainer/InfinityScrollContainer';
import MuiStandardGrid from 'components/InfinityScrollContainer/GridItemsContainerPerPage/MuiStandardGrid';
import GridItemImage from 'components/GridItem/GridItemImage';
// import DraggableItem from 'components/Common/DND/DraggableItem';
// import CustomDraggableImage from '../../../components/Common/DND/CustomDraggableImage';
// import DraggableItem from '../../../components/Common/DND/DraggableItem';

type Props = {
	origin: keyof typeof previewModalOriginKeys;
	itemsPerPage: number;
	fetchedPages: {
		[page: number]: ImageItem[];
	};
	pagesTotal: number;
	items: ImageItem[];
	searchValue: string;
};

const {
	ORIGIN_HOMEPAGE_TAB_LIBRARY_ALL,
	ORIGIN_HOMEPAGE_TAB_LIBRARY_DISCORD,
	ORIGIN_HOMEPAGE_TAB_LIBRARY_FAVORITES,
} = previewModalOriginKeys;

const MyLibraryGrid: React.FC<Props> = ({
	origin,
	itemsPerPage,
	fetchedPages,
	pagesTotal,
	items,
	searchValue,
}) => {
	const [fetchImages] = useLazyFetchImagesQuery();

	const fetchPage = (page: number) => {
		switch (origin) {
			case ORIGIN_HOMEPAGE_TAB_LIBRARY_ALL:
				fetchImages({
					origin: ORIGIN_HOMEPAGE_TAB_LIBRARY_ALL,
					page,
					itemsPerPage,
					searchValue,
				});
				break;

			case ORIGIN_HOMEPAGE_TAB_LIBRARY_DISCORD:
				fetchImages({
					origin: ORIGIN_HOMEPAGE_TAB_LIBRARY_DISCORD,
					page,
					itemsPerPage,
					searchValue,
				});
				break;

			case ORIGIN_HOMEPAGE_TAB_LIBRARY_FAVORITES:
				fetchImages({
					origin: ORIGIN_HOMEPAGE_TAB_LIBRARY_FAVORITES,
					page,
					itemsPerPage,
					searchValue,
				});
				break;

			default:
				break;
		}
	};

	// const gridItem = (item: ImageItem) => {
	// 	return (
	// 		<DraggableItem
	// 			item={item}
	// 			dragStyle={{
	// 				boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.5)',
	// 				border: '2px solid #DE04A4',
	// 			}}
	// 		>
	// 			<GridItemImage
	// 				item={item}
	// 				items={items}
	// 				itemHeight={PAGE_GRID_MY_LIBRARY_ITEM_HEIGHT}
	// 				origin={origin}
	// 			/>
	// 		</DraggableItem>
	// 	);
	// };

	const gridItem = (item: ImageItem) => {
		return (
			<GridItemImage
				item={item}
				items={items}
				itemHeight={PAGE_GRID_MY_LIBRARY_ITEM_HEIGHT}
				origin={origin}
			/>
		);
	};

	const gridItemPlaceholder = (index: number) => {
		return <Skeleton variant="rectangular" height={PAGE_GRID_MY_LIBRARY_ITEM_HEIGHT + 2} />;
	};

	/**
	 * Container for the items that one page of pagination contains
	 */
	const pageItemsContainer = (pageItems: ImageItem[] | undefined) => {
		// TODO_NEXT When the pageItemsContainerHeight value is provided dynamically
		// handle the responsiveness by dynamically gridItemXs value
		return (
			<MuiStandardGrid
				pageItems={pageItems}
				itemsPerPage={itemsPerPage}
				gridItemXs={PAGE_GRID_MY_LIBRARY_ITEM_XS}
				gridContainerSpacing={PAGE_GRID_MY_LIBRARY_SPACING}
				gridItem={gridItem}
				gridItemPlaceholder={gridItemPlaceholder}
			/>
		);
	};

	return (
		<Box
			sx={{
				height: `calc(100vh - ${APP_HEADER_HEIGHT})`, // TODO_NEXT (vertical page scroll)
			}}
		>
			<InfinityScrollContainer
				fetchPage={fetchPage}
				fetchedPages={fetchedPages}
				pagesTotal={pagesTotal}
				// Must be aligned with the container "items' height" and "itemsPerPage"
				// TODO_NEXT to be responsive the screen resolution needs to have listened and
				// the value of pageItemsContainerHeight has to be provided dynamically
				pageItemsContainerHeight={PAGE_GRID_MY_LIBRARY_ITEMS_CONTAINER_HEIGHT} // 'px'
				pageItemsContainer={pageItemsContainer}
			/>
		</Box>
	);
};

export default MyLibraryGrid;
