import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = (credentials) => {
	return async (dispatch) => {
		try {
			const response = await axios.post('http://192.168.29.53:5000/auth/login', credentials);
			if (response.status >= 200 && response.status < 300) {
				console.log('User Logged Successfully');
				await AsyncStorage.setItem('token', response.data.token);
				dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.token });
				return {data: response.data};
			} else {
				console.log('Error in Login', response.status);
				dispatch({ type: 'LOGIN_FAILURE', payload: response.data });
				return {data: response.data};
			}
		} catch (error) {
			console.log('Error in Login', error);
			if (error.response) {
				console.log('Error response', error.response.data.error);
				dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.error });
				return {error: error.response.data.error};
			} else {
				console.log('Error message', error.message);
				dispatch({ type: 'LOGIN_FAILURE', payload: 'Error in Login: ' + error.message });
				return {error: 'Error in Login: ' +error.message};
			}
		}
	};
};

// Thunk action to fetch the token on app load
export const fetchTokenOnAppLoad = () => async (dispatch) => {
	try {
		const token = await AsyncStorage.getItem('token');
		if (token) {
			// Dispatch the LOGIN_SUCCESS action with the retrieved token
			dispatch({ type: 'LOGIN_SUCCESS', payload: token });
		}
	} catch (error) {
		console.error('Error fetching token from storage:', error);
	}
};