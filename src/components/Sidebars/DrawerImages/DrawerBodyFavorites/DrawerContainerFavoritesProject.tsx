/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState } from 'react';

import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import useSliceImages from 'store/hooks/useSliceImages';
import { useFetchImagesQuery } from 'store/apis/apiImages';
import { previewModalOriginKeys } from 'store/common/keys';

import { DRAWER_GRID_ITEMS_PER_PAGE } from 'constants/default';
import strings from 'constants/strings';
import Spinner from 'components/Common/Spinner';
import NoImagesMessage from 'components/Common/NoImagesMessage';
import DrawerSearch from '../DrawerSearch';
import DrawerImagesGrid from '../DrawerImagesGrid';

const { noImages } = strings;
const { ORIGIN_PROJECT_DRAWER_FAVORITES_BY_PROJECT } = previewModalOriginKeys;

const DrawerContainerFavoritesProject: React.FC = () => {
	const { currentProjectId } = useSliceOpenedProjects();
	const { favoriteProjectImages } = useSliceImages();
	const { fetchedPages, pagesTotal, items } = favoriteProjectImages;

	const [searchValue, setSearchValue] = useState<string>('');
	const { isLoading, isSuccess, data } = useFetchImagesQuery({
		origin: ORIGIN_PROJECT_DRAWER_FAVORITES_BY_PROJECT,
		page: 1,
		itemsPerPage: DRAWER_GRID_ITEMS_PER_PAGE,
		searchValue: '',
		projectId: currentProjectId,
	});

	const handleSearchParamQuery = (value: string) => {
		return setSearchValue(value);
	};

	const conditionalContent = () => {
		if (isLoading) {
			return <Spinner />;
		}

		if (isSuccess) {
			if (data.items.length > 0) {
				const searchPlaceHolder = `Search ${data.itemsTotal} images`;

				return (
					<>
						<DrawerSearch
							origin={ORIGIN_PROJECT_DRAWER_FAVORITES_BY_PROJECT}
							searchPlaceHolder={searchPlaceHolder}
							handleSearchParamQuery={handleSearchParamQuery}
						/>
						<DrawerImagesGrid
							origin={ORIGIN_PROJECT_DRAWER_FAVORITES_BY_PROJECT}
							itemsPerPage={DRAWER_GRID_ITEMS_PER_PAGE}
							fetchedPages={fetchedPages}
							pagesTotal={pagesTotal}
							items={items}
							searchValue={searchValue}
						/>
					</>
				);
			}

			return <NoImagesMessage message={noImages} />;
		}

		return null;
	};

	return <>{conditionalContent()}</>;
};

export default DrawerContainerFavoritesProject;
