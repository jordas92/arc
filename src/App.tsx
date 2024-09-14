/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { persistor, store } from './store';

import { getAppTheme } from './styles/newTheme';
import { DARK_MODE_THEME, LIGHT_MODE_THEME } from './constants/default';
import AppRoutes from './routes/routes';

import './assets/stylesheets/base.css';

function App() {
	const [mode] = useState<typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME>(DARK_MODE_THEME);
	const theme: any = useMemo(() => getAppTheme(mode), [mode]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<DndProvider backend={HTML5Backend}>
						<BrowserRouter>
							<AppRoutes />
						</BrowserRouter>
					</DndProvider>
				</PersistGate>
			</Provider>
		</ThemeProvider>
	);
}

export default App;
