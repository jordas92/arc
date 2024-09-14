/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Circle, Layer, Line, Rect, Stage, Transformer } from 'react-konva';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import {
	clearInPaintMask,
	setInPaintDrawingLines,
	setInPaintMask,
	setInPaintTool,
	setInPaintCanvasInitialized,
	setInPaintContainerCanvasDimension,
	// resetInPaintContainerCanvasDimension,
} from 'store/storeSlices/sliceOpenedProjects';

import { CANVAS_HEIGHT, CANVAS_WIDTH, inPaintToolsKeys } from 'constants/default';
import { fetchConvertImageUrlToBase64, retrieveImageDimensions } from 'utils/imageUtils';
import { invertMask, resizeImage } from 'utils/canvas/canvasUtils';
import { rgbColorToString } from 'utils/canvas/colorToString';
import calculateDimension from 'utils/canvas/calculateDimension';
import IAICanvasImage from './IAICanvasImage';
import calculateScalePoints from '../../utils/canvas/calculateScalePoints';
import { Dimensions } from '../../utils/canvas/canvasTypes';

// interface DrawingLine {
// 	currentTool: string;
// 	points: number[];
// 	color: string;
// 	size: number;
// }

interface Props {
	closeSizeSlider: () => void;
	isModal?: boolean;
}

const styleSchema: any = {
	canvasContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
};

const { ERASER, UNDO, BRUSH } = inPaintToolsKeys;

const useImageLoader = (
	imageUrl: string | null,
	imageBase64: string | null,
	isModal: boolean | undefined,
	dispatch: any,
	setImageSrc: (src: string) => void,
	setImageSrcSize: (size: { width: number; height: number }) => void,
	setInPaintCanvasSize: (size: { width: number; height: number }) => void,
	setInPaintOriginalDimensionSize: (size: { width: number; height: number }) => void,
	setLoading: (loading: boolean) => void,
) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadImage = async () => {
			setIsLoading(true);
			const inPaintImage = imageUrl || imageBase64;
			if (!inPaintImage) return;

			try {
				const base64 = inPaintImage.includes('http')
					? await fetchConvertImageUrlToBase64(inPaintImage)
					: inPaintImage;

				const { imageWidth, imageHeight } = await retrieveImageDimensions(base64);
				if (imageWidth && imageHeight) {
					if (isModal) {
						setImageSrcSize({ width: imageWidth, height: imageHeight });
						setInPaintCanvasSize({ width: imageWidth, height: imageHeight });
						setImageSrc(base64);
					} else {
						const canvasDimensions = calculateDimension(
							CANVAS_WIDTH,
							CANVAS_HEIGHT,
							imageWidth,
							imageHeight,
						);
						const resizedBase64 = await resizeImage(
							base64,
							canvasDimensions.width,
							canvasDimensions.height,
						);
						setImageSrcSize({
							width: canvasDimensions.width,
							height: canvasDimensions.height,
						});
						setInPaintCanvasSize({
							width: canvasDimensions.width,
							height: canvasDimensions.height,
						});
						setInPaintOriginalDimensionSize({
							width: imageWidth,
							height: imageHeight,
						});
						dispatch(
							setInPaintContainerCanvasDimension({
								width: canvasDimensions.width,
								height: canvasDimensions.height,
							}),
						);
						setImageSrc(resizedBase64);
					}
				}
				setIsLoading(false);
			} catch (error) {
				console.error('Error loading image:', error);
				setIsLoading(false);
			}
		};

		loadImage();
	}, [
		imageUrl,
		imageBase64,
		isModal,
		dispatch,
		setImageSrc,
		setImageSrcSize,
		setInPaintCanvasSize,
		setInPaintOriginalDimensionSize,
	]);

	useEffect(() => {
		setLoading(isLoading);
	}, [isLoading, setLoading]);
};

const useBrushSize = (currentBrushSize: number | undefined) => {
	const [brushSize, setBrushSize] = useState<number>(50);

	useEffect(() => {
		if (currentBrushSize) {
			setBrushSize(currentBrushSize);
		}
	}, [currentBrushSize]);

	return brushSize;
};

