/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { styled } from '@mui/system';
import { Box, Container } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { useFetchProjectsQuery } from 'store/apis/apiProjects';
import { setIsOverlayLoaderOn } from 'store/storeSlices/sliceApp';
import { resetProjectsSlice } from 'store/storeSlices/sliceProjects';

import { browserTabTitle } from 'constants/default';
import Navigation from 'components/Navigation/Navigation';
import Footer from 'components/Footer/Footer';
import Banner from 'components/Feedback/Banner';
import BodyProjects from './BodyProjects/BodyProjects';

const { BROWSER_TAB_MY_PROJECTS } = browserTabTitle;

const StyledBox = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	height: '100%',
});

const MyProjects: React.FC = () => {
	const dispatch = useStoreDispatch();

	const { isFetching: isFetchingProjects, isSuccess: isSuccessProjects } =
		useFetchProjectsQuery();

	useEffect(() => {
		dispatch(resetProjectsSlice());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (isFetchingProjects) {
			dispatch(setIsOverlayLoaderOn(true));
		} else {
			dispatch(setIsOverlayLoaderOn(false));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFetchingProjects]);

	const conditionalContent = () => {
		if (isSuccessProjects) {
			return <BodyProjects />;
		}

		return null;
	};

	return (
		<>
			<Helmet>
				<title>{BROWSER_TAB_MY_PROJECTS}</title>
			</Helmet>
			<StyledBox>
				<Box>
					<Container maxWidth="lg">
						<Banner />
						<Navigation />
						{conditionalContent()}
					</Container>
				</Box>
				{!isFetchingProjects && <Footer />}
			</StyledBox>
		</>
	);
};

export default MyProjects;
