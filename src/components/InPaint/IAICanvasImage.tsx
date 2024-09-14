/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { memo, useEffect, ForwardedRef } from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';
import Konva from 'konva';

type IAICanvasImageProps = {
	url: string;
	x?: number;
	y?: number;
	width?: number;
	height?: number;
	onClick?: any;
	onTap?: any;
	onLoad?: (url: string) => void;
};

const IAICanvasImage = memo(
	React.forwardRef((props: IAICanvasImageProps, ref: ForwardedRef<Konva.Image>) => {
		const { url, x, y, width, height, onClick, onLoad } = props;
		const [image] = useImage(url, 'anonymous');

		useEffect(() => {
			if (onLoad && typeof onLoad === 'function') {
				onLoad(url); // Call onLoad when the image is loaded
			}
		}, [onLoad, url]);

		if (image) {
			return (
				<Image
					ref={ref}
					width={width}
					height={height}
					x={x}
					y={y}
					image={image}
					onClick={onClick}
					listening={false}
				/>
			);
		}
		return null;
	}),
);

export default IAICanvasImage;
