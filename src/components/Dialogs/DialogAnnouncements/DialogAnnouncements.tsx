/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { DialogContent, Typography } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceApp from 'store/hooks/useSliceApp';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { closeModal, openModal, setLastOpenedProject } from 'store/storeSlices/sliceApp';
import {
	useFetchAnnouncementsQuery,
	useLazyFetchMoreAnnouncementsQuery,
} from 'store/apis/apiAnnouncements';
import { useUpdateUserSettingsMutation } from 'store/apis/apiUser';
import { Announcement } from 'store/types/typesAnnouncements';
import { announcementsKeys, announcementsFetchKeys, modalsKeys } from 'store/common/keys';
import strings from 'constants/strings';

import { ReactComponent as CloseIcon } from 'assets/img/icons/close.svg';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';
import StyledDialogHorizontalCard from 'components/StyledWrappers/StyledDialogHorizontalCard';
import Spinner from 'components/Common/Spinner';
import { setAnnoucements } from 'store/storeSlices/sliceUser';

import TextContentAnnouncement from './TextContentAnnouncement';
import NavigationAnnouncements from './NavigationAnnouncements';
import ImageAnnouncement from './ImageAnnouncement';
import BtnHideDialog from './BtnHideDialog';

const styles = {
	closeBtn: {
		position: 'absolute' as 'absolute',
		top: '8px',
		right: '8px',
		padding: 0,
	},
};

