import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import metrics from '../config/metrics'

const SearchItem = ({ id, name, ...otherProps }) => (
	<View style={styles.container}>
		<Text style={[styles.text, { flex: 1.5 }]}>{id}</Text>
		<Text style={[styles.text, { flex: 3 }]}>{name}</Text>
		<TouchableOpacity style={styles.addButton} {...otherProps}>
			<Text style={styles.buttonText}>Tambah</Text>
		</TouchableOpacity>
	</View>
)

const styles = StyleSheet.create({
	container: {
		width: metrics.DEVICE_WIDTH * 0.88,
		paddingVertical: 5,
		flexDirection: 'row',
		borderColor: 'grey',
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderTopWidth: StyleSheet.hairlineWidth,
		alignItems: 'center'
	},

	text: {
		margin: 5
	},

	addButton: {
		backgroundColor: metrics.COLOR_PRIMARY,
		flex: 1,
		borderRadius: 5,
		padding: 5,
		marginRight: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},

	buttonText: {
		color: 'white'
	}
})

export default SearchItem