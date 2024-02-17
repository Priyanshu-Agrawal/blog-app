import {Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import axios from "axios";
import blogCard from "../../components/blogComponents/blogCard";
import {API_URL} from "../../constants";
import { FlashList } from "@shopify/flash-list";


const Home = ({navigation}) => {
	const [blogs, setBlogs] = useState([]);
	const fetchBlogs = async () => {
		const response = await axios.get(`${API_URL}/blogs`);
		// console.log(response.data);
		setBlogs(response.data);
	}
	useEffect(() => {
		fetchBlogs().then(() => {});
	}, []);
	return (
		<View className={'relative box-border bg-transparent h-full w-full py-2'}>
			<FlashList
				data={blogs}
				renderItem={({item}) => blogCard({...item, navigation})}
				keyExtractor={item => item._id}
				estimatedItemSize={138}/>
			
			
			{/*Flat list is Breaking here*/}
			{/*<FlatList
				data={blogs}
				keyExtractor={item => item._id}
				renderItem={({item}) => blogCard({...item, navigation})}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				maxToRenderPerBatch={5}
				initialNumToRender={5}
				windowSize={10}
			/>*/}
			
			<TouchableOpacity className={'bg-indigo-950 w-16 aspect-square  rounded-full items-center justify-center absolute  bottom-5 right-5'} onPress={()=> navigation.navigate('AddBlog')}>
				<Text className={'text-white text-4xl'}>+</Text>
			</TouchableOpacity>
			
		</View>
	)
}
export default Home;