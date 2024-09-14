/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Container } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { closeModal } from 'store/storeSlices/sliceApp';

import { browserTabTitle } from 'constants/default';
import Banner from 'components/Feedback/Banner';
import Navigation from 'components/Navigation/Navigation';
import TutorialsBody from './TutorialsBody/TutorialsBody';

const { BROWSER_TAB_TUTORIALS } = browserTabTitle;

const Tutorials: React.FC = () => {
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
				<title>{BROWSER_TAB_TUTORIALS}</title>
			</Helmet>
			<Container maxWidth="lg">
				<Banner />
				<Navigation />
				<TutorialsBody />
			</Container>
		</>
	);
};

export default Tutorials;
