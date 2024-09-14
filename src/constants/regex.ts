/** Copyright (c) 2023-present Kristiyan Dimitrov */

// export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const emailRegex =
	// eslint-disable-next-line max-len
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passRegex = /^[a-zA-Z0-9\s!@#$%^&*()-=_+[\]{}|;':",.<>/?]*$/;
export const specialCharacters = /^[a-zA-Z0-9\s]*$/;
