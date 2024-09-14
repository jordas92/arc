/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const navigate = (path: string) => {
	history.push(path);
	history.replace(path);
	history.go(0);
};

const redirectTo = (path: string) => {
	history.replace(path);
};

export { navigate, redirectTo };
