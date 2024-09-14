/** Copyright (c) 2024-present Kristiyan Dimitrov */
import { lazy } from 'react';
import routesPaths from './paths';

// Lazy-loaded components
const MainLayout = lazy(() => import('../components/Layouts/MainLayout'));
const PublicLayout = lazy(() => import('../components/Layouts/PublicLayout'));

const SignInPage = lazy(() => import('../pages/Auth/SignInPage'));
const SignUpPage = lazy(() => import('../pages/Auth/SignUpPage'));
const SignUpDiscordPage = lazy(() => import('../pages/Auth/SignUpDiscordPage'));
const ValidateDiscordPage = lazy(() => import('../pages/Auth/ValidateDiscordPage'));
const EmailValidationPage = lazy(() => import('../pages/Auth/EmailValidationPage'));
const ForgotPasswordPage = lazy(() => import('../pages/Auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/Auth/ResetPasswordPage'));

const NotFoundPage = lazy(() => import('../pages/StaticPages/NotFoundPage'));
const BuyCreditsPage = lazy(() => import('../pages/PublicPages/BuyCreditsPage'));
const HelpPage = lazy(() => import('../pages/PublicPages/HelpPage'));
const PrivacyPolicyPage = lazy(() => import('../pages/PublicPages/ToSPages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('../pages/PublicPages/ToSPages/TermsOfServicePage'));

const MyProjectsPage = lazy(() => import('../pages/MyProjects/MyProjects'));
const MyLibraryPage = lazy(() => import('../pages/MyLibrary/MyLibrary'));
const ProjectPage = lazy(() => import('../pages/Project/Project'));
const ProfilePage = lazy(() => import('../pages/Profile/ProfilePage'));
const ProfileSettingsPage = lazy(() => import('../pages/Profile/Pages/ProfileSettingsPage'));
const ProfileSecurityPage = lazy(() => import('../pages/Profile/Pages/ProfileSecurityPage'));
const Tutorials = lazy(() => import('../pages/Tutorials/Tutorials'));
const Discover = lazy(() => import('../pages/Discover/Discover'));

const routesConfig = [
	// Public routes
	{
		path: routesPaths.LANDING,
		element: PublicLayout,
		private: false,
		children: [
			{ path: routesPaths.SIGN_IN, element: SignInPage },
			{ path: routesPaths.SIGNUP, element: SignUpPage },
			{ path: routesPaths.SIGNUP_DISCORD, element: SignUpDiscordPage },
			{ path: routesPaths.VALIDATE_DISCORD, element: ValidateDiscordPage },
			{ path: routesPaths.FORGOT_PASSWORD, element: ForgotPasswordPage },
			{ path: routesPaths.RESET_PASSWORD, element: ResetPasswordPage },
			{ path: routesPaths.BUY_CREDITS, element: BuyCreditsPage },
			{ path: routesPaths.VERIFY_EMAIL, element: EmailValidationPage },
			{ path: routesPaths.HELP, element: HelpPage },
			{ path: routesPaths.PRIVACY_POLICY, element: PrivacyPolicyPage },
			{ path: routesPaths.TERMS_OF_SERVICE, element: TermsOfServicePage },
		],
	},
	// Private/Protected routes
	{
		path: routesPaths.LANDING,
		element: MainLayout,
		private: true,
		children: [
			{
				path: routesPaths.PROFILE,
				element: ProfilePage,
				private: true,
				children: [
					{
						path: routesPaths.PROFILE_SECURITY,
						element: ProfileSecurityPage,
						private: true,
					},
					{
						path: routesPaths.PROFILE_SETTINGS,
						element: ProfileSettingsPage,
						private: true,
					},
				],
			},
			{ path: routesPaths.MY_PROJECTS, element: MyProjectsPage, private: true },
			{ path: routesPaths.MY_LIBRARY, element: MyLibraryPage, private: true },
			{ path: routesPaths.PROJECT, element: ProjectPage, private: true },
			{ path: routesPaths.TUTORIALS, element: Tutorials, private: true },
			{ path: routesPaths.DISCOVER, element: Discover, private: true },
		],
	},
	{
		path: routesPaths.ALL,
		private: false,
		element: NotFoundPage,
	},
];

export default routesConfig;
