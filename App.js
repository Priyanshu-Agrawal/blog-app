import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Login, Register} from "./src/Screens";
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
		fetchToken().then(() => {console.log('Token fetched')});
	}, [dispatch]);
	
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Login' component={Login} options={{headerShown: false, statusBarStyle: 'dark'}}/>
				<Stack.Screen name='Register' component={Register} options={{headerShown: false, statusBarStyle: 'dark'}}/>
				<Stack.Screen name="Home" component={Home}/>
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
