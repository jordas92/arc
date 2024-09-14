/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState, useEffect } from 'react';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceImages from 'store/hooks/useSliceImages';
import { useFetchImagesQuery } from 'store/apis/apiImages';
import { setIsOverlayLoaderOn } from 'store/storeSlices/sliceApp';
import { previewModalOriginKeys } from 'store/common/keys';

import { PAGE_GRID_MY_LIBRARY_ITEMS_PER_PAGE } from 'constants/default';
import strings from 'constants/strings';
import NoImagesMessage from 'components/Common/NoImagesMessage';
import MyLibraryHeader from '../MyLibraryHeader/MyLibraryHeader';
import MyLibraryGrid from './MyLibraryGrid';

const { noImages } = strings;
const { ORIGIN_HOMEPAGE_TAB_LIBRARY_FAVORITES } = previewModalOriginKeys;

const MyLibraryContainerFavorites: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { favoriteAllImages } = useSliceImages();
	const { fetchedPages, pagesTotal, items } = favoriteAllImages;

	const [searchValue, setSearchValue] = useState<string>('');
	const { isFetching, isSuccess, data } = useFetchImagesQuery({
		origin: ORIGIN_HOMEPAGE_TAB_LIBRARY_FAVORITES,
		page: 1,
		itemsPerPage: PAGE_GRID_MY_LIBRARY_ITEMS_PER_PAGE,
		searchValue: '',
	});

	useEffect(() => {
		if (isFetching) {
			dispatch(setIsOverlayLoaderOn(true));
		} else {
			dispatch(setIsOverlayLoaderOn(false));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFetching]);

	const handleSearchParamQuery = (value: string) => {
		return setSearchValue(value);
	};

	const conditionalContent = () => {
		if (isSuccess) {
			if (data.items.length > 0) {
				const searchPlaceHolder = `Search ${data.itemsTotal} images`;

				return (
					<>
						<MyLibraryHeader
							searchPlaceHolder={searchPlaceHolder}
							handleSearchParamQuery={handleSearchParamQuery}
						/>
						<MyLibraryGrid
							origin={ORIGIN_HOMEPAGE_TAB_LIBRARY_FAVORITES}
							itemsPerPage={PAGE_GRID_MY_LIBRARY_ITEMS_PER_PAGE}
							fetchedPages={fetchedPages}
							pagesTotal={pagesTotal}
							items={items}
							searchValue={searchValue}
						/>
					</>
				);
			}

			return (
				<>
					<MyLibraryHeader />
					<NoImagesMessage message={noImages} />
				</>
			);
		}

		return <MyLibraryHeader />;
	};

	return <>{conditionalContent()}</>;
};

export default MyLibraryContainerFavorites;
