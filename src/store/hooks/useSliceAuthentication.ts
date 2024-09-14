/** Copyright (c) 2023-present Kristiyan Dimitrov */

import useStoreSelector from './useStoreSelector';

/**
 * Provides data from the global state store for `slice Authentication`
 */
function useSliceAuthentication() {
	const sliceAuthentication = useStoreSelector((state) => state.sliceAuthentication);

	return {
		...sliceAuthentication,
	};
}

export default useSliceAuthentication;
