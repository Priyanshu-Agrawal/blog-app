import { configureStore , get} from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // Disable serializable check
			immutableCheck: false, // Disable immutability check
		}),
});

export default store;