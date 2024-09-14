/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { showNotification } from '../storeSlices/sliceNotification';
import { StoreDispatch } from '..';

type RtkqCatchError = {
	error: any;
	meta: {
		response: {
			status: number | null;
			url: string | null;
		};
	};
};

/**
 * Logs the Response Error and dispatches actions
 * @param dispatch
 * @param responseError The error from catch
 * @param requestName The query(mutation) name
 */
const handleResponseError = (
	dispatch: StoreDispatch,
	responseError: RtkqCatchError | any,
	requestName: string,
): void => {
	console.warn(`Request ${requestName} rejected with:`, responseError);
	console.log(responseError.error);
	const { data } = responseError.error;

	if (data?.error) {
		const isInvalidCred =
			data.error === 'Unauthorized' ? 'Invalid Credentials' : 'Unauthorized';
		dispatch(
			showNotification({
				message: isInvalidCred,
				severity: 'error',
			}),
		);
	}

	if (data?.message) {
		dispatch(
			showNotification({
				message: data.message,
				severity: 'error',
			}),
		);
	}
};

export default handleResponseError;
