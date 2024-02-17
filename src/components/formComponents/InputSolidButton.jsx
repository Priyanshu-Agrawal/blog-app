import {Pressable, Text} from "react-native";
import {styled} from "nativewind";

const InputSolidButton = ({btnText, customTailwindClass, onClick}) => {
	const StyledPressable = styled(Pressable)
	return (
		<StyledPressable className={`bg-indigo-950 py-4 rounded-lg active:bg-indigo-900 ${customTailwindClass} `} onPress={onClick ?? (() => {})}>
			<Text className={'text-white text-center font-bold uppercase text-base'}>{btnText ?? "Click Me"}</Text>
		</StyledPressable>
	)
}
export default InputSolidButton;