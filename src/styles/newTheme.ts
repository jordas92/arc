/** Copyright (c) 2023-present Kristiyan Dimitrov */
/* eslint-disable max-len */

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { DARK_MODE_THEME, LIGHT_MODE_THEME } from 'constants/default';
import { CSSProperties } from 'react';
import { colors } from './colors';
import { typography } from './typography';

declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		h2: true;
		h3: true;
		h4: true;
		h5: true;
		h6: true;
		body3: true;
	}
}

declare module '@mui/material/Button' {
	export interface ButtonPropsVariantOverrides {
		primary: true;
		secondary: true;
		flat: true;
		basic: true;
		basicWithBorder: true;
		shiny: true;
		arcanaMagic: true;
		btnLink: true;
	}
}

declare module '@mui/material/styles' {
	export interface Palette {
		accent: {
			primary: string;
			secondary: string;
			black: string;
		};
	}

	export interface PaletteOptions {
		accent: {
			primary: string;
			secondary: string;
			black: string;
		};
	}

	interface TypeBackground {
		surfaceDarkLowest: string;
		surfaceDarkLow: string;
		surfaceSolid: string;
		surfaceSolidLight: string;
		surfaceLowest: string;
		surfaceLow: string;
		surfaceHigh: string;
		surfaceHighest: string;
		surfaceSolidDark: string;
		gradientMain: string;
		gradientSurface: string;
		gradientAccentPrimary: string;
		gradientColorful: string;
		iconActive: string;
		iconInActive: string;
		iconHover: string;
		iconActiveMainColor: string;
		backgroundOverlay: string;
	}

	interface TypeText {
		textLowest: string;
		contrastDark: string;

		hover: string;
		selected: string;
		active: string;
		disabled: string;
	}

	interface TypographyVariants {
		subtitle3: CSSProperties;
		subtitle4: CSSProperties;
		body3: CSSProperties;
	}

	interface TypographyVariantsOptions {
		subtitle3?: CSSProperties;
		subtitle4?: CSSProperties;
		body3?: CSSProperties;
	}
}

declare module '@mui/material/styles/createTypography' {
	interface FontStyle {
		secondaryFontFamily: string;
	}
}

