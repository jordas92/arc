/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import { Grid, Typography } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceUser from 'store/hooks/useSliceUser';
import usePusher from 'store/hooks/usePusher';
import useSliceAuthentication from 'store/hooks/useSliceAuthentication';
import handleGenerateResponse from 'store/dataHandlers/handleGenerateResponse';
import { useLazyFetchPromptImagesQuery } from 'store/apis/apiPrompts';
import { showNotification } from 'store/storeSlices/sliceNotification';
import {
	updateDataToGenerationHistoryItem,
	setIsGeneratingToGenerationHistoryItem,
	setIsRequestingGeneration,
} from 'store/storeSlices/sliceOpenedProjects';
import { apiProjects, apiImages } from 'store/index';
import { notificationSeverity } from 'store/common/keys';
import { invalidationTags } from 'store/apis/common';
import commonUtils from 'store/common/utils';
import { apiUserWallets } from 'store';

import SOCKET_EVENTS from 'utils/socketEvents';

const { error, success } = notificationSeverity;
const { generationToolFromGenerationType } = commonUtils;

const { clearFetchedProjects, clearAllFetchedImages } = invalidationTags;

const PusherComponent: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { initializePusher } = usePusher();
	const { id: userId } = useSliceUser();
	const { jwt } = useSliceAuthentication();
	const [hasPusherError, setPusherError] = useState(false);
	const [fetchPromptImages] = useLazyFetchPromptImagesQuery();

	useEffect(() => {
		if (userId && jwt) {
			// Call initializePusher to set up the Pusher instance
			const pusherInstance = initializePusher(jwt);

			if (pusherInstance) {
				if (process.env.REACT_APP_ENV === 'development') {
					Pusher.logToConsole = true;
					pusherInstance.connection.bind('connected', (e) => {
						console.log('Connected to Pusher.', e);
						setPusherError(false);
					});

					pusherInstance.connection.bind('disconnected', (e) => {
						console.log('Disconnected from Pusher.', e);
						// pusherInstance = initializePusher(jwt);
					});

					pusherInstance.connection.bind('failed', (e) => {
						console.log('Connection to Pusher failed.', e);
					});

					pusherInstance.connection.bind('error', (e) => {
						console.log('Error: ', e);
						if (e.error?.data?.code === 1006) {
							setPusherError(true);
						}
					});

					pusherInstance.connection.bind('state_change', (state) => {
						console.log('State: ', state);
						if (state.current === 'blocked') {
							console.error('Pusher connection is blocked by a client.');
							setPusherError(true);
						}
						if (state.current === 'unavailable') {
							setPusherError(true);
						}
					});

					pusherInstance.connection.bind('reconnecting', (delay) => {
						console.log(`Reconnecting in ${delay}ms...`);
					});
				} else {
					pusherInstance.connection.bind('disconnected', (e) => {
						console.log('Disconnected from Pusher.', e);
					});

					pusherInstance.connection.bind('reconnecting', (delay) => {
						console.log(`Reconnecting in ${delay}ms...`);
					});

					pusherInstance.connection.bind('update', (data) => {
						console.log(`Progress - ${data.progress}%`);
						console.log('Message: ', data.message);
						console.log(`Percent Progress - ${data.percent / 100}`);
						// Process is complete.
						if (data.progress === 100) {
							console.log('Progress - Process is complete');
						}
					});

					pusherInstance.connection.bind('error', (e) => {
						if (e.error?.data?.code === 1006) {
							setPusherError(true);
						}
					});
				}

				const channel = pusherInstance.subscribe(
					`${SOCKET_EVENTS.PRIVATE_GENERATION_CHANNEL}.${userId}`,
				);

				channel.bind(`${SOCKET_EVENTS.GENERATION_EVENT}.${userId}`, async (data) => {
					// TODO_REF_MIRO - remove after successful implementation
					console.log('Pusher', data);

					if (data) {
						const generateResponse = handleGenerateResponse(data);

						const { generationData, generationError } = generateResponse;

						if (generationData) {
							const { projectId, promptId, type } = generationData;
							const generationTool = generationToolFromGenerationType(type);

							fetchPromptImages({ projectId, promptId, generationTool });

							dispatch(updateDataToGenerationHistoryItem(generationData));
							dispatch(
								setIsRequestingGeneration({
									projectId,
									generationTool,
									isRequestingGeneration: false,
								}),
							);

							if (projectId && !window.location.href.includes(projectId)) {
								dispatch(
									showNotification({
										message: 'Generation is completed!',
										severity: success,
										action: {
											label: 'Link To Project',
											data: { id: projectId },
										},
									}),
								);
							} else {
								dispatch(apiImages.util.invalidateTags([clearAllFetchedImages]));
								dispatch(apiProjects.util.invalidateTags([clearFetchedProjects]));
							}
						}

						if (generationError) {
							const { projectId, generationTool, promptId, errorMessage } =
								generationError;

							dispatch(apiUserWallets.util.resetApiState());

							dispatch(
								setIsRequestingGeneration({
									projectId,
									generationTool,
									isRequestingGeneration: false,
								}),
							);

							dispatch(
								setIsGeneratingToGenerationHistoryItem({
									projectId,
									generationTool,
									promptId,
									isGenerating: false,
								}),
							);

							dispatch(
								showNotification({
									message: errorMessage,
									autohide: true,
									severity: error,
								}),
							);
						}
					}
				});

				return () => {
					channel.unbind_all();
					channel.unsubscribe();
					// pusherInstance.disconnect();
				};
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId, jwt]);

	if (hasPusherError) {
		return (
			<Grid container justifyContent="center" alignItems="center">
				<Typography variant="h6" component="h6" color="textSecondary" fontWeight="400">
					Sorry, it seems that internet network connection or browser extension is
					blocking some features of this website. Please check your settings or try
					disabling them to resolve the issue.
				</Typography>
			</Grid>
		);
	}
	return null;
};

export default PusherComponent;
