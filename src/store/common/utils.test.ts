import commonUtils from './utils';

const { valueToString, valueToNumber, valueToBoolean } = commonUtils;

describe('commonUtils', () => {
	describe(`${valueToString.name}`, () => {
		test('Returns correct string', () => {
			const value = undefined;
			const output = '';

			expect(valueToString(value)).toEqual(output);
		});

		test('Returns correct string', () => {
			const value = undefined;
			const defaultValue = '';
			expect(valueToString(value, defaultValue)).toEqual(defaultValue);
		});

		test('Returns correct string', () => {
			const value = undefined;
			const defaultValue = 'foo';
			expect(valueToString(value, defaultValue)).toEqual(defaultValue);
		});

		test('Returns correct string', () => {
			const value = null;
			const output = '';

			expect(valueToString(value)).toEqual(output);
		});

		test('Returns correct string', () => {
			const value = null;
			const defaultValue = '';
			expect(valueToString(value, defaultValue)).toEqual(defaultValue);
		});

		test('Returns correct string', () => {
			const value = null;
			const defaultValue = 'foo';
			expect(valueToString(value, defaultValue)).toEqual(defaultValue);
		});

		test('Returns correct string', () => {
			const value = '';
			const output = '';

			expect(valueToString(value)).toEqual(output);
		});

		test('Returns correct string', () => {
			const value = '';
			const defaultValue = 'foo';
			expect(valueToString(value, defaultValue)).toEqual(defaultValue);
		});

		test('Returns correct string', () => {
			const value = '  ';
			const output = '';

			expect(valueToString(value)).toEqual(output);
		});

		test('Returns correct string', () => {
			const value = '  ';
			const defaultValue = 'foo';
			expect(valueToString(value, defaultValue)).toEqual(defaultValue);
		});

		test('Returns correct string', () => {
			const value = ' ab c  ';
			const output = 'ab c';

			expect(valueToString(value)).toEqual(output);
		});

		test('Returns correct string', () => {
			const value = 0;
			const output = '0';

			expect(valueToString(value)).toEqual(output);
		});

		test('Returns correct string', () => {
			const value = 10;
			const output = '10';

			expect(valueToString(value)).toEqual(output);
		});

		test('Returns correct string', () => {
			const value = 'abc';
			const output = 'abc';

			expect(valueToString(value)).toEqual(output);
		});
	});

	describe(`${valueToNumber.name}`, () => {
		test('Returns correct number', () => {
			const value = undefined;
			const output = 0;
			expect(valueToNumber(value)).toEqual(output);
		});

		test('Returns correct number', () => {
			const value = undefined;
			const defaultValue = 100;
			const output = defaultValue;
			expect(valueToNumber(value, defaultValue)).toEqual(output);
		});

		test('Returns correct number', () => {
			const value = undefined;
			const defaultValue = 0;
			const output = defaultValue;
			expect(valueToNumber(value, defaultValue)).toEqual(output);
		});

		test('Returns correct number', () => {
			const value = null;
			const output = 0;
			expect(valueToNumber(value)).toEqual(output);
		});

		test('Returns correct number', () => {
			const value = null;
			const defaultValue = 0;
			const output = defaultValue;
			expect(valueToNumber(value, defaultValue)).toEqual(output);
		});

		test('Returns correct number', () => {
			const value = { foo: 'bar' };
			const defaultValue = 100;
			const output = defaultValue;
			expect(valueToNumber(value, defaultValue)).toEqual(output);
		});

		test('Returns correct number', () => {
			const value = { foo: 'bar' };
			const output = 0;
			expect(valueToNumber(value)).toEqual(output);
		});

		test('Returns correct number', () => {
			const value = ['foo', 'bar'];
			const defaultValue = 100;
			const output = defaultValue;
			expect(valueToNumber(value, defaultValue)).toEqual(output);
		});

		test('Returns correct number', () => {
			const value = ['foo', 'bar'];
			const output = 0;
			expect(valueToNumber(value)).toEqual(output);
		});

		test('Returns correct number', () => {
			const value = '';
			const output = 0;
			expect(valueToNumber(value)).toEqual(output);
		});

		test('Returns correct number', () => {
			const value = '1';
			const defaultValue = 100;
			const output = 1;
			expect(valueToNumber(value, defaultValue)).toEqual(output);
		});

		test('Returns correct number', () => {
			const value = '  1 ';
			const output = 1;
			expect(valueToNumber(value)).toEqual(output);
		});

		test('Returns correct number', () => {
			const value = '  ';
			const output = 0;
			expect(valueToNumber(value)).toEqual(output);
		});

		test('Returns correct number', () => {
			const value = 0;
			const output = 0;
			expect(valueToNumber(value)).toEqual(output);
		});

		test('Returns correct number', () => {
			const value = 10;
			const defaultValue = 100;
			const output = 10;
			expect(valueToNumber(value, defaultValue)).toEqual(output);
		});

		test('Returns correct number', () => {
			const value = 5;
			const output = 5;
			expect(valueToNumber(value)).toEqual(output);
		});

		test('Returns correct number', () => {
			const value = -1;
			const output = -1;
			expect(valueToNumber(value)).toEqual(output);
		});

		test('Returns correct number', () => {
			const value = Symbol('foo');
			const output = 0;
			expect(valueToNumber(value)).toEqual(output);
		});

		test('Returns correct number', () => {
			const value = BigInt('0x1fffffffffffff');
			const output = 0;
			expect(valueToNumber(value)).toEqual(output);
		});
	});

	describe(`${valueToBoolean.name}`, () => {
		test('Returns correct boolean', () => {
			const value = undefined;
			const output = false;
			expect(valueToBoolean(value)).toEqual(output);
		});

		test('Returns correct boolean', () => {
			const value = undefined;
			const defaultValue = true;
			const output = defaultValue;
			expect(valueToBoolean(value, defaultValue)).toEqual(output);
		});

		test('Returns correct boolean', () => {
			const value = undefined;
			const defaultValue = false;
			const output = defaultValue;
			expect(valueToBoolean(value, defaultValue)).toEqual(output);
		});

		test('Returns correct boolean', () => {
			const value = null;
			const output = false;
			expect(valueToBoolean(value)).toEqual(output);
		});

		test('Returns correct boolean', () => {
			const value = null;
			const defaultValue = true;
			const output = defaultValue;
			expect(valueToBoolean(value, defaultValue)).toEqual(output);
		});

		test('Returns correct boolean', () => {
			const value = { foo: 'bar' };
			const output = false;
			expect(valueToBoolean(value)).toEqual(output);
		});

		test('Returns correct boolean', () => {
			const value = { foo: 'bar' };
			const defaultValue = true;
			const output = defaultValue;
			expect(valueToBoolean(value, defaultValue)).toEqual(output);
		});

		test('Returns correct boolean', () => {
			const value = ['foo', 'bar'];
			const output = false;
			expect(valueToBoolean(value)).toEqual(output);
		});

		test('Returns correct boolean', () => {
			const value = ['foo', 'bar'];
			const defaultValue = true;
			const output = defaultValue;
			expect(valueToBoolean(value, defaultValue)).toEqual(output);
		});

		test('Returns correct boolean', () => {
			const value = '';
			const output = false;
			expect(valueToBoolean(value)).toEqual(output);
		});

		test('Returns correct boolean', () => {
			const value = 'foo';
			const output = true;
			expect(valueToBoolean(value)).toEqual(output);
		});

		test('Returns correct boolean', () => {
			const value = '';
			const defaultValue = true;
			const output = false;
			expect(valueToBoolean(value, defaultValue)).toEqual(output);
		});

		test('Returns correct boolean', () => {
			const value = '  ';
			const output = false;
			expect(valueToBoolean(value)).toEqual(output);
		});

		test('Returns correct boolean', () => {
			const value = 0;
			const output = false;
			expect(valueToBoolean(value)).toEqual(output);
		});

		test('Returns correct boolean', () => {
			const value = 1;
			const output = true;
			expect(valueToBoolean(value)).toEqual(output);
		});

		test('Returns correct boolean', () => {
			const value = 1;
			const defaultValue = false;
			const output = true;
			expect(valueToBoolean(value, defaultValue)).toEqual(output);
		});

		test('Returns correct boolean', () => {
			const value = Symbol('foo');
			const output = false;
			expect(valueToBoolean(value)).toEqual(output);
		});

		test('Returns correct boolean', () => {
			const value = BigInt('0x1fffffffffffff');
			const output = true;
			expect(valueToBoolean(value)).toEqual(output);
		});
	});
});
