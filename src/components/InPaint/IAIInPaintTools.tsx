/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import BrushIcon from '@mui/icons-material/Brush';
import { Box, ToggleButton, Tooltip, useTheme } from '@mui/material';

import { ReactComponent as ExpandCustomIcon } from 'assets/img/icons/expand.svg';
import { ReactComponent as InPaintEraseIcon } from 'assets/img/icons/inpaint_erase.svg';

import strings from 'constants/strings';
import { inPaintToolsKeys } from 'constants/default';
import StyledContainerInPaintTools from 'components/StyledWrappers/StyledContainerInPaintTools';
import StyledToggleButtonGroupInPaint from 'components/StyledWrappers/StyledToggleButtonGroupInPaint';
import StyledToggleDivider from 'components/StyledWrappers/StyledToggleDivider';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IAIBtnInvertMask from './IAIBtnInvertMask';
import useSliceOpenedProjects from '../../store/hooks/useSliceOpenedProjects';
import StyledIconButtonAsset from '../StyledWrappers/StyledIconButtonAsset';
import IAISizeSlider from './IAISizeSlider';
import {
	setInPaintTool,
	setInPaintBrushSize,
	setIsInPaintMode,
	toggleInPaintMaskVisible,
	clearInPaintMask,
	clearInPaintDrawingLines,
} from '../../store/storeSlices/sliceOpenedProjects';
import useStoreDispatch from '../../store/hooks/useStoreDispatch';
import { openModal } from '../../store/storeSlices/sliceApp';
import { modalsKeys } from '../../store/common/keys';

type Props = {
	// currentTool: string;
	// setCurrentTool: any;
	// handleOnChangeTool: Function;
	// handleBrushSizeChange: Function;
	// brushSize: number;
	setBrushSizeSliderOpen: any;
	onChangeClose: Function;
	isBrushSizeSliderOpen: boolean;
	isModal?: boolean;
};

const { brush, eraser, undo, expand, closeInPaint, maskCurrentlyHidden } = strings;
const { BRUSH, ERASER, UNDO, CLOSE, EXPAND } = inPaintToolsKeys;
const { EXPAND_INPAINT } = modalsKeys;

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
	width: '32px',
	padding: '2px',
	marginRight: '12px',
	borderRadius: '6px',

	'&.Mui-selected': {
		color: theme.palette.text.light,
		backgroundColor: theme.palette.primary.main,
	},

	'&.Mui-disabled': {
		border: 'unset',
	},
}));

const StyledToggleButtonExpand = styled(StyledToggleButton)(({ theme }) => ({
	svg: {
		'& path': {
			stroke: theme.palette.text.active,
		},
	},

	'&:hover': {
		svg: {
			'& path': {
				stroke: theme.palette.text.hover,
			},
		},
	},
}));

