/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Grid } from '@mui/material';

import { Project } from 'store/types/typesProjects';

import ProjectCard from './ProjectCard/ProjectCard';

type Props = {
	items: Project[];
};

const ProjectsGrid: React.FC<Props> = ({ items }) => {
	return (
		<Grid container spacing={2}>
			{items.map((item) => (
				<Grid item xs={12} sm={6} md={3} key={item.projectId}>
					<ProjectCard item={item} />
				</Grid>
			))}
		</Grid>
	);
};

export default ProjectsGrid;
