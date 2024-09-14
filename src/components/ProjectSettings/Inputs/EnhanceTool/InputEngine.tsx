/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, FormControl, SelectChangeEvent, Typography } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { setEnhanceEngine } from 'store/storeSlices/sliceOpenedProjects';

import strings from 'constants/strings';
import LabelSettingInput from 'components/Common/LabelSettingInput';
import StyledSelect from 'components/StyledWrappers/StyledSelect';
import StyledMenuItem from 'components/StyledWrappers/StyledMenuItem';

type Option = {
	id: string;
	value: string;
};

const { labelEngine } = strings;

const InputEngine: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { currentEnhanceEngine: currentEngine } = useSliceOpenedProjects();

	// TODO get the items from the API (the default value may comes from the BE!)
	const items = [
		{ id: 'engine_1', value: 'Engine One' },
		{ id: 'engine_2', value: 'Engine Two' },
		{ id: 'engine_3', value: 'Engine Three' },
		{ id: 'engine_4', value: 'Engine Four' },
		{ id: 'engine_5', value: 'Engine Five' },
	];

	const handleOnChange = (event: SelectChangeEvent<unknown>) => {
		const engineId = event.target.value as string;
		dispatch(setEnhanceEngine(engineId));
	};

	const isSelectDisabled = !(items.length > 0);

	return (
		<FormControl fullWidth>
			<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
				<LabelSettingInput label={labelEngine} margin="0" />
			</Box>
			<StyledSelect
				name={labelEngine}
				displayEmpty
				value={currentEngine}
				inputProps={{ 'aria-label': `${labelEngine}` }}
				disabled={isSelectDisabled}
				onChange={handleOnChange}
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
				{items.map((item: Option) => {
					return (
						<StyledMenuItem key={item.id} value={item.id}>
							<Typography noWrap>{item.value}</Typography>
						</StyledMenuItem>
					);
				})}
			</StyledSelect>
		</FormControl>
	);
};

export default InputEngine;
