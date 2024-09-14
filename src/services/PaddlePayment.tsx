/** Copyright (c) 2023-present Kristiyan Dimitrov */

/** Payment Service */

import React, { useEffect } from 'react';
import TagManager from 'react-gtm-module';

import {
	useLazyFetchUserWalletsBalanceQuery,
	useLazyFetchUserWalletsBalanceByConnectionQuery,
} from 'store/apis/apiUserWallets';
import { consumerTypes } from 'store/common/keys';

const { CONSUMER_DISCORD } = consumerTypes;

type Props = {
	userId: number;
	discordUserId: string;
};

let fetchWalletsBalanceTimeoutId: ReturnType<typeof setTimeout>;
let timeoutCompleted = false;

const PaddlePayment: React.FC<Props> = ({ userId, discordUserId }) => {
	const [fetchUserWalletsBalance] = useLazyFetchUserWalletsBalanceQuery({});
	const [fetchUserWalletsBalanceByConnection] = useLazyFetchUserWalletsBalanceByConnectionQuery();

	// @ts-ignore
	const { Paddle } = window;
	Paddle.Environment.set(process.env.REACT_APP_PADDLE_ENV);

	const paddleToken = process.env.REACT_APP_PADDLE_TOKEN;

	useEffect(() => {
		if (paddleToken) {
			Paddle.Initialize({
				token: paddleToken,
				async eventCallback(data) {
					if (data.name === 'checkout.completed') {
						// add data to tag manager only on prod
						if (process.env?.REACT_APP_ENV === 'production') {
							const dataLayerInfo = {
								event: 'purchase',
								ecommerce: {
									transaction_id: data.eventData.checkout.id,
									affiliation: 'Insert Your Affiliation',
									value: data.eventData.checkout.prices.customer.total,
									tax: data.eventData.checkout.prices.customer.total_tax,
									shipping: null,
									currency: data.eventData.checkout.prices.customer.currency,
									coupon: data.eventData.checkout.coupon.coupon_code,
									items: data.eventData.checkout.prices.customer.items,
									country: data.eventData.user.country,
								},
							};

							TagManager.dataLayer({
								dataLayer: dataLayerInfo,
							});
						}

						fetchWalletsBalanceTimeoutId = setTimeout(async () => {
							if (userId) {
								// get user to update credits after purchases
								fetchUserWalletsBalance();
							} else if (discordUserId && discordUserId.length > 0) {
								// TODO_REF_JULIA - test after BE middleware is done for the public Buy Credits page
								fetchUserWalletsBalanceByConnection({
									type: CONSUMER_DISCORD,
									id: discordUserId ?? '',
								});
							}
							// TODO_NEXT change this logic in the future after credits data goes through web sockets
							// this is a temporary solution
							// these repeats are only needed to update user credits
							fetchWalletsBalanceTimeoutId = setTimeout(async () => {
								if (userId) {
									fetchUserWalletsBalance();
								} else if (discordUserId && discordUserId.length > 0) {
									// TODO_REF_JULIA - test after BE middleware is done for the public Buy Credits page
									fetchUserWalletsBalanceByConnection({
										type: CONSUMER_DISCORD,
										id: discordUserId ?? '',
									});
								}

								fetchWalletsBalanceTimeoutId = setTimeout(async () => {
									if (userId) {
										fetchUserWalletsBalance();
									} else if (discordUserId && discordUserId.length > 0) {
										// TODO_REF_JULIA - test after BE middleware is done for the public Buy Credits page
										fetchUserWalletsBalanceByConnection({
											type: CONSUMER_DISCORD,
											id: discordUserId ?? '',
										});
									}

									fetchWalletsBalanceTimeoutId = setTimeout(async () => {
										if (userId) {
											fetchUserWalletsBalance();
										} else if (discordUserId && discordUserId.length > 0) {
											// TODO_REF_JULIA - test after BE middleware is done for the public Buy Credits page
											fetchUserWalletsBalanceByConnection({
												type: CONSUMER_DISCORD,
												id: discordUserId ?? '',
											});
										}

										if (!timeoutCompleted) {
											timeoutCompleted = true;
											clearTimeout(fetchWalletsBalanceTimeoutId);
										}
									}, 10000);
								}, 10000);
							}, 10000);
						}, 3000);
					}
				},
			});
		} else {
			console.warn('Paddle token is not defined.');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId, discordUserId, paddleToken, Paddle]);

	return null;
};

export default PaddlePayment;
