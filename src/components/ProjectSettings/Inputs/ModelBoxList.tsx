/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Tooltip } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import useSliceModels from 'store/hooks/useSliceModels';
import useSliceAspectRatios from 'store/hooks/useSliceAspectRatios';
import { setModel, setImageWidth, setImageHeight } from 'store/storeSlices/sliceOpenedProjects';
import { Model } from 'store/types/typesModels';
import { AspectRatio } from 'store/types/typesAspectRatios';

import { ASPECT_RATIO_LOCKED, ASPECT_RATIO_OFF } from 'constants/default';

import BtnLightBulbIcon from '../../Common/Buttons/BtnLightBulbIcon';

type CustomProps = {
	isSelected: boolean;
	isDisabled: boolean;
};

const StyledBox = styled(Box, {
	shouldForwardProp: (prop: string) => !['isSelected', 'isDisabled'].includes(prop),
})<CustomProps>(({ theme, isSelected, isDisabled }) => ({
	width: '100%',
	height: 156,
	borderRadius: '4px',
	cursor: isDisabled ? 'default' : 'pointer',
	border: isSelected ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
	transition: 'border-color 0.3s ease',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-end',
	padding: '2px',
	marginBottom: '10px',
	boxSizing: 'border-box',

	'&:hover': {
		borderColor: isDisabled ? '#504f54' : theme.palette.accent.primary,
	},

	'& > div': {
		position: 'relative',
	},

	'& svg': {
		position: 'absolute',
		top: 0,
		right: 0,
	},
}));

const StyledImageBox = styled(Box)<{ image: string }>(({ image }) => ({
	backgroundImage: `url(${image})`,
	width: '100%',
	height: 122,
	borderRadius: '4px',
	display: 'flex',
	boxSizing: 'border-box',
	backgroundSize: 'cover',
	backgroundPosition: 'center',
}));

const ModelBoxList: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { currentModel, currentRatio, currentIsApectRatioPortrait } = useSliceOpenedProjects();
	const { models } = useSliceModels();
	const aspectRatios = useSliceAspectRatios();

	const [reorderedModels, setReorderedModels] = useState<Array<Model>>([]);

	useEffect(() => {
		const setCurrentModelAsFirst = () => {
			if (currentModel) {
				const currentModelObj = models.find((model) => model.key === currentModel);

				if (currentModelObj) {
					return [currentModelObj, ...models.filter((item) => item.key !== currentModel)];
				}
			}

			return models;
		};

		setReorderedModels(setCurrentModelAsFirst());

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleOnClick = (model: Model) => {
		const { key, processor, disabled = false } = model;

		dispatch(setModel(key));

		if (
			currentRatio !== ASPECT_RATIO_LOCKED &&
			currentRatio !== ASPECT_RATIO_OFF &&
			!disabled
		) {
			const ratios: Array<AspectRatio> = currentIsApectRatioPortrait
				? aspectRatios[processor].portrait
				: aspectRatios[processor].landscape;

			const ratio = ratios.find((item: AspectRatio) => item.ar === currentRatio);

			if (ratio) {
				const { width, height } = ratio;

				dispatch(setImageWidth(width));
				dispatch(setImageHeight(height));
			}
		}
	};

	return (
		<Box>
			{reorderedModels.map((item, index) => {
				return (
					<Tooltip
						key={item.key}
						title={item.disabled ? 'Coming Soon!' : ''}
						placement="top"
						arrow
					>
						<StyledBox
							key={item.key}
							onClick={() => !item.disabled && handleOnClick(item)}
							isSelected={currentModel === item.key}
							isDisabled={!!item.disabled}
						>
							<Box>
								{!item.disabled && (
									<BtnLightBulbIcon
										data={{ model: item.name, modelKey: item.key }}
										keyProp={item.key + index}
										iconSize={20}
										disabled={item.disabled}
									/>
								)}
								<StyledImageBox image={item.image} />
							</Box>

							<Typography
								variant="h5"
								sx={{ textAlign: 'center', padding: '6px 0 2px' }}
							>
								{item.name}
							</Typography>
						</StyledBox>
					</Tooltip>
				);
			})}
		</Box>
	);
};

export default ModelBoxList;
