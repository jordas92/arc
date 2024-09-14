import { getOriginFromUrl } from '../commonUtils';

describe('commonUtils', () => {
	describe(`${getOriginFromUrl.name}`, () => {
		test('Returns correct string (origin)', () => {
			const urlOrigin = 'foo';

			global.window = Object.create(window);
			Object.defineProperty(window, 'location', {
				value: { origin: urlOrigin },
				writable: true,
			});

			expect(getOriginFromUrl()).toEqual(urlOrigin);
		});

		test('Returns an empty string, when origin is falsy', () => {
			const urlOrigin = null;

			global.window = Object.create(window);
			Object.defineProperty(window, 'location', {
				value: { origin: urlOrigin },
				writable: true,
			});

			expect(getOriginFromUrl()).toEqual('');
		});

		test('Returns an empty string, when origin prop is missing', () => {
			global.window = Object.create(window);
			Object.defineProperty(window, 'location', {
				value: { foo: 'bar' },
				writable: true,
			});

			expect(getOriginFromUrl()).toEqual('');
		});
	});
});