const IAIInPaintTools: React.FC<Props> = ({
	setBrushSizeSliderOpen,
	onChangeClose,
	isBrushSizeSliderOpen,
	isModal,
}) => {
	const dispatch = useStoreDispatch();

	const theme = useTheme();
	let timeoutId;
	const { currentInPaintMaskVisible, currentInPaintTool, currentInPaintBrushSize } =
		useSliceOpenedProjects();

	const [isChevronBrushVisible, setChevronBrushVisible] = useState<boolean>(false);
	const [isChevronEraseVisible, setChevronEraseVisible] = useState<boolean>(false);
	const [brushSize, setBrushSize] = useState<number>(0);

	// process.env.REACT_APP_ENV === 'preview' ||
	const isPreview = process.env.REACT_APP_ENV === 'development';

	useEffect(() => {
		if (currentInPaintBrushSize) {
			setBrushSize(currentInPaintBrushSize);
		}
	}, [currentInPaintBrushSize]);

	const handleOnChange = (e: React.MouseEvent<HTMLElement>, value: string | null) => {
		if (value === currentInPaintTool || !value) {
			return;
		}
		handleOnChangeTool(value);
	};

	const handleBrushSizeChange = (value: number) => {
		setBrushSize(value);
		dispatch(setInPaintBrushSize(value));
	};

	const onChangeChevronBrush = (value: boolean) => {
		if (value) {
			setChevronBrushVisible(value);
		}
		setChevronBrushVisible(value);
	};

	const onChangeChevronEraser = (value: boolean) => {
		if (value) {
			setChevronEraseVisible(value);
		}
		setChevronEraseVisible(value);
	};

	const handleOnClickChevronBrushIcon = () => {
		dispatch(setInPaintTool(BRUSH));

		setChevronBrushVisible(false);
		setChevronEraseVisible(false);
		setBrushSizeSliderOpen(true);
	};

	const handleOnClickChevronEraseIcon = () => {
		dispatch(setInPaintTool(ERASER));

		setChevronBrushVisible(false);
		setChevronEraseVisible(false);
		setBrushSizeSliderOpen(true);
	};

	const handleMouseEnterBrush = () => {
		onChangeChevronEraser(false);
		onChangeChevronBrush(true);
		onChangeClose();
		clearTimeout(timeoutId);
	};

	const handleMouseLeaveBrush = () => {
		timeoutId = setTimeout(() => {
			onChangeChevronBrush(false);
		}, 2000);
	};

	const handleMouseEnterEraser = () => {
		onChangeChevronBrush(false);
		onChangeChevronEraser(true);
		onChangeClose();
		clearTimeout(timeoutId);
	};

	const handleMouseLeaveEraser = () => {
		timeoutId = setTimeout(() => {
			onChangeChevronEraser(false);
		}, 2000);
	};

	const handleOnChangeTool = (value: string) => {
		switch (value) {
			case BRUSH:
				dispatch(setInPaintTool(BRUSH));
				break;
			case ERASER:
				dispatch(setInPaintTool(ERASER));
				break;
			case UNDO:
				setBrushSizeSliderOpen(false);
				dispatch(setInPaintTool(UNDO));
				break;
			case CLOSE:
				setBrushSizeSliderOpen(false);
				dispatch(setIsInPaintMode(false));
				dispatch(toggleInPaintMaskVisible(false));
				dispatch(clearInPaintMask());
				dispatch(clearInPaintDrawingLines());
				break;
			case EXPAND:
				setBrushSizeSliderOpen(false);
				dispatch(openModal({ type: EXPAND_INPAINT }));
				break;
			default:
				setBrushSizeSliderOpen(false);
				dispatch(setInPaintTool(value));
				break;
		}
	};

	return (
		<StyledContainerInPaintTools>
			<StyledToggleButtonGroupInPaint
				size="small"
				value={!currentInPaintMaskVisible ? currentInPaintTool : null}
				exclusive
				onChange={(e, value) => handleOnChange(e, value)}
			>
				{isBrushSizeSliderOpen && (
					<IAISizeSlider size={brushSize} handleOnSizeChange={handleBrushSizeChange} />
				)}

				<StyledToggleButton
					value={BRUSH}
					onMouseEnter={handleMouseEnterBrush}
					onMouseLeave={handleMouseLeaveBrush}
					disabled={currentInPaintMaskVisible}
				>
					{isChevronBrushVisible && (
						<StyledIconButtonAsset
							onClick={handleOnClickChevronBrushIcon}
							aria-label="Chevron"
							disableRipple
							hasBackground
							isFiledIcon
							sx={{
								position: 'absolute',
								marginTop: '-50px',
							}}
						>
							<KeyboardArrowUpIcon />
						</StyledIconButtonAsset>
					)}

					<Tooltip
						title={!currentInPaintMaskVisible ? brush : maskCurrentlyHidden}
						placement="bottom"
						arrow
					>
						<BrushIcon />
					</Tooltip>
				</StyledToggleButton>

				<StyledToggleButton
					value={ERASER}
					onMouseEnter={handleMouseEnterEraser}
					onMouseLeave={handleMouseLeaveEraser}
					disabled={currentInPaintMaskVisible}
				>
					{isChevronEraseVisible && (
						<StyledIconButtonAsset
							onClick={handleOnClickChevronEraseIcon}
							aria-label="Chevron"
							disableRipple
							hasBackground
							isFiledIcon
							sx={{
								position: 'absolute',
								marginTop: '-50px',
							}}
						>
							<KeyboardArrowUpIcon />
						</StyledIconButtonAsset>
					)}

					<Tooltip
						title={!currentInPaintMaskVisible ? eraser : maskCurrentlyHidden}
						placement="bottom"
						arrow
					>
						<Box
							sx={{
								svg: {
									marginTop: '2px',
									scale: '1.2',
									path: {
										stroke: !currentInPaintMaskVisible
											? ''
											: theme.palette.background.iconInActive,
									},
								},
							}}
						>
							<InPaintEraseIcon />
						</Box>
					</Tooltip>
				</StyledToggleButton>

				<StyledToggleDivider
					orientation="vertical"
					flexItem
					sx={{ margin: '4px 10px 4px 0' }}
				/>

				<StyledToggleButton value={UNDO} disabled={currentInPaintMaskVisible}>
					<Tooltip
						title={!currentInPaintMaskVisible ? undo : maskCurrentlyHidden}
						placement="top"
						arrow
					>
						<ReplayIcon sx={{ transform: 'rotate(-45deg)' }} />
					</Tooltip>
				</StyledToggleButton>

				{!isModal && isPreview && (
					<StyledToggleButtonExpand value={EXPAND} disabled={currentInPaintMaskVisible}>
						<Tooltip
							title={!currentInPaintMaskVisible ? expand : maskCurrentlyHidden}
							placement="top"
							arrow
						>
							<ExpandCustomIcon />
						</Tooltip>
					</StyledToggleButtonExpand>
				)}

				{!isModal && (
					<>
						<StyledToggleDivider
							orientation="vertical"
							flexItem
							sx={{ margin: '4px 10px 4px 0' }}
						/>

						<StyledToggleButton value={CLOSE}>
							<Tooltip title={closeInPaint} placement="top" arrow>
								<CloseIcon />
							</Tooltip>
						</StyledToggleButton>
					</>
				)}
			</StyledToggleButtonGroupInPaint>

			<IAIBtnInvertMask onChangeClose={onChangeClose} />
		</StyledContainerInPaintTools>
	);
};

export default IAIInPaintTools;
