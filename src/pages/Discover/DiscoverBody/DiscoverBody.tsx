/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState, useEffect } from 'react';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceDiscover from 'store/hooks/useSliceDiscover';
import { setIsOverlayLoaderOn } from 'store/storeSlices/sliceApp';
import { useFetchDiscoverQuery } from 'store/apis/apiDiscover';

import { PAGE_GRID_DISCOVER_ITEMS_PER_PAGE } from 'constants/default';
import strings from 'constants/strings';
import NoImagesMessage from 'components/Common/NoImagesMessage';
import DiscoverHeader from '../DiscoverHeader/DiscoverHeader';
import DiscoverGrid from './DiscoverGrid';

const { noImages } = strings;

const Discover: React.FC = () => {
	const dispatch = useStoreDispatch();

	const { fetchedPages, pagesTotal, items } = useSliceDiscover();

	const [searchValue, setSearchValue] = useState<string>('');
	const { isFetching, isSuccess, data } = useFetchDiscoverQuery({
		page: 1,
		itemsPerPage: PAGE_GRID_DISCOVER_ITEMS_PER_PAGE,
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
						<DiscoverHeader
							searchPlaceHolder={searchPlaceHolder}
							handleSearchParamQuery={handleSearchParamQuery}
						/>
						<DiscoverGrid
							itemsPerPage={PAGE_GRID_DISCOVER_ITEMS_PER_PAGE}
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
					<DiscoverHeader />
					<NoImagesMessage message={noImages} />
				</>
			);
		}

		return <DiscoverHeader />;
	};

	return <>{conditionalContent()}</>;
};

export default Discover;
