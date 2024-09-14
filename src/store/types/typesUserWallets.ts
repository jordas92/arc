/** Copyright (c) 2023-present Kristiyan Dimitrov */

export type ResponseWallet = {
	id: number | null;
	type: string | null;
	balance: number | null;
};

export type ResponseRedeemCredits = {
	amount: number | null;
	type: string | null;
};

/**
 * Expected API response type from 'fetchUserWallets'.
 * Only props related to the FE are included.
 */
export type ResponseWallets = Array<ResponseWallet>;

export type Wallet = {
	walletId: number;
	type: string;
	balance: number;
};

export type Wallets = Array<Wallet>;

/**
 * Expected API response type from 'fetchUserWalletsBalance'.
 * Only props related to the FE are included.
 */
export type ResponseWalletsBalance = {
	balance: number | null;
	redeemable: number | null;
};

export type WalletsBalance = {
	creditsBalance: number;
	creditsRedeem: number;
};

export type RequestWalletBalanceByConnection = {
	type: string;
	id: string;
};
