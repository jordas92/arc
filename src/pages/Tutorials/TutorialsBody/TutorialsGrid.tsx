/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Skeleton } from '@mui/material';

import { useLazyFetchTutorialsQuery } from 'store/apis/apiTutorials';
import { TutorialItem } from 'store/types/typesTutorials';

import {
	APP_HEADER_HEIGHT,
	PAGE_GRID_TUTORIALS_ITEM_HEIGHT,
	PAGE_GRID_TUTORIALS_ITEM_THUMB_HEIGHT,
	PAGE_GRID_TUTORIALS_ITEM_XS,
	PAGE_GRID_TUTORIALS_SPACING,
	PAGE_GRID_TUTORIALS_ITEMS_CONTAINER_HEIGHT,
} from 'constants/default';

import InfinityScrollContainer from 'components/InfinityScrollContainer/InfinityScrollContainer';
import MuiStandardGrid from 'components/InfinityScrollContainer/GridItemsContainerPerPage/MuiStandardGrid';
import GridItemTutorial from 'components/GridItem/GridItemTutorial';

type Props = {
	itemsPerPage: number;
	fetchedPages: {
		[page: number]: TutorialItem[];
	};
	pagesTotal: number;
	searchValue: string;
	isNsfw?: boolean;
};

const TutorialsGrid: React.FC<Props> = ({
	itemsPerPage,
	fetchedPages,
	pagesTotal,
	searchValue,
	isNsfw,
}) => {
	const [fetchTutorials] = useLazyFetchTutorialsQuery();

	const fetchPage = (page: number) => {
		fetchTutorials({
			page,
			itemsPerPage,
			searchValue,
			isNsfw,
		});
	};

	const gridItem = (item: TutorialItem) => {
		return (
			<GridItemTutorial
				item={item}
				itemHeight={PAGE_GRID_TUTORIALS_ITEM_HEIGHT}
				itemThumbHeight={PAGE_GRID_TUTORIALS_ITEM_THUMB_HEIGHT}
			/>
		);
	};

	const gridItemPlaceholder = () => {
		return <Skeleton variant="rectangular" height={PAGE_GRID_TUTORIALS_ITEM_HEIGHT + 2} />;
	};

	/**
	 * Container for the items that one page of pagination contains
	 */
	const pageItemsContainer = (pageItems: TutorialItem[] | undefined) => {
		// TODO_NEXT When the pageItemsContainerHeight value is provided dynamically
		// handle the responsiveness by dynamically gridItemXs value
		return (
			<MuiStandardGrid
				pageItems={pageItems}
				itemsPerPage={itemsPerPage}
				gridItemXs={PAGE_GRID_TUTORIALS_ITEM_XS}
				gridContainerSpacing={PAGE_GRID_TUTORIALS_SPACING}
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
				pageItemsContainerHeight={PAGE_GRID_TUTORIALS_ITEMS_CONTAINER_HEIGHT} // 'px'
				pageItemsContainer={pageItemsContainer}
			/>
		</Box>
	);
};

export default TutorialsGrid;
