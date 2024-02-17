import React, { useState } from "react";
import {View, Text, ScrollView} from "react-native";
import Modal from "react-native-modal";
import axios from "axios";
import { API_URL } from "../../constants";
import {InputSolidButton, InputTextCard} from "../index";

const CommentPopup = ({ comments, isVisible, onClose , userId, blogId}) => {
	const [newComment, setNewComment] = useState("");
	
	const handleAddComment = async () => {
		try {
			// Make a POST request to add the new comment
			const response = await axios.post(`${API_URL}/comments`, {
				comment: newComment,
				userId:userId,
				blogId:blogId,
			});
			if(response.status === 200){
				// console.log(response.data);
				// console.log("Comment added successfully");
				setNewComment("");
				onClose();
			}
			// console.log(response);
			
			// Handle the response and update the comments list
			// You can add the new comment to the existing comments array
			// or fetch the updated comments from the server again
			
			// Clear the new comment input
		} catch (error) {
			console.log("Error adding comment:", error);
		}
	};
	
	return (
		<Modal  isVisible={isVisible} onBackdropPress={onClose}>
			<View className={"bg-white p-4 rounded"}>
				<Text className={"text-lg font-bold mb-2"} >Comments:</Text>
				<ScrollView className={"mb-2"}>
					{comments.length > 0 ? comments.map((comment) => (
						<View key={comment._id} className={"p-2 border"}>
							<Text className={"font-bold"}>{comment?.userId}</Text>
							<Text>{comment.comment}</Text>
						</View>
					))
					: <Text>No comments yet</Text>}
				</ScrollView>
				<InputTextCard
					customTailwindClass={'mb-2'}
					value={newComment}
					onChangeText={setNewComment}
					placeholderText={"Add a comment..."}
				/>
				<InputSolidButton btnText={"Add Comment"} onClick={handleAddComment} />
			</View>
		</Modal>
	);
};

export default CommentPopup;
