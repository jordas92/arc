/** Copyright (c) 2023-present Kristiyan Dimitrov */

export const PAGE_GRID_MASONRY_MAGIC_NUMBER = 36;

// Masonry INFO
// The sum of each aray items = PAGE_GRID_MASONRY_MAGIC_NUMBER
// each aray length = grid rows (10 rows)
// 10 keys = 10 rows
// https://arcanalabs.atlassian.net/wiki/spaces/arcanalabs/pages/84148236/Masonry+Grid

// const masonryGridRows = {
// 	1: [5, 3, 4, 5, 2],
// 	2: [2, 5, 3, 3, 4],
// 	3: [4, 2, 4, 2, 5],
// 	4: [5, 4, 5, 3, 4],
// 	5: [3, 3, 3, 4, 3],
// 	6: [4, 4, 4, 3, 5],
// 	7: [3, 3, 2, 4, 3],
// 	8: [2, 5, 5, 3, 2],
// 	9: [5, 3, 4, 5, 3],
// 	10: [3, 4, 2, 4, 5],
// };

const masonryGridItemsHeightFactor = [
	5, 3, 4, 5, 2, 2, 5, 3, 3, 4, 4, 2, 4, 2, 5, 5, 4, 5, 3, 4, 3, 3, 3, 4, 3, 4, 4, 4, 3, 5, 3, 3,
	2, 4, 3, 2, 5, 5, 3, 2, 5, 3, 4, 5, 3, 3, 4, 2, 4, 5,
];

// TODO Create a function that generates this object,
// based on the number Masonary grid columns and the number of fetched chunk items (itemsPerpage).
// Currently: columns = 5; itemsPerpage = 50;
const masonryItemIndexOrderMap = {
	// Grid row 1
	0: 1, // Grid column 1
	1: 2, // Grid column 2
	2: 3, // Grid column 3
	3: 4, // Grid column 4
	4: 5, // Grid column 5

	// Grid row 2
	5: 1, // Grid column 1
	6: 2, // Grid column 2
	7: 3, // Grid column 3
	8: 4, // Grid column 4
	9: 5, // Grid column 5

	// Grid row 3
	10: 1,
	11: 2,
	12: 3,
	13: 4,
	14: 5,

	// Grid row 4
	15: 1,
	16: 2,
	17: 3,
	18: 4,
	19: 5,

	20: 1,
	21: 2,
	22: 3,
	23: 4,
	24: 5,

	25: 1,
	26: 2,
	27: 3,
	28: 4,
	29: 5,

	30: 1,
	31: 2,
	32: 3,
	33: 4,
	34: 5,

	35: 1,
	36: 2,
	37: 3,
	38: 4,
	39: 5,

	// Grid row 9
	40: 1,
	41: 2,
	42: 3,
	43: 4,
	44: 5,

	// Grid row 10
	45: 1, // Grid column 1
	46: 2, // Grid column 2
	47: 3, // Grid column 3
	48: 4, // Grid column 4
	49: 5, // Grid column 5
};

export const gridMasonryItemHeight = (index: number, masonaryColumnHeightNoGaps: number) => {
	return (
		masonaryColumnHeightNoGaps *
		(masonryGridItemsHeightFactor[index] / PAGE_GRID_MASONRY_MAGIC_NUMBER)
	);
};

export const masonryItemOrder = (index: number) => {
	return masonryItemIndexOrderMap[index];
};
