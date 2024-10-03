import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProductListScreen from './src/screens/ProductListScreen'
import ProductDetailsScreen from './src/screens/ProductDetailsScreen'
import CartScreen from './src/screens/CartScreen'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import store from './src/redux/store'


const Stack = createNativeStackNavigator()
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="ProductList" component={ProductListScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen}  />
          <Stack.Screen name="CartScreen" component={CartScreen}  />
        </Stack.Navigator>
      </NavigationContainer>
     </Provider>
  )
}

export default App