const StyledDialogContent = styled(DialogContent)({
	width: '100%',
	height: '100%',
	padding: 0,
	borderRadius: '8px',
	overflowY: 'hidden',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

const { errorLoadingMoreAnnouncements } = strings;
const { DETAIL_MODAL } = modalsKeys;
const { GENERAL, TEXT_TO_IMAGE } = announcementsKeys;

type Props = {
	type: keyof typeof announcementsKeys;
};

const DialogAnnouncements: React.FC<Props> = ({ type }) => {
	const dispatch = useStoreDispatch();
	const { currentModel, currentProjectId } = useSliceOpenedProjects();
	const { lastOpenedProject } = useSliceApp();

	const {
		isFetching: isFetchingAnnouncements,
		isSuccess: isSuccessFetchAnnouncements,
		data: announcementsData,
	} = useFetchAnnouncementsQuery({
		category: announcementsFetchKeys[type],
	});

	const [
		fetchMoreAnnouncements,
		{
			isFetching: isFetchingMoreAnnouncements,
			isSuccess: isSuccessFetchMoreAnnouncements,
			data: announcementsNextPageData,
		},
	] = useLazyFetchMoreAnnouncementsQuery();

	const [updateUserSettings, { isLoading: updateUserSettingsIsLoading }] =
		useUpdateUserSettingsMutation();

	const [allAnnouncements, setAllAnnouncements] = useState([] as Announcement[]);
	const [announcementsNextPage, setAnnouncementsNextPage] = useState('');
	const [itemIndex, setItemIndex] = useState(0);

	const currentItem = allAnnouncements[itemIndex] ?? null;

	useEffect(() => {
		if (isSuccessFetchAnnouncements) {
			if (announcementsData) {
				setAllAnnouncements(announcementsData.announcements.items);
				setAnnouncementsNextPage(announcementsData.announcements.nextPage);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccessFetchAnnouncements, announcementsData]);

	useEffect(() => {
		if (isSuccessFetchMoreAnnouncements) {
			if (announcementsNextPageData) {
				setAllAnnouncements((prevItems) => [
					...prevItems,
					...announcementsNextPageData.announcements.items,
				]);
				setAnnouncementsNextPage(announcementsNextPageData.announcements.nextPage);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccessFetchMoreAnnouncements, announcementsNextPageData]);

	const handleOnClose = () => {
		dispatch(setAnnoucements({ type, show: false }));
		dispatch(closeModal());

		if (type === TEXT_TO_IMAGE) {
			const { projectId, isOpened } = lastOpenedProject;
			if (projectId === 'empty' && !isOpened) {
				dispatch(
					openModal({
						type: DETAIL_MODAL,
						data: { model: currentModel, modelKey: currentModel },
					}),
				);
				dispatch(setLastOpenedProject({ projectId: currentProjectId, isOpened: true }));
			}
		}
	};

	const showNextItem = () => {
		if (itemIndex === allAnnouncements.length - 1 && announcementsNextPage) {
			// request next page
			fetchMoreAnnouncements({
				category: announcementsFetchKeys[type],
				page: announcementsNextPage,
			});
			setItemIndex(allAnnouncements.length);
		} else {
			setItemIndex((nextIndex) => (nextIndex + 1) % allAnnouncements.length);
		}
	};

	const showPrevItem = () => {
		setItemIndex(
			(prevIndex) => (prevIndex - 1 + allAnnouncements.length) % allAnnouncements.length,
		);
	};

	const handleKeyboardEvent = (e: React.KeyboardEvent<HTMLElement>) => {
		// Left arrow key
		if (e.key === 'ArrowLeft') {
			showPrevItem();
		}
		// Right arrow key
		if (e.key === 'ArrowRight') {
			showNextItem();
		}
	};

	const handleOnClickPrevious = () => {
		showPrevItem();
	};

	const handleOnClickNext = () => {
		showNextItem();
	};

	const handleOnClickHideBtn = () => {
		updateUserSettings({
			announcements: {
				[announcementsFetchKeys[type]]: false,
			},
		});
		dispatch(setAnnoucements({ type, show: false }));
		dispatch(closeModal());

		if (type === TEXT_TO_IMAGE) {
			const { projectId, isOpened } = lastOpenedProject;
			if (projectId === 'empty' && !isOpened) {
				dispatch(
					openModal({
						type: DETAIL_MODAL,
						data: { model: currentModel, modelKey: currentModel },
					}),
				);
				dispatch(setLastOpenedProject({ projectId: currentProjectId, isOpened: true }));
			}
		}
	};

	const conditionalNavigationContent = () => {
		if (allAnnouncements.length > 1) {
			return (
				<NavigationAnnouncements
					handleOnClickPrevious={handleOnClickPrevious}
					handleOnClickNext={handleOnClickNext}
					disableNextBtn={isFetchingMoreAnnouncements}
				/>
			);
		}
		return null;
	};

	const conditionalHideBtnContent = () => {
		if (type !== GENERAL) {
			return (
				<BtnHideDialog
					handleOnClick={handleOnClickHideBtn}
					disabled={updateUserSettingsIsLoading}
				/>
			);
		}
		return null;
	};

	const conditionalDialogContent = () => {
		if (isFetchingAnnouncements || isFetchingMoreAnnouncements) {
			return <Spinner />;
		}

		if (!isFetchingAnnouncements || !isFetchingMoreAnnouncements) {
			return (
				<>
					<ImageAnnouncement imageUrl={currentItem?.imageUrl} />
					<TextContentAnnouncement
						title={currentItem?.title}
						summary={currentItem?.summary}
					/>
				</>
			);
		}

		return (
			<Typography variant="body2" component="p">
				{errorLoadingMoreAnnouncements}
			</Typography>
		);
	};

	const conditionalContent = () => {
		if (isFetchingAnnouncements) {
			return null;
		}

		if (
			!isFetchingAnnouncements &&
			isSuccessFetchAnnouncements &&
			allAnnouncements.length > 0
		) {
			return (
				<StyledDialogHorizontalCard
					open
					onClose={handleOnClose}
					onKeyDown={handleKeyboardEvent}
					aria-labelledby="announcements-dialog-title"
					aria-describedby="announcements-dialog-description"
					height="330px"
					overflowy="unset"
					isResponsive
				>
					<StyledDialogContent>{conditionalDialogContent()}</StyledDialogContent>
					<StyledIconButtonAsset onClick={handleOnClose} sx={styles.closeBtn}>
						<CloseIcon />
					</StyledIconButtonAsset>
					{conditionalNavigationContent()}
					{conditionalHideBtnContent()}
				</StyledDialogHorizontalCard>
			);
		}

		return null;
	};

	return <>{conditionalContent()}</>;
};

export default DialogAnnouncements;
