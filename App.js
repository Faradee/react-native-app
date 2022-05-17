import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './screens/Home';
import Notes from './screens/Notes';
import CustomDrawer from './components/CustomDrawer';
import Login from './screens/Login';
import LoadingOverlay from './components/LoadingOverlay';
import {AppContextProvider} from './AppContext';
import * as Keychain from 'react-native-keychain';
const Drawer = createDrawerNavigator();

const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState(undefined);


  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName={user ? 'Home' : 'Login'}
        drawerContent={props => <CustomDrawer {...props} defa />}>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Notes" children={()=>(<Notes user={user}></Notes>)} />
          <Drawer.Screen
            name="Login"
            options={{
              headerShown: false,
              drawerItemStyle: {display: 'none'},
            }}
            children={() => (
              <Login
                setUser={setUser}
                setLoading={setLoading}
                isLoading={isLoading}
              />
            )}
          />
      </Drawer.Navigator>
      <LoadingOverlay isLoading={isLoading} />
    </NavigationContainer>
  );
};

export default App;
