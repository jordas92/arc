/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { MAX_LENGTH_PROMPT } from '../../constants/default';

// TODO_NEXT Ask the POs to verify all messages
const strings = {
	// Notification Error Messages
	invalidCredentials: 'Please verify your credentials.',
	wrongUserNameOrPassword: 'Wrong username or password. You are not authorized.',
	notAuthorized: 'You are not authorized.',
	gatewayTimeout:
		'The server encountered a temporary error and could not complete your request. Please try again in 30 seconds.',
	somethingWentWrong: `Sorry, something went wrong. We're working to fix it.`,
	somethingWentWrongWithSupport: `Oops! Something went wrong on our end. We're sorry for the inconvenience.
	 Our technical team is already aware of this issue and is working to fix it. In the meantime,
	 please try your request again in a little while. If the problem persists or if you have any questions,
	 feel free to contact our support team at support@example.com. Thank you for your patience.`,

	// Notifivation Warninig Messages
	promptLengthExceeded: `Prompt should be less than ${MAX_LENGTH_PROMPT} characters!`,

	// Notification Success Messages
	savedPromptRenamed: 'Prompt successfully renamed',
	savedPromptDeleted: 'Prompt successfully removed',

	// Project
	lastEdited: 'Last edited',
	initialProjectTitle: 'Untitled',

	// Common
	notAvailable: 'N/A',

	// Errors
	// 400 Bad Request - Invalid Request
	InvalidRequestText: 'The request is missing required parameters or contains invalid data.',
	// 401 Unauthorized - Authentication Required
	UnauthorizedText:
		'Authentication is required to access this resource. Please provide valid credentials.',
	EmailNotVerifiedText: 'Please verify your email before logging into your account.',
	// 403 Forbidden - Insufficient Permissions
	ForbiddenText:
		'You do not have permission to access this resource. Please contact your administrator for access.',
	// 404 Not Found - Resource Not Found
	ResourceNotFoundText:
		'The requested resource was not found on the server. Please check the URL and try again.',
	// 422 Unprocessable Entity - Validation Error
	ValidationFailedText:
		'The request data contains validation errors. Please correct the following issues: [list of validation errors].',
	// 500 Internal Server Error - Server Issue
	InternalServerErrorText:
		'An unexpected server error occurred while processing your request. Please try again later or contact support.',
	// 503 Service Unavailable
	ServiceUnavailable: 'Sorry, the service is currently unavailable. Please try again later.',
};

export default strings;
