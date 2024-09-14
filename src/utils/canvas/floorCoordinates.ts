/** Copyright (c) 2024-present Kristiyan Dimitrov */

import { Vector2d } from 'konva/lib/types';

const floorCoordinates = (coord: Vector2d): Vector2d => {
	return {
		x: Math.floor(coord.x),
		y: Math.floor(coord.y),
	};
};

export default floorCoordinates;
