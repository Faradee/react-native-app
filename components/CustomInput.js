import React from "react"
import {View, Text, TextInput, StyleSheet} from 'react-native'

const CustomInput = ({value, setValue, placeholder, secure}) => {
    return (
      <View style={styles.container}>
        <TextInput value={value} secureTextEntry={secure} onChangeText={setValue} styles={styles.input} placeholder={placeholder} />
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container:{
      borderWidth:1,
      borderRadius:5,
      width:'100%',
      margin:10,
  
    }
  })
  
  export default CustomInput