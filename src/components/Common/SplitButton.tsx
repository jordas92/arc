/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState, useRef } from 'react';
import { Button, ButtonGroup, ClickAwayListener, Grow, Paper, Popper } from '@mui/material';

// FUTURE FEATURE
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type Props = {
	text: any;
	content: any;
	disabled: boolean;
	onClick: () => void;
};

const SplitButton: React.FC<Props> = ({ text, content, disabled, onClick }) => {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLDivElement>(null);

	const handleClick = () => {
		onClick();
	};

	// FUTURE FEATURE
	// const handleToggle = () => {
	// 	setOpen((prevOpen) => !prevOpen);
	// };

	const handleClose = (event: Event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return;
		}

		setOpen(false);
	};

	return (
		<>
			<ButtonGroup ref={anchorRef} disabled={disabled} aria-label="split button">
				<Button variant="arcanaMagic" onClick={handleClick} sx={{ width: '125px' }}>
					{text}
				</Button>
				{/* FUTURE FEATURE */}
				{/* <Button
					variant="primary"
					aria-controls={open ? 'split-button-menu' : undefined}
					aria-expanded={open ? 'true' : undefined}
					aria-label="select merge strategy"
					aria-haspopup="menu"
					sx={{ padding: '0' }}
					onClick={handleToggle}
				>
					<ArrowDropDownIcon />
				</Button> */}
			</ButtonGroup>
			<ClickAwayListener onClickAway={handleClose}>
				<Popper
					open={open}
					anchorEl={anchorRef.current}
					role={undefined}
					transition
					placement="top-end"
					disablePortal
				>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{
								transformOrigin:
									placement === 'bottom' ? 'center top' : 'center bottom',
							}}
						>
							<Paper>{React.cloneElement(content, { handleClose })}</Paper>
						</Grow>
					)}
				</Popper>
			</ClickAwayListener>
		</>
	);
};

export default SplitButton;
