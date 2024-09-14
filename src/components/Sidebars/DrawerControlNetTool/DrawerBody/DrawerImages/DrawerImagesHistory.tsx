/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';

import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import useSliceProjectImages from 'store/hooks/useSliceProjectImages';
import { useFetchProjectImagesQuery } from 'store/apis/apiProjects';
import { previewModalOriginKeys } from 'store/common/keys';

import { DRAWER_GRID_ITEMS_PER_PAGE } from 'constants/default';
import strings from 'constants/strings';

import Spinner from 'components/Common/Spinner';
import NoImagesMessage from 'components/Common/NoImagesMessage';
import DrawerImagesGrid from './DrawerImagesGrid';

const { noImages } = strings;
const { ORIGIN_PROJECT_DRAWER_HISTORY } = previewModalOriginKeys;

const DrawerImagesHistory: React.FC = () => {
	const { currentProjectId } = useSliceOpenedProjects();
	const { fetchedPages, pagesTotal } = useSliceProjectImages();

	const { isFetching, isSuccess, data } = useFetchProjectImagesQuery({
		projectId: currentProjectId,
		page: 1,
		itemsPerPage: DRAWER_GRID_ITEMS_PER_PAGE,
		searchValue: '',
	});

	const conditionalContent = () => {
		if (isFetching) {
			return <Spinner />;
		}

		if (isSuccess) {
			if (data.items.length > 0) {
				return (
					<DrawerImagesGrid
						origin={ORIGIN_PROJECT_DRAWER_HISTORY}
						itemsPerPage={DRAWER_GRID_ITEMS_PER_PAGE}
						fetchedPages={fetchedPages}
						pagesTotal={pagesTotal}
						searchValue=""
					/>
				);
			}

			return <NoImagesMessage message={noImages} />;
		}

		return null;
	};

	return <>{conditionalContent()}</>;
};

export default DrawerImagesHistory;
