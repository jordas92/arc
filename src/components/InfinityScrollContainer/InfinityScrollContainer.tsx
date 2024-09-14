/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';

import './style.css';

import Row from './Row';

// TIP: https://react-window.vercel.app/#/examples/list/fixed-size

// NOTE: All ***page***s within the names are related to the "Page of the Pagination"

type Props = {
	fetchPage: Function;
	fetchedPages: {
		[page: number]: Object[];
	};
	pagesTotal: number;
	pageItemsContainerHeight: number;
	pageItemsContainer: Function;
};

const InfinityScrollContainer: React.FC<Props> = ({
	fetchPage,
	fetchedPages,
	pagesTotal,
	pageItemsContainerHeight,
	pageItemsContainer,
}) => {
	/**
	 * Runs against ALL items (Rows) on scroll!
	 * If returns false => loadMorePages will be triggered
	 * Returns always false, because the validation for the page is it already fetched is delegated to RTQ Query
	 * @param index number (react-window items(rows) indexes are zero-based, pages start from 1)
	 * @returns boolean
	 */
	const isPageItemsStored = () => {
		return false;
	};

	/**
	 * 'react-window-infinite-loader' decides on the chunk size based on the provided List Component props
	 * props: itemCount={pagesTotal} and height={height}
	 * The chunk size range is determined by the 'startIndex' and  'stopIndex'
	 * @param startIndex number
	 * @param stopIndex number
	 */
	const loadMorePages = (startIndex: number, stopIndex: number) => {
		// react-window items(rows) indexes are zero-based, pages start from 1
		for (let index = startIndex + 1; index <= stopIndex + 1; index++) {
			// A request will be triggered only if the page missing in the stored pages within the Store slice
			if (!fetchedPages[index]) {
				fetchPage(index);
			}
		}
	};

	return (
		<AutoSizer>
			{({ height, width }) => (
				<InfiniteLoader
					isItemLoaded={isPageItemsStored}
					loadMoreItems={loadMorePages}
					itemCount={pagesTotal}
					// The values have been chosen based on testing and experience
					// If you changing them, please consider aligning the 'offset' value
					// within the 'removeItemsFromObjectByKeyOffset' util function
					threshold={4}
					minimumBatchSize={4}
				>
					{({ onItemsRendered, ref }) => (
						<List
							className="hide-vertical-scroll-bar"
							itemCount={pagesTotal}
							itemSize={pageItemsContainerHeight}
							width={width}
							height={height}
							ref={ref}
							onItemsRendered={onItemsRendered}
						>
							{/* Docs recommendation is that the style object must be provided to the Row items */}
							{(props: { index: number; style: Object }) =>
								Row({
									...props,
									fetchedPages,
									pageItemsContainer,
								})
							}
						</List>
					)}
				</InfiniteLoader>
			)}
		</AutoSizer>
	);
};

export default InfinityScrollContainer;
