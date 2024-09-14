/** Copyright (c) 2023-present Kristiyan Dimitrov */

import useStoreSelector from './useStoreSelector';

function useSliceEnhanceModels() {
	const sliceEnhanceModels = useStoreSelector((state) => state.sliceEnhanceModels);

	return sliceEnhanceModels;
}

export default useSliceEnhanceModels;
