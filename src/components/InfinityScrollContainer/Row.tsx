/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import Box from '@mui/material/Box';

// NOTE: All ***page***s within the names are related to the "Page of the Pagination"

type Props = {
	index: number;
	style: Object;
	fetchedPages: {
		[page: number]: Object[];
	};
	pageItemsContainer: Function;
};

const Row: React.FC<Props> = ({ index, style, fetchedPages, pageItemsContainer }) => {
	// react-window items(rows) indexes are zero-based, pages start from 1
	const rowIndex = index + 1;

	return <Box sx={style}>{pageItemsContainer(fetchedPages[rowIndex])}</Box>;
};

export default Row;
