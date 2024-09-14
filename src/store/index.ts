/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Slices
import { sliceAuthentication } from './storeSlices/sliceAuthentication';
import { sliceUser } from './storeSlices/sliceUser';
import { sliceApp } from './storeSlices/sliceApp';
import { sliceNotification } from './storeSlices/sliceNotification';
import { sliceProjects } from './storeSlices/sliceProjects';
import { sliceOpenedProjects } from './storeSlices/sliceOpenedProjects';
import { sliceSavedPrompts } from './storeSlices/sliceSavedPrompts';
import { sliceStyles } from './storeSlices/sliceStyles';
import { sliceModels } from './storeSlices/sliceModels';
import { sliceAspectRatios } from './storeSlices/sliceAspectRatios';
import { sliceImages } from './storeSlices/sliceImages';
import { sliceProjectImages } from './storeSlices/sliceProjectImages';
import { sliceTutorials } from './storeSlices/sliceTutorials';
import { sliceSamplers } from './storeSlices/sliceSamplers';
import { sliceDiscover } from './storeSlices/sliceDiscover';
import { sliceControlNet } from './storeSlices/sliceControlNet';
import { sliceEnhanceModels } from './storeSlices/sliceEnhanceModels';

// APIs
import { apiAuthentication } from './apis/apiAuthentication';
import { apiUser } from './apis/apiUser';
import { apiUserWallets } from './apis/apiUserWallets';
import { apiProjects } from './apis/apiProjects';
import { apiSavedPrompts } from './apis/apiSavedPrompts';
import { apiStyles } from './apis/apiStyles';
import { apiProducts } from './apis/apiProducts';
import { apiSettings } from './apis/apiSettings';
import { apiModels } from './apis/apiModels';
import { apiImages } from './apis/apiImages';
import { apiGeneration } from './apis/apiGeneration';
import { apiAnnouncements } from './apis/apiAnnouncements';
import { apiTutorials } from './apis/apiTutorials';
import { apiSamplers } from './apis/apiSamplers';
import { apiDiscover } from './apis/apiDiscover';
import { apiEnhanceModels } from './apis/apiEnhanceModels';
import { apiPrompts } from './apis/apiPrompts';
import { apiControlNetTools } from './apis/apiControlNetTools';
import { apiControlNet } from './apis/apiControlNet';

const persistConfig = (key) => {
	return {
		key,
		storage,
		// blacklist: [],
	};
};

const reducer = {
	// Slices
	[sliceUser.name]: persistReducer(persistConfig([sliceUser.name]), sliceUser.reducer),
	[sliceAuthentication.name]: persistReducer(
		persistConfig([sliceAuthentication.name]),
		sliceAuthentication.reducer,
	),
	[sliceApp.name]: sliceApp.reducer,
	[sliceNotification.name]: sliceNotification.reducer,
	[sliceProjects.name]: sliceProjects.reducer,
	[sliceOpenedProjects.name]: sliceOpenedProjects.reducer,
	[sliceSavedPrompts.name]: sliceSavedPrompts.reducer,
	[sliceStyles.name]: sliceStyles.reducer,
	[sliceModels.name]: sliceModels.reducer,
	[sliceAspectRatios.name]: sliceAspectRatios.reducer,
	[sliceImages.name]: sliceImages.reducer,
	[sliceProjectImages.name]: sliceProjectImages.reducer,
	[sliceTutorials.name]: sliceTutorials.reducer,
	[sliceSamplers.name]: sliceSamplers.reducer,
	[sliceDiscover.name]: sliceDiscover.reducer,
	[sliceControlNet.name]: sliceControlNet.reducer,
	[sliceEnhanceModels.name]: sliceEnhanceModels.reducer,

	// APIs
	[apiAuthentication.reducerPath]: apiAuthentication.reducer,
	[apiUser.reducerPath]: apiUser.reducer,
	[apiUserWallets.reducerPath]: apiUserWallets.reducer,
	[apiProjects.reducerPath]: apiProjects.reducer,
	[apiSavedPrompts.reducerPath]: apiSavedPrompts.reducer,
	[apiProducts.reducerPath]: apiProducts.reducer,
	[apiStyles.reducerPath]: apiStyles.reducer,
	[apiSettings.reducerPath]: apiSettings.reducer,
	[apiModels.reducerPath]: apiModels.reducer,
	[apiImages.reducerPath]: apiImages.reducer,
	[apiGeneration.reducerPath]: apiGeneration.reducer,
	[apiAnnouncements.reducerPath]: apiAnnouncements.reducer,
	[apiTutorials.reducerPath]: apiTutorials.reducer,
	[apiSamplers.reducerPath]: apiSamplers.reducer,
	[apiDiscover.reducerPath]: apiDiscover.reducer,
	[apiEnhanceModels.reducerPath]: apiEnhanceModels.reducer,
	[apiPrompts.reducerPath]: apiPrompts.reducer,
	[apiControlNetTools.reducerPath]: apiControlNetTools.reducer,
	[apiControlNet.reducerPath]: apiControlNet.reducer,
};

const middleware = (getDefaultMiddleware) => {
	return getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	})
		.concat(apiAuthentication.middleware)
		.concat(apiUser.middleware)
		.concat(apiUserWallets.middleware)
		.concat(apiProjects.middleware)
		.concat(apiSavedPrompts.middleware)
		.concat(apiStyles.middleware)
		.concat(apiSettings.middleware)
		.concat(apiModels.middleware)
		.concat(apiProducts.middleware)
		.concat(apiImages.middleware)
		.concat(apiGeneration.middleware)
		.concat(apiAnnouncements.middleware)
		.concat(apiTutorials.middleware)
		.concat(apiSamplers.middleware)
		.concat(apiDiscover.middleware)
		.concat(apiControlNetTools.middleware)
		.concat(apiControlNet.middleware)
		.concat(apiEnhanceModels.middleware)
		.concat(apiPrompts.middleware);
};

/**
 * For test purposes
 * https://redux.js.org/usage/writing-tests
 *
 * Returns the initial app store state, mutated with the provided 'preloadedState'.
 * @param {Object} preloadedState
 * @returns `object`
 */
export const setupStore = (preloadedState) => {
	return configureStore({
		// rootReducer
		reducer: combineReducers({
			...reducer,
		}),
		middleware,
		preloadedState,
	});
};

const store = configureStore({ reducer, middleware });
// Create a persistor
const persistor = persistStore(store);

// TODO_NEXT verify do we need it
// https://redux-toolkit.js.org/rtk-query/api/setupListeners
setupListeners(store.dispatch);

// https://react-redux.js.org/using-react-redux/usage-with-typescript
// Infer the `StoreState` and `StoreDispatch` types from the store itself
export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export {
	store,
	persistor,
	apiAuthentication,
	apiProjects,
	apiImages,
	apiTutorials,
	apiSamplers,
	apiUserWallets,
};
