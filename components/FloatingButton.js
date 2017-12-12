import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'

import metrics from '../config/metrics'

const FloatingButton = ({ style, ...otherProps }) => (
	<TouchableOpacity {...otherProps} style={[styles.button, style]}>
		<Text style={{ color: 'white', fontSize: 20 }}>+</Text>
	</TouchableOpacity>
)

const styles = StyleSheet.create({
	button: {
		backgroundColor: metrics.COLOR_PRIMARY,
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: 'rgba(184, 184, 184, 0.5)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 4,
		shadowOpacity: 1,
	}
})

export default FloatingButton