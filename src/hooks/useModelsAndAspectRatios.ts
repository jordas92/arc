/** Copyright (c) 2023-present Kristiyan Dimitrov */

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceModels from 'store/hooks/useSliceModels';
import useSliceAspectRatios from 'store/hooks/useSliceAspectRatios';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { setImageWidth, setImageHeight } from 'store/storeSlices/sliceOpenedProjects';
import { AspectRatio } from 'store/types/typesAspectRatios';
import { Model } from 'store/types/typesModels';

import { ASPECT_RATIO_OFF, ASPECT_RATIO_LOCKED } from 'constants/default';

/**
 * TODO
 */
const useModelsAndAspectRatios = () => {
	const dispatch = useStoreDispatch();
	const { models } = useSliceModels();
	const aspectRatios = useSliceAspectRatios();
	const { currentIsApectRatioPortrait } = useSliceOpenedProjects();

	const setPredefinedImageWidthAndHeight = (modelKey: string, ratioKey: string) => {
		const model = models.find((el: Model) => el.key === modelKey);

		if (model && ratioKey !== ASPECT_RATIO_OFF && ratioKey !== ASPECT_RATIO_LOCKED) {
			const arOptions: Array<AspectRatio> = currentIsApectRatioPortrait
				? aspectRatios[model.processor].portrait
				: aspectRatios[model.processor].landscape;

			const ratio = arOptions.find((el: AspectRatio) => el.ar === ratioKey);

			if (ratio) {
				dispatch(setImageWidth(ratio.width));
				dispatch(setImageHeight(ratio.height));
			}
		}
	};

	return setPredefinedImageWidthAndHeight;
};

export default useModelsAndAspectRatios;