export const getAppTheme = (mode: typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME): unknown => {
	let globalTheme = createTheme({
		palette: {
			mode,
			primary: {
				main: colors.primary,
				light: colors.primaryLight,
				dark: colors.primaryDark,
			},
			secondary: {
				main: colors.secondary,
				light: colors.secondaryLight,
				dark: colors.secondaryDark,
			},
			background: {
				paper: colors.backgroundMain,
				default: colors.backgroundMain,

				surfaceDarkLowest: `rgba(${colors.backgroundMainRGB}, 0.9)`,
				surfaceDarkLow: `rgba(${colors.backgroundMainRGB}, 0.48)`,
				surfaceSolid: colors.surfaceSolid,
				surfaceSolidLight: colors.surfaceSolidLight,
				surfaceLowest: `rgba(${colors.surfaceRGB}, 0.08)`,
				surfaceLow: `rgba(${colors.surfaceRGB}, 0.12)`,
				surfaceHigh: `rgba(${colors.surfaceRGB}, 0.16)`,
				surfaceHighest: `rgba(${colors.surfaceRGB}, 0.24)`, // borders
				surfaceSolidDark: colors.surfaceSolidDark, // settings configuration

				gradientMain: colors.gradientMain,
				gradientSurface: `linear-gradient(145deg, rgba(${colors.surfaceRGB}, 0.08) 40.77%, rgba(${colors.surfaceRGB}, 0.02) 75.42%)`,
				gradientAccentPrimary: colors.gradientAccentPrimary,
				gradientColorful: colors.colorfulGradient,

				// iconActive: `rgba(${colors.surfaceRGB}, 0.30)`,
				iconActive: `rgba(${colors.backgroundMainRGB}, 0.48)`,
				iconInActive: `rgba(${colors.surfaceRGBDisabled}, 1)`,
				iconHover: `rgba(${colors.surfaceRGB}, 0.70)`,
				iconActiveMainColor: `rgba(${colors.primaryRGB}, 0.08)`,
				backgroundOverlay: `rgba(${colors.backgroundMainRGB}, 0.4)`,
			},
			accent: {
				primary: colors.accentPrimary,
				secondary: colors.accentSecondary,
				black: colors.accentDark,
			},
			error: {
				main: colors.errorMain,
				light: colors.errorLight,
				dark: colors.errorDark,
			},
			// warning: {
			// 	main: '',
			// },
			success: {
				main: colors.successMain,
			},
			// info: {
			// 	main: '',
			// },
			text: {
				// THEME check whether are correctly placed
				primary: `rgba(${colors.contrastTextRGB}, 1.00)`,
				secondary: `rgba(${colors.contrastTextRGB}, 0.80)`,
				textLowest: `rgba(${colors.contrastTextRGB}, 0.48)`,
				contrastDark: colors.backgroundMain,

				// THEME Move to action ?!
				hover: `rgba(${colors.contrastTextRGB}, 1.00)`,
				selected: `rgba(${colors.contrastTextRGB}, 0.80)`,
				active: `rgba(${colors.contrastTextRGB}, 0.64)`,
				disabled: `rgba(${colors.contrastTextRGB}, 0.24)`,
			},
			action: {
				// active: '',
				hover: `rgba(${colors.contrastTextRGB}, 1.00)`,
				// selected: '',
				// disabled: '',
			},
		},
		typography: {
			// TODO_NEXT
			// fontFamily: 'Roboto',
			// secondaryFontFamily: 'Syne',
			fontSize: 14,
			fontWeightLight: 300,
			fontWeightRegular: 400,
			fontWeightMedium: 500,
			fontWeightBold: 700,
			h1: typography.h1,
			h2: typography.h2,
			h3: typography.h3,
			h4: typography.h4,
			h5: typography.h5,
			h6: typography.h6,
			body1: typography.body1,
			body2: typography.body2,
			body3: typography.body3,
			subtitle1: typography.subtitle1,
			subtitle2: typography.subtitle2,
			subtitle3: typography.subtitle3,
			subtitle4: typography.subtitle4,
		},
		// THEME_NEXT extend shape with custom props
		// shape: {
		// 	borderRadius1: 1,
		// },
	});

	globalTheme = responsiveFontSizes(globalTheme);

	return createTheme(
		{
			components: {
				// All typography variants
				MuiTypography: {
					variants: [
						{
							props: { variant: 'h2' },
							style: globalTheme.typography.h2,
						},
						{
							props: { variant: 'h3' },
							style: globalTheme.typography.h3,
						},
						{
							props: { variant: 'h4' },
							style: globalTheme.typography.h4,
						},
						{
							props: { variant: 'h5' },
							style: globalTheme.typography.h5,
						},
						{
							props: { variant: 'h6' },
							style: globalTheme.typography.h6,
						},
					],
				},
				MuiButtonBase: {
					defaultProps: {
						disableRipple: true,
					},
				},
				MuiListItemButton: {
					styleOverrides: {
						root: {
							':hover': {
								backgroundColor: globalTheme.palette.primary.light,
							},
						},
					},
				},
				MuiMenuItem: {
					styleOverrides: {
						root: {
							':hover': {
								backgroundColor: globalTheme.palette.background.surfaceLow,
							},
						},
					},
				},
				MuiButtonGroup: {
					defaultProps: {
						disableRipple: true,
					},
				},
				MuiButton: {
					styleOverrides: {
						root: {
							borderRadius: '8px',
							':hover': {
								background: globalTheme.palette.primary.light,
							},
						},
					},
					variants: [
						{
							props: { variant: 'primary' },
							style: {
								transition: '0.3s',
								padding: '12px 18px',
								textTransform: 'capitalize',
								background: globalTheme.palette.primary.main,
								...globalTheme.typography.h4,
								':hover': {
									background: globalTheme.palette.primary.light,
								},
								':disabled': {
									background: `rgba(${colors.primaryRGB}, 0.4)`,
									svg: {
										path: {
											stroke: globalTheme.palette.text.disabled,
										},
									},
								},
							},
						},
						{
							props: { variant: 'secondary' },
							style: {
								transition: '0.3s',
								padding: '12px 18px',
								textTransform: 'capitalize',
								background: globalTheme.palette.secondary.main,
								...globalTheme.typography.h4,
								':hover': {
									background: globalTheme.palette.secondary.light,
								},
								':disabled': {
									background: `rgba(${colors.secondaryRGB}, 0.4)`,
								},
							},
						},
						{
							props: { variant: 'flat' },
							style: {
								padding: '12px 20px',
								textTransform: 'capitalize',
								color: globalTheme.palette.text.active,
								background: globalTheme.palette.background.surfaceLow,
								...globalTheme.typography.h4,
								':hover': {
									background: globalTheme.palette.background.surfaceHigh,
									color: globalTheme.palette.text.hover,
								},
								':disabled': {
									opacity: 0.4,
								},
							},
						},
						{
							props: { variant: 'basic' },
							style: {
								padding: '12px 20px',
								textTransform: 'capitalize',
								color: globalTheme.palette.text.active,
								background: 'unset',
								...globalTheme.typography.h4,
								':hover': {
									background: 'unset',
									color: globalTheme.palette.text.hover,
								},
								':disabled': {
									opacity: 0.4,
								},
							},
						},
						{
							props: { variant: 'basicWithBorder' },
							style: {
								padding: '7px 24px',
								textTransform: 'capitalize',
								color: globalTheme.palette.text.primary,
								background: 'unset',
								borderRadius: '39px',
								border: '1px solid',
								borderColor: globalTheme.palette.background.surfaceHighest,
								...globalTheme.typography.h5,
								':hover': {
									background: globalTheme.palette.background.surfaceHighest,
								},
								':disabled': {
									opacity: 0.4,
								},
							},
						},
						{
							props: { variant: 'shiny' },
							style: {
								transition: '0.3s',
								padding: '12px 18px',
								textTransform: 'capitalize',
								background:
									'linear-gradient(82deg, #DE04A4 17.39%, #7823E7 80.07%, #F9ACFF 134.98%)',
								...globalTheme.typography.h4,

								svg: {
									path: {
										stroke: globalTheme.palette.text.hover,
										fill: globalTheme.palette.text.hover,
									},
								},

								':hover': {
									transition: '0.3s',
									background: `linear-gradient(82deg, #8D44BE 17.39%, #8D44BE 80.07%, #8D44BE 134.98%)`,
								},
								':disabled': {
									// background: `rgba(${colors.primaryRGB}, 0.4)`,
									background:
										'linear-gradient(82deg, rgba(222, 4, 164, 0.4) 17.39%, rgba(120, 35, 231, 0.4) 80.07%, rgba(249, 172, 255, 0.4) 134.98%)',
									svg: {
										path: {
											stroke: globalTheme.palette.text.disabled,
											fill: globalTheme.palette.text.disabled,
										},
									},
								},
							},
						},
						{
							props: { variant: 'arcanaMagic' },
							style: {
								transition: '0.3s',
								padding: '12px 18px',
								textTransform: 'capitalize',
								leadingTrim: 'both',
								textEdge: 'cap',
								fontSize: '13px',
								fontWeight: '700',
								lineHeight: '24px',
								letterSpacing: '0.15px',
								background:
									'linear-gradient(82deg, #DE04A4 17.39%, #7823E7 80.07%, #F9ACFF 134.98%)',
								...globalTheme.typography.h4,

								svg: {
									path: {
										stroke: globalTheme.palette.text.hover,
										// fill: globalTheme.palette.text.hover,
									},
								},

								':hover': {
									// transition: '0.3s',
									transition: 'all 0.25s ease-out',
									transform: 'scale(1.05)',
									boxShadow: '0px 4.2px 11.925px 0px rgba(210, 8, 172, 0.32)',
									background: `linear-gradient(82deg, #DE04A4 17.39%, #7823E7 80.07%, #F9ACFF 134.98%)`,
								},
								':disabled': {
									// background: `rgba(${colors.primaryRGB}, 0.4)`,
									background:
										'linear-gradient(82deg, rgba(222, 4, 164, 0.4) 17.39%, rgba(120, 35, 231, 0.4) 80.07%, rgba(249, 172, 255, 0.4) 134.98%)',
									svg: {
										path: {
											stroke: globalTheme.palette.text.disabled,
											fill: globalTheme.palette.text.disabled,
										},
									},
								},
							},
						},
						{
							props: { variant: 'btnLink' },
							style: {
								padding: '0 2px',
								textTransform: 'unset',
								color: globalTheme.palette.primary.main,
								background: 'unset',
								...globalTheme.typography.h4,
								':hover': {
									background: 'unset',
									color: globalTheme.palette.primary.light,
								},
								':disabled': {
									opacity: 0.4,
								},
							},
						},
					],
				},
				MuiToggleButton: {
					styleOverrides: {
						root: {
							textTransform: 'capitalize',
							backgroundColor: 'unset',
							border: 'unset',
							margin: '1px',
							padding: '10px',
							color: globalTheme.palette.text.active,
							transition: '0.3s',
							...globalTheme.typography.h5,
							':hover': {
								color: globalTheme.palette.text.hover,
							},
						},
					},
				},
				// All link overrides
				MuiLink: {
					styleOverrides: {
						root: {
							textDecoration: 'none',
						},
					},
				},
				MuiCard: {
					styleOverrides: {
						root: {
							'.MuiCardActionArea-focusHighlight': {
								background: 'transparent',
							},
						},
					},
				},
				MuiAccordionSummary: {
					styleOverrides: {
						root: {
							backgroundColor: globalTheme.palette.background.surfaceLowest,
							color: globalTheme.palette.text.primary,
							margin: '8px 0px 0px',
							transition: 'font-size 0.3s',
							'&.Mui-expanded': {
								fontSize: '16px',
								background: globalTheme.palette.primary.main,
							},
						},
						content: {
							'&.Mui-expanded': {
								margin: '12px 0',
							},
						},
					},
				},
				MuiAccordionDetails: {
					styleOverrides: {
						root: {
							padding: '24px 16px 8px',
							'& a': {
								color: globalTheme.palette.text.primary,
							},
						},
					},
				},
				MuiTooltip: {
					styleOverrides: {
						tooltip: {
							padding: '8px 12px',
							background: globalTheme.palette.background.surfaceSolidLight,
							borderRadius: '8px',
							...globalTheme.typography.h6,
						},
						arrow: {
							color: globalTheme.palette.background.surfaceSolidLight,
						},
					},
				},
			},
		},
		globalTheme,
	);
};

export default getAppTheme;
