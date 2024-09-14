/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Grid } from '@mui/material';

// NOTE: All ***page***s within the names are related to the "Page of the Pagination"

type Props = {
	pageItems: Object[] | undefined;
	itemsPerPage: number;
	gridItemXs: number;
	gridContainerSpacing: number;
	gridItem: Function;
	gridItemPlaceholder: Function;
};

const MuiStandardGrid: React.FC<Props> = ({
	pageItems,
	itemsPerPage,
	gridItemXs,
	gridContainerSpacing,
	gridItem,
	gridItemPlaceholder,
}) => {
	const conditionalGridContent = () => {
		if (pageItems) {
			// Displays page items
			return (
				<>
					{pageItems.map((item, index) => (
						<Grid item xs={gridItemXs} key={index}>
							{gridItem(item, index)}
						</Grid>
					))}
				</>
			);
		}

		// Displays placeholder for each page item
		return (
			<>
				{[...Array(itemsPerPage)].map((_, index) => (
					<Grid item xs={gridItemXs} key={index}>
						{gridItemPlaceholder(index)}
					</Grid>
				))}
			</>
		);
	};

	return (
		<Grid container spacing={gridContainerSpacing}>
			{conditionalGridContent()}
		</Grid>
	);
};

export default MuiStandardGrid;
