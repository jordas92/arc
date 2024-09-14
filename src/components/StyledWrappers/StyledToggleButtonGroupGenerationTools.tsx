/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { ToggleButtonGroup } from '@mui/material';

type CustomProps = {
	allRounded?: boolean;
};

const StyledToggleButtonGroupGenerationTools = styled(ToggleButtonGroup, {
	shouldForwardProp: (prop: string) => !['allRounded'].includes(prop),
})<CustomProps>(({ theme, allRounded }) => ({
	width: 'unset',

	'.MuiButtonBase-root': {
		padding: '6px 10px',
		fontSize: '13px',

		svg: {
			height: '26px',
			width: '26px',
			padding: '2px',
			margin: '1px 6px 0 0',
			borderRadius: '30%',
			border: `1px solid ${theme.palette.background.iconActive}`,

			path: {
				stroke: theme.palette.background.iconHover,
				fill: theme.palette.background.iconHover,
				transition: '0.3s',
			},

			g: {
				path: {
					stroke: theme.palette.text.active,
					fill: 'none',
				},
			},
		},

		'&:hover': {
			'&:not(.Mui-selected)': {
				transition: '0.3s',

				svg: {
					path: {
						stroke: theme.palette.text.hover,
						fill: theme.palette.text.hover,
						transition: '0.3s',
					},
				},

				g: {
					path: {
						stroke: theme.palette.text.hover,
						fill: 'none',
					},
				},
			},
		},
	},

	'.Mui-selected': {
		backgroundColor: theme.palette.background.surfaceHighest,
		color: theme.palette.text.hover,
		cursor: 'default',

		svg: {
			backgroundColor: theme.palette.accent.primary,

			path: {
				stroke: theme.palette.background.surfaceSolid,
				fill: theme.palette.background.surfaceSolid,
			},

			g: {
				path: {
					stroke: theme.palette.background.surfaceSolid,
					fill: 'none',
				},
			},
		},
	},

	'.MuiToggleButtonGroup-grouped': {
		marginRight: '5px',
	},

	'.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
		border: 'unset',
		marginRight: '0',
		borderRadius: `${allRounded ? '6px' : 'none'}`,
	},

	'.MuiToggleButtonGroup-grouped:not(:last-of-type)': {
		border: 'unset',
		marginRight: '5px',
		borderRadius: `${allRounded ? '6px' : 'none'}`,
	},
}));

export default StyledToggleButtonGroupGenerationTools;
