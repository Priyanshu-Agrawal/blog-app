import {styled} from "nativewind";
import {Pressable, Text} from "react-native";

const InputTextButton = ({ onClick, text }) =>  {
	const StyledPressable = styled(Pressable)
	const StyledText = styled(Text)
	return (
		<StyledPressable className={'active:text-red-800'}>
			<StyledText onPress={onClick} className={'text-indigo-900 font-bold active:text-indigo-700'}>
				{text ?? "Click Me"}
			</StyledText>
		</StyledPressable>
	)
}
export default InputTextButton;