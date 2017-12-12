import React, { Component } from 'react'
import { DeviceEventEmitter, View, StyleSheet, Text, FlatList, ActivityIndicator, Alert } from 'react-native'

import CustomTextInput from '../components/CustomTextInput'
import metrics from '../config/metrics'
import SearchItem from '../components/SearchItem'

export default class Search extends Component {

	constructor(props) {
		super(props)
		this.state = {
			isDataLoaded: true,
			data: [],
			courseId: null
		}
	}

	static navigationOptions = {
		header: null
	}

	async searchCourse(courseId) {
		this.setState({ isDataLoaded: false })
		let courseNameObj = await fetch(metrics.BASE_URL + `courses/${courseId}`, { method: 'GET' })
		courseNameObj = await courseNameObj.json()
		this.setState({ isDataLoaded: true, data: courseNameObj })
	}

	async addCourse(courseId) {
		this.setState({ isDataLoaded: false })
		let response = await fetch(metrics.BASE_URL + 'addCourse', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				id: courseId
			})
		})
		if (response.ok) {
			Alert.alert('Pemberitahuan', 'Sukses menambahkan mata kuliah', [
				{text: 'OK', onPress: () => {
					DeviceEventEmitter.emit('shouldRefresh', true)
					this.props.navigation.goBack(null)
				}}
			])
		}
	}

	renderList() {
		if (this.state.isDataLoaded) {
			return (
				<FlatList 
					data={this.state.data}
					renderItem={({ item }) => (
						<SearchItem 
							id={item.id}
							name={item.name}
							onPress={() => this.addCourse(item.id)}
						/>
					)}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
				/>
			)
		} else {
			return (
				<ActivityIndicator size={'large'}/>
			)
		}
	}
	
	render() {
		return(
			<View style={styles.container}>
				<Text style={styles.title}>Search</Text>
				<CustomTextInput 
					placeholder={'Masukkan kode mata kuliah disini'}
					style={styles.textInput}
					onChangeText={(value) => this.setState({ courseId: value })}
					onEndEditing={() => this.searchCourse(this.state.courseId)}
				/>
				{this.renderList()}
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
		alignItems: 'center',
		padding: 20,
		paddingTop: 50
	},

	title: {
		color: metrics.COLOR_PRIMARY,
		fontWeight: '400',
		fontSize: 20
	},

	textInput: {
		borderColor: '#ededed',
		borderWidth: 1,
		marginVertical: 5,
		backgroundColor: 'white',
		paddingHorizontal: 10,
		borderRadius: 5,
		height: 50,
		width: metrics.DEVICE_WIDTH * 0.9,
		justifyContent: 'center',
		flexDirection: 'row',
		marginTop: 20
	},
})