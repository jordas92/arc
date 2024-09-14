/** Copyright (c) 2023-present Kristiyan Dimitrov */

import useStoreSelector from './useStoreSelector';

/**
 * Provides data from the global state store for `slice Projects`
 */
function useSliceProjects() {
	const sliceProjects = useStoreSelector((state) => state.sliceProjects);

	return {
		...sliceProjects,
	};
}

export default useSliceProjects;
