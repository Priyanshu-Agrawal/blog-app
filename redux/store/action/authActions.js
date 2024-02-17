import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_URL} from "../../../src/constants";

export const login = (credentials) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(`${API_URL}/auth/login`, credentials);
			if (response.status >= 200 && response.status < 300) {
				console.log('User Logged Successfully');
				await AsyncStorage.setItem('token', response.data.token);
				await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
				dispatch({ type: 'LOGIN_SUCCESS', payload: {token: response.data.token, user: response.data.user} });
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
		const user = await AsyncStorage.getItem('user');
		if (token && user) {
			// Dispatch the LOGIN_SUCCESS action with the retrieved tokern
			dispatch({ type: 'LOGIN_SUCCESS', payload: {token: token, user: user} });
		}
	} catch (error) {
		console.error('Error fetching token from storage:', error);
	}
};