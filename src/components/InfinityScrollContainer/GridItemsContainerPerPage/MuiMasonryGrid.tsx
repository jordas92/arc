/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box } from '@mui/material';

import { masonryItemOrder } from 'utils/gridItemsUtils';

// NOTE: All ***page***s within the names are related to the "Page of the Pagination"

type Props = {
	pageItems: Object[] | undefined;
	itemsPerPage: number;
	gridItem: Function;
	gridItemPlaceholder: Function;
	masonryColumns: number;
	masonryGap: number;
};

const MuiMasonryGrid: React.FC<Props> = ({
	pageItems,
	itemsPerPage,
	gridItem,
	gridItemPlaceholder,
	masonryColumns,
	masonryGap,
}) => {
	const columnWidth = `${95 / masonryColumns}%`;

	const handlePageItems = () => {
		if (pageItems && pageItems.length > 0) {
			// Adding placeholders for the missing mosaic grid items
			return [...Array(itemsPerPage)].map((_, index) => {
				if (pageItems && pageItems[index]) {
					return pageItems[index];
				}

				return null;
			});
		}

		return [];
	};

	const items = handlePageItems();

	const conditionalGridContent = () => {
		if (items) {
			// Displays page items
			return (
				<>
					{items.map((item, index) => (
						<Box
							key={index}
							sx={{ width: columnWidth, order: masonryItemOrder(index) }}
						>
							{gridItem(item, index)}
						</Box>
					))}
				</>
			);
		}

		// Displays placeholder while loading for each page item
		return (
			<>
				{[...Array(itemsPerPage)].map((_, index) => (
					<Box key={index} sx={{ width: columnWidth, order: masonryItemOrder(index) }}>
						{gridItemPlaceholder(index)}
					</Box>
				))}
			</>
		);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexFlow: 'column wrap',
				alignContent: 'flex-start',
				height: '100%',
				gap: masonryGap,
			}}
		>
			{conditionalGridContent()}
		</Box>
	);
};

export default MuiMasonryGrid;
