import { styled } from '@mui/system';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

const MuiCheckbox = styled(Checkbox)(({ theme }) => ({
	padding: '6px',

	'.MuiSvgIcon-root': { width: 16, height: 16 },

	'&.Mui-checked': {
		'.MuiSvgIcon-root': {
			fill: theme.palette.primary.main,
		},
	},
}));

const StyledCheckbox = (props: CheckboxProps) => (
	<MuiCheckbox disableRipple inputProps={{ 'aria-label': 'controlled' }} {...props} sx={{}} />
);

export default StyledCheckbox;
