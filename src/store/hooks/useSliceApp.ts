/** Copyright (c) 2023-present Kristiyan Dimitrov */

import useStoreSelector from './useStoreSelector';

/**
 * Provides data from the global state store for `slice App`
 */
function useSliceApp() {
	const sliceApp = useStoreSelector((state) => state.sliceApp);

	return {
		...sliceApp,
	};
}

export default useSliceApp;
