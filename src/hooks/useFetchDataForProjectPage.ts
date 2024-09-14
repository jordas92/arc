/** Copyright (c) 2023-present Kristiyan Dimitrov */
/* eslint-disable complexity */

import { useParams, useLocation } from 'react-router-dom';

import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { useFetchAspectRatiosQuery } from 'store/apis/apiSettings';
import { useFetchEnhanceModelsQuery } from 'store/apis/apiEnhanceModels';
import { useFetchStylesQuery } from 'store/apis/apiStyles';
import { useFetchModelsQuery } from 'store/apis/apiModels';
import { useFetchProjectQuery, useFetchProjectPromptsQuery } from 'store/apis/apiProjects';
import { useFetchSavedPromptsQuery } from 'store/apis/apiSavedPrompts';
import { useFetchSamplersQuery } from 'store/apis/apiSamplers';
import { useFetchPromptImagesQuery } from 'store/apis/apiPrompts';
import { useFetchImageQuery } from 'store/apis/apiImages';
// TODO_ControlNet
// import { useFetchControlNetToolsQuery } from 'store/apis/apiControlNetTools';
import { generationToolsKeys } from 'store/common/keys';
import commonUtils from 'store/common/utils';

const { TEXT_TO_IMAGE, IMAGE_TO_IMAGE, TOOL_ENHANCE } = generationToolsKeys;
const { generationTypeFromGenerationTool } = commonUtils;

const useFetchDataForProjectPage = () => {
	const { id: projectId = '' } = useParams();
	const { search } = useLocation();

	const {
		currentProjectId,
		currentGenerationTool,
		currentGeneration,
		currentInPaintImageUrl,
		currentInPaintImageBase64,
		currentEnhanceSourceImage,
	} = useSliceOpenedProjects();

	const { isLoading: isLoadingAspectRatios, isSuccess: isSuccessAspectRatios } =
		useFetchAspectRatiosQuery();

	const { isLoading: isLoadingEnhanceModels, isSuccess: isSuccessEnhanceModels } =
		useFetchEnhanceModelsQuery();

	const { isLoading: isLoadingStyles, isSuccess: isSuccessStyles } = useFetchStylesQuery();

	const { isLoading: isLoadingModels, isSuccess: isSuccessModels } = useFetchModelsQuery();

	const { isLoading: isLoadingSavedPrompts, isSuccess: isSuccessSavedPrompts } =
		useFetchSavedPromptsQuery();

	const { isFetching: isFetchingSamplers, isSuccess: isSuccessSamplers } =
		useFetchSamplersQuery();

	// TODO_ControlNet
	// const { isLoading: isLoadingControlNetTools, isSuccess: isSuccessControlNetTools } =
	// 	useFetchControlNetToolsQuery();

	/// Fetching project only when the page refreshed, for the other scenarios this fetch must be skipped.
	// The url param 'skipFetchProjectPrompts' is added within the "Preview Modal" 'generate' buttons flows - search for it!
	const isFetchProjectSkipped = search === '?skipFetchProjectPrompts' || !!currentProjectId;

	const { isLoading: isLoadingProject, isSuccess: isSuccessProject } = useFetchProjectQuery(
		projectId,
		{ skip: isFetchProjectSkipped },
	);
	///

	/// Fetching project prompts for a certain generation tool and exposing the last prompt.
	const isFetchProjectPromptsSkipped =
		search === '?skipFetchProjectPrompts' || !currentProjectId || !!currentGeneration;

	const { isLoading: isLoadingProjectPrompts, isSuccess: isSuccessProjectPrompts } =
		useFetchProjectPromptsQuery(
			{
				projectId,
				generationType: generationTypeFromGenerationTool(currentGenerationTool),
			},
			{ skip: isFetchProjectPromptsSkipped },
		);
	///

	/// Fetching prompt images.
	const isFetchPromptImagesSkipped =
		search === '?skipFetchProjectPrompts' ||
		currentGeneration?.images.length !== 0 ||
		currentGeneration?.isGenerating;

	const { isLoading: isLoadingPromptImages, isSuccess: isSuccessPromptImages } =
		useFetchPromptImagesQuery(
			{
				projectId,
				promptId: currentGeneration?.promptId || 'oops',
				generationTool: currentGenerationTool,
			},
			{ skip: isFetchPromptImagesSkipped, refetchOnMountOrArgChange: true },
		);
	///

	/// Fetching the source image by imageId (for Transform, Enhance, ...)
	const isFetchImageSkipped =
		!currentGeneration ||
		!currentGeneration?.generationData.sourceImageId ||
		currentGenerationTool === TEXT_TO_IMAGE ||
		(currentGenerationTool === IMAGE_TO_IMAGE && !!currentInPaintImageUrl) ||
		(currentGenerationTool === IMAGE_TO_IMAGE && !!currentInPaintImageBase64) ||
		(currentGenerationTool === TOOL_ENHANCE && !!currentEnhanceSourceImage.imageUrl) ||
		(currentGenerationTool === TOOL_ENHANCE && !!currentEnhanceSourceImage.imageBase64);

	const { isLoading: isLoadingSourceImage, isSuccess: isSuccessSourceImage } = useFetchImageQuery(
		{
			imageId: currentGeneration?.generationData.sourceImageId || 'oops',
			generationTool: currentGenerationTool,
		},
		{ skip: isFetchImageSkipped },
	);
	///

	const isLoading =
		isLoadingAspectRatios ||
		isLoadingEnhanceModels ||
		isLoadingStyles ||
		isLoadingModels ||
		isLoadingSavedPrompts ||
		isFetchingSamplers ||
		isLoadingProject ||
		isLoadingProjectPrompts ||
		isLoadingPromptImages ||
		isLoadingSourceImage;
	// TODO_ControlNet
	// || isLoadingControlNetTools;

	const isSuccess =
		isSuccessAspectRatios &&
		isSuccessEnhanceModels &&
		isSuccessStyles &&
		isSuccessModels &&
		isSuccessSavedPrompts &&
		isSuccessSamplers &&
		// isSuccessControlNetTools && // TODO_ControlNet
		(isSuccessProject || isFetchProjectSkipped) &&
		(isSuccessProjectPrompts || isFetchProjectPromptsSkipped) &&
		(isSuccessPromptImages || isFetchPromptImagesSkipped) &&
		(isSuccessSourceImage || isFetchImageSkipped);

	return { isLoading, isSuccess };
};

export default useFetchDataForProjectPage;
