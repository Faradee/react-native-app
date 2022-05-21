import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import Home from './screens/Home';
import Notes from './screens/Notes';
import CustomDrawer from './components/CustomDrawer';
import Login from './screens/Login';
import {setUser} from './store/userSlice';
import {store} from './store/store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

const App = () => {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        dispatch(setUser(JSON.parse(value)));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, []);
  const user = useSelector(state => state.user);
  const [isLoading, setLoading] = useState(false);
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={user=={} ? 'Login' : 'Home'}
        drawerContent={props => <CustomDrawer {...props} defa />}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Notes" component={Notes} />
        <Drawer.Screen
          name="Login"
          options={{
            headerShown: false,
            swipeEnabled: false,
            drawerItemStyle: {display: 'none'},
          }}
          children={() => <Login />}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
const Index = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default Index;
