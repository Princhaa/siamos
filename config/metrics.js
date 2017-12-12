import { Dimensions, Platform } from 'react-native'

const { height, width } = Dimensions.get('window')

export default {
	DEVICE_WIDTH: width,
	DEVICE_HEIGHT: height,
	OS: Platform.OS,
	COLOR_PRIMARY: '#377dff',
	BASE_URL: 'http://35.197.147.80:5000/'
}