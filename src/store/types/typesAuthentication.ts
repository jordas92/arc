/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { User } from './typesUser';

/**
 * Expected API response type. Only props related to the FE are included.
 */
export type ResponseSignIn = {
	access_token: string | null;
};

export type SingInData = {
	jwt: string;
};

export type AuthUser = User;
