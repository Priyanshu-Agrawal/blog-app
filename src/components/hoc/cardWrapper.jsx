import {View} from "react-native";

const cardWrapper = ({ children, customTailwindCss} ) => {
	return(
		<View className={`border-b-2 w-full border-gray-300 bg-gray-50 border rounded-lg  ${customTailwindCss}`}>
			{children}
		</View>
		)
}

export default cardWrapper;