/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Container } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceApp from 'store/hooks/useSliceApp';
import { useFetchStylesQuery } from 'store/apis/apiStyles';
import { useFetchModelsQuery } from 'store/apis/apiModels';
import { useFetchSavedPromptsQuery } from 'store/apis/apiSavedPrompts';
import { useFetchSamplersQuery } from 'store/apis/apiSamplers';
import { useFetchEnhanceModelsQuery } from 'store/apis/apiEnhanceModels';
import {
	closeModal,
	resetLibraryPageSubNav,
	setIsOverlayLoaderOn,
} from 'store/storeSlices/sliceApp';
import { myLibraryPageKeys } from 'store/common/keys';

import { browserTabTitle } from 'constants/default';
import Banner from 'components/Feedback/Banner';
import Navigation from 'components/Navigation/Navigation';
import MyLibraryContainerAllImages from './MyLibraryBody/MyLibraryContainerAllImages';
import MyLibraryContainerFavorites from './MyLibraryBody/MyLibraryContainerFavorites';
import MyLibraryContainerDiscord from './MyLibraryBody/MyLibraryContainerDiscord';

const { BROWSER_TAB_MY_LIBRARY } = browserTabTitle;
const { ALL_IMAGES, FAVORITES, DISCORD } = myLibraryPageKeys;

const MyLibrary: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { libraryPageSubNav } = useSliceApp();

	const {
		isFetching: isFetchingStyles,
		isSuccess: isSuccessStyles,
		isError: isErrorStyes,
	} = useFetchStylesQuery();

	const {
		isFetching: isFetchingModels,
		isSuccess: isSuccessModels,
		isError: isErrorModels,
	} = useFetchModelsQuery();

	const {
		isFetching: isFetchingSavedPrompts,
		isSuccess: isSuccessSavedPrompts,
		isError: isErrorSavedPrompts,
	} = useFetchSavedPromptsQuery();

	const {
		isFetching: isFetchingSamplers,
		isSuccess: isSuccessSamplers,
		isError: isErrorSamplers,
	} = useFetchSamplersQuery();

	const {
		isFetching: isFetchingEnhanceModels,
		isSuccess: isSuccessEnhanceModels,
		isError: isErrorEnhanceModels,
	} = useFetchEnhanceModelsQuery();

	const isFetching =
		isFetchingStyles ||
		isFetchingModels ||
		isFetchingSavedPrompts ||
		isFetchingSamplers ||
		isFetchingEnhanceModels;

	const isSuccess =
		isSuccessStyles &&
		isSuccessModels &&
		isSuccessSavedPrompts &&
		isSuccessSamplers &&
		isSuccessEnhanceModels;

	const isError =
		isErrorStyes ||
		isErrorModels ||
		isErrorSavedPrompts ||
		isErrorSamplers ||
		isErrorEnhanceModels;

	useEffect(() => {
		if (isFetching) {
			dispatch(setIsOverlayLoaderOn(true));
		}

		if (isError) {
			dispatch(setIsOverlayLoaderOn(false));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFetching, isError]);

	useEffect(() => {
		return () => {
			dispatch(resetLibraryPageSubNav());
			dispatch(closeModal());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const conditionalContent = () => {
		if (isSuccess) {
			switch (libraryPageSubNav) {
				case ALL_IMAGES:
					return <MyLibraryContainerAllImages />;
				case FAVORITES:
					return <MyLibraryContainerFavorites />;
				case DISCORD:
					return <MyLibraryContainerDiscord />;

				default:
					return null;
			}
		}
	};

	return (
		<>
			<Helmet>
				<title>{BROWSER_TAB_MY_LIBRARY}</title>
			</Helmet>

			<Container maxWidth="lg">
				<Banner />
				<Navigation />
				{conditionalContent()}
			</Container>
		</>
	);
};

export default MyLibrary;
