/** Copyright (c) 2023-present Kristiyan Dimitrov */

// eslint-disable-next-line import/named
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import type { StoreState } from '..';

// https://react-redux.js.org/using-react-redux/usage-with-typescript
// Use throughout your app instead of plain `useSelector`
const useStoreSelector: TypedUseSelectorHook<StoreState> = useSelector;

export default useStoreSelector;
