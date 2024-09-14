/** Copyright (c) 2023-present Kristiyan Dimitrov */

import useStoreSelector from './useStoreSelector';

/**
 * Provides data from the global state store for `slice User`
 */
function useSliceUser() {
	const sliceUser = useStoreSelector((state) => state.sliceUser);

	return {
		...sliceUser,
	};
}

export default useSliceUser;
