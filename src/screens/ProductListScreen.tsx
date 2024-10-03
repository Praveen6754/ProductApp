import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native'
import axios from 'axios';
import { Product } from '../types/types';

const { width, height } = Dimensions.get('window');



const ProductListScreen = ({ navigation }: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);


  useEffect(() => {
    fetchProducts();
  }, [])

  useEffect(() => {
    filterProducts();
  }, [searchQuery, products]);
  

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://fakestoreapi.com/products?limit=${page * 10}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    if (searchQuery) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const loadMoreProducts = async () => {
    if (isMoreLoading) return;

    setIsMoreLoading(true);
    try {
      const nextPage = page + 1;
      const response = await axios.get(`https://fakestoreapi.com/products?limit=${nextPage * 10}`);
      setProducts((prevProducts) => [...prevProducts, ...response.data]);
      setPage(nextPage);
    } catch (error) {
      console.error('Error loading more products:', error);
    } finally {
      setIsMoreLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );




  return (
    <View style={styles.container}>
      <Text style={styles.headerTxt}>ProductListScreen</Text>
      <TextInput
        testID='searchInput'
        style={styles.searchBar}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        placeholderTextColor={'#888'}
      
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          testID='flatlist'
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContainer}
          onEndReached={loadMoreProducts}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isMoreLoading ? <ActivityIndicator size="small" color="#0000ff" /> : null}
        />
      )}
    </View>
  )
}

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerTxt: {
    backgroundColor: '#6200ee',
    borderBottomWidth: 0,
    fontSize: width * 0.045,
    color: 'white',
    padding: 16,
  },
  flatListContainer: {
    paddingHorizontal: width * 0.04,
    paddingBottom: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    padding: width * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  productImage: {
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: 'contain',
  },
  productInfo: {
    marginLeft: 16,
    flex: 1,
  },
  productTitle: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: width * 0.035,
    color: '#888',
    marginTop: 4,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: width * 0.03,
    margin: width * 0.04,
    borderRadius: 8,
    fontSize: width * 0.04,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    color:'black'
  },
});

