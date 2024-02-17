import {Text, TextInput, View} from "react-native";
import {InputSolidButton, InputTextCard} from "../../components";
import CardWrapper from "../../components/hoc/cardWrapper";
import {useState} from "react";
import axios from "axios";
import {content} from "../../../tailwind.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useSelector} from "react-redux";
import {API_URL} from "../../constants";

const AddBlog = () => {
	const [values, setValues] = useState({title: '', content: ''});
	const [errors, setErrors] = useState({title: '', content: ''});
	
	
	const authState = useSelector(state => state.auth);
	const { user } = authState;
	const handleTextChange = (text, field) => {
		console.log('text', text, field);
		setValues(prevValues => ({...prevValues, [field]: text}))
	}
	
	const handleFormSubmit = async () => {
		if(!values['title']){
			setErrors(prevErrors => ({...prevErrors, title: 'Title is required'}))
		}
		if(!values['content']){
			setErrors(prevErrors => ({...prevErrors, content: 'Content is required'}))
		}
		if(values['title'] && values['content']){
			// console.log(typeof JSON.parse(user))
			// console.log({userId: JSON.parse(user)._id ,...values})
			await axios.post(`${API_URL}/blogs`, {userId: JSON.parse(user)._id ,...values})
		}
	}
	
	return (
		<View className={'py-2 px-6'}>
			<Text className={'text-xl font-extrabold p-2 my-2'}>Write Your Blogs</Text>
			<View>
				{errors['title'] && <Text className={'text-red-500 text-sm'}>{errors['title']}</Text>}
				<InputTextCard placeholderText={'Blog Title'} value={values['title'] ?? ''} name={'title'} onChangeText={handleTextChange} isError={!!errors['title']}/>
				<CardWrapper customTailwindCss={'my-4'}>
					<TextInput placeholder={'Blog Content'} multiline={true} numberOfLines={10} className={'py-2 px-3 w-full h-40 outline-none border-0 '}
					value={values['content']} onChangeText={(text)=> handleTextChange(text, 'content')}/>
				</CardWrapper>
				{errors['content'] && <Text className={'text-red-500 text-sm'}>{errors['content']}</Text>}
				<Text className={'text-red-500 text-sm'}>{errors['email']}</Text>
				<InputSolidButton btnText={'Add Blog'} onClick={handleFormSubmit}/>
			</View>
		</View>
	)
}
export default AddBlog;