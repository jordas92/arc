/** Copyright (c) 2023-present Kristiyan Dimitrov */

import useStoreSelector from './useStoreSelector';

/**
 * Provides data from the global state store for `slice Saved Prompts`
 */
function useSliceSavedPrompts() {
	const sliceSavedPrompts = useStoreSelector((state) => state.sliceSavedPrompts);

	return {
		...sliceSavedPrompts,
	};
}

export default useSliceSavedPrompts;
