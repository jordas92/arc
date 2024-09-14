/** Copyright (c) 2023-present Kristiyan Dimitrov */

import useSliceStyles from 'store/hooks/useSliceStyles';
import { Style } from 'store/types/typesStyles';

const useSelectedStylesNames = (selectedStyles: Array<string>) => {
	const styles = useSliceStyles();

	if (selectedStyles.length === 0) {
		return '';
	}

	const styleNames: Array<string> = [];

	styles.forEach((style: Style) => {
		if (selectedStyles.indexOf(style.key) > -1) {
			styleNames.push(style.name);
		}
	});

	return styleNames.join(', ');
};

export default useSelectedStylesNames;
