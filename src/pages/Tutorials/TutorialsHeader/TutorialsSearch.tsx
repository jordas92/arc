/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { resetTutorialsSlice } from 'store/storeSlices/sliceTutorials';
import { useLazyFetchTutorialsQuery } from 'store/apis/apiTutorials';

import { PAGE_GRID_TUTORIALS_ITEMS_PER_PAGE } from 'constants/default';
import Search from 'components/Common/Search';

type Props = {
	searchPlaceHolder?: string;
	handleSearchParamQuery: Function;
	isNsfw: boolean;
	initialValue?: string;
};

const TutorialsSearch: React.FC<Props> = ({
	searchPlaceHolder = '',
	handleSearchParamQuery,
	isNsfw,
	initialValue = '',
}) => {
	const dispatch = useStoreDispatch();
	const [fetchTutorials, { isFetching }] = useLazyFetchTutorialsQuery();

	const handleSearchValue = (searchValue: string) => {
		dispatch(resetTutorialsSlice());
		fetchTutorials({
			page: 1,
			itemsPerPage: PAGE_GRID_TUTORIALS_ITEMS_PER_PAGE,
			searchValue,
			isNsfw,
		});
		handleSearchParamQuery(searchValue);
	};

	return (
		<Search
			placeholder={searchPlaceHolder}
			handleSearchValue={handleSearchValue}
			isFetching={isFetching}
			conatinerBorderRadius={24}
			initialValue={initialValue}
		/>
	);
};

export default TutorialsSearch;
