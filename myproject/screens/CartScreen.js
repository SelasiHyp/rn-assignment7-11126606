import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const cartKeys = keys.filter(key => key.startsWith('@cart_'));
        const cartData = await AsyncStorage.multiGet(cartKeys);
        const cart = cartData.map(item => JSON.parse(item[1]));
        setCartItems(cart);

        const total = cart.reduce((sum, item) => sum + (typeof item.price === 'number' ? item.price : 0), 0);
        setTotalPrice(total);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartItems();
  }, []);

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
  };

  const removeFromCart = async (itemId) => {
    try {
      await AsyncStorage.removeItem(`@cart_${itemId}`);

      const updatedCart = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedCart);

      const total = updatedCart.reduce((sum, item) => sum + (typeof item.price === 'number' ? item.price : 0), 0);
      setTotalPrice(total);
    } catch (error) {
      console.error('Failed to remove item from cart', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Image source={require('../assets/Logo.png')} style={styles.logo}/>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Image source={require('../assets/Search.png')} />
        </TouchableOpacity>
      </View>
      <Image source={require('../assets/checkout.png')} style={styles.checkimg} />
      
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.itemDetails}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.description}>{truncateDescription(item.description, 30)}</Text>
              <Text style={styles.price}>
                ${typeof item.price === 'number' ? item.price.toFixed(2) : 'N/A'}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
              <Image source={require('../assets/remove.png')} style={styles.removeIcon} />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>EST. TOTAL</Text>
        <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
      </View>

      <TouchableOpacity onPress={() => {}} style={styles.checkoutButton}>
        <Image source={require('../assets/shopping bag.png')} style={styles.shopbag} />
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  head: {
    flexDirection: 'row',
    marginTop: 70,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 8,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 16,
    resizeMode: 'contain',
  },
  itemDetails: {
    flex: 1,
    right: 15
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    color: '#000',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderColor: '#ddd',
    marginTop: 10,
  },
  totalText: {
    fontSize: 28,
  },
  totalPrice: {
    fontSize: 28,
    color: 'red',
  },
  checkoutButton: {
    backgroundColor: 'black',
    height: 60,
    width: 450,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    right: 35
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  removeButton: {
    position: 'absolute',
    top: 35,
    right: 10,
  },
  removeIcon: {
    width: 24,
    height: 24,
  },
  shopbag: {
    tintColor: 'white',
    marginRight: 10,
  },
  checkimg: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  logo:{ 
    marginLeft: 120,
    height: 60,
    width: 150
  },
});

export default CartScreen;
