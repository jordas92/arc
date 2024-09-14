/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { resetImagesSlice } from 'store/storeSlices/sliceImages';
import { useLazyFetchProjectImagesQuery } from 'store/apis/apiProjects';
import { useLazyFetchImagesQuery } from 'store/apis/apiImages';
import { previewModalOriginKeys } from 'store/common/keys';

import { DRAWER_GRID_ITEMS_PER_PAGE } from 'constants/default';
import Search from 'components/Common/Search';

type Props = {
	origin: keyof typeof previewModalOriginKeys;
	searchPlaceHolder?: string;
	handleSearchParamQuery: Function;
};

const {
	ORIGIN_PROJECT_DRAWER_LIBRARY_ALL,
	ORIGIN_PROJECT_DRAWER_LIBRARY_DISCORD,
	ORIGIN_PROJECT_DRAWER_HISTORY,
	ORIGIN_PROJECT_DRAWER_FAVORITES_ALL,
	ORIGIN_PROJECT_DRAWER_FAVORITES_BY_PROJECT,
} = previewModalOriginKeys;

const DrawerSearch: React.FC<Props> = ({
	origin,
	searchPlaceHolder = '',
	handleSearchParamQuery,
}) => {
	const dispatch = useStoreDispatch();
	const { currentProjectId } = useSliceOpenedProjects();

	const [fetchImages, { isFetching: isFetchingImages }] = useLazyFetchImagesQuery();

	const [fetchProjectImages, { isFetching: isFetchingProjectImages }] =
		useLazyFetchProjectImagesQuery();

	const isFetching = isFetchingImages || isFetchingProjectImages;

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

			case ORIGIN_PROJECT_DRAWER_LIBRARY_DISCORD:
				dispatch(resetImagesSlice());
				fetchImages({
					origin: ORIGIN_PROJECT_DRAWER_LIBRARY_DISCORD,
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

			case ORIGIN_PROJECT_DRAWER_FAVORITES_BY_PROJECT:
				fetchImages({
					origin: ORIGIN_PROJECT_DRAWER_FAVORITES_BY_PROJECT,
					page: 1,
					itemsPerPage: DRAWER_GRID_ITEMS_PER_PAGE,
					searchValue,
					projectId: currentProjectId,
				});
				handleSearchParamQuery(searchValue);
				break;

			case ORIGIN_PROJECT_DRAWER_HISTORY:
				fetchProjectImages({
					page: 1,
					itemsPerPage: DRAWER_GRID_ITEMS_PER_PAGE,
					searchValue,
					projectId: currentProjectId,
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
		/>
	);
};

export default DrawerSearch;
