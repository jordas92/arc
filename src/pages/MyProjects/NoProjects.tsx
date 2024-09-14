/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

import BtnCreateProject from 'components/Common/Buttons/BtnCreateProject';

import strings from 'constants/strings';
import { YOUTUBE_VIDEO_ID } from 'constants/default';

const styles = {
	alignTopOffset: {
		marginTop: '24px',
	},
	projectsBlock: {
		width: '100%',
		// THEME_NEXT
		background: 'rgba(159, 162, 171, 0.08)',
		padding: '60px',
		borderRadius: '8px',
	},
	text: {
		// THEME_NEXT
		color: 'rgba(255, 255, 255, 0.64)',
	},
};

const { welcomeText, noProjectsBlockLabel, noProjectsBlockText } = strings;

const NoProjects: React.FC = () => {
	const conditionalContent = () => {
		return (
			<Box>
				<Typography variant="h2" p="24px 0">
					{welcomeText}
				</Typography>

				<Grid item xs={12} sx={styles.alignTopOffset}>
					<iframe
						style={{ borderRadius: '16px' }}
						frameBorder="0"
						className="video"
						title="Youtube player"
						width="100%"
						height="480px"
						sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
						src={`https://youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=0`}
					/>
				</Grid>

				<Grid item xs={12} py="24px">
					<Box sx={styles.projectsBlock}>
						<Grid container>
							<Grid item xs={8}>
								<Typography variant="h4">{noProjectsBlockLabel}</Typography>
								<Typography sx={styles.text}>{noProjectsBlockText}</Typography>
							</Grid>
							<Grid item xs={4} textAlign="right">
								<BtnCreateProject />
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Box>
		);
	};

	return <>{conditionalContent()}</>;
};

export default NoProjects;
