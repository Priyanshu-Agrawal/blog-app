import {Text, TouchableOpacity, View} from "react-native";

const blogCard = ({ _id, title, content, createdAt, navigation}) => {
	return (
		<TouchableOpacity className={''} onPress={()=> navigation.navigate('Blog', { id:  _id})}>
		<View className={'block overflow-hidden flex-1 pl-3 pr-6 border border-gray-300 rounded-xl shadow-2xlc bg-white'} >
			<Text className={'py-2 px-1.5 text-xl border-b border-indigo-900 font-medium text-indigo-950'} numberOfLines={1} ellipsizeMode={'tail'}>{title}</Text>
			<Text className={'py-2 px-1 h-14'} numberOfLines={2} ellipsizeMode={"tail"}>{content}  </Text>
			<Text className={'py-2 self-end text-gray-600'}>
				{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(createdAt))}
			</Text>
		</View>
		</TouchableOpacity>
	);
}

export default blogCard;