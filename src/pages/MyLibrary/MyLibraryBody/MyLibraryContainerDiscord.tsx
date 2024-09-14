/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState, useEffect } from 'react';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceUser from 'store/hooks/useSliceUser';
import useSliceImages from 'store/hooks/useSliceImages';
import { useFetchImagesQuery } from 'store/apis/apiImages';
import { setIsOverlayLoaderOn } from 'store/storeSlices/sliceApp';
import { previewModalOriginKeys } from 'store/common/keys';

import { PAGE_GRID_MY_LIBRARY_ITEMS_PER_PAGE } from 'constants/default';
import strings from 'constants/strings';
import DiscordLinkage from 'components/Sidebars/DrawerImages/DrawerBodyLibrary/DiscordLinkage';
import NoImagesMessage from 'components/Common/NoImagesMessage';
import MyLibraryHeader from '../MyLibraryHeader/MyLibraryHeader';
import MyLibraryGrid from './MyLibraryGrid';

const { noDiscordImages } = strings;
const { ORIGIN_HOMEPAGE_TAB_LIBRARY_DISCORD } = previewModalOriginKeys;

const MyLibraryContainerDiscord: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { discordId } = useSliceUser();
	const { discordImages } = useSliceImages();
	const { fetchedPages, pagesTotal, items } = discordImages;

	const [searchValue, setSearchValue] = useState<string>('');
	const { isFetching, isSuccess, data } = useFetchImagesQuery({
		origin: ORIGIN_HOMEPAGE_TAB_LIBRARY_DISCORD,
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
		if (isFetching) {
			return <MyLibraryHeader />;
		}

		if (discordId) {
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
								origin={ORIGIN_HOMEPAGE_TAB_LIBRARY_DISCORD}
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
						<NoImagesMessage message={noDiscordImages} />
					</>
				);
			}

			return <MyLibraryHeader />;
		}

		// The user account is not linked to Discord
		return (
			<>
				<MyLibraryHeader />
				<DiscordLinkage />
			</>
		);
	};

	return <>{conditionalContent()}</>;
};

export default MyLibraryContainerDiscord;
