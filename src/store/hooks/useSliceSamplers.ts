/** Copyright (c) 2023-present Kristiyan Dimitrov */

import useStoreSelector from './useStoreSelector';

/**
 * Provides data from the global state store for `slice Samplers`
 */
function useSliceSamplers() {
	return useStoreSelector((state) => state.sliceSamplers);
}

export default useSliceSamplers;
