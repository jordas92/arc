import { InfoOutlined } from '@mui/icons-material';
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Grid,
	Tooltip,
	Typography,
} from '@mui/material';

interface GenerationDropdownProps {
	ref?: any;
	handleClose?: (event: Event) => void;
}

export const DropdownGeneration = (props: GenerationDropdownProps) => {
	// const dispatch = useDispatch<any>();

	// const Projects = useSelector((state: any) => state.app);
	// const [infiniteGenerations, setGenerations] = useState<boolean>(Projects.infiniteGenerations);
	// const [isOpen, setIsOpen] = useState<boolean>(true);
	const generateRandom = async () => {
		// if (props.handleClose) {
		// 	props.handleClose(new Event('click'));
		// }
	};

	const updateInfiniteGenerations = () => {
		// setGenerations(!infiniteGenerations);
		// dispatch(setInfiniteGenerations(!infiniteGenerations));
	};

	return (
		<Grid
			// ref={ref}
			container
			sx={{
				padding: '24px',
				minWidth: '320px',
				mb: 4,
				backgroundColor: '#2e2e32',
				borderRadius: '6px',
				border: '1px solid rgb(133, 73, 210)',
			}}
		>
			<Grid item xs={12}>
				<Typography variant="body1">Options:</Typography>
			</Grid>
			<Grid item xs={12}>
				<FormGroup>
					<FormControlLabel
						disabled
						control={
							<Checkbox
								// checked={Projects.infiniteGenerations}
								onChange={(e) => updateInfiniteGenerations()}
							/>
						}
						label={
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								Infinite generations
								<Tooltip title="Coming Soon!" placement="top">
									<InfoOutlined fontSize="small" style={{ marginLeft: 5 }} />
								</Tooltip>
							</Box>
						}
					/>
				</FormGroup>
			</Grid>
			<Grid item xs={12}>
				<Button
					fullWidth
					variant="contained"
					disableElevation
					onClick={generateRandom}
					size="large"
				>
					Random
				</Button>
			</Grid>
		</Grid>
	);
};
