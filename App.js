import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AddBlog, Blog, Home, Login, Register} from "./src/Screens";
import {Provider, useDispatch} from "react-redux";
import store from "./redux/store";
import {useEffect} from "react";
import {fetchTokenOnAppLoad} from "./redux/store/action/authActions";


const Stack = createNativeStackNavigator();

const ProviderWrapper = ({children}) => {
	return (
		<Provider store={store}>
			{children}
		</Provider>
	);
}

function App() {
	const dispatch = useDispatch();
	
	useEffect(() => {
		// Function to fetch the token from storage
		const fetchToken = async () => {
			dispatch(fetchTokenOnAppLoad());
		};
		
		// Call the fetchToken function when the component mounts
		fetchToken()
			.then(() => {
				// console.log('Token fetched', store.getState().auth.token)
			})
			.catch(e => {console.log('Error in fetching token', e)})
	}, [dispatch]);
	
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Login' component={Login} options={{headerShown: false, statusBarStyle: 'dark'}}/>
				<Stack.Screen name='Register' component={Register} options={{headerShown: false, statusBarStyle: 'dark'}}/>
				<Stack.Screen name="Home" component={Home} options={{headerTitle:"Scripting Bear 🐻 Blogs ", statusBarColor:'#1e1b4b', headerTintColor:'#fff', headerStyle: { backgroundColor: '#1e1b4b' }}}/>
				<Stack.Screen name="Blog" component={Blog} options={{headerTitle:"Blog ", statusBarColor:'#1e1b4b', headerTintColor:'#fff', headerStyle: { backgroundColor: '#1e1b4b' }}}/>
				<Stack.Screen name="AddBlog" component={AddBlog} options={{headerTitle:"Add Blog ", statusBarColor:'#1e1b4b', headerTintColor:'#fff', headerStyle: { backgroundColor: '#1e1b4b' }}}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const WrappedApp = () => (
	<ProviderWrapper>
		<App/>
	</ProviderWrapper>
)

export default WrappedApp;
