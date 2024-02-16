const validationSchema = {
	name: {
		required: true,
		minLength: 3,
		maxLength: 20
	},
	email: {
		required: true,
		email: true
	},
	password: {
		required: true,
		minLength: 8,
		maxLength: 20
	},
	confirmPassword: {
		required: true,
		minLength: 8,
		maxLength: 20,
		matches: 'password'
	},
	eula: {
		required: true
	}
}
const validationMessages = {
	name: {
		required: 'Name is required',
		minLength: 'Name should be at least 3 characters long',
		maxLength: 'Name should not exceed 20 characters'
	},
	email: {
		required: 'Email is required',
		email: 'Invalid Email'
	},
	password: {
		required: 'Password is required',
		minLength: 'Password should be at least 8 characters long',
		maxLength: 'Password should not exceed 20 characters'
	},
	confirmPassword: {
		required: 'Confirm Password is required',
		minLength: 'Confirm Password should be at least 8 characters long',
		maxLength: 'Confirm Password should not exceed 20 characters',
		matches: 'Passwords do not match'
	},
	eula: {
		required: 'Please agree to the terms and conditions'
	}
}

const validate = (values) => {
	const errors = {}
	Object.keys(values).forEach(key => {
		if(validationSchema[key].required && !values[key]){
			errors[key] = validationMessages[key].required
		}
		if(validationSchema[key].minLength && values[key].length < validationSchema[key].minLength){
			errors[key] = validationMessages[key].minLength
		}
		if(validationSchema[key].maxLength && values[key].length > validationSchema[key].maxLength){
			errors[key] = validationMessages[key].maxLength
		}
		if(validationSchema[key].email && !/\S+@\S+\.\S+/.test(values[key])){
			errors[key] = validationMessages[key].email
		}
		if(validationSchema[key].matches && values[key] !== values[validationSchema[key].matches]){
			errors[key] = validationMessages[key].matches
		}
	})
	return errors
}

export default validate