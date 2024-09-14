/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

import useSliceImages from 'store/hooks/useSliceImages';
import { useFetchImagesQuery } from 'store/apis/apiImages';
import { previewModalOriginKeys } from 'store/common/keys';

import { DRAWER_GRID_ITEMS_PER_PAGE } from 'constants/default';
import strings from 'constants/strings';

import Spinner from 'components/Common/Spinner';
import NoImagesMessage from 'components/Common/NoImagesMessage';
import DrawerImagesGrid from './DrawerImagesGrid';
import DrawerImagesSearch from './DrawerImagesSearch';
import AllFavoriteImagesButton from './AllFavoriteImagesButton';

const StyledBox = styled(Box)({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
});

const { noImages } = strings;
const { ORIGIN_PROJECT_DRAWER_FAVORITES_ALL } = previewModalOriginKeys;

const DrawerImagesFavorites: React.FC = () => {
	const { favoriteAllImages } = useSliceImages();
	const { fetchedPages, pagesTotal } = favoriteAllImages;

	const [searchValue, setSearchValue] = useState<string>('');
	const [searchPlaceHolder, setSearchPlaceholder] = useState<string>('Search 0 images');

	const {
		isLoading,
		isSuccess,
		data: dataAllFavoriteImages,
	} = useFetchImagesQuery({
		origin: ORIGIN_PROJECT_DRAWER_FAVORITES_ALL,
		page: 1,
		itemsPerPage: DRAWER_GRID_ITEMS_PER_PAGE,
		searchValue: '',
	});

	useEffect(() => {
		if (dataAllFavoriteImages && dataAllFavoriteImages.items.length > 0) {
			setSearchPlaceholder(`Search ${dataAllFavoriteImages.itemsTotal} images`);
		}
	}, [dataAllFavoriteImages]);

	const handleSearchParamQuery = (value: string) => {
		return setSearchValue(value);
	};

	const handleOnFavoritesBtnClick = () => {};

	const conditionalContent = () => {
		if (isLoading) {
			return <Spinner />;
		}

		if (isSuccess) {
			if (dataAllFavoriteImages && dataAllFavoriteImages.items.length > 0) {
				return (
					<DrawerImagesGrid
						origin={ORIGIN_PROJECT_DRAWER_FAVORITES_ALL}
						itemsPerPage={DRAWER_GRID_ITEMS_PER_PAGE}
						fetchedPages={fetchedPages}
						pagesTotal={pagesTotal}
						searchValue={searchValue}
					/>
				);
			}

			return <NoImagesMessage message={noImages} />;
		}

		return null;
	};

	return (
		<>
			<StyledBox>
				<DrawerImagesSearch
					origin={ORIGIN_PROJECT_DRAWER_FAVORITES_ALL}
					searchPlaceHolder={searchPlaceHolder}
					handleSearchParamQuery={handleSearchParamQuery}
				/>
				<AllFavoriteImagesButton isActive handleOnClick={handleOnFavoritesBtnClick} />
			</StyledBox>
			{conditionalContent()}
		</>
	);
};

export default DrawerImagesFavorites;
