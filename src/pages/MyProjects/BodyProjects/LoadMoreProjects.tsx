/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import { Box, Button } from '@mui/material';

import { useLazyFetchMoreProjectsQuery } from 'store/apis/apiProjects';

import strings from 'constants/strings';
import Spinner from 'components/Common/Spinner';

const { loadMore } = strings;

type Props = {
	nextPage: string;
};

const StyledBox = styled(Box)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	padding: '60px 0 0',
});

const LoadMoreProjects: React.FC<Props> = ({ nextPage }) => {
	const [fetchMoreProjects, { isFetching }] = useLazyFetchMoreProjectsQuery();

	useEffect(() => {
		const handleScroll = () => {
			const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
			if (scrollTop + clientHeight >= scrollHeight - 1000) {
				fetchMoreProjects(nextPage);
			}
		};

		if (nextPage) {
			window.addEventListener('scroll', handleScroll);
			return () => window.removeEventListener('scroll', handleScroll);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [nextPage]);

	const handleOnClick = () => {
		fetchMoreProjects(nextPage);
	};

	const conditionalContent = () => {
		if (isFetching) {
			return <Spinner />;
		}

		// For scenarios with screen resolution, without vertical scroll available for triggering fetch more action!
		if (!isFetching && nextPage) {
			return (
				<StyledBox>
					<Button variant="flat" onClick={handleOnClick}>
						{loadMore}
					</Button>
				</StyledBox>
			);
		}

		return null;
	};

	return <>{conditionalContent()}</>;
};

export default LoadMoreProjects;
