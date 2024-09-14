/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceApp from 'store/hooks/useSliceApp';
import { resetImagesSlice } from 'store/storeSlices/sliceImages';
import { useLazyFetchImagesQuery } from 'store/apis/apiImages';
import { myLibraryPageKeys } from 'store/common/keys';

import { PAGE_GRID_MY_LIBRARY_ITEMS_PER_PAGE } from 'constants/default';
import Search from 'components/Common/Search';

type Props = {
	searchPlaceHolder?: string;
	handleSearchParamQuery: Function;
};

// TODO_NEXT Rename keys and object
const { ALL_IMAGES, FAVORITES, DISCORD } = myLibraryPageKeys;

const MyLibrarySearch: React.FC<Props> = ({ searchPlaceHolder = '', handleSearchParamQuery }) => {
	const dispatch = useStoreDispatch();
	const { libraryPageSubNav } = useSliceApp();

	const [fetchImages, { isFetching }] = useLazyFetchImagesQuery();

	const handleSearchValue = (searchValue: string) => {
		switch (libraryPageSubNav) {
			case ALL_IMAGES:
				dispatch(resetImagesSlice());
				fetchImages({
					origin: ALL_IMAGES,
					page: 1,
					itemsPerPage: PAGE_GRID_MY_LIBRARY_ITEMS_PER_PAGE,
					searchValue,
				});
				handleSearchParamQuery(searchValue);
				break;

			case FAVORITES:
				dispatch(resetImagesSlice());
				fetchImages({
					origin: FAVORITES,
					page: 1,
					itemsPerPage: PAGE_GRID_MY_LIBRARY_ITEMS_PER_PAGE,
					searchValue,
				});
				handleSearchParamQuery(searchValue);
				break;

			case DISCORD:
				dispatch(resetImagesSlice());
				fetchImages({
					origin: DISCORD,
					page: 1,
					itemsPerPage: PAGE_GRID_MY_LIBRARY_ITEMS_PER_PAGE,
					searchValue,
				});
				handleSearchParamQuery(searchValue);
				break;

			default:
				break;
		}
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

export default MyLibrarySearch;
