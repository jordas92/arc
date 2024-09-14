/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';

import WidthInfo from './WidthInfo';
import InputWidth from './InputWidth';
import FinalSize from './FinalSize';

const WidthResizeContainer: React.FC = () => {
	return (
		<>
			<WidthInfo />
			<InputWidth />
			<FinalSize />
		</>
	);
};

export default WidthResizeContainer;
