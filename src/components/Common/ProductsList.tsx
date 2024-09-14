/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, CircularProgress, FormControl, RadioGroup } from '@mui/material';

import StyledRadioButton from 'components/Common/StyledRadioButton';

import { useFetchProductsQuery, useCreateCheckoutMutation } from 'store/apis/apiProducts';
import useSliceUser from 'store/hooks/useSliceUser';

import strings from 'constants/strings';

import { ProductFormControlLabel } from './ProductFormControlLabel';
import { StyledDialogContent } from '../Dialogs';

import PaddlePayment from '../../services/PaddlePayment';

const styles = {
	formControl: {
		width: '100%',
		padding: '12px',
		border: '1px solid #E138BB',
		borderRadius: '8px',
	},
};

const { buyCreditsButton } = strings;

type Props = {
	isPublicPage: boolean;
};

const ProductsList: React.FC<Props> = ({ isPublicPage }) => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const discordUserId = searchParams.get('uid');

	const {
		isFetching: isFetchingProducts,
		isSuccess: isSuccessProducts,
		data: productsData,
		refetch: refetchProducts,
	} = useFetchProductsQuery();

	const [checkout, { isSuccess: isSuccessCreateCheckout, data: createData }] =
		useCreateCheckoutMutation();

	const { id: userId, discordId } = useSliceUser();

	const [selectedProduct, setSelectedProduct] = useState<number>(0);

	useEffect(() => {
		refetchProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (isSuccessProducts) {
			setSelectedProduct(productsData?.products[0].id || 0);
		}
	}, [isSuccessProducts, productsData]);

	useEffect(() => {
		if (isSuccessCreateCheckout) {
			openCheckout(createData);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccessCreateCheckout, createData]);

	const openCheckout = (options: any) => {
		// @ts-ignore
		const { Paddle, Rewardful } = window;

		if (Paddle) {
			const referral = Rewardful && Rewardful.referral;

			const publicPageUserData = { user_id: null, discord_id: discordUserId };
			const appUserData = { user_id: userId, discord_id: discordId };
			const userData = isPublicPage ? publicPageUserData : appUserData;

			const passthrough = referral
				? JSON.stringify({ ...userData, rewardful: { referral } })
				: userData;
			Paddle.Checkout.open({
				...options,
				customData: passthrough,
			});
		} else {
			console.error('Paddle is not defined.');
		}
	};

	const handleProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedProduct(parseInt(event.target.value, 10));
	};

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (selectedProduct) {
			checkout({ id: selectedProduct });
		}
	};

	const conditionalContent = () => {
		if (isFetchingProducts) {
			return (
				<StyledDialogContent>
					<CircularProgress />
				</StyledDialogContent>
			);
		}

		if (isSuccessProducts) {
			return (
				<Box component="form" onSubmit={handleFormSubmit}>
					<FormControl component="fieldset" sx={styles.formControl}>
						<RadioGroup
							value={selectedProduct}
							onChange={handleProductChange}
							name="product"
						>
							{productsData.products.map((product) => (
								<ProductFormControlLabel
									key={product.id}
									product={product}
									StyledRadioButton={StyledRadioButton}
								/>
							))}
						</RadioGroup>
						<Button variant="primary" type="submit">
							{buyCreditsButton}
						</Button>
					</FormControl>
				</Box>
			);
		}
	};

	return (
		<>
			<PaddlePayment userId={userId} discordUserId={discordUserId || ''} />
			{conditionalContent()}
		</>
	);
};
export default ProductsList;
