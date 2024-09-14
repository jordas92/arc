/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';

type Props = {
	children: React.ReactElement;
};
// Does not work with MUI ToggleButton!
const DoNotDisplayOnStageAndProd: React.FC<Props> = ({ children }) => {
	const isHidden =
		process.env?.REACT_APP_ENV === 'stage' || process.env?.REACT_APP_ENV === 'production';

	if (isHidden) {
		return null;
	}

	return children;
};

export default DoNotDisplayOnStageAndProd;
