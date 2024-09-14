/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { myLibraryPageKeys } from 'store/common/keys';
import { Modal, DataModalImagePreview, ImagePreviewItem } from 'store/types/typesModals';
import commonUtils from 'store/common/utils';

type Slice = {
	isOverlayLoaderOn: boolean;
	modal: Modal;
	libraryPageSubNav: keyof typeof myLibraryPageKeys;
	lastOpenedProject: {
		projectId: string;
		isOpened: boolean;
	};
};

const { toggleIsImageFavorite } = commonUtils;

const modalDefault: Modal = {
	type: '',
	data: {},
};

const libraryPageSubNavDefault: keyof typeof myLibraryPageKeys = 'ALL_IMAGES';

const initialState: Slice = {
	isOverlayLoaderOn: false,
	modal: modalDefault,
	libraryPageSubNav: libraryPageSubNavDefault,
	lastOpenedProject: {
		projectId: '',
		isOpened: false,
	},
};

export const sliceApp = createSlice({
	name: 'sliceApp',
	initialState,
	reducers: {
		setIsOverlayLoaderOn(state: Slice, action: PayloadAction<boolean>) {
			state.isOverlayLoaderOn = action.payload;
		},

		openModal(state: Slice, action: PayloadAction<Modal>) {
			state.modal = {
				...modalDefault,
				...action.payload,
			};
		},

		closeModal(state: Slice) {
			state.modal = modalDefault;
		},

		setLastOpenedProject(
			state: Slice,
			action: PayloadAction<{
				projectId: string;
				isOpened: boolean;
			}>,
		) {
			state.lastOpenedProject = action.payload;
		},

		setLibraryPageSubNav(state: Slice, action: PayloadAction<keyof typeof myLibraryPageKeys>) {
			state.libraryPageSubNav = action.payload;
		},

		resetLibraryPageSubNav(state: Slice) {
			state.libraryPageSubNav = libraryPageSubNavDefault;
		},

		removeImageFromModalData(state: Slice, action: PayloadAction<string>) {
			const imageId = action.payload;

			if (state.modal.data) {
				const modalData = state.modal.data as DataModalImagePreview;

				if (modalData.items.length === 1) {
					// Will close the modal, because this is the last item
					return initialState;
				}

				const currentItemIndex = modalData.items.findIndex(
					(item) => item.imageId === imageId,
				);

				const mutatedItems = modalData.items.filter(
					(item: ImagePreviewItem) => item.imageId !== imageId,
				);

				const handleNewImageId = () => {
					// first one
					if (currentItemIndex === 0) {
						return mutatedItems[0].imageId;
					}

					// last one
					if (currentItemIndex === modalData.items.length - 1) {
						return mutatedItems[mutatedItems.length - 1].imageId;
					}

					return mutatedItems[currentItemIndex - 1].imageId;
				};

				state.modal.data = {
					...state.modal.data,
					imageId: handleNewImageId(),
					items: mutatedItems,
				};
			}
		},

		mutateIsFavoriteIntoModalData(state: Slice, action: PayloadAction<string>) {
			const imageId = action.payload;

			if (state.modal.data && Object.keys(state.modal.data).length) {
				const modalData = state.modal.data as DataModalImagePreview;

				const mutatedItems = modalData.items.map((item: ImagePreviewItem) => {
					return toggleIsImageFavorite(item, imageId);
				});

				state.modal.data = {
					...state.modal.data,
					items: mutatedItems,
				};
			}
		},

		resetAppSlice: () => {
			return initialState;
		},
	},
});

// Actions
export const {
	setIsOverlayLoaderOn,
	openModal,
	closeModal,
	setLibraryPageSubNav,
	resetLibraryPageSubNav,
	removeImageFromModalData,
	mutateIsFavoriteIntoModalData,
	resetAppSlice,
	setLastOpenedProject,
} = sliceApp.actions;
