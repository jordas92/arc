/** Copyright (c) 2023-present Kristiyan Dimitrov */

const defaultLetterSpacing = 'normal';
const defaultFontWeight = 400;
// THEME_NEXT Do we really need to hardcode 'lineHeight' values?!
// 'lineHeight' depends of font-family, font-size
// const defaultlineHeight = ...;

export const typography = {
	h1: {
		fontSize: '32px',
		fontWeight: defaultFontWeight + 200,
		// lineHeight: 1.4,
		letterSpacing: defaultLetterSpacing,
	},
	h2: {
		fontSize: '24px',
		fontWeight: defaultFontWeight,
		// lineHeight: 1.4,
		letterSpacing: defaultLetterSpacing,
	},
	h3: {
		fontSize: '18px',
		fontWeight: defaultFontWeight,
		// lineHeight: 1.33,
		letterSpacing: defaultLetterSpacing,
	},
	h4: {
		fontSize: '16px',
		fontWeight: defaultFontWeight,
		// lineHeight: 1.33,
		letterSpacing: defaultLetterSpacing,
	},
	h5: {
		fontSize: '14px',
		fontWeight: defaultFontWeight,
		// lineHeight: 1.71,
		letterSpacing: defaultLetterSpacing,
	},
	h6: {
		fontSize: '12px',
		fontWeight: defaultFontWeight,
		// lineHeight: 1.71,
		letterSpacing: defaultLetterSpacing,
	},

	body1: {
		fontSize: '14px',
		fontWeight: defaultFontWeight,
		// lineHeight: 1.71,
		letterSpacing: defaultLetterSpacing,
	},
	body2: {
		fontSize: '12px',
		fontWeight: defaultFontWeight,
		// lineHeight: 1.71,
		letterSpacing: defaultLetterSpacing,
	},
	body3: {
		fontSize: '11px',
		fontWeight: defaultFontWeight,
		// lineHeight: 1.71,
		letterSpacing: defaultLetterSpacing,
	},

	subtitle1: {
		fontSize: '18px',
		fontWeight: defaultFontWeight + 100,
		// lineHeight: 1.33,
		letterSpacing: defaultLetterSpacing,
	},
	subtitle2: {
		fontSize: '16px',
		fontWeight: defaultFontWeight,
		// lineHeight: 1.5,
		letterSpacing: defaultLetterSpacing,
	},
	subtitle3: {
		fontSize: '14px',
		fontWeight: defaultFontWeight,
		// lineHeight: 1.71,
		letterSpacing: defaultLetterSpacing,
	},
	subtitle4: {
		fontSize: '12px',
		fontWeight: defaultFontWeight,
		// lineHeight: 1.16,
		letterSpacing: defaultLetterSpacing,
	},
};
