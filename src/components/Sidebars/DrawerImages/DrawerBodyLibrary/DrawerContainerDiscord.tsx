/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState } from 'react';

import useSliceUser from 'store/hooks/useSliceUser';
import useSliceImages from 'store/hooks/useSliceImages';
import { useFetchImagesQuery } from 'store/apis/apiImages';
import { previewModalOriginKeys } from 'store/common/keys';

import { DRAWER_GRID_ITEMS_PER_PAGE } from 'constants/default';
import strings from 'constants/strings';
import Spinner from 'components/Common/Spinner';
import NoImagesMessage from 'components/Common/NoImagesMessage';
import DrawerSearch from '../DrawerSearch';
import DrawerImagesGrid from '../DrawerImagesGrid';
import DiscordLinkage from './DiscordLinkage';

const { noDiscordImages } = strings;
const { ORIGIN_PROJECT_DRAWER_LIBRARY_DISCORD } = previewModalOriginKeys;

const DrawerContainerDiscord: React.FC = () => {
	const { discordId } = useSliceUser();
	const { discordImages } = useSliceImages();
	const { fetchedPages, pagesTotal, items } = discordImages;

	const [searchValue, setSearchValue] = useState<string>('');
	const { isLoading, isSuccess, data } = useFetchImagesQuery({
		origin: ORIGIN_PROJECT_DRAWER_LIBRARY_DISCORD,
		page: 1,
		itemsPerPage: DRAWER_GRID_ITEMS_PER_PAGE,
		searchValue: '',
	});

	const handleSearchParamQuery = (value: string) => {
		return setSearchValue(value);
	};

	const conditionalContent = () => {
		// The user account is linked to Discord
		if (discordId) {
			if (isLoading) {
				return <Spinner />;
			}

			if (isSuccess) {
				if (data.items.length > 0) {
					const searchPlaceHolder = `Search ${data.itemsTotal} images`;

					return (
						<>
							<DrawerSearch
								origin={ORIGIN_PROJECT_DRAWER_LIBRARY_DISCORD}
								searchPlaceHolder={searchPlaceHolder}
								handleSearchParamQuery={handleSearchParamQuery}
							/>
							<DrawerImagesGrid
								origin={ORIGIN_PROJECT_DRAWER_LIBRARY_DISCORD}
								itemsPerPage={DRAWER_GRID_ITEMS_PER_PAGE}
								fetchedPages={fetchedPages}
								pagesTotal={pagesTotal}
								items={items}
								searchValue={searchValue}
							/>
						</>
					);
				}

				return <NoImagesMessage message={noDiscordImages} />;
			}

			return null;
		}

		// The user account is unlinked to Discord
		return <DiscordLinkage />;
	};

	return <>{conditionalContent()}</>;
};

export default DrawerContainerDiscord;
