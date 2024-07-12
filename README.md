# rn-assignment7-11126606
# ID - 11126606
# Shopping Cart Application

This application is a shopping cart built using React and JavaScript. It allows users to browse available products, add them to their cart, remove items, and view product details.

## Features

The app includes three primary screens accessible via a drawer for easy navigation:
- **Home Screen**
- **Product Details Screen**
- **Cart Screen**
- **Drawer Navigation**

### Home Screen
- Displays a list of products.

### Product Details Screen
- Shows detailed information about a product in a modal.

### Cart Screen
- Allows users to view and manage items in their cart and see the total price.

### Drawer Navigation
- Facilitates navigation between different sections of the application.

## State Management

- **useState**: Manages local state such as cart items, product data, and loading states.
- **useEffect**: Fetches data and handles side effects.

## Data Storage

- **AsyncStorage**: Persists cart items across sessions.

## Navigation

- **React Navigation**: Implements both stack and drawer navigation.

## Components

- **Home Screen (HomeScreen.js)**:
  - Fetches product data from `https://fakestoreapi.com/products` using axios.
  - Displays products in a grid using FlatList.
  - Shows product details in a modal.
  - Allows adding items to the cart.

- **Cart Screen (CartScreen.js)**:
  - Retrieves cart items from AsyncStorage.
  - Displays cart items and the total price.
  - Enables removal of items from the cart.

- **ProductItem.js**:
  - Shows product images, titles, descriptions, and prices.
  - Allows adding items to the cart.

- **App Component (App.js)**:
  - Configures navigation using DrawerNavigator and StackNavigator.




# Screenshots
![alt text](myProject/assets/Screenshot/shot1.jfif) 
![alt text](myProject/assets/Screenshot/shot2.jfif)
![alt text](myProject/assets/Screenshot/shot3.jfif)
![alt text](myProject/assets/Screenshot/shot4.jfif)
![alt text](myProject/assets/Screenshot/shot5.jfif)