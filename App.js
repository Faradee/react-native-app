import 'react-native-gesture-handler';
import React, {useState, createContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import Home from './screens/Home';
import Notes from './screens/Notes';
import CustomDrawer from './components/CustomDrawer';
import Login from './screens/Login';
import LoadingOverlay from './components/LoadingOverlay';
import * as Keychain from 'react-native-keychain';
import {store} from './store/store'
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-vector-icons/dist/FontAwesome';

const Drawer = createDrawerNavigator();
const UserContext = createContext('');
const LoadingContext = createContext(false);
const App = () => {

  const [isLoading, setLoading] = useState(false);
  return (
      <Provider store={store}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName={'Login'}
            drawerContent={props => <CustomDrawer {...props} defa />}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Notes" component={Notes} />
            <Drawer.Screen
              name="Login"
              options={{
                headerShown: false,
                drawerItemStyle: {display: 'none'},
              }}
              children={() => (
                <Login
                  setLoading={setLoading}
                  isLoading={isLoading}
                />
              )}
            />
            <Drawer.Screen name="LogOut" component={Login}/>
          </Drawer.Navigator>
          <LoadingOverlay isLoading={isLoading} />
        </NavigationContainer>
      </Provider>
  );
};

export default App;
