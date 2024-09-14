/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, FormControlLabel, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { Product } from 'store/types/typesProducts';

import strings from 'constants/strings';

type ProductFormControlLabelProps = {
	product: Product;
	StyledRadioButton: React.ComponentType<any>;
};

const { creditsCount, exclTax } = strings;

export const ProductFormControlLabel = styled(
	({ product, StyledRadioButton, ...props }: ProductFormControlLabelProps) => (
		<FormControlLabel
			label={
				<Box
					sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
				>
					<Typography variant="h4">{`${product.credits} ${creditsCount}`}</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
						<Typography
							variant="h4"
							sx={{ fontWeight: '600' }}
						>{`$${product.price}`}</Typography>
						<Typography variant="creditsModalRadioSubText">{exclTax}</Typography>
					</Box>
				</Box>
			}
			value={product.id}
			control={<StyledRadioButton />}
			{...props}
		/>
	),
)({
	display: 'flex',
	flexDirection: 'row-reverse',
	width: '100%',
	justifyContent: 'space-between',
	margin: 0,
	padding: '6px 0',
	'& > .MuiFormControlLabel-label': {
		width: '100%',
		marginRight: '12px',
	},
});
