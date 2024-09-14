/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

import { getApiOrigin } from 'utils/commonUtils';

const origin = getApiOrigin();
const pusherEndpoint = `${origin}/broadcasting/auth`;

interface PusherHook {
	pusherInstance: Pusher | null;
	initializePusher: (token: string) => Pusher | null;
	subscribeToImageGenerationChannel: (
		channelName: string,
		eventName: string,
		callback: (data: any) => void,
	) => void;
}

const usePusher = (): PusherHook => {
	const [pusherInstance, setPusherInstance] = useState<Pusher | null>(null);

	const initializePusher = (token: string): Pusher | null => {
		// Disconnect the existing instance if it exists
		if (pusherInstance) {
			pusherInstance.disconnect();
		}

		if (token) {
			// @ts-ignore
			const instance = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
				cluster: process.env.REACT_APP_PUSHER_CLUSTER,
				autoReconnect: true,
				encrypted: true,
				// forceTLS: true,
				// useTLS: true,
				// authDelay: 6000, // milliseconds
				channelAuthorization: {
					endpoint: pusherEndpoint,
					headers: {
						Authorization: `Bearer ${token}`,
						Accept: 'application/json',
					},
				},
			});

			setPusherInstance(instance);
			return instance;
		}
		return pusherInstance;
	};

	const subscribeToImageGenerationChannel = (channelName, eventName, callback) => {
		if (pusherInstance) {
			const channel = pusherInstance.subscribe(channelName);
			channel.bind(eventName, (data) => {
				if (callback) {
					callback(data);
				}
			});
		}
	};

	// Cleanup and disconnect when the component unmounts
	useEffect(() => {
		return () => {
			if (pusherInstance) {
				pusherInstance.disconnect();
			}
		};
	}, [pusherInstance]);

	return {
		pusherInstance,
		initializePusher,
		subscribeToImageGenerationChannel,
	};
};

export default usePusher;
