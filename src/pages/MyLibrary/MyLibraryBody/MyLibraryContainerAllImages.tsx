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
import HeaderMyLibrary from '../MyLibraryHeader/MyLibraryHeader';
import MyLibraryGrid from './MyLibraryGrid';

const { noImages } = strings;
const { ORIGIN_HOMEPAGE_TAB_LIBRARY_ALL } = previewModalOriginKeys;

const MyLibraryContainerAllImages: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { allImages } = useSliceImages();
	const { fetchedPages, pagesTotal, items } = allImages;

	const [searchValue, setSearchValue] = useState<string>('');
	const { isFetching, isSuccess, data } = useFetchImagesQuery({
		origin: ORIGIN_HOMEPAGE_TAB_LIBRARY_ALL,
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
		setSearchValue(value);
	};

	const conditionalContent = () => {
		if (isSuccess) {
			if (data.items.length > 0) {
				const searchPlaceHolder = `Search ${data.itemsTotal} images`;

				return (
					<>
						<HeaderMyLibrary
							searchPlaceHolder={searchPlaceHolder}
							handleSearchParamQuery={handleSearchParamQuery}
						/>
						<MyLibraryGrid
							origin={ORIGIN_HOMEPAGE_TAB_LIBRARY_ALL}
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
					<HeaderMyLibrary />
					<NoImagesMessage message={noImages} />
				</>
			);
		}

		return <HeaderMyLibrary />;
	};

	return <>{conditionalContent()}</>;
};

export default MyLibraryContainerAllImages;
