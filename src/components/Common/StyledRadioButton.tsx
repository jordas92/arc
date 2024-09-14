import Radio from '@mui/material/Radio';
import { useTheme } from '@mui/system';
import { ReactComponent as UncheckedIcon } from '../../assets/img/icons/checkbox-blank.svg';
import { ReactComponent as CheckedIcon } from '../../assets/img/icons/checkbox-filled.svg';

function StyledRadioButton({ ...rest }) {
	const theme = useTheme();
	return (
		<Radio
			icon={<UncheckedIcon />}
			checkedIcon={<CheckedIcon fill={theme.palette.primary.light} />}
			{...rest}
		/>
	);
}

export default StyledRadioButton;
