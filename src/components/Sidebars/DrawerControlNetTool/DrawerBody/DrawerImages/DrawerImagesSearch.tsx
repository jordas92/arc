/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { resetImagesSlice } from 'store/storeSlices/sliceImages';
import { useLazyFetchImagesQuery } from 'store/apis/apiImages';
import { previewModalOriginKeys } from 'store/common/keys';

import { DRAWER_GRID_ITEMS_PER_PAGE } from 'constants/default';
import Search from 'components/Common/Search';

type Props = {
	origin: keyof typeof previewModalOriginKeys;
	searchPlaceHolder?: string;
	handleSearchParamQuery: Function;
};

const { ORIGIN_PROJECT_DRAWER_LIBRARY_ALL, ORIGIN_PROJECT_DRAWER_FAVORITES_ALL } =
	previewModalOriginKeys;

const DrawerImagesSearch: React.FC<Props> = ({
	origin,
	searchPlaceHolder = '',
	handleSearchParamQuery,
}) => {
	const dispatch = useStoreDispatch();

	const [fetchImages, { isFetching: isFetchingImages }] = useLazyFetchImagesQuery();

	const handleSearchValue = (searchValue: string) => {
		switch (origin) {
			case ORIGIN_PROJECT_DRAWER_LIBRARY_ALL:
				dispatch(resetImagesSlice());
				fetchImages({
					origin: ORIGIN_PROJECT_DRAWER_LIBRARY_ALL,
					page: 1,
					itemsPerPage: DRAWER_GRID_ITEMS_PER_PAGE,
					searchValue,
				});
				handleSearchParamQuery(searchValue);
				break;

			case ORIGIN_PROJECT_DRAWER_FAVORITES_ALL:
				dispatch(resetImagesSlice());
				fetchImages({
					origin: ORIGIN_PROJECT_DRAWER_FAVORITES_ALL,
					page: 1,
					itemsPerPage: DRAWER_GRID_ITEMS_PER_PAGE,
					searchValue,
				});
				handleSearchParamQuery(searchValue);
				break;

			default:
				break;
		}
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Search
				placeholder={searchPlaceHolder}
				handleSearchValue={handleSearchValue}
				isFetching={isFetchingImages}
				minHeight="32px"
				padding="2px 2px 2px 4px"
			/>
		</Box>
	);
};

export default DrawerImagesSearch;
