/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { Box, FormControl, SelectChangeEvent, Typography } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import useSliceSamplers from 'store/hooks/useSliceSamplers';
import { setSampler } from 'store/storeSlices/sliceOpenedProjects';
import { Sampler } from 'store/types/typesSamplers';

import strings from 'constants/strings';
import LabelSettingInput from 'components/Common/LabelSettingInput';
import StyledSelect from 'components/StyledWrappers/StyledSelect';
import StyledMenuItem from 'components/StyledWrappers/StyledMenuItem';

type Props = {
	horizontalStyle?: boolean;
};

const { labelSampler } = strings;

const InputSampler: React.FC<Props> = ({ horizontalStyle }) => {
	const dispatch = useStoreDispatch();
	const { currentSampler, currentGenerationTool } = useSliceOpenedProjects();

	const sliceSamplers = useSliceSamplers();
	const { items } = sliceSamplers[currentGenerationTool];

	useEffect(() => {
		// When the Generation Tool is opened via the Preview Image Modal,
		// the image could have been generated via a different Generation Tool that does not have this 'sampler'
		// Each Generation Tool has a subset of different 'samplers'
		const samplerItem = items.find((item: Sampler) => item.key === currentSampler);

		if (!currentSampler || !samplerItem) {
			dispatch(setSampler(sliceSamplers[currentGenerationTool].default));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleOnChange = (event: SelectChangeEvent<unknown>) => {
		const samplerId = event.target.value as string;

		dispatch(setSampler(samplerId));
	};

	const isSelectDisabled = !(items.length > 0);

	const styles = () => {
		if (horizontalStyle) {
			return {
				wrapper: {
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				},
				input: {
					'.MuiInputBase-input': {
						padding: '6px 6px 6px 14px',
						fontSize: '12px',
						width: '150px',
					},
				},
			};
		}

		return {
			wrapper: {},
			input: {},
		};
	};

	return (
		<FormControl fullWidth sx={styles().wrapper}>
			<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
				<LabelSettingInput
					label={labelSampler}
					margin="0"
					variant={horizontalStyle ? 'h6' : 'h5'}
				/>
			</Box>
			<StyledSelect
				name={labelSampler}
				displayEmpty
				value={currentSampler}
				inputProps={{ 'aria-label': `${labelSampler}` }}
				disabled={isSelectDisabled}
				onChange={handleOnChange}
				styles={styles().input}
				MenuProps={{
					// THEME_NEXT
					PaperProps: {
						sx: {
							maxHeight: '55vh',
							margin: '5px 0',

							'.MuiList-root': {
								padding: '0',
							},
						},
					},
				}}
			>
				{items.map((item: Sampler) => {
					return (
						<StyledMenuItem key={item.id} value={item.key}>
							<Typography noWrap>{item.value}</Typography>
						</StyledMenuItem>
					);
				})}
			</StyledSelect>
		</FormControl>
	);
};

export default InputSampler;
