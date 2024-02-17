import {Text, View} from "react-native";
import {styled} from "nativewind";
import {useEffect, useState} from "react";
import {InputSolidButton, InputTextButton, InputTextCard} from "../../components";
import validate from "../../../utilities/formValidator";
import {useDispatch, useSelector} from "react-redux";
import { login } from '../../../redux/store/action/authActions';


const Login = ({navigation}) => {
	const StyledText = styled(Text)
	const initialValues = {email: '', password: ''}
	const [values, setValues] = useState(initialValues)
	const [errors, setErrors] = useState({})
	const handleTextChange = (text, field) => {
		setValues(prevValues => ({...prevValues, [field]: text}))
	}
	useEffect(() => {
		if (errors && Object.keys(errors).length > 0) setErrors(validate(values))
	}, [values])
	
	const dispatch = useDispatch();
	
	const authState = useSelector(state => state.auth);
	const { token, user,  error } = authState;
	
	useEffect(() => {
		if (token) {
			// console.log('Login successful');
			// console.log('User:', user);
			navigation.replace('Home');
		}
		if (error) {
			console.log('Login failed:', error);
			setErrors({ data: error});
		}
	}, [token, error, user]); // Depend on token and error to re-run the effect
	
	const handleFormSubmit = () => {
		setErrors(validate(values))
		if(Object.keys(errors).length > 0 && !!errors['data']){
			console.log('Errors in form')
			console.log(errors)
		}else{
			dispatch(login(values))
				.then(() => {})
				.catch((e) => console.log('Error in login', e));
			// logIn().then(() =>{} ).catch(e => console.log('Error in login', e))
		}
	}
	
	return (
		<View className={'flex-1 px-16 mt-28 items-center'}>
			<View className={'w-full'}>
				<StyledText className={'text-2xl font-bold text-center'}>Welcome Back !</StyledText>
				<StyledText className={'text-base text-gray-600 text-center'}>Please login to continue</StyledText>
				<View className={'flex mt-12'}>
					<InputTextCard customTailwindClass={'my-1'}  placeholderText={'Email'} value={values['email'] ?? ''} name={'email'} onChangeText={handleTextChange} isError={!!errors['email']}/>
					<InputTextCard customTailwindClass={'my-1'}  placeholderText={'Password'} value={values['password'] ?? ''} name={'password'} onChangeText={handleTextChange} isToggleablePassword isError={!!errors['password']}/>
					<View className={'w-full mt-0.5'}>
						<StyledText className={'text-right text-indigo-850 active:text-red-800'}>Forgot Password ?</StyledText>
					</View>
					{errors?.['data'] && <StyledText className={'text-red-600 text-sm mt-2'}>{errors["data"]}</StyledText>}
					<InputSolidButton customTailwindClass={'mt-3'} btnText={'Login'} onClick={handleFormSubmit}/>
				</View>
				<View className={'flex justify-center items-center mt-8'}>
					<StyledText className={'text-gray-600'}>Don't have an account ?</StyledText>
					<InputTextButton onClick={()=>{navigation.navigate('Register')}} text={'Register Here'}/>
				</View>
			</View>
		</View>
	)
}
export default Login;