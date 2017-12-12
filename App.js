import { StackNavigator } from 'react-navigation'

import Main from './screens/Main'
import Search from './screens/Search'

const RootNavigator = StackNavigator({
	Main: { screen: Main },
	Search: { screen: Search }
})

export default RootNavigator