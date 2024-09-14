/** Copyright (c) 2023-present Kristiyan Dimitrov */

export function timeSinceEvent(eventDate) {
	const eventTime = new Date(eventDate).getTime();
	const nowTime = new Date().getTime();
	const timeDiff = nowTime - eventTime;
	const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
	const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
	const minutesDiff = Math.floor(timeDiff / (1000 * 60));
	const secondsDiff = Math.floor(timeDiff / 1000);

	if (daysDiff >= 1) {
		return `Last edited ${daysDiff} day(s) ago`;
	}

	if (hoursDiff >= 1) {
		return `Last edited ${hoursDiff} hour(s) ago`;
	}

	if (minutesDiff >= 1) {
		return `Last edited ${minutesDiff} minute(s) ago`;
	}

	return `Last edited ${secondsDiff} second(s) ago`;
}

export function emailExist(mail: string, list: Array<any>) {
	list.filter((item) => {
		if (item.email === mail) {
			return true;
		}
		return null;
	});
	return false;
}

export function isValidEmail(emailAddress) {
	const re =
		// eslint-disable-next-line max-len
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(emailAddress).toLowerCase());
}

export function desiredAspectRatio(w, h) {
	return w / h;
}

export function calculateFromAspectRatio(side, aspectRatio) {
	const height = side / aspectRatio;
	return height.toFixed(2);
}

export function lastEditedTime(lastEdit: string) {
	const localTime = new Date(lastEdit);
	const getDateTimeFormat = Intl.DateTimeFormat().resolvedOptions();

	const timeZoneOffsetMinutes = new Date().getTimezoneOffset();
	const timeZoneOffsetHours = timeZoneOffsetMinutes / 60;

	localTime.setHours(localTime.getHours() - timeZoneOffsetHours);
	const localDateTimeString = localTime.toLocaleString(getDateTimeFormat.locale, {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		timeZone: getDateTimeFormat.timeZone,
		hour12: true,
	});
	return `Last edit ${localDateTimeString}`;
}

export function formatDateTime(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hour = String(date.getHours()).padStart(2, '0');
	const minute = String(date.getMinutes()).padStart(2, '0');
	const second = String(date.getSeconds()).padStart(2, '0');

	return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export function formatTime(dateTimeString: string) {
	const dateObject = new Date(dateTimeString);

	const hours = dateObject.getHours().toString().padStart(2, '0');
	const minutes = dateObject.getMinutes().toString().padStart(2, '0');

	return `${hours}:${minutes}`;
}

export function formatDate(dateString: string) {
	const date = new Date(dateString);
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);
	const isToday = date.toDateString() === today.toDateString();
	const isYesterday = date.toDateString() === yesterday.toDateString();

	if (isToday) {
		return 'today';
	}
	if (isYesterday) {
		return 'yesterday';
	}
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();

	return `${day}.${month}.${year}`;
}

export function isBase64(str) {
	try {
		// Attempt to decode the string
		atob(str);
		// Check if the decoding is successful
		return true;
	} catch (e) {
		// Decoding failed, not base64
		return false;
	}
}
