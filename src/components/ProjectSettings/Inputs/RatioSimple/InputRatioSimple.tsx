/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect, useState } from 'react';
import { Box, ToggleButton, Tooltip, Typography } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import useSliceModels from 'store/hooks/useSliceModels';
import { setRatio, setImageWidth, setImageHeight } from 'store/storeSlices/sliceOpenedProjects';
import useSliceAspectRatios from 'store/hooks/useSliceAspectRatios';
import { AspectRatio } from 'store/types/typesAspectRatios';

import { ratioPreviewDimensions } from 'utils/aspectRatioUtils';

import StyledToggleButtonGroup from 'components/StyledWrappers/StyledToggleButtonGroup';

const InputRatioSimple: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { currentModel, currentRatio, currentIsApectRatioPortrait } = useSliceOpenedProjects();
	const { models } = useSliceModels();
	const aspectRatios = useSliceAspectRatios();

	const [options, setOptions] = useState<Array<AspectRatio>>([]);

	useEffect(() => {
		const ratios: Array<AspectRatio> = currentIsApectRatioPortrait
			? aspectRatios.standard.portrait
			: aspectRatios.standard.landscape;

		setOptions(ratios);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentIsApectRatioPortrait]);

	const handleOnChange = (e: React.MouseEvent<HTMLElement>, value: string | null) => {
		if (value === currentRatio || !value) {
			return;
		}

		const currentModelObj = models.find((model) => model.key === currentModel);

		if (currentModelObj) {
			const { processor } = currentModelObj;

			const ratios: Array<AspectRatio> = currentIsApectRatioPortrait
				? aspectRatios[processor].portrait
				: aspectRatios[processor].landscape;

			const ratio = ratios.find((item: AspectRatio) => item.ar === value);

			if (ratio) {
				const { ar, width, height } = ratio;

				dispatch(setRatio(ar));
				dispatch(setImageWidth(width));
				dispatch(setImageHeight(height));
			}
		}
	};

	const tooltip = (ratio: string) => {
		const { width, height } = ratioPreviewDimensions(ratio);

		return (
			<Box
				sx={{
					border: '1px dashed',
					borderColor: 'secondary.light',
					width: `${width}px`,
					height: `${height}px`,
				}}
			/>
		);
	};

	return (
		<StyledToggleButtonGroup
			size="small"
			value={currentRatio}
			onChange={handleOnChange}
			aria-label="Ratio Buttons"
			exclusive
			fullWidth
			sx={{
				height: '40px',
			}}
		>
			{options.map((item: AspectRatio) => (
				<ToggleButton key={item.ar} value={item.ar} sx={{ padding: 0 }}>
					<Tooltip title={tooltip(item.ar)} placement="bottom" arrow>
						<Typography variant="body1" sx={{ width: '100%', lineHeight: '38px' }}>
							{item.ar}
						</Typography>
					</Tooltip>
				</ToggleButton>
			))}
		</StyledToggleButtonGroup>
	);
};

export default InputRatioSimple;
