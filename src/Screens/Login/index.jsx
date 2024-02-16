import {Text, View} from "react-native";
import {styled} from "nativewind";
import {useEffect, useState} from "react";
import {InputSolidButton, InputTextButton, InputTextCard} from "../../components";
import validate from "../../../utilities/formValidator";
import axios from "axios";


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
	
	const logIn = async () => {
		try {
			const response = await axios.post('http://192.168.29.53:5000/auth/login', values);
			if (response.status >= 200 && response.status < 300) {
				console.log('User Logged Successfully');
				navigation.replace('Home');
			} else {
				console.log('Error in Login', response.status);
				setErrors({ data: response.data });
			}
		} catch (error) {
			console.log('Error in Login', error);
			if (error.response) {
				console.log('Error response', error.response.data.error);
				setErrors({ data: error.response.data.error });
			} else {
				console.log('Error message', error.message);
				setErrors({ data: 'Error in Login: ' + error.message });
			}
		}
	};
	
	const handleFormSubmit = () => {
		setErrors(validate(values))
		if(Object.keys(errors).length > 0){
			console.log('Errors in form')
			console.log(errors)
		}else{
			logIn().then(r => ({})).catch(e => console.log('Error in login', e))
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