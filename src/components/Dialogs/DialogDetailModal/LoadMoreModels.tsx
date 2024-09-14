/** Copyright (c) 2024-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import { Box, Button } from '@mui/material';

import { useLazyFetchMoreMetaModelsQuery } from 'store/apis/apiModels';
import { MODAL_DETAIL_MODEL_LIMIT } from 'constants/default';

import Spinner from 'components/Common/Spinner';

type Props = {
	nextModels: number;
	modelKey: string;
	images?: any;
	modalRef?: any;
};

const StyledBox = styled(Box)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	padding: '60px 0 0',
});

const LoadMoreModels: React.FC<Props> = ({ nextModels, images, modelKey, modalRef }) => {
	const [fetchMoreMetaModels, { isFetching }] = useLazyFetchMoreMetaModelsQuery();

	useEffect(() => {
		const handleScroll = () => {
			const { scrollTop, clientHeight, scrollHeight } = modalRef.current;
			if (scrollTop + clientHeight >= scrollHeight - 1) {
				fetchMoreMetaModels({ limit: MODAL_DETAIL_MODEL_LIMIT, model: modelKey });
			}
		};

		if (nextModels && modalRef.current) {
			const modalElement = modalRef.current;
			modalElement.addEventListener('scroll', handleScroll);
			return () => {
				modalElement.removeEventListener('scroll', handleScroll);
			};
		}
	}, [nextModels, images, modelKey, modalRef, fetchMoreMetaModels]);

	const handleOnClick = () => {
		fetchMoreMetaModels({ limit: 16, model: modelKey });
	};

	const conditionalContent = () => {
		if (isFetching) {
			return <Spinner />;
		}

		// For scenarios with screen resolution, without vertical scroll available for triggering fetch more action!
		if (!isFetching && nextModels) {
			return (
				<StyledBox>
					<Button variant="flat" onClick={handleOnClick}>
						Load More
					</Button>
				</StyledBox>
			);
		}

		return null;
	};

	return <>{conditionalContent()}</>;
};

export default LoadMoreModels;
