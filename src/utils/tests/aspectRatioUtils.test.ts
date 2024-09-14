import { handleApectRatio } from '../aspectRatioUtils';

describe('aspectRatioUtils', () => {
	describe(`${handleApectRatio.name}`, () => {
		const defaultValue = 'foo';

		test('Returns correct string (ratio)', () => {
			const ratio = '2:3';
			const handledRatio = ratio;

			expect(handleApectRatio(ratio)).toEqual(handledRatio);
		});

		test('Returns correct string (ratio)', () => {
			const ratio = '16:9';
			const handledRatio = ratio;

			expect(handleApectRatio(ratio, defaultValue)).toEqual(handledRatio);
		});

		test('Returns correct string (ratio)', () => {
			const ratio = '16:0';
			const handledRatio = defaultValue;

			expect(handleApectRatio(ratio, defaultValue)).toEqual(handledRatio);
		});

		test('Returns correct string (ratio)', () => {
			const ratio = '0:16';
			const handledRatio = defaultValue;

			expect(handleApectRatio(ratio, defaultValue)).toEqual(handledRatio);
		});

		test('Returns correct string (ratio)', () => {
			const ratio = '16:bar';
			const handledRatio = defaultValue;

			expect(handleApectRatio(ratio, defaultValue)).toEqual(handledRatio);
		});

		test('Returns correct string (ratio)', () => {
			const ratio = 'bar:19';
			const handledRatio = defaultValue;

			expect(handleApectRatio(ratio, defaultValue)).toEqual(handledRatio);
		});

		test('Returns correct string (ratio)', () => {
			const ratio = 'bar';
			const handledRatio = defaultValue;

			expect(handleApectRatio(ratio, defaultValue)).toEqual(handledRatio);
		});
	});
});
