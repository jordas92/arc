import React from 'react';
import { Tooltip } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { showNotification } from 'store/storeSlices/sliceNotification';
import { notificationSeverity } from 'store/common/keys';

import strings from 'constants/strings';
import { copyToClipboard } from 'utils/commonUtils';
import StyledIconButtonMui from 'components/StyledWrappers/StyledIconButtonMui';

type Props = {
	prompt: string;
	isDisabled?: boolean;
};

const { success } = notificationSeverity;
const { copyPrompt, promptCopied } = strings;

const BtnCopyPrompt: React.FC<Props> = ({ prompt, isDisabled = false }) => {
	const dispatch = useStoreDispatch();

	const handleOnClick = () => {
		copyToClipboard(prompt);

		dispatch(
			showNotification({
				message: promptCopied,
				severity: success,
			}),
		);
	};

	return (
		<Tooltip title={copyPrompt} placement="top" arrow>
			<StyledIconButtonMui
				onClick={handleOnClick}
				disabled={isDisabled || !prompt}
				disableRipple
			>
				<ContentCopy fontSize="small" />
			</StyledIconButtonMui>
		</Tooltip>
	);
};

export default BtnCopyPrompt;
