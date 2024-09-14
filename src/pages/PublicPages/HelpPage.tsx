/** Copyright (c) 2023-present Kristiyan Dimitrov */

import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import routesPaths from 'routes/paths';
import strings from 'constants/strings';
import { Grid } from '@mui/material';
import logo from '../../assets/img/icons/logo.svg';

const styles = {
	logo: {
		margin: '0 0 30px',
		'@media (max-width: 768px)': {
			margin: '0 0 20px',
		},
	},
	iframeContainer: {
		width: '100%',
	},
};

const { loading } = strings;
const { MY_PROJECTS } = routesPaths;

const HelpPage = () => {
	const navigate = useNavigate();

	const handleOnClick = () => {
		// TODO_NEXT should navigate to homepage
		navigate(MY_PROJECTS);
	};
	return (
		<Grid
			container
			maxWidth="lg"
			flexDirection="column"
			alignItems="center"
			justifyContent="space-around"
			margin="0 auto"
			padding="16px 24px"
		>
			<Grid item xs>
				<IconButton
					onClick={handleOnClick}
					aria-label="home"
					disableRipple
					sx={styles.logo}
				>
					<img src={logo} alt="logo" loading="lazy" />
				</IconButton>
			</Grid>
			<Grid item xs sx={styles.iframeContainer}>
				<iframe
					title="Help form"
					src="https://docs.google.com/forms/d/e/1FAIpQLSckAEv27-mEibLY2gdEH_vByc7C3kxVD6hWOn1E2-kvnsWQiw/viewform?embedded=true"
					style={{ width: '100%', height: '800px' }}
					frameBorder="0"
				>
					{loading}
				</iframe>
			</Grid>
		</Grid>
	);
};

export default HelpPage;
