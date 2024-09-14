/** Copyright (c) 2024-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { SxProps, Theme } from '@mui/material/styles';
import Tab, { tabClasses } from '@mui/material/Tab';
import Tabs, { tabsClasses, TabsProps } from '@mui/material/Tabs';
import {
	fetchConvertImageUrlToBase64,
	retrieveImageDimensions,
	toBase64,
	validateImage,
} from '../../utils/imageUtils';
import { UPLOAD_MAX_SIZE_MB, uploadImageStatus } from '../../constants/default';
import { closeModal, openModal } from '../../store/storeSlices/sliceApp';
import {
	setTransformSourceImageData,
	setEnhanceSourceImageData,
	setGenerationToolImageToImageSettings,
	setGenerationToolEnhanceSettings,
	setIsGenerationContainerHidden,
	setGenerationTool,
	clearInPaintDrawingLines,
	closeDrawer,
	setIsInPaintMode,
} from '../../store/storeSlices/sliceOpenedProjects';
import { generationToolsKeys, modalsKeys, sourceImageOriginKeys } from '../../store/common/keys';
import useStoreDispatch from '../../store/hooks/useStoreDispatch';
import useSliceOpenedProjects from '../../store/hooks/useSliceOpenedProjects';

export const tabsStyles = (theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.surfaceLow,
		borderRadius: '31px',
		minHeight: 44,
	},
	flexContainer: {
		position: 'relative',
		padding: '0 1px',
		zIndex: 1,
	},
	indicator: {
		top: 0,
		bottom: 0,
		right: 0,
		height: 'auto',
		borderRadius: '31px',
		backgroundColor: theme.palette.primary.main,
		boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',
	},
});

export const tabItemStyles = (theme: Theme) => ({
	root: {
		padding: '0px 12px',
		fontSize: '14px',
		fontStyle: 'normal',
		lineHeight: '24px',
		letterSpacing: '0.15px',
		textTransform: 'capitalize',
		fontWeight: 500,
		minHeight: 44,
		minWidth: 96,
		opacity: 0.7,
		color: theme.palette.text.primary,
		'&:hover': {
			opacity: 1,
		},
		[`&.${tabClasses.selected}`]: {
			color: theme.palette.text.primary,
			opacity: 1,
		},
		[theme.breakpoints.up('md')]: {
			minWidth: 120,
		},
	},
});

interface TabData {
	name: string;
	value: string;
	label: string;
	icon: any;
	disabled: boolean;
	isVisible: boolean;
	iconPosition?: string;
}

interface TabsAppleProps extends TabsProps {
	tabsData: TabData[];
	onChange: any;
	initialValue: string;
}

const { IMAGE_TO_IMAGE, TOOL_ENHANCE } = generationToolsKeys;
const { ORIGIN_SOURCE_IMAGE_UPLOAD } = sourceImageOriginKeys;

function toSx<ClassKey extends string>(
	styles: (theme: Theme) => Partial<Record<ClassKey, any>>,
	classes: Record<ClassKey, string>,
) {
	return function sxCallback(theme: Theme) {
		let sx = {};
		Object.entries<any>(styles(theme)).forEach(([key, value]) => {
			if (key === 'root') {
				sx = { ...sx, ...value };
			} else {
				sx[`& .${classes[key]}`] = value;
			}
		});
		return sx;
	} as SxProps<Theme>;
}

const { UPLOAD_IMAGE_ERROR } = modalsKeys;
const { ERROR_UPLOAD_IMAGE_SIZE, SUCCESS_UPLOAD } = uploadImageStatus;

export function TabsApple({ sx, tabsData, onChange, initialValue }: TabsAppleProps) {
	const dispatch = useStoreDispatch();
	const { isRequestingGenerationEnhance } = useSliceOpenedProjects();

	// Not using the state just setting it ?!?
	// const [draggedTab, setDraggedTab] = React.useState(null);
	// const [isDraggingOver, setIsDraggingOver] = React.useState(false);
	const [draggedOverTab, setDraggedOverTab] = React.useState(null);
	const [droppedFile, setDroppedFile] = React.useState<any>(null);
	const [droppedFileCDN, setDroppedFileCDN] = React.useState<any>(null);
	const [tabIndex, setTabIndex] = React.useState(() => {
		// Find the index of the tab with the initial value
		const initialIndex = tabsData.findIndex((tab) => tab.value === initialValue);
		return initialIndex !== -1 ? initialIndex : 0; // Default to the first tab if value not found
	});
	const tabItemSx = toSx(tabItemStyles, tabClasses);

	const [{ isOver, canDrop }, drop] = useDrop(() => ({
		accept: 'image',
		drop: async (item: any, monitor) => {
			if (item?.imageId) {
				setDroppedFileCDN(item);
			} else {
				setDroppedFile(item);
			}
			// Not using the state just setting it ?!?
			// setIsDraggingOver(false); // Reset isDraggingOver state when item is dropped
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	}));
	const isActiveDropZone = isOver && canDrop;
	useEffect(() => {
		if (droppedFile?.imageUrl) {
			handleDroppedImageThumbnail(droppedFile, draggedOverTab);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [droppedFile]);

	useEffect(() => {
		if (droppedFileCDN?.imageUrl) {
			handleDroppedFileCDN(droppedFileCDN, draggedOverTab);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [droppedFileCDN]);

	useEffect(() => {
		const newIndex = tabsData.findIndex((tab) => tab.value === initialValue);
		if (newIndex !== -1) {
			setTabIndex(newIndex);
		}
	}, [initialValue, tabsData]);

	const handleChange = (event: React.SyntheticEvent, newValueNumber: number) => {
		setTabIndex(newValueNumber);
		if (onChange) {
			onChange(tabsData[newValueNumber].value);
		}
	};

	const handleDroppedImageThumbnail = (file, indexTabPosition) => {
		const { imageId, imageUrl, generationData, isImageNsfw } = file;
		const { imageWidth, imageHeight } = generationData;
		if (imageWidth && imageHeight) {
			dispatch(closeDrawer());
			dispatch(closeModal());

			if (indexTabPosition === 1) {
				dispatch(setGenerationTool(IMAGE_TO_IMAGE));
				dispatch(setGenerationToolImageToImageSettings(generationData));

				dispatch(setIsInPaintMode(false));
				dispatch(clearInPaintDrawingLines());
				dispatch(
					setTransformSourceImageData({
						imageId,
						imageUrl,
						base64Image: '',
						isImageNsfw,
						imageWidth,
						imageHeight,
						sourceImageOrigin: ORIGIN_SOURCE_IMAGE_UPLOAD,
					}),
				);
			}

			if (indexTabPosition === 2) {
				dispatch(setGenerationTool(TOOL_ENHANCE));
				dispatch(setIsGenerationContainerHidden(true));
				dispatch(setGenerationToolEnhanceSettings(generationData));
				dispatch(
					setEnhanceSourceImageData({
						imageBase64: '',
						imageId,
						imageUrl,
						imageWidth,
						imageHeight,
					}),
				);
			}
		}
	};

	const handleDroppedFileCDN = async (file, indexTabPosition) => {
		const imageBase64 = await fetchConvertImageUrlToBase64(file.imageUrl);
		const { imageWidth, imageHeight } = await retrieveImageDimensions(imageBase64);

		if (imageWidth && imageHeight) {
			if (indexTabPosition === 1) {
				dispatch(closeDrawer());
				dispatch(closeModal());
				dispatch(setGenerationTool(IMAGE_TO_IMAGE));

				dispatch(setIsInPaintMode(false));
				dispatch(clearInPaintDrawingLines());
				dispatch(
					setTransformSourceImageData({
						imageId: '',
						imageUrl: '',
						base64Image: imageBase64,
						isImageNsfw: false,
						imageWidth,
						imageHeight,
						sourceImageOrigin: '',
					}),
				);
			}

			if (indexTabPosition === 2) {
				dispatch(closeModal());
				dispatch(closeDrawer());
				dispatch(setGenerationTool(TOOL_ENHANCE));
				dispatch(setIsGenerationContainerHidden(true));
				dispatch(
					setEnhanceSourceImageData({
						imageBase64,
						imageUrl: '',
						imageId: '',
						imageWidth,
						imageHeight,
					}),
				);
			}
		}
	};

	const handleDroppedFile = async (files, indexTabPosition) => {
		const { uploadStatus } = validateImage(files, UPLOAD_MAX_SIZE_MB);
		if (files && uploadStatus === SUCCESS_UPLOAD) {
			const imageBase64 = await toBase64(files[0]);
			const { imageWidth, imageHeight } = await retrieveImageDimensions(imageBase64);
			dispatch(closeDrawer());
			dispatch(closeModal());
			if (imageWidth && imageHeight) {
				if (indexTabPosition === 1) {
					dispatch(setGenerationTool(IMAGE_TO_IMAGE));

					dispatch(setIsInPaintMode(false));
					dispatch(clearInPaintDrawingLines());
					dispatch(
						setTransformSourceImageData({
							imageId: '',
							imageUrl: '',
							base64Image: imageBase64,
							isImageNsfw: false,
							imageWidth,
							imageHeight,
							sourceImageOrigin: ORIGIN_SOURCE_IMAGE_UPLOAD,
						}),
					);
				}

				if (indexTabPosition === 2) {
					dispatch(setGenerationTool(TOOL_ENHANCE));
					dispatch(setIsGenerationContainerHidden(true));
					dispatch(
						setEnhanceSourceImageData({
							imageBase64,
							imageId: '',
							imageUrl: '',
							imageWidth,
							imageHeight,
						}),
					);
				}
			}
		} else {
			dispatch(
				openModal({
					type: UPLOAD_IMAGE_ERROR,
					data: { uploadStatus: ERROR_UPLOAD_IMAGE_SIZE },
				}),
			);
		}
	};

	const handleDragStart = (event, index) => {
		// Not using the state just setting it ?!?
		// setDraggedTab(index);
	};

	const handleDragOver = (event, index) => {
		if (index !== null && index !== draggedOverTab) {
			// Not using the state just setting it ?!?
			// setIsDraggingOver(true);
			setDraggedOverTab(index);
		}
	};

	const handleDrop = async (event, index) => {
		if (index !== 0) {
			if (event.target.files || event.dataTransfer.files[0]) {
				await handleDroppedFile(event.dataTransfer.files, index);
			}
		}
	};

	const handleDragLeave = (event, index) => {
		event.preventDefault();
		// Not using the state just setting it ?!?
		// setIsDraggingOver(false);
		setDraggedOverTab(null);
	};

	const getCursorStyle = () => {
		if (isActiveDropZone && draggedOverTab === 0) {
			return 'not-allowed';
		}

		if (isRequestingGenerationEnhance && isActiveDropZone) {
			return 'not-allowed';
		}
	};

	return (
		<Tabs
			ref={isRequestingGenerationEnhance ? null : drop}
			value={tabIndex}
			onChange={handleChange}
			sx={[toSx(tabsStyles, tabsClasses), ...(Array.isArray(sx) ? sx : [sx])]}
		>
			{tabsData.map(
				(tab, index) =>
					tab.isVisible && (
						<Tab
							key={index}
							disableRipple
							icon={tab.icon}
							label={tab.label}
							sx={tabItemSx}
							disabled={tab.disabled}
							iconPosition="start"
							onDragStart={(event) => handleDragStart(event, index)}
							onDragOver={(event) => handleDragOver(event, index)}
							onDragLeave={(event) => handleDragLeave(event, index)}
							onDrop={(event) => handleDrop(event, index)}
							style={{
								cursor: getCursorStyle(),
							}}
						/>
					),
			)}
		</Tabs>
	);
}
