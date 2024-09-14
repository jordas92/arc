/** Copyright (c) 2024-present Kristiyan Dimitrov */

import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import routesConfig from './routesConfig';
import GuardedRoute from '../routes/GuardedRoute';
import LoadingScreen from '../components/Feedback/LoadingScreen';

function generateRoutes(config) {
	return config.map((route, index) => {
		if (route.children) {
			return (
				<Route
					key={index}
					path={route.path}
					element={
						route.private ? (
							<GuardedRoute component={<route.element />} />
						) : (
							<route.element />
						)
					}
				>
					{generateRoutes(route.children)}
				</Route>
			);
		}

		return (
			<Route
				key={index}
				path={route.path}
				element={
					route.private ? (
						<GuardedRoute component={<route.element />} />
					) : (
						<route.element />
					)
				}
			/>
		);
	});
}

function AppRoutes() {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<Routes>{generateRoutes(routesConfig)}</Routes>
		</Suspense>
	);
}

export default AppRoutes;
