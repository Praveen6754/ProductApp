import { Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/actions';

const { width, height } = Dimensions.get('window');

const ProductDetailsScreen = ({ route, navigation }: any) => {

  //get the product from params
  const { product } = route.params;
  const dispatch = useDispatch();

  const cartItems = useSelector((state: any) => state.items); // Access cart items

  //check item is exist or not in cart
  const isInCart = cartItems.some((item: any) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  }

  const handlePress = () => {
    if (isInCart) {
      navigation.navigate('CartScreen')
    } else {
      handleAddToCart()
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <TouchableOpacity
        onPress={() => handlePress()}
        style={[styles.btn, { backgroundColor: !isInCart ? '#6200ee' : 'black' }]}
      >
        <Text style={styles.btnTxt}>{isInCart ? "Go to Cart" : "Add to Cart"}</Text>
      </TouchableOpacity>

    </ScrollView>
  )
}

export default ProductDetailsScreen


const styles = StyleSheet.create({
  container: {
    padding: width * 0.04,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: height * 0.4,
    borderRadius: 8,
    marginBottom: height * 0.02,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: height * 0.01,
    color: 'black'
  },
  price: {
    fontSize: width * 0.05,
    color: '#888',
    marginBottom: height * 0.02,
  },
  description: {
    fontSize: width * 0.045,
    textAlign: 'center',
    marginBottom: height * 0.035,
    color: '#888',
  },
  btn: {
    width: width * 0.9,
    backgroundColor: 'green',
    padding: height * 0.02,
    alignItems: 'center',
    borderRadius: width * 0.025,
    marginTop: height * 0.02
  },
  btnTxt: {
    color: 'white',
    fontSize: width * 0.045,
    fontWeight: '700',
  },
});
