import {Pressable, Text, View} from "react-native";
import InputTextCard from "./InputTextCard";
import {styled} from "nativewind";
import {useState} from "react";

const InputCheckBox = ({ label, onChange, checkedDefault, customTailwindClass }) => {
	const [isChecked, setIsChecked] = useState(checkedDefault)
	const StyledPressable = styled(Pressable)
	const StyledText = styled(Text)
	const handleCheckToggle = () => {
		setIsChecked(!isChecked)
		try {
			onChange(!isChecked)
		}catch (e) {
			// console.log('No onChange function provided')
		}
	};
	return (
	<StyledPressable className={`${customTailwindClass} flex flex-row items-center`} onPress={handleCheckToggle}>
		<View className={'w-5 h-5 border-2 border-gray-300 rounded-md'}>
			<Text className={'text-center text-indigo-800'}>{isChecked ? '✓' : ''}</Text>
		</View>
		<StyledText className={'ml-2 text-gray-600'}>{label}</StyledText>
	</StyledPressable>
)}

export default InputCheckBox;