import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import ListItem from '../components/ListItem.js';
import AddItem from '../components/AddItem.js';
import * as api from '../api';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

const Notes = ({user}) => {
  useEffect(() => {
    getItems();
  }, []);

  const randomColor = () => {
    return `rgb(${Math.floor(Math.random() * (255 - 80) + 80)},${Math.floor(
      Math.random() * (255 - 80) + 80,
    )},${Math.floor(Math.random() * (255 - 80) + 80)})`;
  };

  const [items, setItems] = useState([]);

  const getItems = async () => {
    api
      .fetchPosts()
      .then(res => {
        const {data} = res;
        setItems(data);
      })
      .catch(err => {
        Alert.alert('Error', 'Failed to connect to API', [{text: 'OK'}]);
      });
  };

  const addItem = async text => {
    if (!text) {
      Alert.alert('Error', 'Please enter an item', [{text: 'Ok'}]);
    } else
      try {
        const newPost = {
          id: uuidv4(),
          color: randomColor(),
          text,
          author
        };

        const {data} = await api.addPost(newPost);
        setItems(prevItems => {
          return [newPost, ...prevItems];
        });
      } catch (err) {
        console.log(err);
        Alert.alert('Error', "Couldn't connect to API", [{text: 'Ok'}]);
      }
  };

  const deleteItem = async id => {
    try {
      const {data} = await api.deletePost(id);
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
      <ScrollView horizontal contentContainerStyle={{width: '100%'}}>
        <FlatList
          data={items}
          renderItem={({item}) => (
            <ListItem deleteItem={deleteItem} username={user.username} item={item}></ListItem>
          )}
        />
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
