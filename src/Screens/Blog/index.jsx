import {Text, View} from "react-native";
import {useEffect, useState} from "react";
import axios from "axios";
import CardWrapper from "../../components/hoc/cardWrapper";
import {InputTextButton} from "../../components";
import {API_URL} from "../../constants";
import CommentPopup from "../../components/blogComponents/commentPopup";
import {useSelector} from "react-redux";

const Blog = ({route, navigation}) => {
	const {id} = route.params;
	const [blog, setBlog] = useState({});
	const [commentPopup, setCommentPopup] = useState(false);
	const [comments, setComments] = useState([])
	
	
	
	const authState = useSelector(state => state.auth);
	const user  = JSON.parse(authState.user);
	
	const fetchBlog = async () => {
		try {
			const response = await axios.get(`${API_URL}/blogs/` + id);
			if (response.status === 200) {
				const authorResponse = await axios.get(`${API_URL}/users/` + response.data.userId);
				if (authorResponse.status === 200) {
					setBlog({...response.data, author: authorResponse.data.name});
				}
			}
			if (response.status === 200) {
				const commentsResponse = await axios.get(`${API_URL}/comments?blogId=` + id);
				if (commentsResponse.status === 200) {
					setComments(commentsResponse.data);
					
				}
			}
			navigation.setOptions({title: response.data.title})
		} catch (error) {
			console.log('Error in fetchingBlog', error);
			if (error.response) {
				console.log('Error response', error.response.data.error);
			} else {
				console.log('Error message', error.message);
			}
		}
	}
	useEffect(() => {
		fetchBlog()
	}, [id]);
	
	return (
		<View className={'relative flex-1 items-center justify-center py-14'}>
			<View className={'min-h-16 w-full px-14'}>
				<CardWrapper customTailwindCss={'h-full w-full'}>
					<View className={'px-2 py-2 w-full'}>
						<View className={'border-b border-indigo-900 py-2'}>
							<Text className={'text-xl font-bold text-indigo-950'}>{blog.title}</Text>
							<Text className={'text-gray-600 italic'}>~{blog.author}</Text>
						</View>
						<View className={'p-1 pr-6'}>
							<Text>{blog.content}</Text>
						</View>
					</View>
				</CardWrapper>
			</View>
			<InputTextButton text={'Comment'} onClick={() => setCommentPopup(!commentPopup)}/>
			{commentPopup && (
					<CommentPopup
						blogId={id}
						userId={user._id}
						comments={comments}
						isVisible={commentPopup}
						onClose={() => setCommentPopup(false)}
					/>
				)}
				< /View>
				)
			}
			
			export default Blog;