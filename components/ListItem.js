import React from 'react';
import styled from 'styled-components';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
const ListItem = ({item, deleteItem, username}) => {
  return (
      <TouchableOpacity style={styles.listItem}>
        <ListItemView color={item.color}>
          <Text style={styles.listItemText}>{item.text}</Text>
          <Icon
            name="remove"
            size={20}
            onPress={() => deleteItem(item.id)}
            color="firebrick"
          />
        </ListItemView>
      </TouchableOpacity>
  );
};
const ListItemView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.color};
`;

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 50,
  },
});

export default ListItem;
