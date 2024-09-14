/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { useEffect, useState } from 'react';

import useSliceSavedPrompts from 'store/hooks/useSliceSavedPrompts';
import { SavedPrompt } from 'store/types/typesSavedPrompts';

import strings from 'constants/strings';
import { MAX_LENGTH_PROMPT } from 'constants/default';

const { savePrompt, savedWithTitle } = strings;

const useIsPromptSaved = (prompt: string) => {
	const { items } = useSliceSavedPrompts();
	const [isPromptSaved, setIsPromptSaved] = useState<boolean>(false);
	const [tooltip, setTooltip] = useState<string>('');

	useEffect(() => {
		const savedPrompt = items.find((item: SavedPrompt) => item.prompt === prompt);

		if (savedPrompt) {
			setIsPromptSaved(true);
			setTooltip(`${savedWithTitle} "${savedPrompt.title}"`);
		}

		if (prompt && !savedPrompt) {
			setIsPromptSaved(false);
			setTooltip(savePrompt);
		}

		if (prompt.length >= MAX_LENGTH_PROMPT) {
			setIsPromptSaved(false);
			setTooltip('');
		}

		if (!prompt) {
			setIsPromptSaved(false);
			setTooltip('');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [items.length, prompt]);

	return { isPromptSaved, tooltip };
};

export default useIsPromptSaved;
