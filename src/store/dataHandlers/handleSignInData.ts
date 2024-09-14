/** Copyright (c) 2023-present Kristiyan Dimitrov */

import commonUtils from '../common/utils';

import { ResponseSignIn, SingInData } from '../types/typesAuthentication';

const { valueToString } = commonUtils;

const handleSignInData = (response: ResponseSignIn | any): SingInData => {
	// Takes care of the scenario when 'props' are missing in the payload
	const { access_token: accessToken = null } = response;

	const jwt = valueToString(accessToken);

	return { jwt };
};

export default handleSignInData;
