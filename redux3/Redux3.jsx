import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import store from './store';
import { addToCart, removeFromCart } from './cartActions';

const products = [
  { id: 1, name: 'Apple', price: 1.5 },
  { id: 2, name: 'Banana', price: 1.0 },
  { id: 3, name: 'Orange', price: 1.2 },
];

const ProductList = () => {
  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.product}>
          <Text style={styles.productText}>{item.name} - ${item.price}</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => dispatch(addToCart(item))}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const Cart = () => {
  const cart = useSelector((state) => state.cartReducer.cart);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={cart}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.cartItem}>
          <Text style={styles.cartItemText}>{item.name} - ${item.price}</Text>
          <TouchableOpacity style={styles.removeButton} onPress={() => dispatch(removeFromCart(item.id))}>
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const Redux3 = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text style={styles.title}>Product List</Text>
        <ProductList />
        <Text style={styles.title}>Your Cart</Text>
        <Cart />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productText: {
    fontSize: 18,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cartItemText: {
    fontSize: 18,
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#F44336',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Redux3;
