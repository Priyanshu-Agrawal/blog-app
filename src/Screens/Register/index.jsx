import {Text, View} from "react-native";
import {styled} from "nativewind";
import {useEffect, useState} from "react";
import {InputCheckBox, InputSolidButton, InputTextButton, InputTextCard} from "../../components";
import validate from "../../../utilities/formValidator";
import axios from "axios";

const Register = ({navigation}) => {
	const initialValues = {name: '', email: '', password: '', confirmPassword: '', eula: false}
	const StyledText = styled(Text)
	const [values, setValues] = useState(initialValues)
	const [errors, setErrors] = useState({})
	const handleTextChange = (text, field) => {
		setValues(prevValues => ({...prevValues, [field]: text}))
	}
	
	useEffect(() => {
		if (errors && Object.keys(errors).length > 0) setErrors(validate(values))
	}, [values])
	
	const signUp = async () => {
		try {
			const response = await axios.post('http://192.168.29.53:5000/auth/register', values);
			if (response.status === 201) {
				console.log('User Registered Successfully');
				navigation.navigate('Login');
			} else {
				console.log('Error in registration', response.data.error);
				setErrors({ data: response.data.error });
			}
		} catch (error) {
			console.log('Error in registration', error);
			if (error.response) {
				console.log('Error response', error.response.data.error);
				setErrors({ data: error.response.data.error });
			} else {
				console.log('Error message', error.message);
				setErrors({ data: 'Error in registration: ' + error.message });
			}
		}
	};
	
	const handleFormSubmit = () => {
		setErrors(validate(values))
		if(Object.keys(errors).length > 0 && !!errors['data']){
			console.log('Errors in form')
		}else{
			signUp()
		}
	}
	
	return (
		<View className={'flex-1 px-16 mt-28 items-center'}>
			<View className={'w-full'}>
				<StyledText className={'text-xl font-bold text-center'}>Welcome to Scripting Bear Blogs !</StyledText>
				<StyledText className={'mt-10 text-base text-gray-600 text-center'}>Please fill in your details to continue</StyledText>
				<View className={'flex mt-2'}>
					<InputTextCard customTailwindClass={'my-1'}  placeholderText={'Name'} value={values['name'] ?? ''} name={'name'} onChangeText={handleTextChange} isError={!!errors['name']}/>
					<InputTextCard customTailwindClass={'my-1'}  placeholderText={'Email'} value={values['email'] ?? ''} name={'email'} onChangeText={handleTextChange} isError={!!errors['email']}/>
					<InputTextCard customTailwindClass={'my-1'}  placeholderText={'Password'} value={values['password'] ?? ''} name={'password'} onChangeText={handleTextChange} secured isError={!!errors['password']}/>
					<InputTextCard customTailwindClass={'my-1'}  placeholderText={'Confirm Password'} value={values['confirmPassword'] ?? ''} name={'confirmPassword'} onChangeText={handleTextChange} isError={!!errors['confirmPassword']} secured />
					<InputCheckBox customTailwindClass={'mt-2'} label={"I agree to the Terms and Conditions"} onChange={()=> setValues(prevValues => ({...prevValues, ['eula']: !values['eula']}))} isError={!!errors['eula']}/>
					{/*Error message*/}
					{errors?.['data'] && <StyledText className={'text-red-600 text-sm mt-2'}>{errors["data"]}</StyledText>}
					<InputSolidButton customTailwindClass={`${errors['data'] ? 'mt-2' : 'mt-4'}`} btnText={'Register'} onClick={handleFormSubmit}/>
				</View>
				<View className={'flex justify-center items-center mt-8'}>
					<Text className={'text-gray-600'}>Already a user?</Text>
					<InputTextButton onClick={()=>{navigation.navigate('Login')}} text={'Login from Here'}/>
				</View>
			</View>
		</View>
	)
}
export default Register;
