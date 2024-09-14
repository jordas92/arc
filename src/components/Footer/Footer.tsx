/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
// import { useNavigate } from 'react-router-dom';

import { Button, Container, Typography } from '@mui/material';

import routesPaths from 'routes/paths';
import strings from 'constants/strings';

const styles = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
		margin: '50px 0 0',
		padding: '20px',
	},
	button: {
		m: '0 20px',
		p: 0,
	},
};

const { privacyPolicy, termsOfService } = strings;
const { PRIVACY_POLICY, TERMS_OF_SERVICE } = routesPaths;

const navButtons = [
	{
		label: privacyPolicy,
		routePath: PRIVACY_POLICY as keyof typeof routesPaths,
	},
	{
		label: termsOfService,
		routePath: TERMS_OF_SERVICE as keyof typeof routesPaths,
	},
];

const Footer: React.FC = () => {
	// const navigate = useNavigate();

	// const handleOnClick = (routePath: keyof typeof routesPaths) => {
	// 	navigate(routePath);
	// };

	function handleOnClick(path) {
		if (path === TERMS_OF_SERVICE) {
			// navigate(path);
			window.open('https://www.arcanalabs.ai/terms-of-service', '_blank');
		} else {
			window.open('https://www.arcanalabs.ai/privacy-policy', '_blank');
		}
	}

	return (
		<Container component="footer" sx={styles.container} maxWidth={false}>
			{navButtons.map((item) => (
				<Button
					key={item.label}
					variant="basic"
					onClick={() => handleOnClick(item.routePath)}
					disableRipple
					sx={styles.button}
				>
					<Typography variant="h5">{item.label}</Typography>
				</Button>
			))}
		</Container>
	);
};

export default Footer;
