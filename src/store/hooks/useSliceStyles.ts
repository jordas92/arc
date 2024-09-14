/** Copyright (c) 2023-present Kristiyan Dimitrov */

import useStoreSelector from './useStoreSelector';

/**
 * Provides data from the global state store for `slice Styles`
 */
function useSliceStyles() {
	return useStoreSelector((state) => state.sliceStyles);
}

export default useSliceStyles;
