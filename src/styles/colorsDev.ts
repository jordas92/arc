/** Copyright (c) 2023-present Kristiyan Dimitrov */

const primaryRGB = '0, 140, 140';
const secondaryRGB = '0, 140, 100';
const backgroundMainRGB = '10, 25, 50';
const surfaceRGB = '155, 160, 170';
const error = '235, 26, 26';

export const colors = {
	primaryLight: `rgba(${primaryRGB}, 0.40)`,
	primary: `rgba(${primaryRGB}, 0.80)`,
	primaryDark: `rgba(${primaryRGB}, 1.00)`,

	secondaryLight: `rgba(${secondaryRGB}, 0.40)`,
	secondary: `rgba(${secondaryRGB}, 0.80)`,
	secondaryDark: `rgba(${secondaryRGB}, 1.00)`,

	accentPrimary: '#70abab',
	accentSecondary: '#ffa500',
	accentDark: '#4b350c',

	backgroundMain: `rgba(${backgroundMainRGB}, 1.00)`,

	surfaceSolid: '#192337',
	// surfaceSolidLight: '#292829', // Arcana graphite
	surfaceSolidDark: '#0a1932',
	surfaceSolidLight: '#383638',
	surfaceRGBDisabled: '106, 105, 108',

	gradientMain: 'linear-gradient(135deg, #FF65D6 0%, #CC11FB 103.89%)',

	gradientAccentPrimary:
		'linear-gradient(141deg, rgba(140, 185, 255, 0.16) 4.78%, rgba(0, 195, 255, 0.32) 96.75%)',

	colorfulGradient:
		'linear-gradient(97deg, #0091BE -30.78%, #6E2FF3 16.31%, #FF26B5 50.66%, #470073 102.78%)',

	errorMain: `rgba(${error}, 1.00)`,
	errorLight: `rgba(${error}, 0.64)`,

	successMain: '#60E09F',

	contrastTextRGB: '255, 255, 255',

	primaryRGB,
	secondaryRGB,
	backgroundMainRGB,
	surfaceRGB,
	error,
};
