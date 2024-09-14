/** Copyright (c) 2023-present Kristiyan Dimitrov */

import useStoreSelector from './useStoreSelector';

function useSliceAspectRatios() {
	const sliceAspectRatios = useStoreSelector((state) => state.sliceAspectRatios);

	return {
		...sliceAspectRatios,
	};
}

export default useSliceAspectRatios;
