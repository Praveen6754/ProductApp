import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { CartItem} from '../types/types';
import { addToCart, decreaseQuantity, removeFromCart } from '../redux/actions';

const { width, height } = Dimensions.get('window');

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) =>
    state.items
  );

  const handleRemoveItem = (item: CartItem) => {
    dispatch(removeFromCart(item));
  };

  const handleIncreaseQuantity = (item: CartItem) => {
    dispatch(addToCart(item));
  };

  const handleDecreaseQuantity = (item: CartItem) => {
    dispatch(decreaseQuantity(item.id));
  };

  const totalPrice = cartItems.reduce((sum:number, item:CartItem) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => handleDecreaseQuantity(item)} style={styles.quantityButton}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleIncreaseQuantity(item)} style={styles.quantityButton}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemoveItem(item)} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04,
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: height * 0.02,
    padding: width * 0.03,
    borderRadius: width * 0.025,
    backgroundColor: '#fff',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  image: {
    width: width * 0.25,
    height: height * 0.15,
    borderRadius: width * 0.025,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: width * 0.04,
  },
  title: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    marginBottom: height * 0.01,
    color: 'black'
  },
  price: {
    fontSize: width * 0.04,
    color: '#888',
    marginBottom: height * 0.01,
  },
  quantity: {
    fontSize: width * 0.04,
    marginBottom: height * 0.01,
    color: 'black',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  quantityButton: {
    backgroundColor: '#ddd',
    width: width * 0.1,
    height: height * 0.05,
    borderRadius: width * 0.05,
    marginHorizontal: width * 0.01,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: width * 0.06,
    color: 'black'
  },
  removeButton: {
    backgroundColor: 'red',
    padding: width * 0.02,
    borderRadius: width * 0.025,
  },
  removeButtonText: {
    color: 'white',
    fontSize: width * 0.04,
  },
  total: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: height * 0.02,
    color: 'black',
    flexDirection: 'row',
    padding: width * 0.03,
    borderRadius: width * 0.025,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
});

export default CartScreen;
