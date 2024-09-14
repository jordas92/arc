/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Skeleton, useTheme } from '@mui/material';

import { useLazyFetchDiscoverQuery } from 'store/apis/apiDiscover';
import { DiscoverImageItem } from 'store/types/typesDiscover';

import {
	APP_HEADER_HEIGHT,
	PAGE_GRID_DISCOVER_COLUMNS,
	PAGE_GRID_DISCOVER_GAP,
	PAGE_GRID_DISCOVER_COLUMN_HEIGHT_NO_GAP,
	PAGE_GRID_DISCOVER_ITEMS_CONTAINER_HEIGHT,
} from 'constants/default';
import { gridMasonryItemHeight } from 'utils/gridItemsUtils';
import InfinityScrollContainer from 'components/InfinityScrollContainer/InfinityScrollContainer';
import MuiMasonryGrid from 'components/InfinityScrollContainer/GridItemsContainerPerPage/MuiMasonryGrid';
import GridItemDiscover from 'components/GridItem/GridItemDiscover';

type Props = {
	itemsPerPage: number;
	fetchedPages: {
		[page: number]: DiscoverImageItem[];
	};
	pagesTotal: number;
	items: DiscoverImageItem[];
	searchValue: string;
};

const DiscoverGrid: React.FC<Props> = ({
	itemsPerPage,
	fetchedPages,
	pagesTotal,
	items,
	searchValue,
}) => {
	const theme = useTheme();
	const [fetchDiscover] = useLazyFetchDiscoverQuery();

	const fetchPage = (page: number) => {
		fetchDiscover({
			page,
			itemsPerPage,
			searchValue,
		});
	};

	const gridItem = (item: DiscoverImageItem | null, index: number) => {
		if (item) {
			return (
				<GridItemDiscover
					item={item}
					items={items}
					itemHeight={gridMasonryItemHeight(
						index,
						PAGE_GRID_DISCOVER_COLUMN_HEIGHT_NO_GAP,
					)}
				/>
			);
		}

		// Placeholder for a missing mosaic grid item
		return (
			<Skeleton
				variant="rectangular"
				height={gridMasonryItemHeight(index, PAGE_GRID_DISCOVER_COLUMN_HEIGHT_NO_GAP)}
				animation={false}
				sx={{
					borderRadius: '8px',
					backgroundColor: theme.palette.background.surfaceLowest,
				}}
			/>
		);
	};

	const gridItemPlaceholder = (index: number) => {
		return (
			<Skeleton
				variant="rectangular"
				height={gridMasonryItemHeight(index, PAGE_GRID_DISCOVER_COLUMN_HEIGHT_NO_GAP)}
				sx={{ borderRadius: '8px' }}
			/>
		);
	};

	/**
	 * Container for the items that one page of pagination contains
	 */
	const pageItemsContainer = (pageItems: DiscoverImageItem[] | undefined) => {
		return (
			<MuiMasonryGrid
				pageItems={pageItems}
				itemsPerPage={itemsPerPage}
				gridItem={gridItem}
				gridItemPlaceholder={gridItemPlaceholder}
				masonryColumns={PAGE_GRID_DISCOVER_COLUMNS}
				masonryGap={PAGE_GRID_DISCOVER_GAP}
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
				pageItemsContainerHeight={PAGE_GRID_DISCOVER_ITEMS_CONTAINER_HEIGHT} // 'px'
				pageItemsContainer={pageItemsContainer}
			/>
		</Box>
	);
};

export default DiscoverGrid;
