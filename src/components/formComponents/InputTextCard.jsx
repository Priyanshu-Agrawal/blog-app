import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {useState} from "react";

const InputTextCard = ({placeholderText,value , name, onChangeText, isToggleablePassword, customTailwindClass, secured, isError}) => {
	const [isSecured, setIsSecured] = useState(isToggleablePassword || secured || false)
	const handleSecuredToggle = () => {
		setIsSecured(!isSecured)
	}
	
	return (
		<View className={`${customTailwindClass} flex justify-center items-center border-b-2 w-full h-14 border-gray-300 bg-gray-50 border rounded-lg ${isError && 'border-red-800'}`}>
			<TextInput
				className={'py-2 px-3 w-full h-max outline-none border-0'}
				secureTextEntry={isSecured ?? false}
				value={value} placeholder={placeholderText}
				onChangeText={(text) => onChangeText(text, name)}
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