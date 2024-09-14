/** Copyright (c) 2023-present Kristiyan Dimitrov */

import useStoreSelector from './useStoreSelector';

/**
 * Provides data from the global state store for `slice Notification`
 */
function useSliceNotification() {
	const sliceNotification = useStoreSelector((state) => state.sliceNotification);

	return {
		...sliceNotification,
	};
}

export default useSliceNotification;
