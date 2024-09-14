/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box } from '@mui/material';
import RichTextComponent from '../../Common/RichTextComponent';

const styles = {
	content: {
		width: '60%',
		height: '100%',
		padding: '35px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	title: {
		width: '98%',
		height: '20px',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		marginBottom: '24px',
	},
	summary: {
		color: 'text.secondary',
		paddingRight: '10px',
		maxHeight: '155px',
		overflowY: 'auto',
	},
};

type Props = {
	title: string;
	summary: string;
};

const TextContentAnnouncement: React.FC<Props> = ({ title, summary }) => {
	return (
		<Box sx={styles.content}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<RichTextComponent variant="h4" sx={styles.title} component="p" richText={title} />
				<RichTextComponent
					variant="body2"
					sx={styles.summary}
					component="p"
					richText={summary}
				/>
			</Box>
			{/* Placeholder for the future Learn more btn */}
			<Box sx={{ height: '32px' }} />
		</Box>
	);
};

export default TextContentAnnouncement;
