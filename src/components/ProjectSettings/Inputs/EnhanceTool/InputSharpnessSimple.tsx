/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { setEnhanceSharpness } from 'store/storeSlices/sliceOpenedProjects';

import LabelSettingInput from 'components/Common/LabelSettingInput';

import strings from 'constants/strings';
import { SHARPNESS_DATA } from 'constants/default';
import { TabsSettings } from '../../../Navigation/TabsSettings';

const { sharpness, enhanceSharpness } = strings;

const InputSharpnessSimple: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { currentEnhanceSharpness } = useSliceOpenedProjects();

	const handleOnChange = (value: string) => {
		dispatch(setEnhanceSharpness(value));
	};

	return (
		<>
			<LabelSettingInput label={sharpness} margin="0 0 8px" />
			<TabsSettings
				ariaLabel={enhanceSharpness}
				data={SHARPNESS_DATA}
				onChange={handleOnChange}
				initialValue={currentEnhanceSharpness}
			/>
		</>
	);
};

export default InputSharpnessSimple;
