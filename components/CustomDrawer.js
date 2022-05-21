import React from 'react';
import {View, Text, StyleSheet,Button} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/userSlice';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
const CustomDrawer = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user);
  const navigation = useNavigation();
  const logout= ()=>{
    dispatch(setUser({}));
    navigation.navigate("Login");
  }
  return (
    <View style={{flex: 1}}>
      <View style={styles.drawerHeader} >
        <View style={styles.avatar}></View>
        <Text style={styles.text} >{user.username}</Text>
        <Text style={styles.text}>@{user.email}`</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity style={styles.logout} ><Button onPress={logout} title="Logout" /></TouchableOpacity>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerHeader:{
    backgroundColor:"rgb(230,230,230)",
    minHeight:"20%",
    width:"100%"
  },
  avatar:{
    backgroundColor:"white",
    borderRadius:100,
    minHeight:100,
    width:100,
    marginLeft:10,
    marginTop:30
  },
  text:{
    fontSize:20,
    marginLeft:10
  },
  logout:{
    marginBottom:20,
    marginLeft:10,
    marginRight:10
  }
})

export default CustomDrawer;
