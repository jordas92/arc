/** Copyright (c) 2023-present Kristiyan Dimitrov */

// TODO_NEXT at the end of the Refactoring phase,
// verify each of the constants and remove those which are not in use!

// APP TEXT
export const APP_TITLE = 'Arcana AI';
export const APP_DESCRIPTION = 'Arcana Labs | AI Image Generator For The Unrestricted Artist';
export const FOOTER_TEXT = `${new Date().getFullYear()} - Arcana Labs - All rights reserved`;
// PAGES TITLE
export const PAGE_TITLE_HOME = 'Home';
export const PAGE_TITLE_PROFILE = 'Profile';
export const PAGE_TITLE_PROJECT = 'Project';
export const PAGE_TITLE_MY_PROJECTS = 'My Projects';
export const PAGE_TITLE_MY_LIBRARY = 'My Library';
export const PAGE_TITLE_TUTORIALS = 'Tutorials';
export const PAGE_TITLE_DISCOVER = 'Discover';
// UI CONSTANTS
export const FOOTER_HEIGHT = 0;
export const APP_HEADER_HEIGHT = '50px';
export const DRAWER_WIDTH = 400;
export const INITIAL_CONTAINERS_WIDTH = 500;
// APP THEME
export const DARK_MODE_THEME = 'dark';
export const LIGHT_MODE_THEME = 'light';
// AUTH
export const MAX_PASS_LENGTH = 8;
//
export const USER_ID = 1;

export const DEFAULT_ASPECT_RATIO_IMAGE_DIMENSION_TEXT_TO_IMAGE = 768;
export const DEFAULT_ASPECT_RATIO_IMAGE_DIMENSION_IMAGE_TO_IMAGE = 1024;

export const RIGHT_SIDE_BAR_SIZE = '328px';
export const MIN_ASPECT_RATIO_LENGTH = 112; // TODO  rename to MIN_IMAGE_DIMENSION ? MIN_ASPECT_RATIO_LENGTH
export const ENHANCE_MAX_IMAGE_RESIZE = 6000; // 3000x3000px

export const BASIC_IMAGE_SIZE_SLIDER_STEPS = 1;
export const BASIC_IMAGE_SIZE_MAX = 1500;
export const BASIC_IMAGE_SIZE_MIN = 112;
export const BASIC_IMAGE_SIZE_DEFAULT = 1024;

export const ASPECT_RATIO_OFF = 'Off';
export const ASPECT_RATIO_LOCKED = 'Locked ratio';
export const ASPECT_RATIO_ONE_TO_ONE = '1:1';

// Models
export const DEFAULT_MODEL_TEXT_TO_IMAGE = 'photo';
export const DEFAULT_MODEL_IMAGE_TO_IMAGE = 'photo';
export const MAX_PIXEL_COUNT_NON_SDXL_MODELS = 1600;
export const MAX_PIXEL_COUNT_SDXL_MODELS = 2048;
export const MAX_PIXEL_COUNT_TRANSFORM_FROM_ENHANCE = 2600;
export const MAX_PIXEL_IN_PAINT_STATE = 3000;

export const MODAL_DETAIL_MODEL_LIMIT = 16;

// Transform/Inpaint and Enhance default 'transformation' values
export const DEFAULT_TRANSFORMATION_VALUE = 0.5; // (50%)
export const DEFAULT_CREATIVITY_VALUE = 0; // (50%)

// Validations
export const MAX_LENGTH_PROMPT = 2048;
export const MAX_LENGTH_NEGATIVE_PROMPT = 500;
export const MAX_PROMPT_TITLE_WORDS = 40;
export const MAX_PROMPT_TITLE_LENGTH = 190; // BE limitation of 191 chars
export const MAX_LENGTH_SEARCH = 255;
export const MIN_LENGTH_PROJECT_TITLE = 2;
export const MAX_LENGTH_PROJECT_TITLE = 50;

// Credits cost (generation price)
// TODO_NEXT These values will be controlled via the admin panel someday
export const CREDITS_COST_ENHANCE = 50;
export const CREDITS_COST_GENERAL = 40;
export const CREDITS_COST_UPSCALE = 10;
export const BUY_CREDITS_THRESHOLD_ENHANCE = CREDITS_COST_ENHANCE * 3;
export const BUY_CREDITS_THRESHOLD_GENERAL = CREDITS_COST_GENERAL * 3;
export const BUY_CREDITS_THRESHOLD_UPSCALE = CREDITS_COST_UPSCALE * 3;

// prompt placeholders
export const IMAGE_PROMPT_PLACEHOLDER = 'Enter the change you want to see';
// Arcana Title
export const NEW_ARCANA_TITLE = 'New Arcana Project';
// Hide only variations - WEBUI-611, WEBUI-938
export const VARIATION_DISPLAYED = false;

// Grid items (Standard) within drawers (Favorites, History, Library, ...)
export const DRAWER_GRID_ITEM_HEIGHT = 89;
export const DRAWER_PAGE_ITEMS_CONTAINER_HEIGHT = 985; // Must be aligned with the container "items' height" and "itemsPerPage"
export const DRAWER_GRID_SPACING = 1;
export const DRAWER_GRID_ITEM_XS = 3; // 4 items per line
export const DRAWER_GRID_ITEMS_PER_PAGE = 40; // page of the pagination

