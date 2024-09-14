/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import {
	Dialog,
	DialogContent,
	Box,
	Typography,
	Button,
	Grid,
	InputAdornment,
	TextField,
	useTheme,
} from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { closeModal } from 'store/storeSlices/sliceApp';

import { ReactComponent as CloseIcon } from 'assets/img/icons/close.svg';
// import strings from 'constants/strings';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';
import strings from 'constants/strings';
import { copyToClipboard } from 'utils/commonUtils';
import { showNotification } from 'store/storeSlices/sliceNotification';
import {
	FacebookShareButton,
	FacebookIcon,
	TwitterShareButton,
	TwitterIcon,
	WhatsappShareButton,
	WhatsappIcon,
	TelegramShareButton,
	TelegramIcon,
} from 'react-share';
import LinkIcon from '@mui/icons-material/Link';

type Props = {
	imageUrl: string;
};

const styles = {
	dialog: {
		borderRadius: '8px',
		width: '600px',
		height: '240px',
		backgroundImage: 'none',
		border: '1px solid',
		borderColor: 'background.surfaceHighest',
	},
	closeBtn: {
		position: 'absolute' as 'absolute',
		top: '8px',
		right: '8px',
		padding: 0,
	},
	image: {
		width: 'auto',
		height: '100%',
		maxWidth: '190px',
		maxHeight: '190px',
		position: 'relative' as 'relative',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		margin: 0,
		padding: 0,
		borderRadius: '8px',
	},
	box: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'column',
		height: '100%',
		padding: '0',
	},
	iconButton: {
		border: '1px solid',
		borderColor: 'text.secondary',
		borderRadius: '50%',
		padding: '5px',
		marginRight: '20px',
	},
	copyButton: {
		backgroundColor: 'text.secondary',
		border: 'none',
		textTransform: 'none',
		color: 'primary.dark',
		transition: 'background-color 0.3s ease',
		'&:hover': {
			backgroundColor: 'rgba(255, 255, 255, 0.6)',
			border: 'none',
		},
	},
	input: {
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: 'text.secondary',
		},
		'&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
			borderColor: 'text.secondary',
		},
	},
};

const { promptCopied, shareImageTitle, shareImageCopyLink, copyBtn } = strings;

const StyledDialogContent = styled(DialogContent)({
	padding: '16px',
});

const DialogShare: React.FC<Props> = ({ imageUrl }) => {
	const dispatch = useStoreDispatch();

	const theme = useTheme();

	const handleOnClose = () => {
		dispatch(closeModal());
	};

	const copyUrl = (text: string) => {
		copyToClipboard(text);
		dispatch(
			showNotification({
				message: promptCopied,
				severity: 'success',
			}),
		);
	};

	const iconCommonProps = {
		size: 40,
		round: true,
		bgStyle: { fill: 'transparent' },
		iconFillColor: theme.palette.text.secondary,
		style: styles.iconButton,
	};

	return (
		<Dialog
			open
			onClose={handleOnClose}
			aria-labelledby="share-dialog-title"
			aria-describedby="share-dialog-description"
			PaperProps={{ sx: styles.dialog }}
		>
			<StyledDialogContent>
				<Grid container sx={{ height: '100%' }}>
					<Grid item xs={4}>
						{imageUrl && (
							<img
								alt="share"
								style={{ ...styles.image, objectFit: 'contain' }}
								src={imageUrl}
							/>
						)}
					</Grid>
					<Grid
						item
						xs={8}
						sx={{
							padding: '0 0 0 24px',
						}}
					>
						<Box sx={styles.box}>
							<Typography
								variant="h3"
								component="h3"
								color={theme.palette.text.primary}
								mb="15px"
							>
								{shareImageTitle}
							</Typography>
							<Box display="flex" justifyContent="flex-start" mb="5px">
								<FacebookShareButton url={imageUrl}>
									<FacebookIcon {...iconCommonProps} />
								</FacebookShareButton>
								<TwitterShareButton url={imageUrl}>
									<TwitterIcon {...iconCommonProps} />
								</TwitterShareButton>
								<WhatsappShareButton url={imageUrl}>
									<WhatsappIcon {...iconCommonProps} />
								</WhatsappShareButton>
								<TelegramShareButton url={imageUrl}>
									<TelegramIcon {...iconCommonProps} />
								</TelegramShareButton>
							</Box>
							<Typography
								variant="h5"
								component="h5"
								color="text.secondary"
								sx={{ fontWeight: 'normal', mb: '5px' }}
							>
								{shareImageCopyLink}
							</Typography>
							<TextField
								value={imageUrl}
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<LinkIcon
												style={{
													color: 'text.secondary',
												}}
											/>
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position="end">
											<Button
												onClick={() => copyUrl(imageUrl)}
												variant="outlined"
												sx={{ ...styles.copyButton }}
											>
												{copyBtn}
											</Button>
										</InputAdornment>
									),
									inputProps: {
										style: {
											color: 'text.secondary',
										},
									},
									sx: { ...styles.input },
								}}
							/>
						</Box>
					</Grid>
				</Grid>
			</StyledDialogContent>
			<StyledIconButtonAsset onClick={handleOnClose} sx={styles.closeBtn}>
				<CloseIcon />
			</StyledIconButtonAsset>
		</Dialog>
	);
};

export default DialogShare;
