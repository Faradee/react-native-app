import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import ListItem from '../components/ListItem.js';
import AddItem from '../components/AddItem.js';
import * as api from '../api';
import 'react-native-get-random-values';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

const Notes = navigation => {
  const isFocused = useIsFocused();
  const token = useSelector(state => state.user.token);
  const user = useSelector(state => state.user);
  const [refreshing, setRefreshing] = useState(false);
  const randomColor = () => {
    return `rgb(${Math.floor(Math.random() * (255 - 80) + 80)},${Math.floor(
      Math.random() * (255 - 80) + 80,
    )},${Math.floor(Math.random() * (255 - 80) + 80)})`;
  };
  useEffect(
    useCallback(() => {
      if (isFocused);
      getItems();
    }),
    [user],
  );

  const [items, setItems] = useState([]);

  const getItems = async () => {
    if(user.username)
    try {
      setRefreshing(true);
      const {data} = await api.fetchPosts({token});
      setItems(data.sort((itemA, itemB) => itemB.id - itemA.id));
      setRefreshing(false);
    } catch (err) {
      console.log(err);
      setRefreshing(false);
      Alert.alert('Error', 'Failed to connect to API', [{text: 'OK'}]);
    }
  };

  const addItem = async text => {
    if (!text) {
      Alert.alert('Error', 'Please enter an item', [{text: 'Ok'}]);
    } else
      try {
        const newPost = {
          color: randomColor(),
          text: text,
        };

        const res = await api.addPost({...newPost, token});
        getItems();
      } catch (err) {
        console.log(err);
        Alert.alert('Error', "Couldn't connect to API", [{text: 'Ok'}]);
      }
  };

  const deleteItem = async id => {
    try {
      await api.deletePost({id, token});
      setItems(prevItems => {
        return prevItems.filter(item => item.id != id);
      });
    } catch (err) {
      Alert.alert('Error', "Couldn't connect to API", [{text: 'OK'}]);
    }
  };

  return (
    <View style={styles.container}>
      <AddItem addItem={addItem} />
      <ScrollView
        alwaysBounceVertical={true}
        horizontal
        contentContainerStyle={{
          width: '100%',
          justifyContent: 'center',
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getItems} />
        }>
        {refreshing ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            {items.length != 0 ? (
              <FlatList
                data={items}
                renderItem={({item}) => (
                  <ListItem
                    deleteItem={deleteItem}
                    username={user.username}
                    item={item}></ListItem>
                )}
              />
            ) : (
              <Text>No posts</Text>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
