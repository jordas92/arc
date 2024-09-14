/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';

import useSliceApp from 'store/hooks/useSliceApp';
import { announcementsKeys, modalsKeys } from 'store/common/keys';
import {
	DataModalShare,
	DataModalProjectDelete,
	DataModalImagePreview,
	DataModalEditSavedPrompt,
	DataModalSavePrompt,
	DataModalVideo,
	DataModalUploadImageError,
	DataModalAnnouncements,
	DataModalDetail,
} from 'store/types/typesModals';

import DialogCredits from './DialogCredits';
import DialogShare from './DialogShare';
import DialogDeleteProject from './DialogDeleteProject';
import DialogImagePreview from './ImagePreview/DialogImagePreview';
import DialogSaveEditPrompt from './DialogSaveEditPrompt/DialogSaveEditPrompt';
import DialogAnnouncements from './DialogAnnouncements/DialogAnnouncements';
import DialogVideo from './DialogVideo';
import DialogUploadImageError from './DialogUploadImageError';
import DialogDetailModal from './DialogDetailModal/DialogDetailModal';
import DialogExpandInPaint from './DialogExpandInPaint/DialogExpandInPaint';

const {
	CREDITS,
	SHARE,
	PROJECT_DELETE,
	IMAGE_PREVIEW,
	EDIT_SAVED_PROMPT,
	SAVE_PROMPT,
	ANNOUNCEMENTS,
	VIDEO,
	UPLOAD_IMAGE_ERROR,
	UPLOAD_IMAGE_ERROR_X,
	DETAIL_MODAL,
	EXPAND_INPAINT,
} = modalsKeys;

const Modals: React.FC = () => {
	const { modal } = useSliceApp();
	const { type, data } = modal;

	const conditionalContent = () => {
		switch (type) {
			case CREDITS:
				return <DialogCredits />;

			case SHARE: {
				const modalData = data as DataModalShare;

				return <DialogShare imageUrl={modalData.imageUrl} />;
			}

			case PROJECT_DELETE: {
				const modalData = data as DataModalProjectDelete;

				return <DialogDeleteProject projectId={modalData.projectId} />;
			}

			case IMAGE_PREVIEW: {
				const modalData = data as DataModalImagePreview;

				return <DialogImagePreview data={modalData} />;
			}

			case EDIT_SAVED_PROMPT: {
				const { id, title, prompt } = data as DataModalEditSavedPrompt;
				return (
					<DialogSaveEditPrompt
						origin={EDIT_SAVED_PROMPT}
						prompt={prompt}
						id={id}
						title={title}
					/>
				);
			}

			case SAVE_PROMPT: {
				const { prompt } = data as DataModalSavePrompt;
				return <DialogSaveEditPrompt origin={SAVE_PROMPT} prompt={prompt} />;
			}

			case ANNOUNCEMENTS: {
				const { type } = data as DataModalAnnouncements;
				return <DialogAnnouncements type={type as keyof typeof announcementsKeys} />;
			}

			case VIDEO: {
				const { videoUrl } = data as DataModalVideo;
				return <DialogVideo videoUrl={videoUrl} />;
			}

			// Providing different keys for both 'DialogUploadImageError' to inform (lie) React that they are different components,
			// so React will render them again each time for both cases: UPLOAD_IMAGE_ERROR and UPLOAD_IMAGE_ERROR_X
			// This resolves the issue with the behavior of the 'DialogUploadImageError' Modal,
			// when "invalid" images are dragged and dropped multiple times
			case UPLOAD_IMAGE_ERROR: {
				const { uploadStatus } = data as DataModalUploadImageError;
				return (
					<DialogUploadImageError key={UPLOAD_IMAGE_ERROR} uploadStatus={uploadStatus} />
				);
			}

			case UPLOAD_IMAGE_ERROR_X: {
				const { uploadStatus } = data as DataModalUploadImageError;
				return (
					<DialogUploadImageError
						key={UPLOAD_IMAGE_ERROR_X}
						uploadStatus={uploadStatus}
					/>
				);
			}

			case DETAIL_MODAL: {
				return <DialogDetailModal data={data as DataModalDetail} />;
			}

			case EXPAND_INPAINT: {
				return <DialogExpandInPaint data={data as DataModalDetail} />;
			}

			default:
				return null;
		}
	};

	return <>{conditionalContent()}</>;
};

export default Modals;
