import React, { Component } from 'react'
import { DeviceEventEmitter, View, Text, StyleSheet, Image, FlatList, ActivityIndicator, Alert } from 'react-native'

import metrics from '../config/metrics'
import FloatingButton from '../components/FloatingButton'
import KRSItem from '../components/KRSItem'

const photo = require('../assets/foto.png')

export default class Main extends Component {

	constructor(props) {
		super(props)
		this.state = {
			courses: null,
			isDataLoaded: false
		}
	}

	static navigationOptions = {
		header: null
	}

	componentWillMount() {
		DeviceEventEmitter.addListener('shouldRefresh', (e) => {
			if (e) {
				this.componentDidMount()
			}
		})
	}

	async componentDidMount() {
		this.setState({ isDataLoaded: false })
		let response = await fetch(metrics.BASE_URL + 'getCourses', {
			method: 'GET'
		})
		response = await response.json()
		let courses = []
		for (let key in response) {
			let courseNameObj = await fetch(metrics.BASE_URL + `courses/${key}`, { method: 'GET' })
			courseNameObj = await courseNameObj.json()
			courses.push(courseNameObj[0])
		}
		this.setState({ isDataLoaded: true, courses })
	}

	async deleteCourse(courseId) {
		let response = await fetch(metrics.BASE_URL + 'removeCourse', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				id: courseId
			})
		})
		if (response.ok) {
			Alert.alert('Pemberitahuan', 'Penghapusan berhasil', [
				{text: 'OK', onPress: () => this.componentDidMount()}
			])
		}
	}

	renderList() {
		if (this.state.isDataLoaded) {
			return (
				<FlatList 
					data={this.state.courses}
					renderItem={({ item }) => (
						<KRSItem 
							id={item.id}
							name={item.name}
							onPress={() => this.deleteCourse(item.id)}
						/>
					)}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
				/>
			)
		} else {
			return (
				<ActivityIndicator size={'large'} />
			)
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<View style={{ flex: 1 }}>
						<Text>Muh. Ananta Pratama</Text>
						<Text>155150200111072</Text>					
					</View>
					<Image source={photo} style={styles.photo}/>
				</View>
				<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
					<Text style={styles.title}>Kartu Rencana Studi</Text>
				</View>
				<View style={styles.card}>
					{this.renderList()}
				</View>
				<FloatingButton style={styles.floatingButton} onPress={() => this.props.navigation.navigate('Search')}/>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		padding: 20,
		paddingTop: 30,
	},

	photo: {
		borderRadius: 25,
		width: 50,
		height: 50,
		margin: 5
	},

	title: {
		fontWeight: '400',
		fontSize: 20,
		color: metrics.COLOR_PRIMARY
	},

	floatingButton: {
		width: 50,
		height: 50,
		position: 'absolute',
		bottom: 20,
		elevation: 6,
		zIndex: 2,
		right: 20
	}, 

	card: {
		marginTop: 20,
		width: metrics.DEVICE_WIDTH * 0.9,
		shadowColor: 'rgba(184, 184, 184, 0.5)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 10,
		shadowOpacity: 1,
		height: metrics.DEVICE_HEIGHT * 0.75,
		padding: 20,
		backgroundColor: 'white',
		borderRadius: 5
	}
})