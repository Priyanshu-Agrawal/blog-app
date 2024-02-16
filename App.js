import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Home, Login, Register} from "./src/Screens";


const Stack  = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} options={{headerShown:false, statusBarStyle:'dark' }}/>
            <Stack.Screen name='Register' component={Register} options={{headerShown:false, statusBarStyle:'dark' }}/>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}