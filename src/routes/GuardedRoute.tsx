/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Navigate } from 'react-router-dom';
import routesPaths from '../routes/paths';

import useSliceAuthentication from '../store/hooks/useSliceAuthentication';

type Props = {
	component: React.ReactElement;
};

const { SIGN_IN } = routesPaths;

const GuardedRoute: React.FC<Props> = ({ component: RouteComponent }) => {
	const { isAuthenticated } = useSliceAuthentication();

	if (isAuthenticated && RouteComponent) {
		return RouteComponent;
	}

	return <Navigate to={SIGN_IN} />;
};

export default GuardedRoute;
