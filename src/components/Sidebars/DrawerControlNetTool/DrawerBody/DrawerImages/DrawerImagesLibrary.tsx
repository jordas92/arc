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
const { ORIGIN_PROJECT_DRAWER_LIBRARY_ALL } = previewModalOriginKeys;

type Props = {
	handleOnFavoritesBtnClick: Function;
};

const DrawerImagesLibrary: React.FC<Props> = ({ handleOnFavoritesBtnClick }) => {
	const { allImages } = useSliceImages();
	const { fetchedPages, pagesTotal } = allImages;

	const [searchValue, setSearchValue] = useState<string>('');
	const [searchPlaceHolder, setSearchPlaceholder] = useState<string>('Search 0 images');

	const {
		isLoading,
		isSuccess,
		data: dataAllImages,
	} = useFetchImagesQuery({
		origin: ORIGIN_PROJECT_DRAWER_LIBRARY_ALL,
		page: 1,
		itemsPerPage: DRAWER_GRID_ITEMS_PER_PAGE,
		searchValue: '',
	});

	useEffect(() => {
		if (dataAllImages && dataAllImages.items.length > 0) {
			setSearchPlaceholder(`Search ${dataAllImages.itemsTotal} images`);
		}
	}, [dataAllImages]);

	const handleSearchParamQuery = (value: string) => {
		return setSearchValue(value);
	};

	const conditionalContentImagesGrid = () => {
		if (isLoading) {
			return <Spinner />;
		}

		if (isSuccess) {
			if (dataAllImages && dataAllImages.items.length > 0) {
				return (
					<DrawerImagesGrid
						origin={ORIGIN_PROJECT_DRAWER_LIBRARY_ALL}
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

	const conditionalContent = () => {
		return (
			<>
				<StyledBox>
					<DrawerImagesSearch
						origin={ORIGIN_PROJECT_DRAWER_LIBRARY_ALL}
						searchPlaceHolder={searchPlaceHolder}
						handleSearchParamQuery={handleSearchParamQuery}
					/>
					<AllFavoriteImagesButton
						isActive={false}
						handleOnClick={handleOnFavoritesBtnClick}
					/>
				</StyledBox>
				{conditionalContentImagesGrid()}
			</>
		);
	};

	return <>{conditionalContent()}</>;
};

export default DrawerImagesLibrary;
