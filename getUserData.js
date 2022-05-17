import * as Keychain from 'react-native-keychain';

export default getUserData = async (navigation, setUser) => {
  try {
    const userData = await Keychain.getGenericPassword();
    if (userData) return userData;
  } catch (err) {
    navigation.navigate('Login');
  }
};
