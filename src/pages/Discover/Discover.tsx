/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Container } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { closeModal } from 'store/storeSlices/sliceApp';

import { browserTabTitle } from 'constants/default';
import Banner from 'components/Feedback/Banner';
import Navigation from 'components/Navigation/Navigation';
import DiscoverBody from './DiscoverBody/DiscoverBody';

const { BROWSER_TAB_DISCOVER } = browserTabTitle;

const Discover: React.FC = () => {
	const dispatch = useStoreDispatch();

	useEffect(() => {
		return () => {
			dispatch(closeModal());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Helmet>
				<title>{BROWSER_TAB_DISCOVER}</title>
			</Helmet>

			<Container maxWidth="lg">
				<Banner />
				<Navigation />
				<DiscoverBody />
			</Container>
		</>
	);
};

export default Discover;
