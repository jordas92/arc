/** Copyright (c) 2024-present Kristiyan Dimitrov */

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Container,
	IconButton,
	Typography,
} from '@mui/material';
import { styled } from '@mui/system';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routesPaths from 'routes/paths';

import './style.css';

import logo from '../../../assets/img/icons/logo.svg';

const StyledAccordionSummary = styled(AccordionSummary)({
	// THEME_NEXT
	background: 'rgba(159, 162, 171, 0.08)',
});

const styles = {
	logo: {
		display: 'flex',
		justifyContent: 'center',
		margin: '16px 0 100px',
		'@media (max-width: 768px)': {
			margin: '8px 0 70px',
		},
	},
	alignMain: {
		marginBottom: '25px',
	},
};

const { MY_PROJECTS } = routesPaths;

function ToSComponent({ content }) {
	const navigate = useNavigate();

	const [expanded, setExpanded] = useState(null);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : null);
	};

	const handleLogoClick = () => {
		// TODO_NEXT should navigate to homepage
		navigate(MY_PROJECTS);
	};

	// @ts-ignore
	return (
		<Container maxWidth="lg" sx={styles.alignMain}>
			<Box sx={styles.logo}>
				<IconButton
					onClick={handleLogoClick}
					aria-label="home"
					disableRipple
					sx={{
						width: '126px',
						p: 0,
					}}
				>
					<img src={logo} alt="logo" loading="lazy" />
				</IconButton>
			</Box>
			<Typography variant="h1" className="title" gutterBottom>
				{content.title}
			</Typography>

			{content.introduction.map((section, index) => (
				<Typography
					key={`intro_${index}`}
					paragraph
					dangerouslySetInnerHTML={{ __html: section.text }}
				/>
			))}

			{content.sections.map((section: any, index: number) => (
				<Accordion
					key={index}
					expanded={expanded === `panel${index}`}
					onChange={handleChange(`panel${index}`)}
				>
					<StyledAccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls={`panel${index}a-content`}
						id={`panel${index}a-header`}
					>
						<Typography variant="h6">{`${index + 1}. ${section.title}`}</Typography>
					</StyledAccordionSummary>

					<AccordionDetails>
						{section.content.map((contentItem, contentIndex) => (
							<Typography
								key={contentIndex}
								paragraph={contentItem.isParagraph}
								dangerouslySetInnerHTML={{ __html: contentItem.text }}
							/>
						))}
					</AccordionDetails>
				</Accordion>
			))}
		</Container>
	);
}

export default ToSComponent;
