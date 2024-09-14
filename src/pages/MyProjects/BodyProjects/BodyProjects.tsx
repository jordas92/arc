/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';

import useSliceProjects from '../../../store/hooks/useSliceProjects';

import ProjectsGrid from './ProjectsGrid/ProjectsGrid';
import LoadMoreProjects from './LoadMoreProjects';
import NoProjects from '../NoProjects';
import HeaderProjects from '../HeaderProjects/HeaderProjects';

const BodyProjects: React.FC = () => {
	const { items, nextPage } = useSliceProjects();

	const conditionalContent = () => {
		if (items?.length > 0) {
			return (
				<>
					<HeaderProjects />
					<ProjectsGrid items={items} />
					<LoadMoreProjects nextPage={nextPage} />
				</>
			);
		}

		return <NoProjects />;
	};

	return <>{conditionalContent()}</>;
};

export default BodyProjects;
