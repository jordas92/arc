/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import StyledCheckbox from 'components/StyledWrappers/StyledCheckbox';

import { ReactComponent as InfoIcon } from 'assets/img/icons/info.svg';
import strings from 'constants/strings';

const styles = {
	box: {
		display: 'inline-flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	mainContainer: {
		display: 'inline-flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginBottom: '5px',
	},
	label: {
		lineHeight: 1.5,
		marginRight: '3px',
		cursor: 'default',
	},
};

const { comingSoon } = strings;

type Props = {
	label: string;
	checked: boolean;
	onChange: Function;
};

const AutomateCheckbox: React.FC<Props> = ({ label, checked, onChange }) => {
	return (
		<Tooltip title={comingSoon} placement="top" arrow>
			<Box sx={styles.mainContainer}>
				<StyledCheckbox
					disabled
					checked={checked}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event)}
					sx={{ marginRight: '10px' }}
				/>

				<Box sx={styles.box}>
					<Typography
						variant="h6"
						color="text.secondary"
						component="span"
						sx={styles.label}
					>
						{label}
					</Typography>
					<InfoIcon width="12px" height="12px" />
				</Box>
			</Box>
		</Tooltip>
	);
};

export default AutomateCheckbox;
