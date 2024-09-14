/** Copyright (c) 2023-present Kristiyan Dimitrov */

import useStoreSelector from './useStoreSelector';

/**
 * Provides data from the global state store for `slice App`
 */
function useSliceControlNet() {
	const sliceControlNet = useStoreSelector((state) => state.sliceControlNet);

	return {
		...sliceControlNet,
	};
}

export default useSliceControlNet;
