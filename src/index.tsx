import * as ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import TagManager from 'react-gtm-module';

import App from './App';

import { APP_DESCRIPTION, APP_TITLE } from './constants/default';

import ErrorPage from './pages/StaticPages/ErrorPage';

const root = ReactDOM.createRoot(document.getElementById('root') as any);

const tagManagerArgs = {
	gtmId: process.env?.REACT_APP_GTM,
};

root.render(
	<>
		<Helmet>
			<meta name="viewport" content="initial-scale=1, width=device-width" />
			<meta name="description" content={APP_DESCRIPTION} />

			<title>{APP_TITLE}</title>

			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&family=Syne:wght@600&display=swap"
			/>
			{/* Add the Google Tag Manager script */}
			{process.env?.REACT_APP_ENV === 'production' && TagManager.initialize(tagManagerArgs)}
		</Helmet>

		<ErrorBoundary fallback={<ErrorPage />}>
			<App />
		</ErrorBoundary>
	</>,
);
