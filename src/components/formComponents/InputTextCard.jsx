import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {useState} from "react";

const InputTextCard = ({placeholderText,value , name, onChangeText , isMultline, isToggleablePassword, customTailwindClass, secured, isError}) => {
	const [isSecured, setIsSecured] = useState(isToggleablePassword || secured || false)
	const handleSecuredToggle = () => {
		setIsSecured(!isSecured)
	}
	
	const [height, setHeight] = useState(800); // Start with a default height
	
	const onContentSizeChange = (event) => {
		setHeight(event.nativeEvent.contentSize.height);
	};
	
	
	return (
		<View className={`flex justify-center items-center border-b-2 w-full border-gray-300 bg-gray-50 border rounded-lg h-max max-h-96 ${isError && 'border-red-800'} ${customTailwindClass} `}>
			<TextInput
				multiline={isMultline}
				className={`py-2 px-3 w-full h-14 outline-none border-0 `}
				secureTextEntry={isSecured ?? false}
				value={value} placeholder={placeholderText}
				onChangeText={(text) => onChangeText(text, name)}
				onContentSizeChange={onContentSizeChange}
				style={isMultline && {height: height, maxHeight: 200, minHeight: 100}}
				
			/>
			{isToggleablePassword && (
				<TouchableOpacity onPress={handleSecuredToggle} className={'absolute right-4'}>
					<Text>{isSecured ? '🔒️' : '👁'}</Text>
				</TouchableOpacity>
			)}
		</View>
	)
}

export default InputTextCard;