/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState, useEffect } from 'react';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceTutorials from 'store/hooks/useSliceTutorials';
import { useFetchTutorialsQuery } from 'store/apis/apiTutorials';
import { setIsOverlayLoaderOn } from 'store/storeSlices/sliceApp';

import { PAGE_GRID_TUTORIALS_ITEMS_PER_PAGE } from 'constants/default';
import strings from 'constants/strings';

import NoTutorialsMessage from 'components/Common/NoTutorialsMessage';
import TutorialsHeader from '../TutorialsHeader/TutorialsHeader';
import TutorialsGrid from './TutorialsGrid';

const { noTutorials, searchTutorialsPlaceHolder } = strings;

const TutorialsBody: React.FC = () => {
	const dispatch = useStoreDispatch();
	const [isNsfw, setIsNsfw] = useState<boolean>(false);

	const { fetchedPages, pagesTotal } = useSliceTutorials();

	const [searchValue, setSearchValue] = useState<string>('');
	const { isFetching, isSuccess, data } = useFetchTutorialsQuery({
		page: 1,
		itemsPerPage: PAGE_GRID_TUTORIALS_ITEMS_PER_PAGE,
		searchValue: searchValue.trim() ?? '',
		isNsfw,
	});

	useEffect(() => {
		if (isFetching) {
			dispatch(setIsOverlayLoaderOn(true));
		} else {
			dispatch(setIsOverlayLoaderOn(false));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFetching]);

	const handleOnChangeNSFWSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsNsfw(event.target.checked);
	};

	const handleSearchParamQuery = (value: string) => {
		setSearchValue(value);
	};

	const conditionalContent = () => {
		if (isSuccess) {
			if (data.items.length > 0) {
				const searchPlaceHolder = `${searchTutorialsPlaceHolder.replace(
					':tutorialsCount',
					data.itemsTotal.toString(),
				)}`;

				return (
					<>
						<TutorialsHeader
							isNsfw={isNsfw}
							handleOnChangeNSFWSwitch={handleOnChangeNSFWSwitch}
							initialValue={searchValue}
							searchPlaceHolder={searchPlaceHolder}
							handleSearchParamQuery={handleSearchParamQuery}
						/>
						<TutorialsGrid
							itemsPerPage={PAGE_GRID_TUTORIALS_ITEMS_PER_PAGE}
							fetchedPages={fetchedPages}
							pagesTotal={pagesTotal}
							searchValue={searchValue}
							isNsfw={isNsfw}
						/>
					</>
				);
			}

			return (
				<>
					<TutorialsHeader
						isNsfw={isNsfw}
						handleOnChangeNSFWSwitch={handleOnChangeNSFWSwitch}
						handleSearchParamQuery={handleSearchParamQuery}
						initialValue={searchValue}
					/>
					<NoTutorialsMessage message={noTutorials} />
				</>
			);
		}

		return (
			<TutorialsHeader
				isNsfw={isNsfw}
				handleOnChangeNSFWSwitch={handleOnChangeNSFWSwitch}
				handleSearchParamQuery={handleSearchParamQuery}
				initialValue={searchValue}
			/>
		);
	};

	return <>{conditionalContent()}</>;
};

export default TutorialsBody;