// Grid items (Standard) within Tutorials page
export const PAGE_GRID_TUTORIALS_ITEM_HEIGHT = 205;
export const PAGE_GRID_TUTORIALS_ITEM_THUMB_HEIGHT = 150;
export const PAGE_GRID_TUTORIALS_ITEM_XS = 3; // 4 items per line
export const PAGE_GRID_TUTORIALS_SPACING = 3;
export const PAGE_GRID_TUTORIALS_ITEMS_PER_PAGE = 20; // page of the pagination
export const PAGE_GRID_TUTORIALS_ITEMS_CONTAINER_HEIGHT = 1410; // Must be aligned with the container "items' height" and "itemsPerPage"

// Grid items (Standard) within 'My Library' pages
export const PAGE_GRID_MY_LIBRARY_ITEM_HEIGHT = 130;
export const PAGE_GRID_MY_LIBRARY_ITEM_XS = 1.5; // 8 items per line
export const PAGE_GRID_MY_LIBRARY_SPACING = 1.5;
export const PAGE_GRID_MY_LIBRARY_ITEMS_PER_PAGE = 56; // page of the pagination
export const PAGE_GRID_MY_LIBRARY_ITEMS_CONTAINER_HEIGHT = 1005; // Must be aligned with the container "items' height" and "itemsPerPage"

// Grid items (Masonary) within Discover page
export const PAGE_GRID_DISCOVER_COLUMNS = 5;
export const PAGE_GRID_DISCOVER_GAP = 1.5;
export const PAGE_GRID_DISCOVER_ITEMS_PER_PAGE = 10 * PAGE_GRID_DISCOVER_COLUMNS; // page of the pagination
export const PAGE_GRID_DISCOVER_COLUMN_HEIGHT_NO_GAP = 3000; // Grid column height - only cards without gaps
// Must be aligned with the container "items' height" and "itemsPerPage"
export const PAGE_GRID_DISCOVER_ITEMS_CONTAINER_HEIGHT =
	PAGE_GRID_DISCOVER_COLUMN_HEIGHT_NO_GAP +
	8 * PAGE_GRID_DISCOVER_GAP * (PAGE_GRID_DISCOVER_ITEMS_PER_PAGE / PAGE_GRID_DISCOVER_COLUMNS);

export const CANVAS_WIDTH = 520;
export const CANVAS_HEIGHT = 435;
export const GENERATION_CONTAINER_HEIGHT = CANVAS_HEIGHT + 130;
export const GENERATION_CONTAINER_IMAGES_LIST_ITEM_SIZE = 50;

export const browserTabTitle = {
	BROWSER_TAB_MY_PROJECTS: `${PAGE_TITLE_MY_PROJECTS} | ${APP_TITLE}`,
	BROWSER_TAB_MY_LIBRARY: `${PAGE_TITLE_MY_LIBRARY} | ${APP_TITLE}`,
	BROWSER_TAB_PROJECT: `${PAGE_TITLE_PROJECT} | ${APP_TITLE}`,
	BROWSER_TAB_TUTORIALS: `${PAGE_TITLE_TUTORIALS} | ${APP_TITLE}`,
	BROWSER_TAB_DISCOVER: `${PAGE_TITLE_DISCOVER} | ${APP_TITLE}`,
	// TODO_NEXT add the rest...
} as const;

// TODO_NEXT move in .env
// you tube video id for no projects view
export const YOUTUBE_VIDEO_ID = 'OzPoJprIzXo';

export const inPaintToolsKeys = {
	BRUSH: 'BRUSH',
	ERASER: 'ERASER',
	EXPAND: 'EXPAND',
	SIZE_SLIDER: 'SIZE_SLIDER',
	UNDO: 'UNDO',
	CLOSE: 'CLOSE',
} as const;

export const uploadImageStatus = {
	ERROR_UPLOAD_FAILED: 'ERROR_UPLOAD_FAILED',
	ERROR_UPLOAD_FILE_TYPE: 'ERROR_UPLOAD_FILE_TYPE',
	ERROR_UPLOAD_IMAGE_SIZE: 'ERROR_UPLOAD_IMAGE_SIZE',
	SUCCESS_UPLOAD: 'SUCCESS_UPLOAD',
} as const;

export const sizeKeys = {
	XL: 'XL',
	L: 'L',
	M: 'M',
	S: 'S',
	XS: 'XS',
} as const;

export const uploadImageAllowedTypes = ['image/jpeg', 'image/png'];

// Parameter - CFG values
export const CGF_DEFAULT_VALUE = 4.5;
export const CFG_MIN_VALUE = 1;
export const CFG_MAX_VALUE = 12;
export const CFG_STEP_VALUE = 0.5;

// Parameter - Clip Skip values
export const CLIP_SKIP_DEFAULT_VALUE = 2;
export const CLIP_SKIP_MIN_VALUE = 1;
export const CLIP_SKIP_MAX_VALUE = 4;
export const CLIP_SKIP_STEP_VALUE = 1;

// Upload image limitations
export const UPLOAD_MAX_SIZE_MB = 5;
export const UPLOAD_MAX_SIZE_PX = 2600;

// Parameter - Sharpness
export const DEFAULT_SHARPNESS_VALUE = 'none';

export const SHARPNESS_DATA = [
	{
		name: 'None',
		value: 'none',
		label: 'None',
		isVisible: true,
		disabled: false,
	},
	{
		name: 'Low',
		value: 'low',
		label: 'Low',
		isVisible: true,
		disabled: false,
	},
	{
		name: 'Medium',
		value: 'mid',
		label: 'Medium',
		isVisible: true,
		disabled: false,
	},
	{
		name: 'High',
		value: 'high',
		label: 'High',
		isVisible: true,
		disabled: false,
	},
];

// Generation request body
export const GENERATION_BATCH_SIZE = 4;
export const GENERATION_STEPS = 4;
