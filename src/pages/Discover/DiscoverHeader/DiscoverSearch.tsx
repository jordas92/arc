/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { resetDiscoverSlice } from 'store/storeSlices/sliceDiscover';
import { useLazyFetchDiscoverQuery } from 'store/apis/apiDiscover';

import { PAGE_GRID_DISCOVER_ITEMS_PER_PAGE } from 'constants/default';
import Search from 'components/Common/Search';

type Props = {
	searchPlaceHolder?: string;
	handleSearchParamQuery: Function;
};

const DiscoverSearch: React.FC<Props> = ({ searchPlaceHolder = '', handleSearchParamQuery }) => {
	const dispatch = useStoreDispatch();
	const [fetchDiscover, { isFetching }] = useLazyFetchDiscoverQuery();

	const handleSearchValue = (searchValue: string) => {
		dispatch(resetDiscoverSlice());
		fetchDiscover({
			page: 1,
			itemsPerPage: PAGE_GRID_DISCOVER_ITEMS_PER_PAGE,
			searchValue,
		});
		handleSearchParamQuery(searchValue);
	};

	return (
		<Search
			placeholder={searchPlaceHolder}
			handleSearchValue={handleSearchValue}
			isFetching={isFetching}
			conatinerBorderRadius={24}
		/>
	);
};

export default DiscoverSearch;
