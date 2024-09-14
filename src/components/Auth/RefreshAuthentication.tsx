/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';

import useSliceAuthentication from '../../store/hooks/useSliceAuthentication';
import { useRefreshTokenMutation } from '../../store/apis/apiAuthentication';

// REFRESH_AUTHENTICATION - currently disabled and not supported by the BE

const getExpirationTimeFromJwt = (jwt: string): number => {
	const decodedJwtPayload = window.atob(jwt.split('.')[1]);
	const payload = JSON.parse(decodedJwtPayload);

	// Ensures to return a number value
	return payload.exp && !isNaN(payload.exp) ? payload.exp : 0;
};

/**
 * This Component does not return JSX!
 * The place of the Component initialization is crucial!
 * It must be initialized at the top level of the Guarded routes hierarchy!
 */
const RefreshAuthentication: React.FC = () => {
	const { jwt } = useSliceAuthentication();
	const [refreshToken] = useRefreshTokenMutation();

	const offsetBeforeExpirationMoment = 4 * 60; // in seconds

	useEffect(() => {
		if (jwt) {
			const accessTokenExpirationTime = getExpirationTimeFromJwt(jwt); // in seconds
			const now = Math.floor(new Date().getTime() / 1000); // in seconds
			const timeTillExpiration = accessTokenExpirationTime - now; // in seconds

			// The token has not expired and its expiration is BEFORE the moment of expiration offset range.
			if (timeTillExpiration > 0 && timeTillExpiration <= offsetBeforeExpirationMoment) {
				// Will fetch a new token immediately
				refreshToken();
			}

			// The token has not expired and its expiration is AFTER the moment of expiration offset range.
			if (timeTillExpiration > offsetBeforeExpirationMoment) {
				const delay = (timeTillExpiration - offsetBeforeExpirationMoment) * 1000; // in milliseconds

				// Will fetch a new token before the expiration of the current.
				// before = offsetBeforeExpirationMoment
				const timer = setTimeout(() => {
					refreshToken();
				}, delay);

				return () => {
					clearTimeout(timer);
				};
			}

			// NOTE: If timeTillExpiration < 0 => 'baseQueryWithReauth' will take care, check storeCommon file
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [jwt]);

	return null;
};

export default RefreshAuthentication;
