/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { styled } from '@mui/system';
import { Box, Input, Button, FormHelperText, LinearProgress } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

import { useUpdateProjectMutation } from 'store/apis/apiProjects';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';

import { specialCharacters } from 'constants/regex';
import strings from 'constants/strings';
import { MIN_LENGTH_PROJECT_TITLE, MAX_LENGTH_PROJECT_TITLE } from 'constants/default';
import StyledIconButtonMui from 'components/StyledWrappers/StyledIconButtonMui';

const { cannotBeEmpty, hasSpecialChars, minCharsProjectTitle, maxCharsProjectTitle } = strings;

const StyledFormHelperText = styled(FormHelperText)({
	margin: '0',
	lineHeight: 1,
});

// FUTURE FEATURE It will be replaced from Dialog Modal
const ProjectTitle: React.FC = () => {
	const { currentProjectId, currentProjectTitle } = useSliceOpenedProjects();
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const [updateProject, { isLoading, isSuccess }] = useUpdateProjectMutation();

	useEffect(() => {
		if (isSuccess) {
			setIsEditMode(false);
		}
	}, [isSuccess]);

	const newTitle = 'newTitle';
	const inputWidth = '200px';

	const validationSchema = Yup.object().shape({
		[newTitle]: Yup.string()
			.required(cannotBeEmpty)
			.matches(specialCharacters, hasSpecialChars)
			.min(MIN_LENGTH_PROJECT_TITLE, minCharsProjectTitle)
			.max(MAX_LENGTH_PROJECT_TITLE, maxCharsProjectTitle),
	});

	const handleOnSubmit = (newProjectTitle: string) => {
		updateProject({
			projectId: currentProjectId,
			newProjectTitle,
		});
	};

	const formik = useFormik({
		initialValues: {
			[newTitle]: '',
		},
		validationSchema,
		onSubmit: ({ newTitle }) => handleOnSubmit(newTitle),
	});

	const handleOnClickTile = () => {
		setIsEditMode(true);
		formik.setValues({ [newTitle]: currentProjectTitle });
	};

	const handleOnCancel = () => {
		setIsEditMode(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.keyCode === 13) {
			formik.submitForm();
		}
	};

	const isSaveDisabled =
		!!formik.errors[newTitle] || isLoading || formik.values[newTitle] === currentProjectTitle;

	const conditionalContent = () => {
		if (isEditMode) {
			return (
				<Box margin="0 10px">
					<Input
						name={newTitle}
						error={!!formik.errors[newTitle]}
						onKeyDown={handleKeyDown}
						value={formik.values[newTitle]}
						onChange={formik.handleChange}
						margin="dense"
						disabled={isLoading}
						sx={{ marginRight: '10px', width: `${inputWidth}` }}
						inputProps={{ maxLength: MAX_LENGTH_PROJECT_TITLE + 1 }}
					/>

					<StyledIconButtonMui
						onClick={formik.submitForm}
						disableRipple
						disabled={isSaveDisabled}
						sx={{ padding: '4px' }}
					>
						<CheckIcon />
					</StyledIconButtonMui>

					<StyledIconButtonMui
						onClick={handleOnCancel}
						disableRipple
						disabled={isLoading}
						sx={{ padding: '4px' }}
					>
						<ClearIcon />
					</StyledIconButtonMui>

					<StyledFormHelperText error>
						{formik.errors[newTitle] ? formik.errors[newTitle] : ''}
					</StyledFormHelperText>
					{/* THEME_NEXT */}
					{isLoading && (
						<LinearProgress
							color="primary"
							sx={{ width: `${inputWidth}`, height: '2px' }}
						/>
					)}
				</Box>
			);
		}

		return (
			<Button variant="basic" onClick={handleOnClickTile}>
				{currentProjectTitle}
			</Button>
		);
	};

	return <>{conditionalContent()}</>;
};

export default ProjectTitle;
