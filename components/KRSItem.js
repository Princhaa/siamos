import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import metrics from '../config/metrics'

const KRSItem = ({ id, name, ...otherProps }) => (
	<View style={styles.container}>
		<Text style={[styles.text, { flex: 1.5 }]}>{id}</Text>
		<Text style={[styles.text, { flex: 3 }]}>{name}</Text>
		<TouchableOpacity style={styles.erase} {...otherProps}>
			<Text style={{ color: 'white' }}>Hapus</Text>
		</TouchableOpacity>
	</View>
)

const styles = StyleSheet.create({
	container: {
		width: metrics.DEVICE_WIDTH * 0.8,
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

	erase: {
		backgroundColor: 'rgb(219,76,62)',
		flex: 0.9,
		borderRadius: 5,
		padding: 5,
		marginRight: 5,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default KRSItem