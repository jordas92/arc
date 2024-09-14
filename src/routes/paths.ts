/** Copyright (c) 2024-present Kristiyan Dimitrov */

const routesPaths = {
	ALL: '/*',
	ERROR_PAGE: '/error-page',
	LANDING: '/',
	LOGOUT: '/logout',
	SIGN_IN: '/signin',
	SIGNUP: '/signup',
	SIGNUP_DISCORD: '/signup-discord/:promptId',
	VALIDATE_DISCORD: '/valid-discord/:discordRefreshToken/:discordToken',
	VERIFY_EMAIL: '/auth/verification/verify/:userId/:hash',
	FORGOT_PASSWORD: '/forgot-password',
	RESET_PASSWORD: '/reset-password',
	PROFILE: '/profile',
	PROFILE_SECURITY: '/profile/security',
	PROFILE_SETTINGS: '/profile/settings',
	PROFILE_INVOICES: '/profile/invoices',
	MY_PROJECTS: '/my-projects',
	MY_LIBRARY: '/my-library',
	PROJECT: '/project/:id',
	TERMS_OF_SERVICE: '/terms-of-service',
	PRIVACY_POLICY: '/privacy-policy',
	BUY_CREDITS: '/buy-credits',
	USER_CONNECT_TO_DISCORD: '/auth/discord/login',
	HELP: '/help',
	TUTORIALS: '/tutorials',
	DISCOVER: '/discover',
} as const;

export default routesPaths;
