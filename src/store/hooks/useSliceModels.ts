/** Copyright (c) 2023-present Kristiyan Dimitrov */

import useStoreSelector from './useStoreSelector';

function useSliceModels() {
	const sliceModels = useStoreSelector((state) => state.sliceModels);

	return {
		...sliceModels,
	};
}

export default useSliceModels;