const IAICanvas: React.FC<Props> = ({ closeSizeSlider, isModal }) => {
	const dispatch = useStoreDispatch();
	const {
		currentInPaintImageUrl,
		currentInPaintImageBase64,
		currentInPaintMaskVisible,
		currentInPaintDrawingLines,
		// currentInPaintIsDrawing,
		// currentInPaintIsCursorDrawing,
		currentInPaintBrushSize,
		currentInPaintBrushColor,
		currentInPaintBrushOpacity,
		// currentInPaintCursorPosition,
		currentInPaintTool,
		currentInitCanvasContainerDimensions,
	} = useSliceOpenedProjects();

	const stageRef = useRef<any>();
	const mainRef = useRef<any>();
	const canvasImageRef = useRef<any>();
	const transformerRef = useRef<any>();
	const drawingLayerRef = useRef<any>();

	const [imageSrc, setImageSrc] = useState<string>('');
	const [imageSrcSize, setImageSrcSize] = useState<Dimensions>({ width: 0, height: 0 });
	const [InPaintCanvasSize, setInPaintCanvasSize] = useState<Dimensions>({ width: 0, height: 0 });
	const [originalDimensionSize, setInPaintOriginalDimensionSize] = useState<Dimensions>({
		width: 0,
		height: 0,
	});
	const [isLoading, setIsLoading] = useState(true);

	useImageLoader(
		currentInPaintImageUrl,
		currentInPaintImageBase64,
		isModal,
		dispatch,
		setImageSrc,
		setImageSrcSize,
		setInPaintCanvasSize,
		setInPaintOriginalDimensionSize,
		setIsLoading,
	);
	// TODO_NEXT
	const brushSize = useBrushSize(currentInPaintBrushSize);
	const [drawingLines, setDrawingLines] = useState<any>([]);
	// TODO_NEXT
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [isDrawing, setDrawing] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isCursorDrawing, setIsCursorDrawing] = useState<boolean>(false);

	useEffect(() => {
		if (isModal) {
			setDrawingLines(
				calculateScalePoints(
					currentInPaintDrawingLines,
					imageSrcSize.width,
					imageSrcSize.height,
					currentInitCanvasContainerDimensions.width,
					currentInitCanvasContainerDimensions.height,
					isModal,
				),
			);
		} else {
			// setDrawingLines(
			// 	calculateScalePoints(
			// 		currentInPaintDrawingLines,
			// 		InPaintCanvasSize.width,
			// 		InPaintCanvasSize.height,
			// 		currentInitCanvasContainerDimensions.width,
			// 		currentInitCanvasContainerDimensions.height,
			// 	),
			// );
		}
	}, [
		isModal,
		currentInPaintDrawingLines,
		imageSrcSize,
		InPaintCanvasSize,
		currentInitCanvasContainerDimensions,
	]);

	useEffect(() => {
		if (currentInPaintTool === UNDO) {
			setDrawingLines(drawingLines.slice(0, -1));
			dispatch(setInPaintTool(BRUSH));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentInPaintTool]);

	useEffect(() => {
		const inPaintImage = currentInPaintImageUrl || currentInPaintImageBase64;
		if (inPaintImage) {
			setDrawingLines(currentInPaintDrawingLines);
			dispatch(setInPaintTool(BRUSH));
			dispatch(setInPaintCanvasInitialized(true));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentInPaintImageUrl, currentInPaintImageBase64]);

	useEffect(() => {
		if (currentInPaintDrawingLines && drawingLines.length === 0) {
			setDrawingLines(currentInPaintDrawingLines);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentInPaintDrawingLines]);

	// FUTURE FEATURE check WEB-UI repo for started implementation
	// const pulseShape = () => {} // use Konva methods to animate a shape

	// FUTURE FEATURE check WEB-UI repo for started implementation
	// change color brush

	const handleSelect = (e: any) => {
		setSelectedId(e.target.id());
	};

	const handleMouseEnter = () => {
		setIsCursorDrawing(true);
	};

	const handleMouseLeave = () => {
		setIsCursorDrawing(false);
		setDrawing(false);
		setMaskParameter();
	};

	const handleMouseDown = useCallback(
		(event: any) => {
			const { offsetX, offsetY } = event.evt;

			if (!currentInPaintMaskVisible) {
				if (currentInPaintTool === ERASER) {
					setPosition({ x: offsetX, y: offsetY });
				}

				closeSizeSlider();
				setDrawing(true);
				setDrawingLines([
					...drawingLines,
					{
						currentTool: currentInPaintTool,
						points: [
							offsetX,
							offsetY,
							offsetX - 1,
							offsetY - 1,
							offsetX,
							offsetY,
							offsetX + 1,
							offsetY + 1,
						],
						color: rgbColorToString(currentInPaintBrushColor),
						size: brushSize,
					},
				]);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			drawingLines,
			currentInPaintTool,
			currentInPaintBrushColor,
			currentInPaintMaskVisible,
			currentInPaintBrushSize,
			brushSize,
		],
	);

	const handleMouseMove = useCallback(
		(event: any) => {
			const { offsetX, offsetY } = event.evt;

			if (!isDrawing) {
				setPosition({ x: offsetX, y: offsetY });
				return;
			}

			if (currentInPaintTool === ERASER) {
				setIsCursorDrawing(true);
				setPosition({ x: offsetX, y: offsetY });
			}

			if (currentInPaintTool === BRUSH) {
				setIsCursorDrawing(false);
				setPosition({ x: offsetX, y: offsetY });
			}

			// Create a copy of the current drawingLines array
			const updatedDrawingLines = [...drawingLines];

			// Get the index of the last line
			const lastIndex = updatedDrawingLines.length - 1;

			// Modify the points of the last line
			updatedDrawingLines[lastIndex] = {
				...updatedDrawingLines[lastIndex], // Copy other properties
				points: [...updatedDrawingLines[lastIndex].points, offsetX, offsetY], // Add new points
			};

			// Update the state with the new drawingLines array
			setDrawingLines(updatedDrawingLines);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[drawingLines, isDrawing],
	);

	const handleMouseUp = useCallback(() => {
		setDrawing(false);
		setSelectedId(null);
		setMaskParameter();
		setIsCursorDrawing(true);

		dispatch(setInPaintDrawingLines(drawingLines));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [drawingLines]);

	const setMaskParameter = () => {
		if (drawingLines.length === 0) {
			dispatch(clearInPaintMask());
			return;
		}

		const drawingLayer = drawingLayerRef?.current; // Use the ref to access the drawing layer

		if (typeof drawingLayer !== 'undefined' && drawingLayer !== null) {
			drawingLayer.toDataURL({
				callback: async (dataUrl) => {
					// Now you have the mask data URL, you can use it as needed.
					const resized = await resizeImage(
						dataUrl,
						originalDimensionSize.width,
						originalDimensionSize.height,
					);
					invertMask(resized, setMask);
				},
			});
		}
	};

	const setMask = (mask: string) => {
		dispatch(setInPaintMask(mask));
	};

	const handleMouseOver = () => {
		if (currentInPaintMaskVisible) {
			if (stageRef.current) {
				stageRef.current.container().style.cursor = 'no-drop';
			}
		}
	};

	const handleMouseOut = () => {
		if (!currentInPaintMaskVisible) {
			if (stageRef.current) {
				stageRef.current.container().style.cursor = '';
			}
		}
	};

	if (isLoading) {
		return (
			<Box sx={styleSchema.canvasContainer}>
				<CircularProgress size={24} />
			</Box>
		);
	}

	return (
		<Box sx={styleSchema.canvasContainer}>
			<Box
				sx={{
					canvas: {
						// Layer - Line
						'&:nth-of-type(2)': { opacity: currentInPaintBrushOpacity?.toString() },
						// Layer - Circle
						'&:nth-of-type(3)': {
							opacity:
								currentInPaintTool === ERASER
									? 'initial'
									: currentInPaintBrushOpacity?.toString(),
						},
					},
					cursor: 'none',
				}}
			>
				<Stage
					width={InPaintCanvasSize.width}
					height={InPaintCanvasSize.height}
					ref={stageRef}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
					onMouseUp={handleMouseUp}
				>
					<Layer>
						<Rect
							ref={mainRef}
							x={0}
							y={0}
							width={InPaintCanvasSize.width}
							height={InPaintCanvasSize.height}
							fill={rgbColorToString(currentInPaintBrushColor)}
							opacity={currentInPaintBrushOpacity}
							onMouseOver={handleMouseOver}
							onMouseOut={handleMouseOut}
						/>
						{imageSrc && (
							<IAICanvasImage
								url={imageSrc}
								ref={canvasImageRef}
								width={InPaintCanvasSize.width}
								height={InPaintCanvasSize.height}
								onClick={handleSelect}
								onTap={handleSelect}
							/>
						)}
						{selectedId && (
							<Transformer
								ref={transformerRef}
								rotateEnabled={false}
								boundBoxFunc={(oldBox: any, newBox: any) => {
									if (newBox.width < 10 || newBox.height < 10) {
										return oldBox;
									}
									return newBox;
								}}
							/>
						)}
					</Layer>

					<Layer ref={drawingLayerRef}>
						{!currentInPaintMaskVisible &&
							drawingLines.map((line, i) => (
								<Line
									key={i}
									points={line.points}
									stroke={line.color}
									strokeWidth={line.size}
									tension={0.5}
									bezier
									lineCap="round"
									lineJoin="round"
									globalCompositeOperation={
										line.currentTool === ERASER
											? 'destination-out'
											: 'source-over'
									}
									shadowForStrokeEnabled={false}
								/>
							))}
					</Layer>

					{isCursorDrawing && !currentInPaintMaskVisible ? (
						<Layer>
							<Circle
								x={position.x}
								y={position.y}
								radius={brushSize / 2}
								// THEME_NEXT
								fill={
									currentInPaintTool === ERASER
										? 'white'
										: rgbColorToString(currentInPaintBrushColor)
								}
							/>
						</Layer>
					) : null}
				</Stage>
			</Box>
		</Box>
	);
};

export default IAICanvas;
