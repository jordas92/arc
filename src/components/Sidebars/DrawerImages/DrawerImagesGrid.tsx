/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';

import { useLazyFetchImagesQuery } from 'store/apis/apiImages';
import { useLazyFetchProjectImagesQuery } from 'store/apis/apiProjects';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { ImageItem } from 'store/types/typesImages';
import { previewModalOriginKeys } from 'store/common/keys';

import {
	DRAWER_GRID_ITEM_HEIGHT,
	DRAWER_PAGE_ITEMS_CONTAINER_HEIGHT,
	DRAWER_GRID_ITEM_XS,
	DRAWER_GRID_SPACING,
} from 'constants/default';
import InfinityScrollContainer from 'components/InfinityScrollContainer/InfinityScrollContainer';
import MuiStandardGrid from 'components/InfinityScrollContainer/GridItemsContainerPerPage/MuiStandardGrid';
import GridItemImage from 'components/GridItem/GridItemImage';
// import DraggableItem from 'components/Common/DND/DraggableItem';
// import CustomDraggableImage from 'components/Common/DND/CustomDraggableImage';
import { closeModal } from '../../../store/storeSlices/sliceApp';
import { closeDrawer } from '../../../store/storeSlices/sliceOpenedProjects';
import useStoreDispatch from '../../../store/hooks/useStoreDispatch';
import DraggableItem from '../../Common/DND/DraggableItem';

type Props = {
	origin: keyof typeof previewModalOriginKeys;
	itemsPerPage: number;
	fetchedPages: {
		[page: number]: ImageItem[];
	};
	pagesTotal: number;
	items: ImageItem[];
	searchValue: string;
};

const {
	ORIGIN_PROJECT_DRAWER_LIBRARY_ALL,
	ORIGIN_PROJECT_DRAWER_LIBRARY_DISCORD,
	ORIGIN_PROJECT_DRAWER_HISTORY,
	ORIGIN_PROJECT_DRAWER_FAVORITES_ALL,
	ORIGIN_PROJECT_DRAWER_FAVORITES_BY_PROJECT,
} = previewModalOriginKeys;

const DrawerImagesGrid: React.FC<Props> = ({
	origin,
	itemsPerPage,
	fetchedPages,
	pagesTotal,
	items,
	searchValue,
}) => {
	const dispatch = useStoreDispatch();
	const [timeoutId, setTimeoutID] = React.useState<any>(null);

	useEffect(() => {
		return () => {
			if (timeoutId) {
				// Clean up the timeout when the component unmounts
				clearTimeout(timeoutId);
			}
		};
	}, [timeoutId]);

	const { currentProjectId } = useSliceOpenedProjects();

	const [fetchImages] = useLazyFetchImagesQuery();
	const [fetchProjectImages] = useLazyFetchProjectImagesQuery();

	const fetchPage = (page: number) => {
		switch (origin) {
			case ORIGIN_PROJECT_DRAWER_LIBRARY_ALL:
				fetchImages({
					origin: ORIGIN_PROJECT_DRAWER_LIBRARY_ALL,
					page,
					itemsPerPage,
					searchValue,
				});
				break;

			case ORIGIN_PROJECT_DRAWER_LIBRARY_DISCORD:
				fetchImages({
					origin: ORIGIN_PROJECT_DRAWER_LIBRARY_DISCORD,
					page,
					itemsPerPage,
					searchValue,
				});
				break;

			case ORIGIN_PROJECT_DRAWER_FAVORITES_ALL:
				fetchImages({
					origin: ORIGIN_PROJECT_DRAWER_FAVORITES_ALL,
					page,
					itemsPerPage,
					searchValue,
				});
				break;

			case ORIGIN_PROJECT_DRAWER_FAVORITES_BY_PROJECT:
				fetchImages({
					origin: ORIGIN_PROJECT_DRAWER_FAVORITES_BY_PROJECT,
					page,
					itemsPerPage,
					searchValue,
					projectId: currentProjectId,
				});
				break;

			case ORIGIN_PROJECT_DRAWER_HISTORY:
				fetchProjectImages({
					page,
					itemsPerPage,
					searchValue,
					projectId: currentProjectId,
				});
				break;

			default:
				break;
		}
	};

	const onDragStart = () => {
		// Set a timeout and store the identifier
		const newTimeoutId = setTimeout(() => {
			dispatch(closeModal());
			dispatch(closeDrawer());
		}, 750);

		setTimeoutID(newTimeoutId);
	};

	const gridItem = (item: ImageItem) => {
		return (
			<DraggableItem
				item={item}
				dragStyle={{
					boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.5)',
					border: '2px solid #DE04A4',
				}}
				onDragStart={onDragStart}
			>
				<GridItemImage
					item={item}
					itemHeight={DRAWER_GRID_ITEM_HEIGHT}
					items={items}
					origin={origin}
				/>
			</DraggableItem>
		);
	};

	const gridItemPlaceholder = () => {
		return (
			// TODO_NEXT create reusable Component for the drawers
			<Skeleton
				variant="rectangular"
				height={DRAWER_GRID_ITEM_HEIGHT}
				// TODO_NEXT the border is multiplied by the app theme,
				// which is why there is a gap between the placeholders chunks
				// Fix it!
				sx={{ border: '1px solid transparent', borderRadius: '8px' }}
			/>
		);
	};

	/**
	 * Container for the items that one page of pagination contains
	 */
	const pageItemsContainer = (pageItems: ImageItem[] | undefined) => {
		return (
			<MuiStandardGrid
				pageItems={pageItems}
				itemsPerPage={itemsPerPage}
				gridItemXs={DRAWER_GRID_ITEM_XS}
				gridItemPlaceholder={gridItemPlaceholder}
				gridItem={gridItem}
				gridContainerSpacing={DRAWER_GRID_SPACING}
			/>
		);
	};

	return (
		<Box sx={{ height: '100%' }}>
			<InfinityScrollContainer
				fetchPage={fetchPage}
				fetchedPages={fetchedPages}
				pagesTotal={pagesTotal}
				// Must be aligned with the container "items' height" and "itemsPerPage"
				pageItemsContainerHeight={DRAWER_PAGE_ITEMS_CONTAINER_HEIGHT} // 'px'
				pageItemsContainer={pageItemsContainer}
			/>
		</Box>
	);
};

export default DrawerImagesGrid;
