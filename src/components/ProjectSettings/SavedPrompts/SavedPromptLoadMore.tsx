/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { Box, Button } from '@mui/material';

import Spinner from 'components/Common/Spinner';
import { useLazyFetchMoreSavedPromptsQuery } from 'store/apis/apiSavedPrompts';

import strings from 'constants/strings';

const { loadMore } = strings;

type Props = {
	nextPage: string;
};

const StyledBox = styled(Box)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	margin: '15px 0 10px',
});

const SavedPromptLoadMore: React.FC<Props> = ({ nextPage }) => {
	const [fetchMoreSavedPrompts, { isFetching }] = useLazyFetchMoreSavedPromptsQuery();

	const handleOnClick = () => {
		fetchMoreSavedPrompts(nextPage);
	};

	const conditionalContent = () => {
		if (isFetching) {
			return <Spinner margin="30px 0 10px" size={30} />;
		}

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

export default SavedPromptLoadMore;
