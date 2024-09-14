/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
// import { ReactComponent as InvoicesIcon } from '../../../assets/img/icons/invoices.svg';
// import { ReactComponent as PlansIcon  } from '../../../assets/img/icons/plans.svg';
import { ReactComponent as ProfileIcon } from '../../../assets/img/icons/profile.svg';
import { ReactComponent as SecurityIcon } from '../../../assets/img/icons/security.svg';
import ProfileSidebarItem from './ProfileSidebarItem';
import routesPaths from '../../../routes/paths';

const Sidebar = styled('aside')(({ theme }) => ({
	width: '280px',
	height: 'calc(100vh - 65px)', // TODO_NEXT the page becomes unresponsive in "Y" direction
	overflow: 'hidden',
	padding: '36px 16px 16px',
	backgroundColor: 'transparent',
	backgroundImage: 'none',
}));

const { PROFILE_SETTINGS, PROFILE_SECURITY } = routesPaths;

const generalPages = [
	{
		label: 'Profile',
		icon: <ProfileIcon />,
		routePath: PROFILE_SETTINGS as keyof typeof routesPaths,
	},
	{
		label: 'Security',
		icon: <SecurityIcon />,
		routePath: PROFILE_SECURITY as keyof typeof routesPaths,
	},
];

// const billingPages = [
// 	{ label: 'Plans', routePath: STATIC_ROUTES.profilePlans, icon: <PlansIcon /> },
// 	{ label: 'Invoices', routePath: STATIC_ROUTES.profileInvoices, icon: <InvoicesIcon /> },
// ];

const ProfileSidebar: React.FC = () => {
	return (
		<Sidebar>
			<ProfileSidebarItem title="General" pagesList={generalPages} />
			{/* <ProfileSidebarItem title="Billing" pagesList={billingPages} /> */}
		</Sidebar>
	);
};

export default ProfileSidebar;
