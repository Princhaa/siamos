import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export default class CustomButton extends Component {

	render() {
		const {  style, text, ...otherProps } = this.props
		return (
			<TouchableOpacity style={[style, styles.container]} {...otherProps}>
				<Text style={styles.text}>{text}</Text>
			</TouchableOpacity>
		)
	}

}

const styles = StyleSheet.create({
	text: {
		color: 'white'
	},

	container: {
		justifyContent: 'center',
		alignItems: 'center'
	}
})