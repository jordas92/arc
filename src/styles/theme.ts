import { createTheme, responsiveFontSizes } from '@mui/material';
import { DARK_MODE_THEME, LIGHT_MODE_THEME } from '../constants/default';
import { colors } from './colors';

declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		headerLink: true;
		profileSidebarTitle: true;
		profileSidebarItem: true;
		profilePageTitle: true;
		profileButton: true;
		profileDefaultText: true;
		navigationLink: true;
		projectTitle: true;
		creditsModalTitle: true;
		creditsModalText: true;
		creditsModalRadioText: true;
		creditsModalRadioSubText: true;
		redeemText: true;
		mobileViewTitle: true;
		mobileViewText: true;
	}
}

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		submitButton: true;
		shareProfileButton: true;
		linkDiscordButton: true;
	}
}

declare module '@mui/material/styles' {
	interface PaletteColor {
		lightGreen?: string;
		lightBlue?: string;
		grey?: string;
		lightGrey?: string;
		gray?: string;
		darkPink?: string;
	}

	interface SimplePaletteColorOptions {
		lightGreen?: string;
		lightBlue?: string;
		grey?: string;
		lightGrey?: string;
		gray?: string;
		darkPink?: string;
	}
}

export const getAppTheme = (mode: typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME): unknown => {
	let theme = createTheme({
		palette: {
			mode,
			primary: {
				main: '#5646D6',
				dark: '#0B0636',
				lightGreen: '#60E09F',
				lightBlue: '#6E2FF3',
				grey: '#0F0E1A',
				lightGrey: 'rgba(255, 255, 255, 0.7)',
				gray: 'rgba(135, 140, 153, 0.08)',
				darkPink: 'rgba(219, 50, 172, 0.08)',
			},
			secondary: {
				main: '#60E09F',
				light: '#FFFFFF',
			},
			accent: {
				primary: colors.accentPrimary,
				secondary: colors.accentSecondary,
				black: colors.accentDark,
			},
			error: {
				main: '#FF0000',
			},
		},
		// TODO_NEXT - Let's use T-shirt sizes
		// TODO_NEXT - Let's use generic names
		// TODO_NEXT - Let's remove marginLeft, marginBottom, color etc. from Typography
		components: {
			MuiTypography: {
				variants: [
					{
						props: { variant: 'headerLink' },
						style: {
							fontStyle: 'normal',
							fontWeight: 400,
							fontSize: '16px',
							lineHeight: '19px',
							letterSpacing: '0.01em',
							color: 'rgba(255, 255, 255, 0.6)',
							textTransform: 'capitalize',
							marginLeft: '7px',
						},
					},
					{
						props: { variant: 'profileSidebarTitle' },
						style: {
							fontStyle: 'normal',
							fontWeight: 400,
							fontSize: '14px',
							lineHeight: '24px',
							letterSpacing: '0.15px',
							color: '#ffffff',
							textTransform: 'capitalize',
							marginBottom: '20px',
						},
					},
					{
						props: { variant: 'profileSidebarItem' },
						style: {
							fontStyle: 'normal',
							fontWeight: 400,
							fontSize: '12px',
							lineHeight: '14px',
							letterSpacing: '0.15px',
							color: '#ffffff',
							textTransform: 'capitalize',
						},
					},
					{
						props: { variant: 'profilePageTitle' },
						style: {
							fontStyle: 'normal',
							fontWeight: 600,
							fontSize: '32px',
							lineHeight: '38px',
							letterSpacing: '0.30px',
							color: '#ffffff',
							textTransform: 'capitalize',
						},
					},
					{
						props: { variant: 'profileButton' },
						style: {
							fontStyle: 'normal',
							fontWeight: 400,
							fontSize: '14px',
							lineHeight: '24px',
							letterSpacing: '0.15px',
							color: '#ffffff',
							textTransform: 'capitalize',
						},
					},
					{
						props: { variant: 'navigationLink' },
						style: {
							fontStyle: 'normal',
							fontWeight: 700,
							fontSize: '14px',
							lineHeight: '24px',
							letterSpacing: '0.15px',
							color: '#ffffff',
						},
					},
					{
						props: { variant: 'projectTitle' },
						style: {
							fontStyle: 'normal',
							fontWeight: 400,
							fontSize: '24px',
							lineHeight: '116.7%',
							letterSpacing: '0.15px',
							color: '#ffffff',
							opacity: '0.4',
						},
					},
					{
						props: { variant: 'creditsModalTitle' },
						style: {
							fontStyle: 'normal',
							fontWeight: 400,
							fontSize: '24px',
							lineHeight: '32px',
							color: '#ffffff',
						},
					},
					{
						props: { variant: 'creditsModalText' },
						style: {
							fontStyle: 'normal',
							fontWeight: 400,
							fontSize: '14px',
							lineHeight: '21px',
							color: '#ffffff',
							letterSpacing: '0.15px',
							opacity: '0.8',
						},
					},
					{
						props: { variant: 'creditsModalRadioText' },
						style: {
							fontStyle: 'normal',
							fontWeight: 400,
							fontSize: '16px',
							lineHeight: '20px',
							color: '#ffffff',
							letterSpacing: '0.15px',
						},
					},
					{
						props: { variant: 'creditsModalRadioSubText' },
						style: {
							fontStyle: 'normal',
							fontWeight: 400,
							fontSize: '11px',
							lineHeight: '11px',
							color: '#ffffff',
							letterSpacing: '0.15px',
							opacity: '0.5',
						},
					},
					{
						props: { variant: 'redeemText' },
						style: {
							fontStyle: 'normal',
							fontWeight: 400,
							fontSize: '14px',
							lineHeight: '24px',
							color: '#ffffff',
							letterSpacing: '0.24px',
						},
					},
					{
						props: { variant: 'mobileViewTitle' },
						style: {
							fontStyle: 'normal',
							fontWeight: 600,
							fontSize: '26px',
							lineHeight: '32px',
							color: '#ffffff',
							letterSpacing: '0.19px',
						},
					},
					{
						props: { variant: 'mobileViewText' },
						style: {
							fontStyle: 'normal',
							fontWeight: 400,
							fontSize: '16px',
							lineHeight: '22px',
							color: 'rgba(255, 255, 255, 0.80)',
							letterSpacing: '0.29px',
						},
					},
				],
			},
			MuiLink: {
				styleOverrides: {
					root: {
						textDecoration: 'none',
					},
				},
			},
			MuiButton: {
				variants: [
					{
						props: { variant: 'submitButton' },
						style: {
							color: '#FFFFFF',
							fontStyle: 'normal',
							fontWeight: 400,
							fontSize: '18px',
							lineHeight: '24px',
							background: '#6E2FF3',
							borderRadius: '6px',
							padding: '15px 25px',
							textTransform: 'none',
							transition: 'background 0.3s ease',
							':hover': {
								background:
									'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #6E2FF3',
							},
							':disabled': {
								color: 'rgba(255, 255, 255, 0.3)',
								background: 'rgba(110, 47, 243, 0.24)',
							},
						},
					},
					{
						props: { variant: 'shareProfileButton' },
						style: {
							color: '#FFFFFF',
							fontStyle: 'normal',
							fontWeight: 400,
							fontSize: '14px',
							lineHeight: '24px',
							letterSpacing: '0.24px',
							background: 'rgba(86, 70, 214, 0.32)',
							borderRadius: '8px',
							padding: '6px 10px',
							textTransform: 'none',
							width: '100%',
							transition: 'background 0.3s ease',
							':hover': {
								background: '#6E2FF3',
							},
							':disabled': {
								color: 'rgba(255, 255, 255, 0.3)',
								background: 'rgba(110, 47, 243, 0.24)',
							},
						},
					},
					{
						props: { variant: 'linkDiscordButton' },
						style: {
							color: '#46417852',
							fontStyle: 'normal',
							fontWeight: 400,
							fontSize: '18px',
							background: '#46417852',
							borderRadius: '6px',
							padding: '15px 25px',
							textTransform: 'none',
							transition: 'background 0.3s ease',
							':hover': {
								background:
									'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #6E2FF3',
							},
							':disabled': {
								color: 'rgba(255, 255, 255, 0.3)',
								background: 'rgba(110, 47, 243, 0.24)',
							},
						},
					},
				],
			},
		},
		typography: {
			fontFamily: 'Roboto',
			body1: {
				fontSize: '14px',
				color: '#FFFFFF',
			},
		},
	});
	theme = responsiveFontSizes(theme);

	theme.components?.MuiTypography?.variants?.push({
		props: { variant: 'profileDefaultText' },
		style: {
			fontStyle: 'normal',
			fontWeight: 600,
			fontSize: '32px',
			lineHeight: '38px',
			letterSpacing: '0.30px',
			color: theme.palette.primary.grey,
			textTransform: 'capitalize',
			opacity: '56%',
		},
	});

	return theme;
};

export default getAppTheme;
